# Browser

Using Electron webview to build a browser. 

Electron is a Framework, which is used for building cross-platform Desktop Apps 
with Javascript, HTML, node.js and CSS. 
Electron itself uses Chromium BrowserWindows as the base for its applications, so
its basically a Browser itself. 
Instead of creating multiple Browserwindows and
somehow laying them onto another, i chosed to use Chromes webview to create 
the tabs. So the structure of my app is a BrowserWindow containing multiple webview.


## Table of Content

[Build Instructions](#Build)

[Documentation](#Documentation)

[Roadmap](#Todo)

# Build

```
git clone https://github.com/Redstonerayy/browser-try.git
cd browser-try
npm install
npm update
npm start
npm run make
```

# Documentation

There is infile documentation for these files
* tab.jsx
* tabs.jsx
* index.jsx
* controlbar.jsx

## Docs
The window.js file is only there to control the right menu in the topbar, which is
responsible for the standard window controls. It takes the actions and handles them
and its responsible for changing the icons.



# Todo
* Make Bookmarks
* Make multiwindow support

# Ressources

* https://github.com/binaryfunt/electron-seamless-titlebar-tutorial
* https://www.electronjs.org/