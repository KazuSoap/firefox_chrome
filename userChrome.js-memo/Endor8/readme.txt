/* Firefox57以降でuserChrome.js用スクリプトを利用する方法 */
< その2 >

(参考)
http://wiki.nothing.sh/page/userChrome.js%CD%D1%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8
https://github.com/Endor8/userChrome.js/tree/master/userChrome

(1) config.js
以下に格納
(firefox installed dir)/config.js

(2) userChromeJS.js
以下に格納
(firefox installed dir)/userChromeJS.js

(3) config-prefs.js
以下に格納
(firefox installed dir)/defaults/pref/config-prefs.js

(3) userChrome.js
以下に格納
(firefox profile dir)/chrome/userChrome.js

(4) userChrome.js用スクリプト
以下に格納
(firefox profile dir)/chrome/*.uc.js
