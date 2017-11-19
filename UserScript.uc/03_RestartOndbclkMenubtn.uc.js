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
(function()
 {
     // メニューボタン(≡)ダブルクリックで再起動
     // restartApp find here: chrome://mozapps/content/extensions/extensions.js
     document.getElementById("PanelUI-menu-button").ondblclick = function restartApp(clearCache) {
         let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].
             createInstance(Ci.nsISupportsPRBool);
         Services.obs.notifyObservers(cancelQuit, "quit-application-requested",
                                      "restart");
         if (cancelQuit.data)
             return; // somebody canceled our quit request

         let appStartup = Cc["@mozilla.org/toolkit/app-startup;1"].
             getService(Ci.nsIAppStartup);
         appStartup.quit(Ci.nsIAppStartup.eAttemptQuit |  Ci.nsIAppStartup.eRestart);
     }
 })();
