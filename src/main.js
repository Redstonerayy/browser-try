const { app, BrowserView, BrowserWindow } = require('electron')

function createWindow(width, height, frame, load){
  	const win = new BrowserWindow({
    	width: width,
    	height: height,
		frame: frame,
    	webPreferences: {
      		nodeIntegration: true
    	}
 	});
  	win.loadFile(load);
	return win;
}

app.whenReady().then(() => {
	const mainwindow = createWindow(1000, 750, false, 'src/html/index.html');
	//mainwindow.removeMenu(); frame: false removes this
	/*
	const view = new BrowserView();
	const sview = new BrowserView();
	mainwindow.setBrowserView(view)
	mainwindow.setBrowserView(sview)
	view.setBounds({ x: 0, y: 50, width: 1000, height: 200 })
	view.webContents.loadURL('https://electronjs.org')
	//view.setAutoResize({width: true, height: true});
	sview.setBounds({ x: 0, y: 50, width: 1000, height: 200 })
	sview.webContents.loadURL('https://github.com')

	a = true;
	setInterval(() => {
		if(a){
			mainwindow.setBrowserView(sview);
			a = false;
		} else {
			mainwindow.setBrowserView(view);
			a = true;
		}
	}, 5000);
	*/
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});
