/* ==========================================================================
                              RENDERER MAIN
========================================================================== */

//init
var webpageview = document.querySelector(".webpage");
var windowtabgroups = new WindowTabGroups();
var controlbar = new Controlbar();

windowtabgroups.newtabgroup("test");
windowtabgroups.tabgroups.test.tabs[0].goactive();

//TODO
// Make the control panel
// Make the settings
// Make the extensions
// Get information on cookies usw
// Inform main process over tabs with ipcRenderer.invoke
