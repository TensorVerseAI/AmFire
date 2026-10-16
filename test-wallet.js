// Synthetic purchase state only. This module cannot debit money or place an order.
export const DEMO_ITEM=Object.freeze({id:'demo-daypack',title:'Orange daypack — synthetic example',subtotalCents:4900,currency:'USD'});
export function createTestOrder({key,consented,itemId=DEMO_ITEM.id,selectedASIN=null}){
 if(!/^[\w-]{8,100}$/.test(key||''))throw new Error('A valid idempotency key is required');
 if(consented!==true)throw new Error('Explicit service-fee consent is required');
 if(selectedASIN!==null&&!/^[A-Z0-9]{10}$/.test(selectedASIN))throw new Error('Invalid test ASIN format');
 if(itemId!==DEMO_ITEM.id)throw new Error('Unknown demo item');
 return {id:key,mode:'test',itemId,currency:'USD',subtotalCents:4900,serviceFeeCents:99,shippingCents:null,taxCents:null,knownTotalCents:4999,selectedASIN,consentAt:new Date().toISOString(),marketplace:'amazon.com',feeConsent:true,handoffToken:'test-handoff-'+key,processorIdempotencyKey:'amfire-fee-'+key,retail:'pending',fee:'test_authorized',events:[]};
}
export function applyTestEvent(order,{id,type}){
 if(!/^[\w-]{8,100}$/.test(id||''))throw new Error('A valid event ID is required');
 if(order.events.includes(id))return order;
 const next={...order,events:[...order.events,id]};
 if(type==='retail_confirmed'){
  if(order.retail!=='pending')throw new Error('Retail outcome is already final');
  next.retail='test_confirmed';next.fee='test_capture_pending';
 }else if(type==='retail_cancelled'||type==='retail_failed'){
  if(order.retail!=='pending')throw new Error('Retail outcome is already final');
  next.retail=type==='retail_cancelled'?'test_cancelled':'test_failed';next.fee='test_voided';
 }else if(type==='fee_capture_succeeded'){
  if(order.retail!=='test_confirmed'||order.fee!=='test_capture_pending')throw new Error('Capture requires confirmed test retail outcome');next.fee='test_captured';
 }else if(type==='retail_unknown'){
  if(order.retail!=='pending')throw new Error('Retail outcome is already final');next.retail='test_unknown';next.fee='test_voided';
 }else if(type==='fee_failed'){
  if(!['test_authorized','test_capture_pending'].includes(order.fee))throw new Error('Fee transition rejected');
  next.fee='test_failed';if(order.retail==='pending')next.retail='test_cancelled';
 }else if(type==='refund_requested'){
  if(order.retail!=='test_confirmed'||order.fee!=='test_captured')throw new Error('No captured test fee to refund');
  next.fee='test_refund_pending';
 }else if(type==='refund_confirmed'){
  if(order.fee!=='test_refund_pending')throw new Error('No pending refund');
  next.fee='test_refunded';
 }else throw new Error('Unsupported test event');
 return next;
}
export function createTestLedger(){const orders=new Map();return {create(input){if(orders.has(input.key)){const existing=orders.get(input.key);if(existing.itemId!==(input.itemId||DEMO_ITEM.id)||existing.selectedASIN!==(input.selectedASIN??null)||input.consented!==true)throw new Error('Idempotency key conflict');return existing;}const order=createTestOrder(input);orders.set(order.id,order);return order;},event(key,event){if(!orders.has(key))throw new Error('Order not found');const next=applyTestEvent(orders.get(key),event);orders.set(key,next);return next;},get:key=>orders.get(key)};}


