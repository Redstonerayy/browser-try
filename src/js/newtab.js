var images = [
    "black-hole.jpg",
    "dark-souls-high.jpg",
    "dark-souls-large.jpg",
    "house-water.jpg",
    "lost-settlement.jpg",
    "manhattan.jpg",
    "mountain-climber.jpg",
    "new-york.webp",
    "savanne.jpeg",
    "skyline.jpg",
    "tokyo-tower-night.jpg",
    "waterfall.jpg",
    "lunareclipse.jpg",
    "pikachu.jpg",
    "purpleeclipse.jpg"
]
let main = document.querySelector(".main");
let img = images[Math.floor(Math.random()*images.length)];

if(img == "dark-souls-high.jpg"){
    //adapt position
    main.style.backgroundPosition = "0px -300px";
}

let blackgithublogo = [
    
]

//
if(blackgithublogo.includes(img)){
    document.querySelector(".github-logo").src = "../img/github-dark.png";
}

main.style.backgroundImage = `url(../img/${img})`;
