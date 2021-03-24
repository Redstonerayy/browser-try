/* 
* @use
-interface with the keyboard
-filter important information from the keydown event and
decide if an action needs to be taken

* @params
keys - list with key objects
key object {
    "description": "description of the action",
    "keyCode": "code of the key like [keyG]",
    "shift": true/false,
    "ctrl": true/false,
    "action": function to execute
}
*/

class KeyBoardInterface{
    constructor(keys){
        this.keys = keys;
    }

    keylistener(event){
        let pressedkeys = this.keys.filter((key) => {
            return(
                key.keycode == event.code &&
                key.shift == event.shiftKey &&
                key.ctrl == event.ctrlKey
            )
        });
        
        pressedkeys.forEach(key => {
            key.action();
        });
    }

    start(){
        window.addEventListener("keydown", this.keylistener.bind(this));
    }

    stop(){
        window.removeEventListener("keydown", this.keylistener);
    }

    registerKey(key){
        if(!this.keys.includes(key)){
            this.keys.push(key);
        }
    }
}