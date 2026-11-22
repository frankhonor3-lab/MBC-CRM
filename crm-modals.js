/* ============================================================
   MBC CRM — Edit Entry Price + Edit Leverage Modals
   Shared by agent / ret-manager / admin / manager
   ============================================================ */

// ── INJECT HTML + CSS ────────────────────────────────────────
function _injectCrmModals() {
  var el = document.createElement('div');
  el.innerHTML = `
<style>
.crm-emodal-bg{display:none;position:fixed;inset:0;background:rgba(4,6,18,.85);backdrop-filter:blur(8px);z-index:3000;align-items:center;justify-content:center;padding:20px}
.crm-emodal-bg.open{display:flex}
.crm-emodal-card{background:linear-gradient(160deg,#161b30 0%,#0d1120 100%);border:1px solid rgba(255,255,255,.11);border-radius:20px;width:100%;max-width:468px;box-shadow:0 40px 100px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.07);overflow:hidden}
.crm-emodal-head{padding:24px 28px 18px;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(180deg,rgba(79,168,255,.06) 0%,transparent 100%)}
.crm-emodal-body{padding:22px 28px 4px}
.crm-emodal-foot{padding:14px 28px 24px;display:flex;gap:10px;justify-content:flex-end}
.crm-emodal-title{font-size:17px;font-weight:800;color:#e8ecf0;letter-spacing:-.3px}
.crm-emodal-sub{font-size:11px;color:rgba(232,236,240,.4);margin-top:5px;font-family:monospace;letter-spacing:.4px}
.crm-emodal-fl{font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:rgba(232,236,240,.32);margin-bottom:7px}
.crm-emodal-static{font-family:monospace;font-size:22px;font-weight:800;color:rgba(232,236,240,.5)}
.crm-emodal-inp{width:100%;padding:11px 14px;background:rgba(79,168,255,.08);border:1.5px solid rgba(79,168,255,.45);border-radius:10px;color:#e8ecf0;font-family:monospace;font-size:20px;font-weight:800;outline:none;box-sizing:border-box;transition:border-color .2s,box-shadow .2s}
.crm-emodal-inp:focus{border-color:#4fa8ff;box-shadow:0 0 0 3px rgba(79,168,255,.15)}
.crm-emodal-preview{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px;margin:16px 0}
.crm-emodal-plabel{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:rgba(232,236,240,.28);margin-bottom:12px}
.crm-emodal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.crm-emodal-gi label{font-size:11px;color:rgba(232,236,240,.38);display:block;margin-bottom:4px}
.crm-emodal-gi span{font-family:monospace;font-size:13px;font-weight:700;color:#e8ecf0}
.crm-emodal-diff{margin-top:12px;padding:10px 14px;border-radius:9px;font-size:12px;font-weight:700;text-align:center;transition:all .2s}
.crm-diff-neutral{background:rgba(255,255,255,.05);color:rgba(232,236,240,.4);border:1px solid rgba(255,255,255,.07)}
.crm-diff-pos{background:rgba(38,201,163,.1);color:#26c9a3;border:1px solid rgba(38,201,163,.22)}
.crm-diff-neg{background:rgba(239,83,80,.1);color:#ef5350;border:1px solid rgba(239,83,80,.22)}
.crm-diff-warn{background:rgba(245,184,67,.1);color:#f5b843;border:1px solid rgba(245,184,67,.22)}
.crm-ebtn-cancel{padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:rgba(232,236,240,.65);font-size:13px;font-weight:600;cursor:pointer;transition:background .15s}
.crm-ebtn-cancel:hover{background:rgba(255,255,255,.1)}
.crm-ebtn-save{padding:10px 26px;background:linear-gradient(135deg,#4fa8ff 0%,#2563eb 100%);border:none;border-radius:9px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 18px rgba(37,99,235,.35);transition:opacity .15s,box-shadow .15s}
.crm-ebtn-save:hover{opacity:.88;box-shadow:0 6px 24px rgba(37,99,235,.5)}
.crm-ebtn-save:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}
.crm-lev-slider{width:100%;height:6px;accent-color:#4fa8ff;cursor:pointer;margin:10px 0 4px}
.crm-lev-marks{display:flex;justify-content:space-between;font-size:10px;color:rgba(232,236,240,.3)}
.crm-close-x{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);color:rgba(232,236,240,.55);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:19px;line-height:28px;text-align:center;transition:background .15s;flex-shrink:0}
.crm-close-x:hover{background:rgba(255,255,255,.14);color:#e8ecf0}
</style>

<!-- ═══ EDIT ENTRY PRICE MODAL ═══ -->
<div id="crmEntryBg" class="crm-emodal-bg" onclick="if(event.target===this)closeCrmEntryModal()">
  <div class="crm-emodal-card" onclick="event.stopPropagation()">
    <div class="crm-emodal-head">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div>
          <div class="crm-emodal-title">Edit Entry Price</div>
          <div id="crmEntrySub" class="crm-emodal-sub"></div>
        </div>
        <button class="crm-close-x" onclick="closeCrmEntryModal()">×</button>
      </div>
    </div>
    <div class="crm-emodal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:0">
        <div>
          <div class="crm-emodal-fl">Current Entry</div>
          <div id="crmEntryCur" class="crm-emodal-static"></div>
        </div>
        <div>
          <div class="crm-emodal-fl">New Entry Price</div>
          <input id="crmEntryInp" class="crm-emodal-inp" type="number" step="0.00001" placeholder="0.00000" oninput="_calcEntryImpact()">
        </div>
      </div>
      <div class="crm-emodal-preview">
        <div class="crm-emodal-plabel">P &amp; L Preview</div>
        <div class="crm-emodal-grid">
          <div class="crm-emodal-gi"><label>Market Price</label><span id="crmEntryMkt">—</span></div>
          <div class="crm-emodal-gi"><label>Direction · Units</label><span id="crmEntryDirQ">—</span></div>
          <div class="crm-emodal-gi"><label>P&amp;L at current entry</label><span id="crmEntryOldPnl" style="color:rgba(232,236,240,.45)">—</span></div>
          <div class="crm-emodal-gi"><label>P&amp;L at new entry</label><span id="crmEntryNewPnl">—</span></div>
        </div>
        <div id="crmEntryDiff" class="crm-emodal-diff crm-diff-neutral">Enter a new price to preview impact</div>
      </div>
    </div>
    <div class="crm-emodal-foot">
      <button class="crm-ebtn-cancel" onclick="closeCrmEntryModal()">Cancel</button>
      <button class="crm-ebtn-save" onclick="_saveCrmEntry()">Save Entry Price</button>
    </div>
  </div>
</div>

<!-- ═══ EDIT LEVERAGE MODAL ═══ -->
<div id="crmLevBg" class="crm-emodal-bg" onclick="if(event.target===this)closeCrmLevModal()">
  <div class="crm-emodal-card" onclick="event.stopPropagation()">
    <div class="crm-emodal-head">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div>
          <div class="crm-emodal-title">Edit Leverage</div>
          <div id="crmLevSub" class="crm-emodal-sub"></div>
        </div>
        <button class="crm-close-x" onclick="closeCrmLevModal()">×</button>
      </div>
    </div>
    <div class="crm-emodal-body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:0">
        <div>
          <div class="crm-emodal-fl">Current Leverage</div>
          <div id="crmLevCur" class="crm-emodal-static"></div>
        </div>
        <div>
          <div class="crm-emodal-fl">New Leverage · <span id="crmLevVal" style="color:#4fa8ff;font-weight:800;font-size:14px"></span></div>
          <input id="crmLevSlider" class="crm-lev-slider" type="range" min="1" max="100" value="20" oninput="_calcLevImpact()">
          <div class="crm-lev-marks"><span>1×</span><span id="crmLevMaxLbl">100×</span></div>
        </div>
      </div>
      <div class="crm-emodal-preview">
        <div class="crm-emodal-plabel">Margin Impact</div>
        <div class="crm-emodal-grid">
          <div class="crm-emodal-gi"><label>Notional Value</label><span id="crmLevNotional">—</span></div>
          <div class="crm-emodal-gi"><label>Client Balance</label><span id="crmLevBal">—</span></div>
          <div class="crm-emodal-gi"><label>Old Margin</label><span id="crmLevOldM" style="color:rgba(232,236,240,.45)">—</span></div>
          <div class="crm-emodal-gi"><label>New Margin</label><span id="crmLevNewM">—</span></div>
        </div>
        <div id="crmLevDiff" class="crm-emodal-diff crm-diff-neutral">Adjust slider to preview margin change</div>
      </div>
    </div>
    <div class="crm-emodal-foot">
      <button class="crm-ebtn-cancel" onclick="closeCrmLevModal()">Cancel</button>
      <button id="crmLevSaveBtn" class="crm-ebtn-save" onclick="_saveCrmLev()">Save Leverage</button>
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

// ── SHARED STATE ─────────────────────────────────────────────
var _crmEntryCtx = null;
var _crmLevCtx   = null;

// ── ENTRY PRICE MODAL ────────────────────────────────────────
function openCrmEntryModal(uid, posId, pos, bal, onSave) {
  _crmEntryCtx = { uid:uid, posId:posId, pos:pos, bal:bal, onSave:onSave };
  var ep     = pos.entryPrice||pos.entry||pos.avgPrice||pos.fillPrice||0;
  var isLong = (pos.side||'')!=='sell'&&(pos.side||'')!=='short';
  var sym    = pos.label||pos.sym||pos.symbol||posId;
  var mkt    = (window.CRM_PRICE_MAP&&window.CRM_PRICE_MAP[sym])||ep;
  var epFmt  = ep<5 ? ep.toFixed(5) : ep.toFixed(2);
  var mktFmt = mkt<5 ? mkt.toFixed(5) : mkt.toFixed(2);
  var qty    = pos.qty||0;

  document.getElementById('crmEntrySub').textContent   = sym+'  ·  '+(isLong?'▲ LONG':'▼ SHORT')+'  ·  '+qty+' units';
  document.getElementById('crmEntryCur').textContent   = '$'+epFmt;
  document.getElementById('crmEntryInp').value         = epFmt;
  document.getElementById('crmEntryMkt').textContent   = '$'+mktFmt;
  document.getElementById('crmEntryDirQ').textContent  = (isLong?'Long':'Short')+' '+qty+'u';

  var oldPnl = isLong?(mkt-ep)*qty:(ep-mkt)*qty;
  var oldEl  = document.getElementById('crmEntryOldPnl');
  oldEl.textContent  = (oldPnl>=0?'+':'')+' $'+Math.abs(oldPnl).toFixed(2);
  oldEl.style.color  = oldPnl>=0?'#26c9a3':'#ef5350';
  document.getElementById('crmEntryNewPnl').textContent = '—';
  document.getElementById('crmEntryNewPnl').style.color = '';
  document.getElementById('crmEntryDiff').textContent   = 'Enter a new price to preview impact';
  document.getElementById('crmEntryDiff').className     = 'crm-emodal-diff crm-diff-neutral';

  document.getElementById('crmEntryBg').classList.add('open');
  setTimeout(function(){ document.getElementById('crmEntryInp').select(); }, 80);
}

function closeCrmEntryModal() {
  document.getElementById('crmEntryBg').classList.remove('open');
  _crmEntryCtx = null;
}

function _calcEntryImpact() {
  if (!_crmEntryCtx) return;
  var pos    = _crmEntryCtx.pos;
  var newEp  = parseFloat(document.getElementById('crmEntryInp').value);
  var ep     = pos.entryPrice||pos.entry||pos.avgPrice||pos.fillPrice||0;
  var sym    = pos.label||pos.sym||pos.symbol||'';
  var mkt    = (window.CRM_PRICE_MAP&&window.CRM_PRICE_MAP[sym])||ep;
  var isLong = (pos.side||'')!=='sell'&&(pos.side||'')!=='short';
  var qty    = pos.qty||0;

  var oldPnl = isLong?(mkt-ep)*qty:(ep-mkt)*qty;
  var oldEl  = document.getElementById('crmEntryOldPnl');
  oldEl.textContent = (oldPnl>=0?'+':'')+' $'+Math.abs(oldPnl).toFixed(2);
  oldEl.style.color = oldPnl>=0?'#26c9a3':'#ef5350';

  if (isNaN(newEp)||newEp<=0) {
    document.getElementById('crmEntryNewPnl').textContent = '—';
    document.getElementById('crmEntryNewPnl').style.color = '';
    document.getElementById('crmEntryDiff').textContent = 'Enter a valid price';
    document.getElementById('crmEntryDiff').className   = 'crm-emodal-diff crm-diff-neutral';
    return;
  }

  var newPnl = isLong?(mkt-newEp)*qty:(newEp-mkt)*qty;
  var diff   = newPnl - oldPnl;

  var newEl = document.getElementById('crmEntryNewPnl');
  newEl.textContent = (newPnl>=0?'+':'')+' $'+Math.abs(newPnl).toFixed(2);
  newEl.style.color = newPnl>=0?'#26c9a3':'#ef5350';

  var diffEl = document.getElementById('crmEntryDiff');
  if (Math.abs(diff)<0.005) {
    diffEl.textContent = 'No change in P&L';
    diffEl.className   = 'crm-emodal-diff crm-diff-neutral';
  } else if (diff>0) {
    diffEl.textContent = '▲  P&L improves by  $'+diff.toFixed(2);
    diffEl.className   = 'crm-emodal-diff crm-diff-pos';
  } else {
    diffEl.textContent = '▼  P&L worsens by  $'+Math.abs(diff).toFixed(2);
    diffEl.className   = 'crm-emodal-diff crm-diff-neg';
  }
}

function _saveCrmEntry() {
  if (!_crmEntryCtx) return;
  var newEp = parseFloat(document.getElementById('crmEntryInp').value);
  if (isNaN(newEp)||newEp<=0) { alert('Enter a valid positive price.'); return; }
  _crmEntryCtx.onSave(newEp);
  closeCrmEntryModal();
}

// ── LEVERAGE MODAL ────────────────────────────────────────────
var _CRM_LEV_CATS = {
  forex:   { max:100, labels:['EUR/USD','GBP/USD','USD/JPY','USD/CHF','AUD/USD','USD/CAD','NZD/USD','GBP/JPY','EUR/GBP','EUR/JPY','USD/MXN'] },
  crypto:  { max:10,  labels:['BTC','ETH','SOL','BNB','XRP','ADA','DOGE','AVAX','DOT','LINK','MATIC','LTC'] },
  indices: { max:50,  labels:['S&P 500','NDX','DJIA','VIX','DAX','FTSE','NIKKEI'] },
  commodities:{ max:20, labels:['GOLD','SILVER','OIL','NAT GAS','PLAT','WHEAT','CORN'] },
};
function _crmGetMaxLev(label) {
  for (var cat in _CRM_LEV_CATS) {
    if (_CRM_LEV_CATS[cat].labels.indexOf(label) >= 0) return _CRM_LEV_CATS[cat].max;
  }
  return 20; // stocks default
}

function openCrmLevModal(uid, posId, pos, bal, onSave) {
  _crmLevCtx = { uid:uid, posId:posId, pos:pos, bal:bal, onSave:onSave };
  var sym    = pos.label||pos.sym||pos.symbol||posId;
  var maxLev = _crmGetMaxLev(sym);
  var curLev = pos.leverage||20;
  var ep     = pos.entryPrice||pos.entry||pos.avgPrice||0;
  var qty    = pos.qty||0;
  var isLong = (pos.side||'')!=='sell'&&(pos.side||'')!=='short';

  document.getElementById('crmLevSub').textContent        = sym+'  ·  '+(isLong?'▲ LONG':'▼ SHORT')+'  ·  '+qty+' units';
  document.getElementById('crmLevCur').textContent        = '1:'+curLev;
  document.getElementById('crmLevSlider').max             = maxLev;
  document.getElementById('crmLevSlider').min             = 1;
  document.getElementById('crmLevSlider').value           = curLev;
  document.getElementById('crmLevMaxLbl').textContent     = maxLev+'×';
  document.getElementById('crmLevVal').textContent        = '1:'+curLev;
  document.getElementById('crmLevNotional').textContent   = '$'+(ep*qty).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('crmLevBal').textContent        = '$'+(bal||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('crmLevOldM').textContent       = '$'+(pos.marginUsed||0).toFixed(2);
  document.getElementById('crmLevNewM').textContent       = '$'+((ep*qty)/curLev).toFixed(2);
  document.getElementById('crmLevDiff').textContent       = 'Adjust slider to preview margin change';
  document.getElementById('crmLevDiff').className         = 'crm-emodal-diff crm-diff-neutral';
  document.getElementById('crmLevSaveBtn').disabled       = false;
  document.getElementById('crmLevSaveBtn').style.opacity  = '1';

  document.getElementById('crmLevBg').classList.add('open');
}

function closeCrmLevModal() {
  document.getElementById('crmLevBg').classList.remove('open');
  _crmLevCtx = null;
}

function _calcLevImpact() {
  if (!_crmLevCtx) return;
  var pos      = _crmLevCtx.pos;
  var bal      = _crmLevCtx.bal||0;
  var newLev   = parseInt(document.getElementById('crmLevSlider').value)||1;
  document.getElementById('crmLevVal').textContent = '1:'+newLev;

  var ep        = pos.entryPrice||pos.entry||pos.avgPrice||0;
  var qty       = pos.qty||0;
  var oldMargin = pos.marginUsed||(ep*qty)/(pos.leverage||20);
  var newMargin = (ep*qty)/newLev;
  var diff      = newMargin - oldMargin;
  var balAfter  = bal - diff;

  document.getElementById('crmLevNewM').textContent = '$'+newMargin.toFixed(2);

  var saveBtn = document.getElementById('crmLevSaveBtn');
  var diffEl  = document.getElementById('crmLevDiff');
  if (Math.abs(diff)<0.01) {
    diffEl.textContent = 'No change in margin';
    diffEl.className   = 'crm-emodal-diff crm-diff-neutral';
    saveBtn.disabled   = false; saveBtn.style.opacity='1';
  } else if (diff>0) {
    if (balAfter<0) {
      diffEl.textContent = '✗  Insufficient balance — needs $'+diff.toFixed(2)+' more';
      diffEl.className   = 'crm-emodal-diff crm-diff-neg';
      saveBtn.disabled   = true; saveBtn.style.opacity='.35';
    } else {
      diffEl.textContent = '▲  Extra margin: $'+diff.toFixed(2)+'  ·  Balance after: $'+balAfter.toFixed(2);
      diffEl.className   = 'crm-emodal-diff crm-diff-warn';
      saveBtn.disabled   = false; saveBtn.style.opacity='1';
    }
  } else {
    diffEl.textContent = '▼  Margin freed: $'+Math.abs(diff).toFixed(2)+'  ·  Balance after: $'+balAfter.toFixed(2);
    diffEl.className   = 'crm-emodal-diff crm-diff-pos';
    saveBtn.disabled   = false; saveBtn.style.opacity='1';
  }
}

function _saveCrmLev() {
  if (!_crmLevCtx) return;
  var newLev = parseInt(document.getElementById('crmLevSlider').value)||1;
  _crmLevCtx.onSave(newLev);
  closeCrmLevModal();
}
