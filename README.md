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
npm exec electron-forge import
npm start
npm run make
```

# Documentation

There is documentation in [DOCUMENTATION.md](DOCUMENTATION.md)


# Todo
- Adapt to BrowserView
- Make Bookmarks
- Make multiwindow support

# Ressources

* https://github.com/binaryfunt/electron-seamless-titlebar-tutorial
* https://www.electronjs.org/