'use strict';
/* ==========================================================================
                              FUNCTIONS
========================================================================== */

/*
@url string with url
@id identify each tab
@options object
keys:
-style -> dark, white
*/

class Tab {
	constructor(url, id, tabnumber, options) {
		this.url = url;
		this.id = id;
		this.tabnumber = tabnumber;
		this.webview = this.createWebview(this.id + "-webview", this.url);
		this.tags = [];
	}

	//tab control
	createWebview(id, url) {
		let webview = document.createElement("webview");
		webview.setAttribute("id", id);
		webview.setAttribute("src", url);
		return webview;
	}

	goactive(){
    	window.controlbar.changesearchbar(this.url);
		this.tags.push("active");
		webpageview.removeChild(webpageview.lastChild);
		webpageview.appendChild(this.webview);
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

	//get info
	gettabtitle(){
		return this.webview.webContents.getTitle();
	}

	tabinfo(){
		console.log(this.id);
		return {"url": this.props.url, "id": this.props.id, "tabnumber": this.props.tabnumber, "tags": this.tags};
	}
}
