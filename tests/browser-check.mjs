import {chromium} from 'playwright';
import {createApp} from '../server.mjs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
await mkdir('evidence',{recursive:true});
const server=createApp({env:{}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,channel:'msedge'});
const report={screens:[],checks:[],errors:[]};
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(base);await page.locator('.hero h1').waitFor();await page.screenshot({path:'evidence/desktop.png',fullPage:true});report.screens.push('desktop.png');
 await page.locator('#startButton').click();await page.waitForFunction(()=>document.querySelector('#presentationVideo').currentTime>0);assert.equal(await page.locator('#videoMenuButton').isVisible(),true);report.checks.push('Opening plays with overlay options visible');
 await page.locator('#videoMenuButton').click();await page.locator('[data-video-action="demo"]').click();assert.equal(await page.locator('#demo').isVisible(),true);report.checks.push('Panel opens over presentation shell');
 await page.getByRole('button',{name:'See the scene',exact:true}).click();await page.locator('#chat .chat-scene').waitFor();
 await page.getByRole('button',{name:'Find a match',exact:true}).click();const link=page.locator('#chat a');assert.equal(await link.getAttribute('href'),'https://www.amazon.com/s?k=orange+daypack+backpack');
 await page.getByRole('button',{name:'Review the gift idea',exact:true}).click();await page.locator('input[name=size]').fill('20 litres');await page.locator('input[name=budget]').fill('50');await page.locator('input[name=reviewed]').check();await page.getByRole('button',{name:'Confirm demo checklist',exact:true}).click();assert.match(await page.locator('#chat').innerText(),/No order was placed/);report.checks.push('Category link and validated synthetic checklist; no order claim');
 await page.screenshot({path:'evidence/desktop-sample.png'});report.screens.push('desktop-sample.png');
 await page.locator('#closeDemo').click();await page.locator('#closePresentation').click();assert.equal(await page.locator('#presentation').isVisible(),false);report.checks.push('Exit restores marketing page');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1});mobile.on('pageerror',e=>report.errors.push(e.message));await mobile.goto(base);assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await mobile.screenshot({path:'evidence/mobile.png',fullPage:true});report.screens.push('mobile.png');await mobile.locator('.pull-tab').click();await mobile.getByRole('button',{name:'See the scene',exact:true}).click();await mobile.screenshot({path:'evidence/mobile-sample.png'});report.screens.push('mobile-sample.png');report.checks.push('390px responsive page without horizontal overflow; public sample opens');
 await mobile.locator('#closeDemo').click();await mobile.locator('#menuButton').click();await mobile.locator('#installButton').click();assert.equal(await mobile.locator('#installHelp').isVisible(),true);report.checks.push('Install fallback guidance shown without requiring native prompt');
 await mobile.goto(base+'/app');assert.match(await mobile.locator('#authStatus').innerText(),/not connected/);assert.equal(await mobile.locator('#amazonLogin').getAttribute('aria-disabled'),'true');report.checks.push('Unconfigured private app fails closed');
 await page.goto(base);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.context().setOffline(true);await page.reload();assert.equal(await page.locator('.hero h1').isVisible(),true);await page.locator('.pull-tab').click();assert.equal(await page.locator('#demo').isVisible(),true);await page.context().setOffline(false);report.checks.push('Service worker serves public page and sample offline');
 report.events=await page.evaluate(()=>window.amfireDiagnostics());
 // Render project-owned vector icons into standard PWA PNG sizes.
 const icons=await browser.newPage();for(const size of [192,512]){await icons.setViewportSize({width:size,height:size});await icons.goto(base+'/assets/icon-maskable.svg');await icons.screenshot({path:`public/assets/icon-${size}.png`});}
 await icons.setViewportSize({width:1000,height:650});await icons.goto(base+'/assets/scene.svg');await icons.screenshot({path:'evidence/synthetic-scene.png'});report.screens.push('synthetic-scene.png');
 assert.deepEqual(report.errors,[]);
 for(const file of report.screens){const bytes=await readFile('evidence/'+file);report[file]={sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};}
 await writeFile('evidence/browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();await new Promise(r=>server.close(r));}
