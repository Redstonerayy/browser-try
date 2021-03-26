'use strict';

/* 
* @use
-a small react component to be renderer inside a tab-container, which is appended to the tabdisplay
div. It displays the information like title, favicon and takes the events.

* @param
-tabid to indentify this tab and its container
-favicon to display a favicon
-title to display a title

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
			<div id={this.props.tabid} className="tab" onClick={(event) => {
				if(["tab", "favicon", "tabtitle"].includes(event.target.className)){
					//if on all except the close is clicked, make this tab active
					tabs.makeTabActive(this.props.tabid);
				}
			}}>
				<img className="favicon" src={this.props.favicon} alt=""/>
				<span className="tabtitle">{this.props.title}</span>
				<div className="tab-menu">
					<div className="close-tab-div" onClick={() =>{
						tabs.removeTab(this.props.tabid);
					}}>
						<img className="close-tab" src="../img/plus.svg" alt=""/>
					</div>
				</div>
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

* @properties; this.
url - url of this tab
id - id + "-tab"; id of this tab
tabnumber - position in tabbar of this tab
tags - list of tags
tabtitle - title of the webview
webview - DOM element webview

* @methods
! General
? constructor

! GUI
? createWebview @id @url
? createTabView
	! page-favicon-updated -> favicon
	! dom-ready -> tabtitle
? destroyTabGui

! Tab Control
? goActive
? loseActive
? forward
? back
? reload

! Information management
? getTabTitle
? tabInfo

* @ressources
! topbar.sass
-tries to get title and favicon from the webserver

*/

class Tab {
	constructor(url, id, tabnumber, load, nodeintegration, options) {
		//init
		this.url = url;
		this.id = id + "-tab";
		this.tabnumber = tabnumber;
		this.tags = [];
		this.loaded = load;
		this.nodeintegration = nodeintegration;
		this.domready = false;
		//gui
		this.favicon = "../img/loading.webp";
		this.tabtitle = "Webpage Loading";
		
		if(load){
			this.loadTab();
		}
	}

	//! GUI
	createWebview(id, url) {
		//creates a webview with the id of the tab and the url loaded
		let webview = document.createElement("webview");
		webview.setAttribute("id", id);
		webview.setAttribute("src", url);
		webview.setAttribute("partition", "persist:discover");
		if(this.nodeintegration){
			webview.setAttribute("nodeintegration", "");
			webview.setAttribute("webpreferences", "contextIsolation=false");
		}
		return webview;
	}

	createTabView(){
		//creates the div which gets appended to the tabdisplay
		let containerdiv = document.createElement('div');
		containerdiv.className = "tab-container";
		containerdiv.id = `${this.id}-container`;
		tabdisplay.insertBefore(containerdiv, createnewtab);
		//ref
		this.containerdiv = document.getElementById(`${this.id}-container`);
		//inside the TabGui component(react) gets rendered
		ReactDOM.render(
			<TabGui tabid={this.id} title={this.tabtitle} favicon={this.favicon}/>
			, this.containerdiv
		);
	}

	loadTab(){
		//add a TabGui to the tabdisplay
		this.createTabView();
		//webview
		this.webview = this.createWebview(this.id + "-webview", this.url);		

		//event listeners to update TabGui title and favicon
		this.webview.addEventListener('page-favicon-updated', (event) => {
			this.favicon = event.favicons[0];
			ReactDOM.render(
				<TabGui tabid={this.id} title={this.tabtitle} favicon={this.favicon}/>
				, this.containerdiv
			);
		});
		this.webview.addEventListener('dom-ready', () => {
			this.domready = true;
			//this.webview.openDevTools();

			this.tabtitle = this.getTabTitle();
			ReactDOM.render(
				<TabGui tabid={this.id} title={this.tabtitle} favicon={this.favicon}/>
				, this.containerdiv
			);

			//blur forward and back button
			if(!this.webview.canGoForward()){
				window.controlbar.changeForwardState(false);
				this.canForward = this.webview.canGoForward();
			}
			if(!this.webview.canGoBack()){
				window.controlbar.changeBackState(false);
				this.canBack = this.webview.canGoBack();
			} 
		});


		//event listener to update searchbar
		//normal user navigation
		this.webview.addEventListener('will-navigate', (event) => {
			if(this.id == tabs.activetab.id){
				window.controlbar.changeSearchBar(event.url);
			}
		});

		//will-navigate will not trigger for goBack() or goForward()
		this.webview.addEventListener('did-navigate', (event) => {
			if(this.id == tabs.activetab.id){
				window.controlbar.changeSearchBar(event.url);
			}
			
			if(this.domready){
				if(this.id == tabs.activetab.id){
					if(this.webview.canGoForward() != this.canForward){
						window.controlbar.changeForwardState(this.webview.canGoForward());
					}
		
					if(this.webview.canGoBack() != this.canBack){
						window.controlbar.changeBackState(this.webview.canGoBack());
					}
				}
			}
		});
	}

	destroyTabGui(){
		//remove tabview
		let tabcontainer = document.getElementById(`${this.id}-container`);
		let tabwebview = document.getElementById(`${this.id}-webview`);

		if(tabcontainer){//must exist or be loaded to remove
			tabcontainer.remove()
		}
		if(tabwebview){//must exist or be loaded to remove
			tabwebview.remove()
		}
	}

	//! Tabcontrol
	goActive(){
    	window.controlbar.changeSearchBar(this.url);
		this.tags.push("active");
		if(!this.loaded){
			this.loadTab();
		}
		let webview = document.getElementById(this.id + "-webview");
		if(webview){
			//show the webview
			webview.style.display = "";
		} else {
			//adds the webview of this tab as child
			webpageview.appendChild(this.webview);
		}
	}

	loseActive(){
		if(this.tags.includes("active")){
			this.tags = this.tags.filter(value => !(value == "active"));
		}
		this.webview.style.display = "none";
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
		//return general informatin about the tab; 
		//url, id, tabnumber, tags
		return {"url": this.props.url, "id": this.props.id, "tabnumber": this.props.tabnumber, "tags": this.tags};
	}
}
