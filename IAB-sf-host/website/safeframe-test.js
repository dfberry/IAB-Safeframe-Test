// ip should alwasy be 127.21.0.3 as long as ads server is second in docker-compose list
// but is also available via "ads:8020" because of name in docker-compose.yml file"
function getAdServerAddress(){
    var adServerAddress="http://ads.localhost:8020";
    console.log("adServerAddress " + adServerAddress);
    return adServerAddress;
}

function safeframelog(msg){
    console.log("safeframe-test.js safeframelog " + msg);
}
function titleModified() {
    console.log("safeframe-test.js Title modifed");
}

window.onload = function() {
    console.log("safeframe-test.js register listener for window title change");
    var titleEl = document.getElementsByTagName("title")[0];
    var docEl = document.documentElement;
    console.log("safeframe-test.js register listener - title = " + titleEl.val );

    if (docEl && docEl.addEventListener) {
        console.log("safeframe-test.js register listener - docEl && docEl.addEventListener");
        docEl.addEventListener("DOMSubtreeModified", function(evt) {
            var t = evt.target;
            if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
                titleModified();
            }
        }, false);
    } else {
        console.log("safeframe-test.js register listener - (NOT) docEl && docEl.addEventListener");
        document.onpropertychange = function() {
            console.log("safeframe-test.js register listener - (NOT) " + window.event.propertyName);
            if (window.event.propertyName == "title") {
                var newTitle = document.getElementsByTagName("title")[0];
                console.log('safeframe-test.js - new title ' + newTitle);
                titleModified();
            }
        };
    }
};