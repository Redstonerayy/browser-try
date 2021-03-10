//requirements
const { ipcRenderer } = require('electron');
var max_res = "max";

document.querySelector('.minimize').addEventListener("click", event => {
	ipcRenderer.invoke('window-action', "min").then((result) => {
	});
});

document.querySelector('.max-restore').addEventListener("click", event => {
	ipcRenderer.invoke('window-action', max_res).then((result) => {
		max_res = result;
		document.querySelector(".max-restore > img").src = `../img/${max_res}-w-20.png`;
	});
});

document.querySelector('.close').addEventListener("click", event => {
	ipcRenderer.invoke('window-action', "close").then((result) => {
	});
});
