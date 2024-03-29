// ==UserScript==
// @name           FloatingScrollbar.uc.js
// @namespace      nightson1988@gmail.com
// @include        main
// @version        0.0.3
// @note           Thanks to Griever(https://github.com/Griever/userChromeJS/blob/master/SmartScrollbar.uc.js) and Paul Rouget(https://gist.github.com/4003205)
// @note           0.0.3 Fixed a problem of breaking hbox layout
// @note           0.0.2 Remove usage of E4X (https://bugzilla.mozilla.org/show_bug.cgi?id=788293)
// ==/UserScript==

(function () {
    var prefs = Services.prefs,
        enabled;
    if (prefs.prefHasUserValue('userChromeJS.floating_scrollbar.enabled')) {
        enabled = prefs.getBoolPref('userChromeJS.floating_scrollbar.enabled');
    } else {
        prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', true);
        enabled = true;
    }

    var css = '\
    :not(select):not(hbox) > scrollbar {\
        -moz-appearance: none!important;\
        position: relative;\
        background-color: transparent;\
        background-image: none;\
        z-index: 2147483647;\
        padding: 2px;\
    }\
    :not(select):not(hbox) > scrollbar[orient = "vertical"] {\
        -moz-margin-start: -10px;\
        min-width: 10px;\
    }\
    :not(select):not(hbox) > scrollbar[orient = "vertical"] thumb {\
        min-height: 20px;\
    }\
   :not(select):not(hbox) > scrollbar[orient = "horizontal"] {\
        margin-top: -10px;\
        min-height: 10px;\
    }\
    :not(select):not(hbox) > scrollbar[orient = "horizontal"] thumb {\
        min-width: 20px;\
    }\
    :not(select):not(hbox) > scrollbar thumb {\
        -moz-appearance: none!important;\
        border-width: 0px!important;\
        border-radius: 3px!important;\
        background-color: rgba(0, 0, 0, 0.2)!important;\
        transition: background-color .3s ease-in-out;\
    }\
    :not(select):not(hbox) > scrollbar thumb:active,\
    :not(select):not(hbox) > scrollbar thumb:hover {\
        background-color: #9B9B9B!important;\
    }\
    :not(select):not(hbox) > scrollbar scrollbarbutton, :not(select):not(hbox) > scrollbar gripper {\
        display: none;\
    }';

    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));

    var m = document.createXULElement('menuitem');
    m.setAttribute("id", "floating_scrollbar_menuitem");
    m.setAttribute("label", "Use Floating Scrollbar");
    m.setAttribute("type", "checkbox");
    m.setAttribute("autocheck", "false");
    m.setAttribute("checked", enabled);
    m.addEventListener("command", command, false);
    var p = document.getElementById('menu_preferences');
    p.parentNode.insertBefore(m, p);

    if (enabled) {
        sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    }

    function command() {
        if (sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
            prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', false);
            sss.unregisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', false);
        } else {
            prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', true);
            sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', true);
        }

        let root = document.documentElement;
        let display = root.style.display;
        root.style.display = 'none';
        window.getComputedStyle(root).display; // Flush
        root.style.display = display;
    }

})();
