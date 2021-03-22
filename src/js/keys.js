class Key{
    constructor(description, keycode, shift, ctrl, action){
        this.description = description;
        this.keycode = keycode;
        this.shift = shift;
        this.ctrl = ctrl;
        this.action = action
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const KeyEnter = new Key(
    `Multiple actions:
        Search when SearchBar is focused.
    `,
    "Enter",
    false,
    false,
    () => {
        let link = window.controlbar.searchbarinput.value;
        if(window.controlbar.searchbarinput == document.activeElement){
            if(validURL(link)){
                console.log(validURL(link));
                tabs.activetab.webview.loadURL(link);
            } else {
                tabs.activetab.webview.loadURL(`https://duckduckgo.com/?q=${link}&ia=web`);
                window.controlbar.changeSearchBar(`https://duckduckgo.com/?q=${link}&ia=web`);
            }
        }
    }
)