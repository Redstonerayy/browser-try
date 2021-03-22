'use strict';

/* 
* @use
-Tabs class to manage the BrowserWindow and all the tabs and important
events from the controlbar

* @param
@urls urls to be loaded in tabs
@options object with additional information

* @properties; this.
urls - urls of the tabs
tabs - tab objects
numberoftabs - number of tabs in this.tabs
ids - list of all ids, that tabs in this.tabs have
idcounter - counter, which counts up for creating new ids
reuseids - ids from destroyed tabs
activetab - currently active tab

* @methods
! General
? constructor @urls @options
! Tab Management
? getNewTabId
? makeTabActive @tabid
? addReuseId @id
? removeTab @id
? getActiveTabs

! Tab Events
? controlBarEvent @eventname

* @ressources
Styles
! newtab.sass

HTML
! newtab.html
*/

class Tabs {
	constructor(urls, options){
		//init
		this.urls = urls;
		this.tabs = [];
		this.numberoftabs = urls.length;
		this.ids = [];
		this.idcounter = 0;
		this.reuseids = [];
		this.activetab = undefined;

		//make new Tab(url) for each url
		this.urls.forEach(url => {
			this.tabs.push( new Tab(url, this.getNewTabId(true)));
		});
		//no urls given, make new tab
		if(this.urls.length == 0){
			this.tabs.push( new Tab(`file://${__dirname}/html/newtab.html`, this.getNewTabId(true)));
		}

		//make one tab go active
		this.activetab = this.tabs[0];
		this.activetab.goActive();

		/* add onclick eventListener to createTab, which creates 
		a new Tab with newtab.html */
		document.querySelector(".create-tab").addEventListener('click', () => {
			this.tabs.push( new Tab(`file://${__dirname}/newtab.html`, this.getNewTabId(true)));
		});
	}

	//! Tab Management
	getNewTabId(countup){
		/*
		return an unused id; the Tabs class counts up and 
		refactors ids when a tab is destroyed
		*/
		if(this.reuseids.length == 0){
			if(countup){
				this.idcounter += 1;
			}
			this.ids.push(this.idcounter - 1);
			return this.idcounter - 1;
		} else {
			return this.reuseids.splice(-1, 1)[0];
		}
	}

	makeTabActive(tabid){
		this.activetab.loseActive();
		//filters this.tabs for the tabid 
		this.activetab = this.tabs.filter(tab => { return tab.id == tabid })[0];
		this.activetab.goActive();
	}

	addReuseId(id){
		//-pushes id to this.reuseids
		this.reuseids.push(id.replace("-tab", ""));
	}

	removeTab(id){
		this.addReuseId(id);
		this.tabs.filter((item, index) => {
			if(item.id == id){
				//destroy tabgui and delete from list
				item.destroyTabGui();
				this.tabs.splice(index, 1);
				//make other tab active
				if(this.tabs.length > 0){
					if(index > 0){
						this.activetab = this.tabs[index - 1];
						this.activetab.goActive();

					} else {//was the most left tab
						this.activetab = this.tabs[index];
						this.activetab.goActive();
					}
					
				} else {//last tab, quit app now
					ipcRenderer.invoke('window-action', 'close').then((result) => {
					});
				}
			}
		});
	}

	getActiveTabs(){
		//filters for tabs with the "active" tag and returns them
		let activetabs = [];
		this.tabs.forEach(tab => {
			if(tab.tags.includes("active")){
				activetabs.push(tab);
			}
		});
		return activetabs;
	}

	//! Tab Events
	controlBarEvent(eventname){
		/*
		handles the events of the Controlbar
		-the Controlbar invokes this method and gives the event 
		as parameter
		-switch statement determines the event and executes a task
		*/
		let tab = this.activetab;
		switch (eventname) {
			case 'back':
				tab.back();
				break;
			
			case 'forward':
				tab.forward();
				break;

			case 'reload':
				tab.reload();
				break;

			case 'focus':
				
				break;

			case 'focusout':
				
				break;
		
			default:
				break;
		}
	}
}
