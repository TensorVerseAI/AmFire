import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {randomBytes,createHash,timingSafeEqual} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createDurableTestStore} from './integrations/test-purchases.mjs';
const ROOT=path.join(path.dirname(fileURLToPath(import.meta.url)),'public');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.mp4':'video/mp4','.png':'image/png'};
export function createApp({env=process.env,fetchImpl=fetch,now=()=>Date.now()}={}){
 const purchases=env.TEST_PURCHASES==='true'&&env.AMFIRE_TEST_STORE?createDurableTestStore(env.AMFIRE_TEST_STORE):null;
 const origin=env.PUBLIC_ORIGIN||'http://localhost:4173';const secure=origin.startsWith('https://');const sessions=new Map(),states=new Map();
 const configured=Boolean(env.AMAZON_CLIENT_ID&&env.AMAZON_CLIENT_SECRET);const callback=new URL('/auth/callback',origin).href;
 const cookie=(name,value,age)=>`${name}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${age}${secure?'; Secure':''}`;
 function cookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').map(p=>p.trim().split('=' )).filter(p=>p.length===2));}
 function prune(){for(const [id,s]of sessions)if(s.expires<=now())sessions.delete(id);for(const[id,s]of states)if(s.expires<=now())states.delete(id);}
 async function jsonFetch(url,options={}){const r=await fetchImpl(url,{...options,signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error('Provider rejected request');return r.json();}
 return http.createServer(async(req,res)=>{
  prune();const url=new URL(req.url,'http://localhost');const p=url.pathname;
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  const json=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body));};
  const redirect=(to)=>{res.writeHead(302,{Location:to,'Cache-Control':'no-store'});res.end();};
  try{
   if(p.startsWith('/auth/')||p.startsWith('/api/'))res.setHeader('Cache-Control','no-store');
   if(p==='/api/config'&&req.method==='GET')return json(200,{amazonConfigured:configured,demo:true});
   if(p==='/api/me'&&req.method==='GET'){const s=sessions.get(cookies(req).amfire_session);return s?json(200,s.profile):json(401,{error:'Authentication required'});}
   if(p==='/api/chat/context'&&req.method==='GET'){if(!sessions.has(cookies(req).amfire_session))return json(401,{error:'Authentication required'});return json(200,{speech:{provider:'alexa',status:'unconfigured'},payments:{live:false,testEnabled:Boolean(purchases)},chat:{mode:'scripted_preview'}});}
   if(p==='/api/test/purchases'||p.startsWith('/api/test/purchases/')){
    const session=sessions.get(cookies(req).amfire_session);if(!session)return json(401,{error:'Authentication required'});
    if(req.method!=='POST')return json(405,{error:'POST required'});
    if(req.headers.origin!==origin||req.headers['x-amfire-action']!=='test-purchase')return json(403,{error:'Invalid origin'});
    if(!purchases)return json(503,{error:'Private test wallet is not configured. Live payments are disabled.'});
    let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>8192)return json(413,{error:'Request too large'});}
    let input;try{input=JSON.parse(body);}catch{return json(400,{error:'Invalid JSON'});}
    try{const result=p==='/api/test/purchases'?await purchases.create(session.profile.user_id,input):await purchases.event(session.profile.user_id,p.split('/').pop(),input);return json(200,result);}catch{return json(409,{error:'Test purchase transition or idempotency conflict'});}
   }
   if(p==='/auth/logout'&&req.method==='POST'){if(req.headers.origin!==origin||req.headers['x-amfire-action']!=='logout')return json(403,{error:'Invalid origin'});sessions.delete(cookies(req).amfire_session);res.setHeader('Set-Cookie',cookie('amfire_session','',0));return json(200,{signedOut:true});}
   if(p==='/auth/amazon'&&req.method==='GET'){
    if(!configured)return json(503,{error:'Login with Amazon is not configured'});
    if(states.size>=1000)return json(429,{error:'Please try again later'});
    const state=randomBytes(32).toString('hex'),verifier=randomBytes(32).toString('base64url');
    states.set(state,{verifier,expires:now()+10*60*1000});res.setHeader('Set-Cookie',cookie('amfire_oauth',state,600));
    const auth=new URL('https://www.amazon.com/ap/oa');auth.search=new URLSearchParams({client_id:env.AMAZON_CLIENT_ID,scope:'profile',response_type:'code',redirect_uri:callback,state,code_challenge:createHash('sha256').update(verifier).digest('base64url'),code_challenge_method:'S256'}).toString();return redirect(auth.href);
   }
   if(p==='/auth/callback'&&req.method==='GET'){
    if(!configured)return json(503,{error:'Login with Amazon is not configured'});
    const state=url.searchParams.get('state')||'',bound=cookies(req).amfire_oauth||'',pending=states.get(state);
    if(!pending||state.length!==bound.length||!timingSafeEqual(Buffer.from(state),Buffer.from(bound)))return json(400,{error:'Invalid or expired sign-in state'});
    states.delete(state);res.setHeader('Set-Cookie',cookie('amfire_oauth','',0));
    const code=url.searchParams.get('code');if(!code)return json(400,{error:'Sign-in was not completed'});
    const token=await jsonFetch('https://api.amazon.com/auth/o2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',code,client_id:env.AMAZON_CLIENT_ID,client_secret:env.AMAZON_CLIENT_SECRET,redirect_uri:callback,code_verifier:pending.verifier})});
    if(typeof token.access_token!=='string')throw new Error('Missing access token');
    const info=await jsonFetch('https://api.amazon.com/auth/o2/tokeninfo?access_token='+encodeURIComponent(token.access_token));
    if(info.aud!==env.AMAZON_CLIENT_ID||!Number.isFinite(Number(info.exp))||Number(info.exp)<=0)throw new Error('Invalid token audience or expiry');
    const profile=await jsonFetch('https://api.amazon.com/user/profile',{headers:{Authorization:'Bearer '+token.access_token}});
    if(typeof profile.user_id!=='string'||!profile.user_id)throw new Error('Missing profile');
    if(sessions.size>=10000)throw new Error('Session capacity');
    const id=randomBytes(32).toString('hex');sessions.set(id,{profile:{user_id:profile.user_id,name:String(profile.name||'').slice(0,200),email:String(profile.email||'').slice(0,254)},expires:now()+60*60*1000});
    res.setHeader('Set-Cookie',[cookie('amfire_oauth','',0),cookie('amfire_session',id,3600)]);return redirect('/app');
   }
   if(p.startsWith('/api/')||p.startsWith('/auth/'))return json(404,{error:'Not found'});
   if(!['GET','HEAD'].includes(req.method))return json(405,{error:'Method not allowed'});
   let relative=decodeURIComponent(p);if(relative==='/'||relative==='/app'||relative==='/app/')relative='/index.html';
   const file=path.resolve(ROOT,'.'+relative);if(!file.startsWith(ROOT+path.sep))return json(403,{error:'Forbidden'});
   const st=await stat(file);if(!st.isFile())return json(404,{error:'Not found'});
   res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');
   if(req.headers.range&&path.extname(file)==='.mp4'){
    const m=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!m)return json(416,{error:'Invalid range'});
    const start=Number(m[1]),end=m[2]?Math.min(Number(m[2]),st.size-1):st.size-1;if(start>end||start>=st.size){res.setHeader('Content-Range',`bytes */${st.size}`);return json(416,{error:'Invalid range'});}
    res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${st.size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});if(req.method==='HEAD')return res.end();return createReadStream(file,{start,end}).pipe(res);
   }
   res.setHeader('Content-Length',st.size);if(req.method==='HEAD')return res.end();res.end(await readFile(file));
  }catch(error){if(error.code==='ENOENT')return json(404,{error:'Not found'});return json(502,{error:'Request could not be completed. No private details were logged.'});}
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const server=createApp();server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`AmFire ready: http://localhost:${process.env.PORT||4173}`));}
