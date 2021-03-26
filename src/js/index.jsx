'use strict';

/* ==========================================================================
                              RENDERER MAIN
========================================================================== */

//TODO Todolist
// extensions not working?
//add regex for other urls
// update docs
// document main.js

/* 
* @use
-main file, creates the Tabs class which acts as the main 
controller of whole BrowserWindow
-dump the DOM objects from index.html into variables
-render the Controlbar

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
//a section where to render the webviews as the main webpage
var webpageview = document.querySelector(".webpage");
//a section where to display the tabs
var tabdisplay = document.querySelector(".tabdisplay");
//a clickable DOM element to create new tabs
var createnewtab = document.querySelector(".create-tab");
//a container for the controlbar
var controlbarcontainer = document.querySelector(".controlbar-container");

ReactDOM.render(<ControlBar ref={(controlbar) => {
    window.controlbar = controlbar;
}}/>, controlbarcontainer);

//tabs object, which controls the window
var tabs = new Tabs(["https://github.com/Redstonerayy/browser-try"]);


//keyboard commands
ipcRenderer.on("F5", (message) => {
    tabs.activetab.reload();
});

ipcRenderer.on("CmdorCtrl+Tab", (message) => {
    tabs.switchTab(true);
});

ipcRenderer.on("CmdorCtrl+T", (message) => {
    tabs.makeNewTab(`file://${__dirname}/newtab.html`, true, false, true);
});

var keyboard = new KeyBoardInterface([KeyEnter]);
keyboard.start();