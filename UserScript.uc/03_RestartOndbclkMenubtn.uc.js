// ==UserScript==
// @name           Restart on double click PanelUI-menu-button
// @namespace      hogehoge
// @charset        UTF-8
// @description    PanelUI-menu-button をダブルクリックで firefox 再起動
// @include        main
// @compatibility  Firefox 45
// @author         Kazu.Soap
// @version        2016.4.25
// ==/UserScript==
(function() {
  // メニューボタン(≡)ダブルクリックで再起動
  // restartApp find here: omni.ja > modules/UrlbarProviderInterventions.sys.mjs
  document.getElementById("PanelUI-menu-button").ondblclick = function restartApp() {
    // Notify all windows that an application quit has been requested.
    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(
      Ci.nsISupportsPRBool
    );
    Services.obs.notifyObservers(
      cancelQuit,
      "quit-application-requested",
      "restart"
    );
    // Something aborted the quit process.
    if (cancelQuit.data) {
      return;
    }
    // If already in safe mode restart in safe mode.
    if (Services.appinfo.inSafeMode) {
      Services.startup.restartInSafeMode(Ci.nsIAppStartup.eAttemptQuit);
    } else {
      Services.startup.quit(
        Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart
      );
    }
  }
})();
