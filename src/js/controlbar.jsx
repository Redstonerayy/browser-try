'use strict';

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
			window.windowtabgroups.controlbarevent('back');
		});
		this.forward.addEventListener('click', () => {
			window.windowtabgroups.controlbarevent('forward');
		});
		this.reload.addEventListener('click', () => {
			window.windowtabgroups.controlbarevent('reload');
		});
		this.searchbar.addEventListener('focus', () => {
			window.windowtabgroups.controlbarevent('focus');
		});
		this.searchbar.addEventListener('focusout', () => {
			window.windowtabgroups.controlbarevent('focusout');
		});
  	}

	changesearchbar(text, http){
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
					<img src="../img/book.svg" alt=""></img>
				</div>
				<div className="search-bar-container">
					<div className="search-bar">
						<input type="text" name="" value=""></input>
					</div>
				</div>
				<div className="right-menu">
					<img src="../img/list.svg" alt=""></img>
				</div>
			</div>
		);
	}
}
