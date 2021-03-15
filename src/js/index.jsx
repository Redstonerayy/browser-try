'use strict';
/* ==========================================================================
                              RENDERER MAIN
========================================================================== */

//init
var webpageview = document.querySelector(".webpage");
var tabdisplay = document.querySelector(".tabdisplay");
var controlbarcontainer = document.querySelector(".controlbar-container");

ReactDOM.render(<ControlBar ref={(controlbar) => {
    window.controlbar = controlbar;
}}/>, controlbarcontainer);

var tabs = new Tabs(["https://electronjs.org"]);



//TODO
// Make the control panel
// Make the settings
// Make the extensions
// Get information on cookies usw
// Inform main process over tabs with ipcRenderer.invoke
