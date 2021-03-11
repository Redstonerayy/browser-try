//requirements
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

/* ==========================================================================
                              FUNCTIONS
========================================================================== */

function createWindow(width, height, frame, maxunmax, load){
  	const win = new BrowserWindow({
    	width: width,
    	height: height,
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

class Tab {
	constructor(url="discover://newtab") {
		this.url = url;
	}
}

class Window {
	constructor(width, height, load, windowmax="unmax", tabs=null) {
		this.window = createWindow(width, height, false, windowmax, load);
		this.tabs = [];
	}
}

/* ==========================================================================
                              APP MAIN
========================================================================== */
//consts

//vars
var windows = [];

app.whenReady().then(() => {
	windows.push(new Window(1300, 700, `file://${__dirname}/html/index.html`));
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
	windows.forEach((item, i) => {
		if(event.sender.id == item.window.id){
			windowindex = i;
		}
	});
	//action
	let result = "";
	switch (action) {
		case "min":
			windows[windowindex].window.minimize();
			break;

		case "unmax":
			windows[windowindex].window.maximize();
			result = "max";
			break;

		case "max":
			windows[windowindex].window.unmaximize();
			result = "unmax";
			break;

		case "close":
			windows[windowindex].window.close();
			break;

		default://if nothing special parsed return current state
			result = {};
	}
  	return result;
});

//check cuz if resized by moving to edges
ipcMain.on("controlmenu-info-req", (event, assumedstate) => {
	//get window
	let windowindex;
	windows.forEach((item, i) => {
		if(event.sender.id == item.window.id){
			windowindex = i;
		}
	});
	//get state
	let state = {
		"min": windows[windowindex].window.isMinimized(),
		"max": windows[windowindex].window.isMaximized(),
		"unmax": !( windows[windowindex].window.isMinimized() || windows[windowindex].window.isMaximized())
	}
	event.reply('controlmenu-info-res', state);
});
