'use strict';

/*
@urls array of strings
@options object
keys:
-style -> dark, white

*/

class Tabs {
	constructor(urls, options){
		//init
		this.urls = urls;
		this.tabs = [];
		this.numberoftabs = urls.length;
		this.resuseids = [];
		this.activetab = undefined;

		//make tabs
		this.urls.forEach(url => {
			this.tabs.push( new Tab(url, this.getnewtabid()));
		});

		//focus tab
		if(this.tabs == []){
			//newtab
		} else {
			this.tabs[0].goactive();
			this.activetab = this.tabs[0];
		}
	}

	//tab administration
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
		console.log(window.tabgroups);
		let activetabsalltabgroups = [];
		window.tabgroups.forEach(tabgroup => {
			let temp = tabgroup.getactivetabs();
			temp.forEach(tab => {
				activetabsalltabgroups.push(tab);
			});
		});
		console.log(activetabsalltabgroups);
		return activetabsalltabgroups;
	}

	controlbarevent(eventname){
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
