
  var html = "<!-- \nTHIS IS EMBEDDED AS scripted content .\nSource here is provided as a mechanism to make the ad more readable.\nActual source is translated into Javascript string and placed in \"billboardAdBootstrap.js\" file.\n-->\n<style>\n#showAdButton{\n cursor: pointer;\n text-decoration: underline;\n text-align: right;\n width:970px;\n color: #888;\n font-weight:bold;\n font-size:0.8em;\n font-family: Verdana;\n}\n\n#collapsedAd{\n display: none;\n}\n</style>\n\n<scr"+"ipt>\nfunction preCollapse(){\n collapseAd();\n}\n</scr"+"ipt>\n\n<div id=\"collapsedAd\">\n<div id=\"showAdButton\" onclick=\"expandAd()\">Show ad <img src=\"http://ads.localhost:8020/ads/downarrow.png\" /></div>\n</div>\n\n<div id=\"expandedAd\">\n<a href=\"javascript:collapseAd();\" onclick=\"collapseAd();return false;\"><img src=\"http://ads.localhost:8020/ads/backupImage.png\"\n id=\"adImage\"\n style=\"width:970px;height:250px;border:0;\" /></a>\n</div>\n\n<scr"+"ipt src=\"http://ads.localhost:8020/ads/adScriptBehavior.js\"></scr"+"ipt>\n"
  

document.write(html);
