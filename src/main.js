//requirements
const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');

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
	constructor(width, height, load, id, tabs=null, windowmax="max", minheight=100, minwidth=500) {
		this.window = createWindow(width, height, minheight, minwidth, false, windowmax, load);
		this.tabgroups = [];
		this.id = windows.windows.length;
	}
}

class Windows {
	constructor() {
		this.windows = [];
		this.idcounter = 0;
		this.reuseids = [];
	}

	newWindow(){
		this.windows.push( new Window(700, 900, `file://${__dirname}/html/index.html`, this.getNewWindowId()) );
	}

	getNewWindowId(){
		if(this.reuseids.length > 0){
			return this.reuseids.splice(-1, 1);
		} else {
			this.idcounter += 1;
			return this.idcounter - 1;
		}
	}

	getFocusedWindow(){
		let activewindow = null;
		BrowserWindow.getAllWindows().forEach(browserwindow => {
			if(browserwindow.isFocused()){
				activewindow = browserwindow;
			}
		});
		return activewindow;
	}
}

/* ==========================================================================
                              APP MAIN
========================================================================== */
//consts

//vars
var windows = new Windows();

app.whenReady().then(() => {
	windows.newWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/* ------------------------------------------------
				   KEYBOARD/MENUITEMS
				   
-------------------------------------------------*/

const menu = new Menu()
//KEYS

//DevTools, Quit
menu.append(new MenuItem({
	label: 'Window',
	submenu: [
	{
		role: 'toggleDevTools',
		accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Ctrl+Shift+I',
		click: () => { 
			console.log('DevTools');
		}
	},
	{
		role: 'quit',
		accelerator: process.platform === 'darwin' ? 'Alt+F4' : 'Alt+F4',
		click: () => {
		}
	}]
}));

//Reload webview
menu.append(new MenuItem({
	label: 'Content',
	submenu: [{
		label: 'reload',
		accelerator: process.platform === 'darwin' ? 'F5' : 'F5',
		click: () => { 
			console.log('Reload');
			let focuswindow = windows.getFocusedWindow();
			focuswindow.webContents.send("F5", "");
		}
	}]
}));


//set menu
Menu.setApplicationMenu(menu);

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
