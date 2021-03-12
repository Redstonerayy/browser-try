/* ==========================================================================
                              FUNCTIONS
========================================================================== */

function createWebview(id, url) {
	webview = document.createElement("webview");
	webview.setAttribute("id", id);
	webview.setAttribute("src", url);
	return webview;
}

/* ==========================================================================
                              CLASSES
========================================================================== */

class WindowTabGroups{
	constructor(){
		this.tabgroups = {};
		this.numberoftabs = 0;
		this.resuseids = [];
	}

	newtabgroup(name){
		this.tabgroups[name] = new TabGroup(["https://github.com"]);
	}

	getnewtabid(){
		if(this.resuseids.length == 0){
			return this.numberoftabs.length;
		} else {
			return this.resuseids.splice(-1, 1, 0);
		}
	}

	addresuseid(id){
		this.resuseids.push(id);
	}
}

class TabGroup{
	constructor(urls){
		this.tabs = [];
		this.numberoftabs = 0;
		this.tabids = [];

		urls.forEach((item, i) => {
			let tabid = windowtabgroups.getnewtabid();

			this.tabs.push(new Tab({
					"createevent": "init",
					"tabnumber": this.numberoftabs.length,
					"id": tabid},
				item));

			this.tabids.push(tabid);
			this.numberoftabs += 1;
		});
	}
}


class Tab {
	constructor(tabcreateevent, url="") {
		this.webview = createWebview(`webview-${tabcreateevent.id}`,url);
		this.id = tabcreateevent.id; //is also the webview id
		this.tabnumber = tabcreateevent.tabnumber;
	}

	goactive(){
    	webpageview.removeChild(webpageview.lastChild);
		webpageview.appendChild(this.webview);
	}

	tabinfo(){
		//TODO emit info
	}
}

/* ==========================================================================
                              RENDERER MAIN
========================================================================== */

var webpageview = document.querySelector(".webpage");
var windowtabgroups = new WindowTabGroups();
windowtabgroups.newtabgroup("test");
windowtabgroups.tabgroups.test.tabs[0].goactive();

//TODO
// Make the control panel
// Make the settings
// Make the extensions
// Get information on cookies usw
// Inform main process over tabs with ipcRenderer.invoke
