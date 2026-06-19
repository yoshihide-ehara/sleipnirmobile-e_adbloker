// ==UserScript==
// @name            e_adblocker
// @name:ja         広告ブロッカー
// @author          ye
// @description     Block ads by site-specific rules.
// @description:ja  サイト毎のルールで広告をブロックします。
// @include         http://*/*
// @include         https://*/*
// @version         0.1.0
// ==/UserScript==

// ============================================================
// ルール定義
// ============================================================
var rules = [

    // --- Yahoo Japan ---
    {
        domain: 'yahoo.co.jp',
        selectors: [
            '.ads',
            '#ad-container',
            '.yjad_premium'
        ]
    },

    // --- 共通（全サイト） ---
    {
        domain: null,   // nullで全サイト対象
        selectors: [
            'ins.adsbygoogle',
            '[id*="google_ads"]',
            'iframe[src*="googlesyndication"]',
            'iframe[src*="doubleclick.net"]'
        ]
    }

];

// ============================================================
// 適用処理（ここより下は基本的に編集不要）
// ============================================================
var host = location.hostname;
var CSS_RULE =
    '{ ' +
    '  width: 1px !important; ' +
    '  height: 1px !important; ' +
    '  min-width: 0 !important; ' +
    '  min-height: 0 !important; ' +
    '  max-width: 1px !important; ' +
    '  max-height: 1px !important; ' +
    '  overflow: hidden !important; ' +
    '  opacity: 0 !important; ' +
    '  pointer-events: none !important; ' +
    '  position: absolute !important; ' +
    '  clip: rect(0, 0, 0, 0) !important; ' +
    '  margin: 0 !important; ' +
    '  padding: 0 !important; ' +
    '}';

for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];

    // domain が null なら全サイト、そうでなければドメイン一致チェック
    if (rule.domain === null || host.indexOf(rule.domain) !== -1) {
        SLEX_addStyle(rule.selectors.join(',') + CSS_RULE);
    }
}
