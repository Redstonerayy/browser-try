'use strict';
/* ==========================================================================
                              FUNCTIONS
========================================================================== */

function createWebview(id, url) {
	let webview = document.createElement("webview");
	webview.setAttribute("id", id);
	webview.setAttribute("src", url);
	return webview;
}

class Tab extends React.Component {
	constructor(props) {
		super(props);
		this.tags = [];
		this.webview = createWebview(this.props.id + "-webview", this.props.url)
	}

	gettabtitle(){
		return this.webview.webContents.getTitle();
	}

	goactive(){
    	webpageview.removeChild(webpageview.lastChild);
		webpageview.appendChild(this.webview);
		window.controlbar.changesearchbar(this.props.url);
		this.tags.push("active");
	}

	loseactive(){
		if(this.tags.includes("active")){
			this.tags = this.tags.filter(value => !(value == "active"));
		}
	}

	forward(){
		this.webview.goForward();
	}

	back(){
		this.webview.goBack();
	}

	reload(){
		this.webview.reload();
	}

	tabinfo(){
		console.log(this.id);
		return {"url": this.props.url, "id": this.props.id, "tabnumber": this.props.tabnumber, "tags": this.tags};
	}

  	render(){
		if(this.props.event == "activate"){
			this.goactive();
		}
    	return(
			<div className="tab" id={this.props.id + "-tab"}>
				<span>Test</span>
			</div>
    	);
  	}
}
