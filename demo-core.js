export const catalog=[
 {id:'bag',name:'Sunset daypack',recipient:'Jamie',size:'18 litre',price:39,quote:'That orange bag would be perfect for our next adventure.',color:'#ff802b',kind:'bag'},
 {id:'headphones',name:'Cloud headphones',recipient:'Alex',size:'Adjustable',price:59,quote:'I would love some headphones for the train.',color:'#456be8',kind:'headphones'},
 {id:'bottle',name:'Trail bottle',recipient:'Sam',size:'750 ml',price:24,quote:'A bottle that keeps my water cold would be great.',color:'#15a99a',kind:'bottle'}];
export function initial(){return {stage:'connect',bee:false,item:'bag',orders:[]};}
export function transition(s,event){
 if(event.type==='RESET')return initial();
 if(event.type==='CONNECT'&&s.stage==='connect')return {...s,stage:'onboard'};
 if(event.type==='BEE'&&s.stage==='onboard')return {...s,bee:true,stage:'wish'};
 if(event.type==='MATCH'&&s.stage==='wish')return {...s,stage:'match'};
 if(event.type==='REVIEW'&&s.stage==='match')return {...s,stage:'review'};
 if(event.type==='CONFIRM'&&s.stage==='review'&&event.recipient&&event.size)return {...s,stage:'ordered',orders:[...s.orders,{id:'DEMO-'+(s.orders.length+1),item:s.item,recipient:event.recipient,size:event.size}]};
 if(event.type==='ARRIVAL'&&s.stage==='ordered')return {...s,stage:'delivery'};
 if(event.type==='FINISH'&&s.stage==='delivery')return {...s,stage:'success'};
 if(event.type==='LIST'&&['success','match','wish'].includes(s.stage))return {...s,stage:'list'};
 if(event.type==='SELECT'&&s.stage==='list'&&catalog.some(i=>i.id===event.id))return {...s,item:event.id,stage:'match'};
 return s;
}
