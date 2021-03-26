'use strict';

/* 
* @use
-component to render a full controlbar with the height of 32px and width 0f 100%
-the controlbar creates a global reference on initialisation to provide an easy interface
-after mount it creates references to each of the components and makes the onclick events
-all events go to the tab instance, which handles the actions

* @noparams

* @properties; this.
back - DOM element back div
forward - DOM element forward div
reload - DOM element reload div
searchbar - DOM element searchbar input

* @methods
! General
? constructor
? componentDidMount(react) 
? render(react)
? changeSearchBar @test @showhttp

* @ressources
! controlbar.sass
! Images: ../img/
	-caret-left.svg
	-caret-right.svg
	-arrow-clockwise.svg
	-book2.svg
	-list.svg
*/

class ControlBar extends React.Component {
	constructor(props) {
		super(props);
	}

  	componentDidMount(){
		//to get the DOM objects for events
		this.back = document.querySelector('.back');
	  	this.forward = document.querySelector('.forward');
	  	this.reload = document.querySelector('.reload');
	  	this.searchbar = document.querySelector('.search-bar');		
	  	this.searchbarinput = document.querySelector('.search-bar > input');
		this.settings = document.querySelector(".settings");

		//add eventlisteners
		//tab
		this.back.addEventListener('click', () => {
			tabs.controlBarEvent('back');
		});
		this.forward.addEventListener('click', () => {
			tabs.controlBarEvent('forward');
		});
		this.reload.addEventListener('click', () => {
			tabs.controlBarEvent('reload');
		});
		this.searchbarinput.addEventListener('focus', () => {
			this.searchbar.style.border = "0.5px solid rgba(255, 165, 0 , 0.3)";
		});
		this.searchbarinput.addEventListener('focusout', () => {
			this.searchbar.style.border = "";
		});

		//browser
		this.settings.addEventListener('click', () => {
			tabs.makeNewTab("settings.html", true, true, true);
		});
  	}

	changeSearchBar(text, showhttp){
		//change searchbar and eventually hide https://
		this.searchbarinput.value = text;
	}

	changeForwardState(state){
		if(state){
			if(!this.forward.className.includes("hover")){
				this.forward.className = this.forward.className.replace(" inactive", " hover");
			} else {//nothing
			}
		} else {
			this.forward.className = this.forward.className.replace(" hover", " inactive");
		}
	}

	changeBackState(state){
		if(state){
			if(!this.back.className.includes("hover")){
				this.back.className = this.back.className.replace(" inactive", " hover");
			} else {//nothing
			}
		} else {
			this.back.className = this.back.className.replace(" hover", " inactive");
		}
	}

	render(){
		return(
			<div className="controlbar">
				<div className="left-menu">
					<div className="back icon hover">
						<img src="../img/caret-left.svg" alt=""></img>
					</div>
					<div className="forward icon hover">
						<img src="../img/caret-right.svg" alt=""></img>
					</div>
					<div className="reload icon hover">
						<img src="../img/arrow-clockwise.svg" alt=""></img>
					</div>
				</div>
				<div className="bookmark">
					<img src="../img/book2.svg" alt=""></img>
				</div>
				<div className="search-bar-container">
					<div className="search-bar">
						<input type="text" name="" defaultValue=""></input>
					</div>
				</div>
				<div className="right-menu">
					<div className="settings">
						<img src="../img/list.svg" alt=""></img>
					</div>
				</div>
			</div>
		);
	}
}
