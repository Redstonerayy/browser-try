'use strict';

/* 
* @use
-Tabs class to manage the BrowserWindow and all the tabs and important
events from the controlbar

* @param
@urls urls to be loaded in tabs
@options object with additional information

* @methods
! General
? constructor @urls @options
-make new Tab(url) for each url
-if no urls given, load a new Tab with newtab.html
-add onclick eventListener to createTab, which creates a new Tab with newtab.html

! Properties; this.
urls - urls of the tabs
tabs - tab objects
numberoftabs - number of tabs in this.tabs
ids - list of all ids, that tabs in this.tabs have
idcounter - counter, which counts up for creating new ids
resuseids - ids from destroyed tabs
activetab - currently active tab

! Tab Management
? getNewTabId
@return an unused id; the Tabs class counts up and refactors ids when
a tab is destroyed

? makeTabActive @tabid
-invokes loseActive() on the current active tab
-filters this.tabs for the tabid and invokes goActive() on the found tab

? addReuseId @id
-pushes id to this.resuseids

? getActiveTabs
-filters for tabs with the "active" tag
@return returns the found tabs


! Tab Events
? controlBarEvent @eventname
-handles the events of the Controlbar
-the Controlbar invokes this method and gives the event as parameter
-switch statement determines the event and executes a task


* @ressources
Styles
! newtab.sass

Markup
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
		this.resuseids = [];
		this.activetab = undefined;

		//make tabs
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

		//wait for newtab event
		document.querySelector(".create-tab").addEventListener('click', () => {
			this.tabs.push( new Tab(`file://${__dirname}/newtab.html`, this.getNewTabId(true)));
		});
	}

	//! Tab Management
	getNewTabId(countup){
		if(this.resuseids.length == 0){
			if(countup){
				this.idcounter += 1;
			}
			this.ids.push(this.idcounter - 1);
			return this.idcounter - 1;
		} else {
			return this.resuseids.splice(-1, 1, 0);
		}
	}

	makeTabActive(tabid){
		this.activetab.loseActive();
		this.activetab = this.tabs.filter(tab => { return tab.id == tabid })[0];
		this.activetab.goActive();
	}

	addReuseId(id){
		this.resuseids.push(id);
	}

	getActiveTabs(){
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
