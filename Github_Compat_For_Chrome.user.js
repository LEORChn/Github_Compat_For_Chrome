// ==UserScript==
// @name         Github Compat For Chrome
// @name:zh-CN   Github兼容性优化，Chrome版
// @namespace    https://greasyfork.org/users/159546
// @version      1.0.2
// @description  Fix Github problem while using Chrome if needed.
// @description:zh-CN 优化Github在Chrome浏览器上的使用体验和兼容性，如果需要这么做。
// @author       LEORChn
// @include      *://github.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
/* Loading order of compat js: (same order can be load by async)
    1 - assets/compat-(*).js
    1 - assets/frameworks-(*).js
    2 - assets/github-(*).js
   Be affected method:
    1 - jsCompat()
    2 - load()
   Use this User-Agent to update js compat packs' link in the HTML page:
    Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
*/
var inited=false;
(function() {
    recheck();
})();
function recheck(){
    init();
    if(load())return;
    setTimeout(recheck,100);
}
function init(){ // call once when start loading page
    if(inited) return;
    if(ft('body').length==0) return; // jsRemove();
    jsCompat();
    rmViews();
    inited=true;
}
function rmViews(){
    var d;
    d=fc('signup-prompt-bg')[0];
    if(d)d.remove();
    d=fc('unsupported-browser')[0];
    if(d)d.remove();
}
/*function jsRemove(){ // remove assets/unsupported-(*).js if needed
    var spt=ft('script');
    for(var i=0,len=spt.length;i<len;i++) if(spt[i].src.includes('unsupported')) spt[i].remove();
}*/
function jsCompat(){
    addjs('https://assets-cdn.github.com/assets/compat-a48960bafc17c30572990bbab3664e9c.js');
    addjs('https://assets-cdn.github.com/assets/frameworks-e862d0f5d5e4edb5939aab5784639150.js');
}
function load(){ // call once when loaded page
    if(document.readyState.toLowerCase()=='complete'){
        addjs('https://assets-cdn.github.com/assets/github-b1fc511319f2baac01d4c600b5a9b6f1.js');
        return true;
    }
}
function addjs(url){
    var d=ct('script');
    d.type='application/javascript';
    d.src=url;
    ft('body')[0].appendChild(d);
}
//----- my ezjs lib
function fv(id){return document.getElementById(id);}
function ft(tag){return document.getElementsByTagName(tag);}
function fc(cname){return document.getElementsByClassName(cname);}
function ct(tag){return document.createElement(tag);}
function msgbox(msg){alert(msg);}
function inputbox(title,defalt){return prompt(title,defalt);}
function pl(s){console.log(s);}
