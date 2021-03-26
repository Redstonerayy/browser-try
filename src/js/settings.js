const fs = require("fs");

function readJSONSync(file){
	let filedata = fs.readFileSync(file, {encoding: 'utf8'});
    return JSON.parse(filedata);
}

let images = Object.values(readJSONSync("images.json"));


var select = document.querySelector(".newtab-background");

images.forEach(img => {
    let option = document.createElement('option');
    option.value = img;
    option.innerHTML = img.split(".")[0];
    select.appendChild(option);
});
