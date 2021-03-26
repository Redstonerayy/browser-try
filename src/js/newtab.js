var images = {
    "0": "black-hole.jpg",
    "1": "dark-souls-high.jpg",
    "2": "dark-souls-large.jpg",
    "3": "house-water.jpg",
    "4": "lost-settlement.jpg",
    "5": "manhattan.jpg",
    "6": "mountain-climber.jpg",
    "7": "new-york.webp",
    "8": "savanne.jpeg",
    "9": "skyline.jpg",
    "10": "tokyo-tower-night.jpg",
    "11": "waterfall.jpg",
    "12": "lunareclipse.jpg",
    "13": "pikachu.jpg",
    "14": "purpleeclipse.jpg"
}

images = Object.values(images);


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
