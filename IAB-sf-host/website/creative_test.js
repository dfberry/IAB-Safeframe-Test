	
	// Shim a simple DOM shortcut, if needed
	if(window.$ === undefined){
		window.$ = function(id){
			if(id[0] == "#"){
				id = id.substring(1);
			}
			return document.getElementById(id);		
		}
	}
	
	/**
	* Encapsulation of page functionality
	*/
	var pageStuff = {
		/**
		* Input source mode - html or script
		*/
		sourceMode: 'html',
		
		/**
		* Load one of the pre-defined samples for rendering.
		*/
		loadSample: function(selCtl){
			var sampId = selCtl[selCtl.selectedIndex].value,
				contEl = $("htmlInput"),
				adWrap = $('topAdWrapper'),
				size, adType, bits, adFormat,
				el, elWd, elHt, code, content;
			
			if(sampId == ""){
				contEl.value = "";
				return;
			}
			
			el = $(sampId);
			size = el.getAttribute('adsize');
			adType = el.getAttribute('adtype');
			adFormat = el.getAttribute('adformat');
			if(adType){
				pageStuff.setInput(adType);
			}
			
			adFormat = adFormat || 'sidekick250';
			adWrap.className = adFormat;
			
			elWd = $("#width_input");
			elHt = $("height_input");
			bits = size.split('x');
			elWd.value = bits[0];
			elHt.value = bits[1];
			
			code = el && (el.text || el.innerHTML || el.innerText);
			if (code) {
				try {
					f = new Function("return " + code);
					content	= f();
					contEl.value = content;
				} catch (e) {
					content = f = null;
				}
				if (!content) {
					return;
				}
			}			
			pageStuff.renderInput();		
		},
		
		/**
		* Set the title and intro text for the dialog
		*/
		loadDialogTitleAndIntro: function(title, intro){
			$('dialogTitle').innerHTML = title;
			$('dialogIntro').innerHTML = intro;			
		},
		
		toggleControls: function(){
			var el = $('adcontrols');
			var css = el.className;
			
			if (css == 'row collapsable' || css.indexOf('expanded') > -1){
				el.className = 'row collapsable collapsed';
			}
			else{
				el.className = 'row collapsable expanded';
			}
		},
		
		/**
		* Display an overlay with the script commands to create this ad
		*/
		showSFScriptDialog: function(){
			var dlg = $("sfTagDialog"),
				dlgClass = "modal fade in visibleBlock wideModal",
				overlayClass =  "modal-backdrop fade in",
				contEl = $("htmlInput"),
				content, ht, wd,
				embedSrcElem = $("tagMarkupSample"),
				sfTag = [],
				adId = "myAdPlacement" + new Date().getMilliseconds(),
				overlay = $("dlgOverlay");
				
			pageStuff.loadDialogTitleAndIntro('Script-based SafeFrame Creation', 
				'This code shows how to programmatically initialize a SafeFrame by using script instead of a tag');
			
			ht = parseInt($('height_input').value);
			wd = parseInt($('width_input').value);
			
			if(isNaN(ht)){
				ht = "300";
			}
			if(isNaN(wd)){
				wd = "300";
			}
			
			sfTag.push("&lt;!-- ELEMENT MUST EXIST FOR SCRIPT-BASED RENDER --&gt;");
			sfTag.push("&lt;div id='adTargetElement'&gt;&lt;/div&gt;\n");
			sfTag.push("&lt;scri" + "pt type='text/javascript' >\n")
			sfTag.push("  var adPositionId = '" + adId + "',\n\t width = " + wd + ",\n\t height = " + ht + ";");
			
			sfTag.push("\n// Ad contents or bootstrap");
			if(pageStuff.sourceMode == 'script'){
				sfTag.push("  var src = \"" + contEl.value + "\";");
			}
			else{
				content = $sf.lib.lang.jssafe_html(contEl.value);
				content = content.replace(/</gi, "&lt;")
				content = content.replace(/>/gi, "&gt;");
				content = content.replace(/\n/gi, '\"\n + "');
				content = content.replace(/""/gi, '');
			
				sfTag.push("  var html = \"" + content + "\"");
			}
			sfTag.push('');
			sfTag.push("// Initialize the ad position");
			sfTag.push("var adConfig = {\n  id: adPositionId, \n  w: width,\n  h: height,\n  dest: 'adTargetElement'\n};");
			sfTag.push("adConfig.supports = { 'exp-push' : true };\n");
			sfTag.push("// Register the ad position config information");
			sfTag.push("var posConf = new $sf.host.PosConfig(adConfig);");
			sfTag.push("\n// Create the ad position.");
			var positionInfo = "var pos   = new $sf.host.Position(";
			if(pageStuff.sourceMode == 'script'){
				positionInfo += "{ id: adPositionId, src: src }"
			}
			else{
				positionInfo += "adPositionId, html"
			}
			positionInfo += ");"
			sfTag.push(positionInfo);
			sfTag.push("\n// Render the ad in a SafeFrame.");
			sfTag.push("$sf.host.render(pos);\n");
			
			sfTag.push("&lt;/scr" + "ipt&gt;");
			
			embedSrcElem.innerHTML = sfTag.join('\n');
			
			overlay.className = overlayClass;
			dlg.className = dlgClass;
		},
		
		/**
		* Display an overlay with the appropriate markup to embed this ad
		*/
		showEmbedDialog: function(){
			var dlg = $("sfTagDialog"),
				dlgClass = "modal fade in visibleBlock wideModal",
				overlayClass =  "modal-backdrop fade in",
				contEl = $("htmlInput"),
				content, ht, wd,
				embedSrcElem = $("tagMarkupSample"),
				sfTag,
				adId = "myAdPlacement" + new Date().getMilliseconds(),
				overlay = $("dlgOverlay");
			
			pageStuff.loadDialogTitleAndIntro('Embed Markup for Ad', 
				'This area shows SafeFrame tag markup to embed your ad in a page.  ' +
				'SafeFrame also supports programmatic creation and rotation of ads. ' +
				'View source on this page for more details.');
			
			sfTag = "&lt;scri" + "pt type='text/x-safeframe' class='sf_data' >\n"
			sfTag += "{\n\t \"id\" : \"" + adId + "\",\n";
			
			if(pageStuff.sourceMode == 'script'){
				sfTag += "\t \"src\" : \"" + contEl.value + "\",\n";
			}
			else{
				content = $sf.lib.lang.jssafe_html(contEl.value);
				content = content.replace(/</gi, "&lt;")
				content = content.replace(/>/gi, "&gt;");
				content = content.replace(/\n/gi, '\"\n + "');
				content = content.replace(/""/gi, '');
			
				sfTag += "\t \"html\" : \"" + content + "\",\n";
			}
			
			ht = parseInt($('height_input').value);
			wd = parseInt($('width_input').value);
			
			if(isNaN(ht)){
				ht = "300";
			}
			if(isNaN(wd)){
				wd = "300";
			}
			
			sfTag += "\t \"conf\" : {\n";
			sfTag += "\t\t \"size\" : \"" + wd + "x" + ht + "\",\n";
			sfTag += "\t\t \"dest\" : \"id_of_target_elem\",\n";
			sfTag += "\t\t \"supports\" : {\n";
			sfTag += "\t\t\t \"exp-push\" : \"1\"\n";
			sfTag += "\t\t \}\n";
			sfTag += "\t}\n}\n";
			sfTag += "&lt;/scr" + "ipt&gt;\n";
			
			embedSrcElem.innerHTML = sfTag;
			
			overlay.className = overlayClass;
			dlg.className = dlgClass;
		},
		
		/**
		* Hide the dialog
		*/
		hideDialog: function(){
			var dlg = $("sfTagDialog"),
				dlgClass = "modal hide fade in",
				overlayClass =  "modal-backdrop fade in hide",
				overlay = $("dlgOverlay");
			
			overlay.className = overlayClass;
			dlg.className = dlgClass;
		},
		
		/**
		* Changes the type of ad creative input between script source file
		* and raw ad HTML.
		*/
		setInput: function(type){
			var htmlBtn = $('sourceHtmlBtn'),
				scriptBtn = $('sourceScriptBtn'),
				inputEl = $('htmlInput'),
				onClass = 'btn btn-info',
				offClass = 'btn';
			
			pageStuff.sourceMode = type;
			if(type == 'html'){
				htmlBtn.className = onClass;
				scriptBtn.className = offClass;
				inputEl.innerHTML = '';
			}
			else{
				htmlBtn.className = offClass;
				scriptBtn.className = onClass;
				inputEl.innerHTML = '[enter script source url here]';
			}		
		},
		
		/**
		* Render the given HTML as a SafeFrame ad
		*/
		renderInput: function() {
			var el, val, w, h, html, posID, posConf, adObj, pos;

			$sf.host.nuke();

			el 	= $("htmlInput");
			val = (el && el.value) || "";
			val = $sf.lib.lang.trim(val);

			if (!val) {
				alert("No HTML specified");
				return;
			}

			html = val;

			el	= $("width_input");
			val = (el && el.value) || "";
			val = $sf.lib.lang.cnum(val,0);

			if (val <= 0) {
				alert("Width must be a valid number from 1 to 9999 pixels");
				return;
			}

			w = val;


			el	= $("height_input");
			val = (el && el.value) || "";
			val = $sf.lib.lang.cnum(val,0);

			if (val <= 0) {
				alert("Height must be a valid number from 1 to 9999 pixels");
				return;
			}

			h 	= val;


			posID	 = "test_" + w + "x" + h;
			// Initialize the configuration of the new location
			var configOptions = {id:posID,w:w,h:h,dest:"tgtLREC"};
			configOptions.supports = {
				'read-cookie': true,
				'write-cookie': true,
				'exp-push': true
			};
			
			posConf	 = new $sf.host.PosConfig(configOptions);
			adObj = {
				id: posID
			};
			if(pageStuff.sourceMode == 'script'){
				adObj.src = html.trim();
				if(adObj.src.indexOf("htt") != 0){
					alert("Script File mode requires a URL to a script.\n\nSwitch to HTML Input for direct ad markup.");
				}
			}
			else{
				adObj.html = html;
			}
			
			pos		 = new $sf.host.Position(adObj);

			$sf.host.render(pos);

		}
	}
	
	// ============= END PAGE FUNCTIONS ==================

		/**
		* Define the Config bootstrap to start SafeFrame.
		* This identifies the location of the rendering bootstrap file
		* and defines initial position placements.
		*/
		
		function initSafeFrameConfig() {
			var conf	= new $sf.host.Config({
				renderFile:		"../src/html/r.html",
				positions:
				{
					"LREC":
					{
						id:		"LREC",
						dest:	"tgtLREC",
						w:		250,
						h:		50
					}
				}
			});

			var posMeta		= new $sf.host.PosMeta(null,"rmx",{foo:"bar",bar:"foo"});
			var pos			= new $sf.host.Position("LREC", "<h3>[[Ad Placement Here]]</h3>", posMeta);

			$sf.host.render(pos);
		}
		
		initSafeFrameConfig();