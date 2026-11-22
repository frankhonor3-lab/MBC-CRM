/* ============================================================
   MBC CRM — Edit Entry Price + Edit Leverage Modals  v2
   Shared by agent / ret-manager / admin / manager
   ============================================================ */

function _injectCrmModals() {
  var el = document.createElement('div');
  el.innerHTML = `
<style>
@keyframes crmFadeIn  { from{opacity:0} to{opacity:1} }
@keyframes crmSlideUp { from{opacity:0;transform:translateY(18px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }

.crm-modal-bg {
  display:none;position:fixed;inset:0;z-index:3000;
  align-items:center;justify-content:center;padding:20px;
  background:rgba(4,6,18,.82);backdrop-filter:blur(10px);
}
.crm-modal-bg.open { display:flex; animation:crmFadeIn .18s ease; }
.crm-modal-bg.open .crm-mc { animation:crmSlideUp .22s cubic-bezier(.22,1,.36,1); }

.crm-mc {
  background:#111627;border:1px solid rgba(255,255,255,.10);border-radius:22px;
  width:100%;max-width:476px;
  box-shadow:0 48px 120px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.04) inset;
  overflow:hidden;
}

.crm-mh {
  padding:22px 26px 18px;border-bottom:1px solid rgba(255,255,255,.07);
  background:linear-gradient(180deg,rgba(255,255,255,.025) 0%,transparent 100%);
  display:flex;align-items:flex-start;gap:12px;
}
.crm-mh-left { flex:1;min-width:0 }
.crm-mh-title { font-size:16px;font-weight:800;color:#e8ecf0;letter-spacing:-.3px;line-height:1.3 }
.crm-mh-badges { display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap }
.crm-badge {
  display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;
  font-size:10px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;font-family:monospace;
}
.crm-bs  { background:rgba(255,255,255,.07);color:rgba(232,236,240,.7);border:1px solid rgba(255,255,255,.1) }
.crm-bl  { background:rgba(38,201,163,.12);color:#26c9a3;border:1px solid rgba(38,201,163,.22) }
.crm-bsh { background:rgba(239,83,80,.12);color:#ef5350;border:1px solid rgba(239,83,80,.22) }
.crm-bq  { background:rgba(79,168,255,.1);color:#4fa8ff;border:1px solid rgba(79,168,255,.2) }
.crm-bv  { background:rgba(245,184,67,.1);color:#f5b843;border:1px solid rgba(245,184,67,.2) }

.crm-mh-x {
  flex-shrink:0;width:32px;height:32px;border-radius:50%;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);
  color:rgba(232,236,240,.5);font-size:20px;line-height:30px;
  text-align:center;cursor:pointer;transition:background .15s,color .15s;
}
.crm-mh-x:hover { background:rgba(255,255,255,.13);color:#e8ecf0 }

.crm-mb { padding:20px 26px 6px }

.crm-fg { display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:end }
.crm-fl {
  font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;
  color:rgba(232,236,240,.28);margin-bottom:7px;
}
.crm-fl span { color:#4fa8ff;font-size:13px;font-weight:800 }
.crm-fs {
  font-family:monospace;font-size:24px;font-weight:800;
  color:rgba(232,236,240,.45);letter-spacing:-.5px;font-variant-numeric:tabular-nums;
}

.crm-iw { position:relative }
.crm-iw::before {
  content:'$';position:absolute;left:13px;top:50%;transform:translateY(-50%);
  font-family:monospace;font-size:16px;font-weight:700;color:rgba(79,168,255,.7);
  pointer-events:none;z-index:1;
}
.crm-inp {
  width:100%;padding:11px 13px 11px 26px;background:rgba(79,168,255,.07);
  border:1.5px solid rgba(79,168,255,.4);border-radius:11px;
  color:#e8ecf0;font-family:monospace;font-size:20px;font-weight:800;
  outline:none;box-sizing:border-box;transition:border-color .2s,box-shadow .2s,background .2s;
  font-variant-numeric:tabular-nums;
}
.crm-inp:focus { border-color:#4fa8ff;background:rgba(79,168,255,.1);box-shadow:0 0 0 4px rgba(79,168,255,.12) }

.crm-pb {
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);
  border-radius:14px;padding:16px;margin:14px 0;
}
.crm-pbl {
  font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;
  color:rgba(232,236,240,.25);margin-bottom:14px;display:flex;align-items:center;gap:8px;
}
.crm-pbl::after { content:'';flex:1;height:1px;background:rgba(255,255,255,.06) }
.crm-pg { display:grid;grid-template-columns:1fr 1fr;gap:10px 16px }
.crm-pi label { font-size:10px;color:rgba(232,236,240,.35);display:block;margin-bottom:4px;letter-spacing:.2px }
.crm-pi span {
  font-family:monospace;font-size:14px;font-weight:800;color:#e8ecf0;
  font-variant-numeric:tabular-nums;
}

.crm-df {
  margin-top:12px;padding:10px 14px;border-radius:10px;
  font-size:12px;font-weight:800;text-align:center;letter-spacing:.1px;transition:all .25s;
}
.crm-dn { background:rgba(255,255,255,.04);color:rgba(232,236,240,.35);border:1px solid rgba(255,255,255,.07) }
.crm-dg { background:rgba(38,201,163,.09);color:#26c9a3;border:1px solid rgba(38,201,163,.18) }
.crm-dr { background:rgba(239,83,80,.09);color:#ef5350;border:1px solid rgba(239,83,80,.18) }
.crm-da { background:rgba(245,184,67,.09);color:#f5b843;border:1px solid rgba(245,184,67,.18) }

.crm-slr { display:flex;align-items:center;gap:12px;margin-bottom:4px }
.crm-slv { font-family:monospace;font-size:20px;font-weight:800;color:#4fa8ff;min-width:40px;text-align:right;flex-shrink:0;font-variant-numeric:tabular-nums }
.crm-sli { flex:1;height:5px;accent-color:#4fa8ff;cursor:pointer;vertical-align:middle }
.crm-slm { display:flex;justify-content:space-between;font-size:10px;color:rgba(232,236,240,.25);margin-top:3px }

.crm-mf { padding:12px 26px 22px;display:flex;gap:10px;justify-content:flex-end;align-items:center }
.crm-wh { flex:1;font-size:11px;color:rgba(232,236,240,.3);line-height:1.4 }
.crm-bc {
  padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;color:rgba(232,236,240,.6);font-size:13px;font-weight:600;
  cursor:pointer;transition:background .15s;font-family:inherit;
}
.crm-bc:hover { background:rgba(255,255,255,.1) }
.crm-bsv {
  padding:10px 28px;background:linear-gradient(135deg,#4fa8ff 0%,#2563eb 100%);
  border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:800;
  cursor:pointer;box-shadow:0 4px 20px rgba(37,99,235,.4);
  transition:opacity .15s,box-shadow .15s;font-family:inherit;letter-spacing:.1px;
}
.crm-bsv:hover { opacity:.88;box-shadow:0 6px 28px rgba(37,99,235,.55) }
.crm-bsv:disabled { opacity:.3;cursor:not-allowed;box-shadow:none }
</style>

<!-- EDIT ENTRY PRICE -->
<div id="crmEntryBg" class="crm-modal-bg" onclick="if(event.target===this)closeCrmEntryModal()">
 <div class="crm-mc" onclick="event.stopPropagation()">
  <div class="crm-mh">
   <div class="crm-mh-left">
    <div class="crm-mh-title">Edit Entry Price</div>
    <div class="crm-mh-badges">
     <span id="crmEBSym" class="crm-badge crm-bs"></span>
     <span id="crmEBDir" class="crm-badge crm-bl"></span>
     <span id="crmEBQty" class="crm-badge crm-bq"></span>
     <span id="crmEBLev" class="crm-badge crm-bv"></span>
    </div>
   </div>
   <button class="crm-mh-x" onclick="closeCrmEntryModal()">×</button>
  </div>
  <div class="crm-mb">
   <div class="crm-fg">
    <div>
     <div class="crm-fl">Current Entry</div>
     <div id="crmECur" class="crm-fs"></div>
    </div>
    <div>
     <div class="crm-fl">New Entry Price</div>
     <div class="crm-iw">
      <input id="crmEInp" class="crm-inp" type="number" step="0.00001" placeholder="0.00" oninput="_calcEntry()">
     </div>
    </div>
   </div>
   <div class="crm-pb">
    <div class="crm-pbl">P &amp; L Preview</div>
    <div class="crm-pg">
     <div class="crm-pi"><label>Market Price</label><span id="crmEMkt"></span></div>
     <div class="crm-pi"><label>Leverage Applied</label><span id="crmELev"></span></div>
     <div class="crm-pi"><label>P&amp;L · current entry</label><span id="crmEOld"></span></div>
     <div class="crm-pi"><label>P&amp;L · new entry</label><span id="crmENew"></span></div>
    </div>
    <div id="crmEDiff" class="crm-df crm-dn">Enter a new price to preview impact</div>
   </div>
  </div>
  <div class="crm-mf">
   <button class="crm-bc" onclick="closeCrmEntryModal()">Cancel</button>
   <button class="crm-bsv" onclick="_saveCrmEntry()">Save Entry Price</button>
  </div>
 </div>
</div>

<!-- EDIT LEVERAGE -->
<div id="crmLevBg" class="crm-modal-bg" onclick="if(event.target===this)closeCrmLevModal()">
 <div class="crm-mc" onclick="event.stopPropagation()">
  <div class="crm-mh">
   <div class="crm-mh-left">
    <div class="crm-mh-title">Edit Leverage</div>
    <div class="crm-mh-badges">
     <span id="crmLBSym" class="crm-badge crm-bs"></span>
     <span id="crmLBDir" class="crm-badge crm-bl"></span>
     <span id="crmLBQty" class="crm-badge crm-bq"></span>
    </div>
   </div>
   <button class="crm-mh-x" onclick="closeCrmLevModal()">×</button>
  </div>
  <div class="crm-mb">
   <div class="crm-fg" style="align-items:start">
    <div>
     <div class="crm-fl">Current Leverage</div>
     <div id="crmLCur" class="crm-fs"></div>
     <div id="crmLCat" style="font-size:10px;color:rgba(232,236,240,.28);margin-top:5px;text-transform:uppercase;letter-spacing:.5px"></div>
    </div>
    <div>
     <div class="crm-fl">New Leverage</div>
     <div class="crm-slr">
      <input id="crmLSli" class="crm-sli" type="range" min="1" max="100" value="20" oninput="_calcLev()">
      <div id="crmLVal" class="crm-slv">1:20</div>
     </div>
     <div class="crm-slm"><span>1×</span><span id="crmLMax">100×</span></div>
    </div>
   </div>
   <div class="crm-pb">
    <div class="crm-pbl">Margin Impact</div>
    <div class="crm-pg">
     <div class="crm-pi"><label>Notional Value</label><span id="crmLNot"></span></div>
     <div class="crm-pi"><label>Free Balance</label><span id="crmLBal"></span></div>
     <div class="crm-pi"><label>Old Margin</label><span id="crmLOM" style="color:rgba(232,236,240,.4)"></span></div>
     <div class="crm-pi"><label>New Margin</label><span id="crmLNM"></span></div>
    </div>
    <div id="crmLDiff" class="crm-df crm-dn">Adjust slider to preview margin change</div>
   </div>
  </div>
  <div class="crm-mf">
   <span id="crmLHint" class="crm-wh"></span>
   <button class="crm-bc" onclick="closeCrmLevModal()">Cancel</button>
   <button id="crmLSave" class="crm-bsv" onclick="_saveCrmLev()">Save Leverage</button>
  </div>
 </div>
</div>`;
  document.body.appendChild(el);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _injectCrmModals);
} else {
  _injectCrmModals();
}

