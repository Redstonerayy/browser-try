'use strict';
/* ==========================================================================
                              RENDERER MAIN
========================================================================== */

//TODO Todolist
//Make searchbar working with enter
// Make the settings
// Make the extensions
// Get information on cookies usw
// Inform main process over tabs with ipcRenderer.invoke

/* 
* @use
-main file, creates the Tabs class which acts as the main controller of whole BrowserWindow
-dump the DOM objects from index.html into variables
-render the Controlbar

* @param
DOM
    -a section where to render the webviews as the main webpage
    -a section where to display the tabs
    -a clickable DOM element to create new tabs
    -a container for the controlbar
    ! be careful, that the styles fit

* @ressources
Javascript
    ! tab.jsx for the Tab class and the TabGui component(react)
    ! tabs.jsx for the Tabs class
    ! controlbar.jsx for the Controlbar class
    ! window.js for the window-control menu; min/max/close/quit

Styles
    ! index.sass is important for the webpage DOM element and the webview

*/

//init
var webpageview = document.querySelector(".webpage");
var tabdisplay = document.querySelector(".tabdisplay");
var createnewtab = document.querySelector(".create-tab");
var controlbarcontainer = document.querySelector(".controlbar-container");

ReactDOM.render(<ControlBar ref={(controlbar) => {
    window.controlbar = controlbar;
}}/>, controlbarcontainer);

var tabs = new Tabs(["https://electronjs.org"]);
window.addEventListener('keydown', (event) => {
    console.log(event);
});