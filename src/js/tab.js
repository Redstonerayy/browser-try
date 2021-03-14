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

/* ==========================================================================
                              TAB AND WINDOW CONTROL
========================================================================== */


class WindowTabGroups{
	constructor(){
		this.tabgroups = {};
		this.numberoftabs = 0;
		this.resuseids = [];
	}

	//tabgroup administration
	newtabgroup(name){
		this.tabgroups[name] = new TabGroup(["https://github.com"]);
	}

	//tab administration
	//id usw.
	getnewtabid(){
		if(this.resuseids.length == 0){
			return this.numberoftabs;
		} else {
			return this.resuseids.splice(-1, 1, 0);
		}
	}

	addresuseid(id){
		this.resuseids.push(id);
	}

	getactivetabs(){
		let activetabs = [];
		this.tabgroups.keys().forEach((tabgroup, i) => {
			item.tabs.forEach((tab, j) => {
				if(tab.tags.includes("active")){
					activetabs.push(tab.id);
				}
			});
		});
		return activetabs;
	}

	//controlbar
	controlbarevent(ev){
		if (ev == "back") {
			windowtabgroups.tabgroups.test.tabs[0].back();
		} else if (ev == "forward") {
			windowtabgroups.tabgroups.test.tabs[0].forward();
		} else if (ev == "reload") {
			windowtabgroups.tabgroups.test.tabs[0].reload();
		} else if (ev == "focus") {

		} else if (ev == "focusout") {

		} else {
		}
	}
}

class TabGroup{
	constructor(urls, id){
		this.tabs = [];
		this.numberoftabs = 0;
		this.tabids = [];

		urls.forEach((item, i) => {
			var tabid = windowtabgroups.getnewtabid();

			this.tabs.push(new Tab({
					"createevent": "init",
					"tabnumber": this.numberoftabs,
					"id": tabid},
				item));

			this.tabids.push(tabid);
			this.numberoftabs += 1;
		});
	}

	tabgroupinfo(){
		let tabinfo = [];
		this.tabs.forEach((item, i) => {
			tabinfo.push(item.tabinfo());
		});
		return {"numberoftabs": this.numberoftabs, "tabids": this.tabids, "tabinfo": tabinfo};
	}
}


class Tab {
	constructor(tabcreateevent, url="") {
		this.webview = createWebview(`webview-${tabcreateevent.id}`,url);
		this.url = url;
		this.id = tabcreateevent.id; //is also the webview id
		this.tabnumber = tabcreateevent.tabnumber;
		this.tags = [];
	}

	goactive(){
    	webpageview.removeChild(webpageview.lastChild);
		webpageview.appendChild(this.webview);
		controlbar.changesearchbar(this.url);
		this.tags.push("active");
	}

	loseactive(){
		if(this.tags.includes("active")){
			this.tags = this.tags.filter(value => !(value == "active"));
		}
	}

	
	forward(){
		this.webview.goForward();
	}

	back(){
		this.webview.goBack();
	}

	reload(){
		this.webview.reload();
	}

	tabinfo(){
		console.log(this.id);
		return {"url": this.url, "id": this.id, "tabnumber": this.tabnumber, "tags": this.tags};
	}
}
