/* ==========================================================================
                              CLASS
========================================================================== */

class Controlbar {
	constructor() {
		this.back = document.querySelector('.back');
		this.forward = document.querySelector('.forward');
		this.reload = document.querySelector('.reload');
		this.searchbar = document.querySelector('.search-bar > input');

		//add eventlisteners
		this.back.addEventListener('click', () => {
			windowtabgroups.controlbarevent('back');
		});
		this.forward.addEventListener('click', () => {
			windowtabgroups.controlbarevent('forward');
		});
		this.reload.addEventListener('click', () => {
			windowtabgroups.controlbarevent('reload');
		});
		this.searchbar.addEventListener('focus', () => {
			windowtabgroups.controlbarevent('focus');
		});
		this.searchbar.addEventListener('focusout', () => {
			windowtabgroups.controlbarevent('focusout');
		});
	}

	changesearchbar(text, http){
		this.searchbar.value = text;
	}
}
