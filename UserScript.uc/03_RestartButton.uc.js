// ==UserScript==
// @name           RestartButton
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @charset        UTF-8
// @description    ツールバーに"再起動ボタン"を追加する
// @include        main
// @compatibility  Firefox 45
// @author         Kazu.Soap
// @version        2016.4.25
// ==/UserScript==
(function()
{
    // create 'Restart' toolbarbutton
    var toolbarbutton = document.createElement("toolbarbutton");
    toolbarbutton.setAttribute("id", "restartbuttonButton");
    toolbarbutton.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
    toolbarbutton.setAttribute("label", "Restart")
    toolbarbutton.setAttribute("tooltiptext", "Restart")
    toolbarbutton.setAttribute("image", "data:image/png;base64,R0lGODlhEgASAOfcAENlKkRmLEVtKkZtKkhtLUpuL0x2LU54L095LlB8L1J/MFSCMVqHOluIOlqLNV+JQFuNNl2PN1+PO1+PPF6QN16RN16SOGeOS2CSPGGSPGCTOGCUOWSWPWSWPmSXPWaZP2aaP2eaP2ebP2icP2idP2idQWmdQGucSGmeQGifPmifP2ifQGmfP2mfQGmfQWqfQGqfQWigPWigPmmgQWqgQWqgQmmhPmmhP2qhP2qhQWqhQmuhQWqiQWqiQmuiQGuiQWuiQmuiQ22iRG2iRWujQmujQ2yjQmyjQ2yjRGukRGykRG2kQm2kQ2+jSG2lQ22lRG6lQ3CkSW+lRm6mRHGlSnCmSG+nRG+nRXCnR3GnR3OmTG+oRG+oRXKnS26pQ3OnS3GoSHWmUXWnT3WnUXCqRnWoTnGqSHGqSXWpTXGrRnGrR3GsRneqUHeqUXOtSHqrVHetUHOvSYilcHitUHmtUnqtUnutVYuodHiyTnqzUHqzUX2yVoSxYn23U4G4WIK5WYu1a4q2aYy2bI22bYe8X4m9Yoq+Y468bZK7c5S8do/Aao7BZpa9eJe9eqC5i6G6jJe/eJnAfJvBfprIeKHFhprJeJ3Je6PGiaTGi6bGjKXHjKjIkKnJkarJk6jOiq3Mlq/Mma/NmarRjLHOmrLOm67Rk67TkLTQn7bSobXUnLTVmbbVnbXWmrzUqr3UqrzVqb3Vq73WqsDXr8LZscvfvczfvs7hwdHixNPjx9roz9zp093p1N3q1OHs2eLt2uPu3OXv3ujw4ejx4+nx4+ry5evy5evz5u706e706u/16u/16/D17PH27vL37vL37/P37/P38PP48PT48fX58vX58/f69fj79/n7+Pv8+vz9+/39/P7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAP8ALAAAAAASABIAAAj+AP8JHGjJkipWqywNXDiwVEFDf/wUmlSQoUBLivKs8bLnkJo1eAgtYthHT5otdSCh+kUJjBUybuIM5EKGC5ZIuZxd29ZsVJYpV7gUEfhkChNJzLgp5YbtFZolUJwA+ZcBiRE7sZZpG1bLWKguRI4sYQIkgwYgNzA9K8YrUBlEUngAAUIkCA0KG3bEOMUtGykjP3z8qNLmzZccMCpYgCHjU7FjnAD/MHLJFzBNKVBEgIAiRSZp22yxwWGDza1ouhqpIOEgwwgWgoRRq0YrEaNZ1Yzh4rNCRIZ/Hl4I6QRNW7Vh05JBI7aphgkOAieIaCHGVS9rwZAp2wUqSosQEgY4cigxowmgVrBkgRo0xEWJDgxB6CjCAwkVLT14HKnxwSJVJWbAQQcdc5yRBAb+zXTCGGGcwIVFAQEAOw==");

    toolbarbutton.addEventListener("command", restartApp, false);

    // insert 'RestartButton' toolbarbutton after 'TabsToolbar' > 'tabs-closebutton'
    document.getElementById("TabsToolbar").insertBefore(
	toolbarbutton, document.getElementById("TabsToolbar").lastChild.nextSibling
    );

    //restartApp find here:
    //  - chrome://mozapps/content/extensions/extensions.js
    function restartApp(clearCache) {
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
