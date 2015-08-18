// ==UserScript==
// @name           dblclick Tab Pinned
// @namespace      http://oflow.me/
// @description    タブのダブルクリックでピン留め/ピンを外す
// @compatibility  Firefox 17
// @author         oflow
// @version        1.0.20110525 Firefox 4.0 で動作確認
// ==/UserScript==

gBrowser.mTabContainer.addEventListener('dblclick', function(e) {
    var tab = e.target;
    if (e.button != 0 || tab.localName != 'tab') return;
    if (tab.pinned) {
        gBrowser.unpinTab(tab);
    } else {
        gBrowser.pinTab(tab);
    }
    e.stopPropagation();
}, false);
