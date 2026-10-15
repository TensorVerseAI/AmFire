// Pure skill-session contract. This module does not call Alexa or purchase anything.
// Invoke only inside a verified ASK SDK request handler, after explicit user consent.
export function buildShoppingDirective({selectedASIN,sessionReference,customerConsented=false}) {
 if(!customerConsented)throw new Error('Customer consent required');
 if(!/^[A-Z0-9]{10}$/.test(selectedASIN||''))throw new Error('A verified eligible product ASIN is required');
 if(!/^[a-zA-Z0-9_-]{16,128}$/.test(sessionReference||''))throw new Error('Opaque session reference required');
 return {type:'Connections.StartConnection',uri:'connection://AMAZON.BuyShoppingProducts/1',input:{products:[{asin:selectedASIN}]},token:sessionReference};
}
export function classifyShoppingReturn(request,expectedReference) {
 if(request?.type!=='SessionResumedRequest'||!expectedReference||request.cause?.token!==expectedReference)return {status:'rejected',purchaseConfirmed:false};
 const cause=request.cause;
 if(String(cause.status?.code)!=='200')return {status:'handoff-failed',purchaseConfirmed:false};
 if(cause.result!==undefined)return {status:'returned-with-result',resultCode:typeof cause.result?.code==='string'?cause.result.code:'unknown',purchaseConfirmed:false};
 // A transport success is not an order receipt. Do not invent order IDs or delivery.
 return {status:'returned-from-alexa',purchaseConfirmed:false};
}
