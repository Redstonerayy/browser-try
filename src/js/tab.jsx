'use strict';

/* 
* @use
-a small react component to be renderer inside a tab-container, which is appended to the tabdisplay
div. It displays the information like title, favicon and takes the events.

* @param
-tabid to indentify this tab and its container
-favicon to display a favicon
-title to display a title

* @methods
onClick(react)
	-invokes makeTabActive on tabs with the tabid

* @ressources
! topbar.sass
! Images: ../img/
	-plus.svg which gets rotated to make a close sign

*/

class TabGui extends React.Component {
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<div id={this.props.tabid} className="tab" onClick={() => {
				tabs.makeTabActive(this.props.tabid);
			}}>
				<img className="favicon" src={this.props.favicon} alt=""/>
				<span>{this.props.title}</span>
				<img className="close-tab" src="../img/plus.svg" alt=""/>
			</div>
		)
	}
}

/* 
* @use
-gets stored in the this.tabs property of the Tabs class
-class for controlling the DOM of a tab
-store the tab information
-many methods to interact with the webview

* @param
@url the url to load the tab; either a file url for the newtab.html or a webaddress
@id a unique id to identify the tab object and the correspodending DOM elements
@tabnumber the position of the tab in the tabbar, can differ from the id
@options an object with additional information

* @methods
! General
? constructor
-execute this.createTabView() to add a TabGui to the tabdisplay
-create webview(this.id + "-webview", this.url)
addEventListeners on faviconupdate and dom-ready to rerender
TagGui when the information is received

! Properties; this.
url - url of this tab
id - id + "-tab"; id of this tab
tabnumber - position in tabbar of this tab
tags - list of tags
tabtitle - title of the webview
webview - DOM element webview

! GUI
? createWebview @id @url
-creates a webview with the id of the tab and the given url loaded
@return DOM object webview

? createTabView
-creates the div which gets appended to the tabdisplay
-inside the TabGui component(react) gets rendered
-on receive of tabtitle and favicon the components gets rerended
-the event listeners get set in the constructor of the Tab class
	! page-favicon-updated -> favicon
	! dom-ready -> tabtitle

? goActive 
-changes the url in the controlbar to the tabs url
-ads the "active" tag to the Tabs tags
-removes the webpageview lastchild and ads the webview of this tab
as child


! Tab Control
? loseActive
-remove "active" tag

? forward
-forwards in the webview

? back
-goes back in the webview

? reload
-reloads the webview


! Information management
? getTabTitle
@return returns the webview title

? tabInfo
@return general informatin about the tab;
url, id, tabnumber, tags

* @ressources
! topbar.sass
-tries to get title and favicon from the webserver

*/

class Tab {
	constructor(url, id, tabnumber, options) {
		//init
		this.url = url;
		this.id = id + "-tab";
		this.tabnumber = tabnumber;
		this.tags = [];
		//gui
		this.favicon = "../img/loading.webp";
		this.tabtitle = "Webpage Loading";
		this.createTabView();
		this.webview = this.createWebview(this.id + "-webview", this.url);
		this.webview.addEventListener('page-favicon-updated', (event) => {
			this.favicon = event.favicons[0];
			ReactDOM.render(
				<TabGui tabid={this.id} title={this.tabtitle} favicon={this.favicon}/>
				, this.containerdiv
			);
		});
		this.webview.addEventListener('dom-ready', () => {
			this.tabtitle = this.getTabTitle();
			ReactDOM.render(
				<TabGui tabid={this.id} title={this.tabtitle} favicon={this.favicon}/>
				, this.containerdiv
			);
		});
	}

	//! GUI
	createWebview(id, url) {
		let webview = document.createElement("webview");
		webview.setAttribute("id", id);
		webview.setAttribute("src", url);
		return webview;
	}

	createTabView(){
		//make container div
		let containerdiv = document.createElement('div');
		containerdiv.className = "tab-container";
		containerdiv.id = `${this.id}-container`;
		tabdisplay.insertBefore(containerdiv, createnewtab);
		//ref
		this.containerdiv = document.getElementById(`${this.id}-container`);
		//render element
		ReactDOM.render(
			<TabGui tabid={this.id} title={this.tabtitle} favicon={this.favicon}/>
			, this.containerdiv
		);
	}

	//! Tabcontrol
	goActive(){
    	window.controlbar.changeSearchBar(this.url);
		this.tags.push("active");
		webpageview.removeChild(webpageview.lastChild);
		webpageview.appendChild(this.webview);
	}

	loseActive(){
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

	//! Information
	getTabTitle(){
		return this.webview.getTitle();
	}

	tabInfo(){
		console.log(this.id);
		return {"url": this.props.url, "id": this.props.id, "tabnumber": this.props.tabnumber, "tags": this.tags};
	}
}
