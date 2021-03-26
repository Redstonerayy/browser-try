const fs = require("fs");

function readJSONSync(file){
	let filedata = fs.readFileSync(file, {encoding: 'utf8'});
    return JSON.parse(filedata);
}

let images = Object.values(readJSONSync("images.json"));


let main = document.querySelector(".main");
let img = images[Math.floor(Math.random()*images.length)];

if(img == "dark-souls-high.jpg"){
    //adapt position
    main.style.backgroundPosition = "0px -300px";
}

let blackgithublogo = [
    "mountain-climber.jpg",
    "tokyo-tower-night.jpg",
    "new-york.jpg",
]

//
if(blackgithublogo.includes(img)){
    document.querySelector(".github-logo").src = "../img/github-black.png";
    document.querySelector(".info-me").style.color = "black";
}

main.style.backgroundImage = `url(../img/${img})`;
