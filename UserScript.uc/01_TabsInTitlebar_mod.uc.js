// ==UserScript==
// @name           TabsInTitlebar_mod.uc.js
// @description    標準の TabsInTitlebar を改変して常に利用する
// @namespace      http://d.hatena.ne.jp/Griever/
// @author         Griever
// @include        main
// @compatibility  Firefox 4
// @version        0.0.2
// @note           Remove E4X
// ==/UserScript==
// @SS http://f.hatena.ne.jp/Griever/20110408002650

(function(css){
    TabsInTitlebar._update = function () {
	//TabsInTitlebar or fullScreen が有効か確認
	if (!this._initialized || window.fullScreen){
	    return;
	}

	let allowed = Services.prefs.getBoolPref(this._prefName);
	let docElement = document.documentElement;

	//関数$(id)の定義
	function $(id) document.getElementById(id);

	let titlebar = $("titlebar");

	if (allowed) {
	    let captionButtonsBox = $("titlebar-buttonbox");
	    let tabsToolbar = $("TabsToolbar");
	    let titlebarHeight = titlebar.boxObject.height;
	    let tabsHeight = tabsToolbar.boxObject.height;
	    let marginBottom = titlebarHeight - 0;

	    titlebar.style.marginBottom = - marginBottom + "px";
	    docElement.setAttribute("tabsintitlebar", "true");

	    if (!this._draghandle) {
		let tmp = {};
		Components.utils.import("resource://gre/modules/WindowDraggingUtils.jsm", tmp);
		this._draghandle = new tmp.WindowDraggingElement(tabsToolbar, window);
		this._draghandle.mouseDownCheck = function () {
		    return !this._dragBindingAlive && this.ownerDocument.documentElement.getAttribute("tabsintitlebar") == "true";
		};
	    }
	} else {
	    titlebar.style.marginBottom = "";
	    docElement.removeAttribute("tabsintitlebar");
	}
    }

    addStyle(css)

    //document.documentElement.setAttribute('chromemargin', '0,0,0,0');

    //	setTimeout(function(){ TabsInTitlebar._update(); }, 0);
    TabsInTitlebar._update();

    function addStyle(css) {
	var pi = document.createProcessingInstruction(
	    'xml-stylesheet',
	    'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
	);
	return document.insertBefore(pi, document.documentElement);
    }

})('\
@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
#main-window[tabsintitlebar] #TabsToolbar {\
  margin:0 !important;\
  -moz-box-ordinal-group: 1 !important;\
}\
#main-window[tabsintitlebar] #toolbar-menubar > .titlebar-placeholder {\
  display: none;\
}\
#main-window[title="Firefox - タブグループ"] #titlebar-buttonbox-container {\
  visibility: hidden !important;\
}\
/*-- Hide Caption 用設定 --*/\
#main-window[sizemode="normal"] #tab-view-deck {\
    margin-top:0px !important;\
}\
#main-window[sizemode="maximized"] #tab-view-deck {\
    margin-top:8px !important;\
}\
');
