/* Firefox57以降でuserChrome.js用スクリプトを利用する方法 */
< その1 >

(参考)
http://wiki.nothing.sh/page/userChrome.js%CD%D1%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8
https://gist.github.com/esperecyan/5b9f957abf64749cc9529e130b655d64

(1) autoconfig.js
以下に格納
(firefox installed dir)/defaults/pref/autoconfig.js

(2) autoconfig.cfg
以下に格納
(firefox installed dir)/autoconfig.cfg

(3) userChrome.js
以下に格納
(firefox profile dir)/chrome/userChrome.js

(4) userChrome.js用スクリプト
以下に格納
(firefox profile dir)/chrome/UserScript.uc/*.uc.js
(firefox profile dir)/chrome/UserXul.xul/*uc.xul
