'use strict';
/* ==========================================================================
                              RENDERER MAIN
========================================================================== */

//init
var webpageview = document.querySelector(".webpage");
var tabdisplay = document.querySelector(".tabdisplay");
var controlbarcontainer = document.querySelector(".controlbar-container");

ReactDOM.render(<ControlBar ref={(controlbar) => {
    window.controlbar = controlbar
}}/>, controlbarcontainer);

ReactDOM.render(<WindowTabGroups ref={(windowtabgroups) => {
    window.windowtabgroups = windowtabgroups;
}}/>, tabdisplay);
console.log(window.controlbar);
//ReactDOM.render(<Tab />, webpageview);
//TODO
// Make the control panel
// Make the settings
// Make the extensions
// Get information on cookies usw
// Inform main process over tabs with ipcRenderer.invoke
