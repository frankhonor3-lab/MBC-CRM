/* ============================================================
   MBC CRM — Live Price Engine  (shared by all CRM role pages)
   • Crypto  — Binance WebSocket  (real-time ticks, no key)
   • Forex   — ExchangeRate-API   (60s REST poll, no key)
   • Stocks  — Yahoo Finance v7   (60s REST poll, no key)
   Falls back silently to baseline values on network failure.
   ============================================================ */

// Global price map — keyed by asset label (e.g. 'AAPL', 'BTC', 'EUR/USD')
window.CRM_PRICE_MAP = {
  // Crypto
  BTC:94200, ETH:3450, SOL:198, BNB:580, XRP:2.15,
  ADA:0.98, DOGE:0.38, AVAX:38, DOT:7.2, LINK:18.5,
  MATIC:0.52, LTC:98,
  // Forex
  'EUR/USD':1.0921,'GBP/USD':1.2850,'USD/JPY':154.20,'USD/CHF':0.8923,
  'AUD/USD':0.6450,'USD/CAD':1.3920,'NZD/USD':0.5890,
  'GBP/JPY':198.15,'EUR/GBP':0.8500,'EUR/JPY':168.40,'USD/MXN':17.15,
  // Stocks
  AAPL:342.56,NVDA:1050,MSFT:415.80,TSLA:345.20,AMZN:225.40,
  META:625.80,GOOGL:189.60,AMD:142.80,INTC:24.60,NFLX:920.40,
  PLTR:85.60,CRM:348.90,JPM:245.80,BAC:48.20,GS:625.40,
  V:315.60,MA:548.90,DIS:112.40,TSM:198.60,GME:28.40,
  // Indices
  'S&P 500':5920,NDX:20850,DJIA:44200,VIX:14.8,
  DAX:19850,FTSE:8420,NIKKEI:39200,
  // Commodities
  GOLD:2680,SILVER:31.4,OIL:71.2,'NAT GAS':2.85,
  PLAT:985,WHEAT:548,CORN:445,
};

// ── 1. CRYPTO — Binance WebSocket ────────────────────────────
var _CRM_BN_MAP = {
  btcusdt:'BTC',ethusdt:'ETH',solusdt:'SOL',bnbusdt:'BNB',
  xrpusdt:'XRP',adausdt:'ADA',dogeusdt:'DOGE',avaxusdt:'AVAX',
  dotusdt:'DOT',linkusdt:'LINK',maticusdt:'MATIC',ltcusdt:'LTC'
};
function _crmStartBinanceWS() {
  var streams = Object.keys(_CRM_BN_MAP).map(function(s){ return s+'@miniTicker'; }).join('/');
  var ws;
  try { ws = new WebSocket('wss://stream.binance.com:9443/stream?streams='+streams); }
  catch(e) { return; }
  ws.onmessage = function(ev) {
    try {
      var msg = JSON.parse(ev.data);
      var d = msg.data || msg;
      var label = _CRM_BN_MAP[(d.s||'').toLowerCase()];
      if (label) window.CRM_PRICE_MAP[label] = parseFloat(d.c);
    } catch(e) {}
  };
  ws.onerror = function(){};
  ws.onclose = function(){ setTimeout(_crmStartBinanceWS, 8000); };
}

