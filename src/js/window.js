//requirements
const { ipcRenderer } = require('electron');
//initialize cuz you can decide if it starts fullscreen
var max_unmax = global.location.search.replace("?", "");
document.querySelector(".max-unmax > img").src = `../img/${max_unmax}-w-20.png`;


//constantly checking if it has changed without the controls
setInterval(() => {
	ipcRenderer.send('controlmenu-info-req', max_unmax);
}, 250);

//handle answer of main process
ipcRenderer.on('controlmenu-info-res', (event, confirmedstate) => {
	if(confirmedstate.max){
		max_unmax = "max";
		document.querySelector(".max-unmax > img").src = `../img/${max_unmax}-w-20.png`;
	} else if (confirmedstate.unmax){
		max_unmax = "unmax";
		document.querySelector(".max-unmax > img").src = `../img/${max_unmax}-w-20.png`;
	}
});


//events of the controlmenu
document.querySelector('.minimize').addEventListener("click", event => {
	ipcRenderer.invoke('window-action', "min").then((result) => {
	});
});

document.querySelector('.max-unmax').addEventListener("click", event => {
	console.log(max_unmax);
	ipcRenderer.invoke('window-action', max_unmax).then((result) => {
		max_unmax = result;
		console.log(max_unmax);
		document.querySelector(".max-unmax > img").src = `../img/${max_unmax}-w-20.png`;
	});
});

document.querySelector('.close').addEventListener("click", event => {
	ipcRenderer.invoke('window-action', "close").then((result) => {
	});
});
