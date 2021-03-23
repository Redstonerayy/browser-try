//requirements
const { app, BrowserWindow, ipcMain, webContents } = require('electron');

/* ==========================================================================
                              FUNCTIONS
========================================================================== */

function createWindow(width, height, minheight, minwidth, frame, maxunmax, load){
  	const win = new BrowserWindow({
    	width: width,
    	height: height,
		minWidth: minwidth,
		minHeight: minheight,
		frame: frame,
    	webPreferences: {
      		nodeIntegration: true,
			contextIsolation: false,
			webviewTag: true
    	}
 	});
	if(maxunmax == "max"){
		win.maximize();
	}
  	win.loadURL(load + `?` + maxunmax);
	return win;
}

/* ==========================================================================
                              CLASSES
========================================================================== */

class Window {
	constructor(width, height, load, tabs=null, windowmax="max", minheight=100, minwidth=500) {
		this.window = createWindow(width, height, minheight, minwidth, false, windowmax, load);
		this.tabgroups = [];
		this.id = windows.windows.length;
	}
}

class Windows {
	constructor() {
		this.windows = [];
		this.tabnumber = 0;
	}

	newwindow(){
		this.windows.push(new Window(700, 900, `file://${__dirname}/html/index.html`))
	}

	updatetabnumber(){

	}

	getwindowbybrowserwindowid(){

	}

	getwindowbyid(){

	}

	getnumberoftabsallwindows(){
		return this.tabnumber;
	}
}

/* ==========================================================================
                              APP MAIN
========================================================================== */
//consts

//vars
var windows = new Windows();

app.whenReady().then(() => {
	windows.newwindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/* ==========================================================================
                              HANDLE WINDOW CONTROLS
========================================================================== */
//handles the event with the 4 options -> window.js
ipcMain.handle('window-action', async (event, action) => {
	//get window
	let windowindex;
	windows.windows.forEach((item, i) => {
		if(event.sender.id == item.window.id){
			windowindex = i;
		}
	});
	//action
	let result = "";
	switch (action) {
		case "min":
			windows.windows[windowindex].window.minimize();
			break;

		case "unmax":
			windows.windows[windowindex].window.maximize();
			result = "max";
			break;

		case "max":
			windows.windows[windowindex].window.unmaximize();
			result = "unmax";
			break;

		case "close":
			windows.windows[windowindex].window.close();
			break;

		default://if nothing special parsed return current state
			result = {};
	}
  	return result;
});

//check if resized by moving to edges
ipcMain.on("controlmenu-info-req", (event, assumedstate) => {
	//get window
	let windowindex;
	windows.windows.forEach((item, i) => {
		if(event.sender.id == item.window.id){
			windowindex = i;
		}
	});
	//get state
	let minimized = windows.windows[windowindex].window.isMinimized();
	let maximized = windows.windows[windowindex].window.isMaximized();
	let state = {
		"min": minimized,
		"max": maximized,
		"unmax": !( minimized || maximized)
	}
	event.reply('controlmenu-info-res', state);
});
