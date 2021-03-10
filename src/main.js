//requirements
const { app, BrowserView, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

/* ==========================================================================
                              CLASSES
========================================================================== */



/* ==========================================================================
                              FUNCTIONS
========================================================================== */

function createWindow(width, height, frame, load){
  	const win = new BrowserWindow({
    	width: width,
    	height: height,
		frame: frame,
    	webPreferences: {
      		nodeIntegration: true,
			contextIsolation: false
    	}
 	});
  	win.loadFile(load);
	return win;
}

/* ==========================================================================
                              APP MAIN
========================================================================== */


var mainwindow;

app.whenReady().then(() => {
	mainwindow = createWindow(1000, 750, false, 'src/html/index.html');

	const view = new BrowserView();
	mainwindow.setBrowserView(view);
	view.setBounds({ x: 0, y: 64, width: 500, height: 700 });
	view.webContents.loadURL('https://www.youtube.com/watch?v=ME2PeefPIgk');
	view.setAutoResize({width: true, height: true});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

//handle window menu
ipcMain.handle('window-action', async (event, action) => {
	console.log(event.sender.id);
	let result = "";
	switch (action) {
		case "min":
			mainwindow.minimize();
			break;

		case "max":
			mainwindow.maximize();
			result = "res";
			break;

		case "res":
			mainwindow.unmaximize();
			result = "max";
			break;

		case "close":
			let browserwindows = BrowserWindow.getAllWindows();
			browserwindows.forEach((item, i) => {
				if(event.sender.id == browserwindows[i].id){
					browserwindows[i].close();
				}
			});
			break;

		default://if nothing special parsed return current state
			result = {};
	}
  	return result;
});