// ── 2. FOREX — ExchangeRate-API (60s poll) ────────────────────
var _CRM_FX = [
  { l:'EUR/USD', fn:function(r){ return +(1/r.EUR).toFixed(5); } },
  { l:'GBP/USD', fn:function(r){ return +(1/r.GBP).toFixed(5); } },
  { l:'USD/JPY', fn:function(r){ return +r.JPY.toFixed(3); } },
  { l:'USD/CHF', fn:function(r){ return +r.CHF.toFixed(5); } },
  { l:'AUD/USD', fn:function(r){ return +(1/r.AUD).toFixed(5); } },
  { l:'USD/CAD', fn:function(r){ return +r.CAD.toFixed(5); } },
  { l:'NZD/USD', fn:function(r){ return +(1/r.NZD).toFixed(5); } },
  { l:'GBP/JPY', fn:function(r){ return +(r.JPY/r.GBP).toFixed(3); } },
  { l:'EUR/GBP', fn:function(r){ return +(r.GBP/r.EUR).toFixed(5); } },
  { l:'EUR/JPY', fn:function(r){ return +(r.JPY/r.EUR).toFixed(3); } },
  { l:'USD/MXN', fn:function(r){ return +r.MXN.toFixed(5); } },
];
function _crmFetchForex() {
  fetch('https://open.er-api.com/v6/latest/USD')
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data) {
      if (!data || !data.rates) return;
      _CRM_FX.forEach(function(item) {
        var p = item.fn(data.rates);
        if (p > 0) window.CRM_PRICE_MAP[item.l] = p;
      });
    }).catch(function(){});
}

// ── 3. STOCKS + INDICES + COMMODITIES — Yahoo Finance (60s poll)
var _CRM_YF_SYMS = [
  'AAPL','NVDA','MSFT','TSLA','AMZN','META','GOOGL','AMD','INTC','NFLX',
  'PLTR','CRM','JPM','BAC','GS','V','MA','DIS','TSM','GME',
  '%5EGSPC','%5ENDX','%5EDJI','%5EVIX','%5EGDAXI','%5EFTSE','%5EN225',
  'GC%3DF','SI%3DF','CL%3DF','NG%3DF','PL%3DF','ZW%3DF','ZC%3DF'
];
var _CRM_YF_LABEL = {
  'AAPL':'AAPL','NVDA':'NVDA','MSFT':'MSFT','TSLA':'TSLA','AMZN':'AMZN',
  'META':'META','GOOGL':'GOOGL','AMD':'AMD','INTC':'INTC','NFLX':'NFLX',
  'PLTR':'PLTR','CRM':'CRM','JPM':'JPM','BAC':'BAC','GS':'GS',
  'V':'V','MA':'MA','DIS':'DIS','TSM':'TSM','GME':'GME',
  '^GSPC':'S&P 500','^NDX':'NDX','^DJI':'DJIA','^VIX':'VIX',
  '^GDAXI':'DAX','^FTSE':'FTSE','^N225':'NIKKEI',
  'GC=F':'GOLD','SI=F':'SILVER','CL=F':'OIL','NG=F':'NAT GAS',
  'PL=F':'PLAT','ZW=F':'WHEAT','ZC=F':'CORN'
};
function _crmFetchStocks() {
  var syms = _CRM_YF_SYMS.join(',');
  var yfUrl = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + syms;
  var proxy = 'https://corsproxy.io/?' + encodeURIComponent(yfUrl);
  function parse(data) {
    var quotes = (data && data.quoteResponse && data.quoteResponse.result) || [];
    quotes.forEach(function(q) {
      var label = _CRM_YF_LABEL[q.symbol];
      if (label && q.regularMarketPrice > 0) window.CRM_PRICE_MAP[label] = q.regularMarketPrice;
    });
  }
  fetch(yfUrl, {cache:'no-store'})
    .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
    .then(parse)
    .catch(function(){
      fetch(proxy, {cache:'no-store'})
        .then(function(r){ return r.ok ? r.json() : null; })
        .then(function(d){ if(d) parse(d); })
        .catch(function(){});
    });
}

// ── Helper: format a price number based on magnitude ──────────
window.crmFmtPrice = function(p) {
  if (!p && p !== 0) return '—';
  if (p >= 1000)  return p.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  if (p >= 1)     return p.toFixed(2);
  if (p >= 0.001) return p.toFixed(4);
  return p.toFixed(6);
};

// ── Boot ──────────────────────────────────────────────────────
setTimeout(function() {
  _crmStartBinanceWS();
  _crmFetchForex();
  _crmFetchStocks();
  setInterval(_crmFetchForex,  60000);
  setInterval(_crmFetchStocks, 60000);
}, 600);
