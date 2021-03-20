'use strict';

/* 
* @use
-component to render a full controlbar with the height of 32px and width 0f 100%
-the controlbar creates a global reference on initialisation to provide an easy interface
-after mount it creates references to each of the components and makes the onclick events
-all events go to the tab instance, which handles the actions

* @param
-class takes no parameters

* @methods
! No Constructor

! Properties; this.
back - DOM element back div
forward - DOM element forward div
reload - DOM element reload div
searchbar - DOM element searchbar input

! General
? componentDidMount(react) 
-to get the DOM objects for events

? render(react) 
-render the controlbar

? changeSearchBar(test, showhttp)
-change searchbar and eventually hide https://

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
		this.back = document.querySelector('.back');
	  	this.forward = document.querySelector('.forward');
	  	this.reload = document.querySelector('.reload');
	  	this.searchbar = document.querySelector('.search-bar > input');

		//add eventlisteners
		this.back.addEventListener('click', () => {
			tabs.controlBarEvent('back');
		});
		this.forward.addEventListener('click', () => {
			tabs.controlBarEvent('forward');
		});
		this.reload.addEventListener('click', () => {
			tabs.controlBarEvent('reload');
		});
		this.searchbar.addEventListener('focus', () => {
			tabs.controlBarEvent('focus');
		});
		this.searchbar.addEventListener('focusout', () => {
			tabs.controlBarEvent('focusout');
		});
  	}

	changeSearchBar(text, showhttp){
		this.searchbar.value = text;
	}

	render(){
		return(
			<div className="controlbar">
				<div className="left-menu">
					<div className="back icon">
						<img src="../img/caret-left.svg" alt=""></img>
					</div>
					<div className="forward icon">
						<img src="../img/caret-right.svg" alt=""></img>
					</div>
					<div className="reload icon">
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
					<img src="../img/list.svg" alt=""></img>
				</div>
			</div>
		);
	}
}
