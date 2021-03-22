# DOCUMENTATION

## How to read this

The files window.js and main.js are not really interesting to understand how it works. **All comes together in index.jsx**, which just creates the classes and some variables. **You should look into tabs.jsx and tab.jsx**  to understand the classes and whats going on. In controlbar.jsx and keyboard.js are 2 additional classes, which implement the interaction with the user.

## Table of Contents
* [index.jsx](##index.jsx)
* [tabs.jsx](##tabs.jsx)
* [tab.jsx](##tab.jsx)
* [controlbar.jsx](##controlbar.jsx)
* [keyboard.jsx](##keyboard.js)
* [window.js](##window.js)
* [main.js](##main.js)



## index.jsx
**Use**
* main file, creates the Tabs class which acts as the main controller of whole BrowserWindow
* dump the DOM objects from index.html into variables
* render the Controlbar

**Parameters**

DOM
* a section where to render the webviews as the main webpage
* a section where to display the tabs
* a clickable DOM element to create new tabs
* a container for the controlbar be careful, that the styles fit

**Ressources**

Javascript
* tab.jsx for the Tab class and the TabGui component(react)
* tabs.jsx for the Tabs class
* controlbar.jsx for the Controlbar class
* window.js for the window-control menu; min/max/close/quit

Styles
* index.sass is important for the webpage DOM element and the webview



## tabs.jsx
**Use**
* Tabs class to manage the BrowserWindow and all the tabs and important
events from the controlbar

**Parameters**
* urls - urls to be loaded in tabs
* options - object with additional information

**Properties**
* urls - urls of the tabs
* tabs - tab objects
* numberoftabs - number of tabs in this.tabs
* ids - list of all ids, that tabs in this.tabs have
* idcounter - counter, which counts up for creating new ids
* reuseids - ids from destroyed tabs
* activetab - currently active tab

**Methods**

General
* constructor @urls @options
    - make new Tab(url) for each url
    - if no urls given, load a new Tab with newtab.html
    - add onclick eventListener to createTab, which creates a new Tab with newtab.html

Tab Management
* getNewTabId
    - return an unused id 
    - the Tabs class counts up and refactors ids when a tab is destroyed

* makeTabActive @tabid
    - invokes loseActive() on the current active tab
    - filters this.tabs for the tabid and invokes goActive() on the found tab

* addReuseId @id
    - pushes id to this.reuseids

* destroyTabGui
    -filter for the tabid and then
    - destroys the tabgui
    - remove it from the tabs list 
    - no references result in object deletion
    - make other tab active or close window

* getActiveTabs
    - filters for tabs with the "active" tag and returns the found tabs


Tab Events
* controlBarEvent @eventname
    - handles the events of the Controlbar
    - the Controlbar invokes this method and gives the event as parameter
    - switch statement determines the event and executes a task


* **Ressources**
* Styles
    - newtab.sass

* HTML
    - newtab.html



## tab.jsx
### TabGui

**Use**
* a small react component to be renderer inside a tab-container, which is appended to the tabdisplay div. It displays the information like title, favicon and takes the events.

**Parameters**
* tabid to indentify this tab and its container
* favicon to display a favicon
* title to display a title

**Methods**
* onClick(react)
    - if on all except the close is clicked, invokes makeTabActive on tabs with the tabid

**Ressources**
* topbar.sass
* Images: ../img/
	- plus.svg which gets rotated to make a close sign

### Tab

**Use**
* gets stored in the this.tabs property of the Tabs class
* class for controlling the DOM of a tab
* store the tab information
* many methods to interact with the webview

**Parameters**
* url - the url to load the tab; either a file url for the newtab.html or a webaddress
* id - a unique id to identify the tab object and the correspodending DOM elements
* tabnumber - the position of the tab in the tabbar, can differ from the id
* options - an object with additional information

**Properties**
* url - url of this tab
* id - id + "-tab"; id of this tab
* tabnumber - position in tabbar of this tab
* tags - list of tags
* tabtitle - title of the webview
* webview - DOM element webview

**Methods**

General
* constructor
    - add TabGui(react) to the tabdisplay
    - make a webview
    - add EventListeners to the webview to upate TabGui on
    favicon and tabtitle receive

GUI
* createWebview @id @url
    - creates a webview with the id and the url loaded
* createTabView
    - creates the div which gets appended to the tabdisplay
    - inside the TabGui component(react) gets rendered
    - on receive of tabtitle and favicon the components gets rerended
    - the event listeners get set in the constructor of the Tab class
        - page-favicon-updated -> favicon
        - dom-ready -> tabtitle

* destroyTabGui
    - removes webview and tabcontainer from DOM

Tab Control
* goActive 
    - changes the url in the controlbar to the tabs url
    - ads the "active" tag to the Tabs tags
    - removes the webpageview lastchild and ads the webview of this tab
    as child

* loseActive
    - remove "active" tag

* forward
    - forwards in the webview

* back
    - goes back in the webview

* reload
    - reloads the webview


Information management
* getTabTitle
    - returns the webview title

* tabInfo
    - return general informatin about the tab;
    url, id, tabnumber, tags

**Ressources**
* topbar.sass
* tries to get title and favicon from the webserver



## controlbar.jsx

**Use**
* component to render a full controlbar with the height of 32px and width 0f 100%
* the controlbar creates a global reference on initialisation to provide an easy interface
* after mount it creates references to each of the components and makes the onclick events
* all events go to the tab instance, which handles the actions

**Parameters**
* class takes no parameters

**Methods**
* empty Constructor

**Properties**
* back - DOM element back div
* forward - DOM element forward div
* reload - DOM element reload div
* searchbar - DOM element searchbar input

General
* componentDidMount(react) 
    - to get the DOM objects for events

* render(react) 
    - render the controlbar

* changeSearchBar(test, showhttp)
    - change searchbar and eventually hide https://

**Ressources**
* controlbar.sass
* Images: ../img/
	- caret-left.svg
	- caret-right.svg
	- arrow-clockwise.svg
	- book2.svg
	- list.svg



## keyboard.js
**Use**
* interface with the keyboard
* filter important information from the keydown event and decide if an action needs to be taken

**Parameters**
* keys - list with key objects
* key object 
```
{
    "description": "description of the action",
    "keyCode": "code of the key like [keyG]",
    "shift": true/false,
    "ctrl": true/false,
    "action": function to execute
}
```



## window.js
The window.js file is only there to control the right menu in the topbar, which is responsible for the standard window controls. It takes the actions and handles them and its responsible for changing the icons.



## main.js
```
TODO
```