/* ── STATE ── */
var _crmECtx=null, _crmLCtx=null;

/* ── HELPERS ── */
function _fmtP(n){if(!n&&n!==0)return'—';return n<5?n.toLocaleString('en-US',{minimumFractionDigits:5,maximumFractionDigits:5}):n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function _fmtPnl(n){return(n>=0?'+$':'-$')+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function _colPnl(el,v){el.textContent=_fmtPnl(v);el.style.color=v>=0?'#26c9a3':'#ef5350';}

/* ── ENTRY PRICE MODAL ── */
function openCrmEntryModal(uid,posId,pos,bal,onSave){
  _crmECtx={uid:uid,posId:posId,pos:pos,bal:bal,onSave:onSave};
  var ep=pos.entryPrice||pos.entry||pos.avgPrice||pos.fillPrice||0;
  var isLong=(pos.side||'')!=='sell'&&(pos.side||'')!=='short';
  var sym=pos.label||pos.sym||pos.symbol||posId;
  var mkt=(window.CRM_PRICE_MAP&&window.CRM_PRICE_MAP[sym])||ep;
  var lev=pos.leverage||20;var qty=pos.qty||0;

  document.getElementById('crmEBSym').textContent=sym;
  var dB=document.getElementById('crmEBDir');
  dB.textContent=isLong?'▲ LONG':'▼ SHORT';dB.className='crm-badge '+(isLong?'crm-bl':'crm-bsh');
  document.getElementById('crmEBQty').textContent=qty+' units';
  document.getElementById('crmEBLev').textContent='1:'+lev+' lev';
  document.getElementById('crmECur').textContent='$'+_fmtP(ep);
  document.getElementById('crmEInp').value=ep<5?ep.toFixed(5):ep.toFixed(2);
  document.getElementById('crmEMkt').textContent='$'+_fmtP(mkt);
  document.getElementById('crmELev').textContent='1:'+lev;

  var oldPnl=isLong?(mkt-ep)*qty:(ep-mkt)*qty;
  _colPnl(document.getElementById('crmEOld'),oldPnl);
  document.getElementById('crmENew').textContent='—';document.getElementById('crmENew').style.color='';
  document.getElementById('crmEDiff').textContent='Enter a new price to preview impact';
  document.getElementById('crmEDiff').className='crm-df crm-dn';
  document.getElementById('crmEntryBg').classList.add('open');
  setTimeout(function(){document.getElementById('crmEInp').select();},100);
}

function closeCrmEntryModal(){document.getElementById('crmEntryBg').classList.remove('open');_crmECtx=null;}

function _calcEntry(){
  if(!_crmECtx)return;
  var pos=_crmECtx.pos;
  var newEp=parseFloat(document.getElementById('crmEInp').value);
  var ep=pos.entryPrice||pos.entry||pos.avgPrice||pos.fillPrice||0;
  var sym=pos.label||pos.sym||pos.symbol||'';
  var mkt=(window.CRM_PRICE_MAP&&window.CRM_PRICE_MAP[sym])||ep;
  var isLong=(pos.side||'')!=='sell'&&(pos.side||'')!=='short';
  var qty=pos.qty||0;
  var oldPnl=isLong?(mkt-ep)*qty:(ep-mkt)*qty;
  _colPnl(document.getElementById('crmEOld'),oldPnl);
  var nEl=document.getElementById('crmENew');var dEl=document.getElementById('crmEDiff');
  if(isNaN(newEp)||newEp<=0){nEl.textContent='—';nEl.style.color='';dEl.textContent='Enter a valid price';dEl.className='crm-df crm-dn';return;}
  var newPnl=isLong?(mkt-newEp)*qty:(newEp-mkt)*qty;var diff=newPnl-oldPnl;
  _colPnl(nEl,newPnl);
  if(Math.abs(diff)<0.005){dEl.textContent='No change in P&L';dEl.className='crm-df crm-dn';}
  else if(diff>0){dEl.textContent='▲  P&L improves by  '+_fmtPnl(diff);dEl.className='crm-df crm-dg';}
  else{dEl.textContent='▼  P&L worsens by  '+_fmtPnl(Math.abs(diff));dEl.className='crm-df crm-dr';}
}

function _saveCrmEntry(){
  if(!_crmECtx)return;
  var newEp=parseFloat(document.getElementById('crmEInp').value);
  if(isNaN(newEp)||newEp<=0){alert('Enter a valid positive price.');return;}
  _crmECtx.onSave(newEp);closeCrmEntryModal();
}

/* ── LEVERAGE MODAL ── */
var _CLEV={
  forex:  {max:100,cat:'Forex pair',     syms:['EUR/USD','GBP/USD','USD/JPY','USD/CHF','AUD/USD','USD/CAD','NZD/USD','GBP/JPY','EUR/GBP','EUR/JPY','USD/MXN']},
  crypto: {max:10, cat:'Cryptocurrency', syms:['BTC','ETH','SOL','BNB','XRP','ADA','DOGE','AVAX','DOT','LINK','MATIC','LTC']},
  index:  {max:50, cat:'Index',          syms:['S&P 500','NDX','DJIA','VIX','DAX','FTSE','NIKKEI']},
  commod: {max:20, cat:'Commodity',      syms:['GOLD','SILVER','OIL','NAT GAS','PLAT','WHEAT','CORN']},
};
function _assetInfo(label){for(var c in _CLEV){if(_CLEV[c].syms.indexOf(label)>=0)return{max:_CLEV[c].max,cat:_CLEV[c].cat};}return{max:20,cat:'Stock'};}

function openCrmLevModal(uid,posId,pos,bal,onSave){
  _crmLCtx={uid:uid,posId:posId,pos:pos,bal:bal,onSave:onSave};
  var sym=pos.label||pos.sym||pos.symbol||posId;
  var info=_assetInfo(sym);var curLev=pos.leverage||20;
  var ep=pos.entryPrice||pos.entry||pos.avgPrice||0;
  var qty=pos.qty||0;var isLong=(pos.side||'')!=='sell'&&(pos.side||'')!=='short';
  var notional=ep*qty;

  document.getElementById('crmLBSym').textContent=sym;
  var dB=document.getElementById('crmLBDir');
  dB.textContent=isLong?'▲ LONG':'▼ SHORT';dB.className='crm-badge '+(isLong?'crm-bl':'crm-bsh');
  document.getElementById('crmLBQty').textContent=qty+' units';
  document.getElementById('crmLCur').textContent='1:'+curLev;
  document.getElementById('crmLCat').textContent=info.cat+' · max 1:'+info.max;
  document.getElementById('crmLSli').max=info.max;document.getElementById('crmLSli').min=1;document.getElementById('crmLSli').value=curLev;
  document.getElementById('crmLMax').textContent=info.max+'×';
  document.getElementById('crmLVal').textContent='1:'+curLev;
  document.getElementById('crmLNot').textContent='$'+notional.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('crmLBal').textContent='$'+(bal||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('crmLOM').textContent='$'+(pos.marginUsed||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('crmLNM').textContent='$'+((notional/curLev)||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('crmLDiff').textContent='Adjust slider to preview margin change';
  document.getElementById('crmLDiff').className='crm-df crm-dn';
  document.getElementById('crmLSave').disabled=false;document.getElementById('crmLSave').style.opacity='1';
  document.getElementById('crmLHint').textContent='';
  document.getElementById('crmLevBg').classList.add('open');
}

function closeCrmLevModal(){document.getElementById('crmLevBg').classList.remove('open');_crmLCtx=null;}

function _calcLev(){
  if(!_crmLCtx)return;
  var pos=_crmLCtx.pos;var bal=_crmLCtx.bal||0;
  var newLev=parseInt(document.getElementById('crmLSli').value)||1;
  document.getElementById('crmLVal').textContent='1:'+newLev;
  var ep=pos.entryPrice||pos.entry||pos.avgPrice||0;var qty=pos.qty||0;
  var notional=ep*qty;
  var oldM=pos.marginUsed||(notional/(pos.leverage||20));
  var newM=notional/newLev;var diff=newM-oldM;var balAfter=bal-diff;
  document.getElementById('crmLNM').textContent='$'+newM.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  var sv=document.getElementById('crmLSave');var dEl=document.getElementById('crmLDiff');var ht=document.getElementById('crmLHint');
  if(Math.abs(diff)<0.01){dEl.textContent='No change in margin';dEl.className='crm-df crm-dn';sv.disabled=false;sv.style.opacity='1';ht.textContent='';}
  else if(diff>0){
    if(balAfter<0){
      dEl.textContent='✗  Insufficient balance — needs an extra $'+Math.abs(balAfter).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
      dEl.className='crm-df crm-dr';sv.disabled=true;sv.style.opacity='1';
      ht.textContent='Client needs more free balance to increase leverage to 1:'+newLev+'.';
    }else{
      dEl.textContent='▲  Extra margin required: $'+diff.toFixed(2)+'  ·  Balance after: $'+balAfter.toFixed(2);
      dEl.className='crm-df crm-da';sv.disabled=false;sv.style.opacity='1';ht.textContent='';
    }
  }else{
    dEl.textContent='▼  Margin freed: $'+Math.abs(diff).toFixed(2)+'  ·  Balance after: $'+balAfter.toFixed(2);
    dEl.className='crm-df crm-dg';sv.disabled=false;sv.style.opacity='1';ht.textContent='';
  }
}

function _saveCrmLev(){
  if(!_crmLCtx)return;
  var newLev=parseInt(document.getElementById('crmLSli').value)||1;
  _crmLCtx.onSave(newLev);closeCrmLevModal();
}
