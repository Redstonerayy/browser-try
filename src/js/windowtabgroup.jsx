'use strict';

class WindowTabGroups extends React.Component {
    constructor(props) {
		super(props);
		this.numberoftabs = 0;
		this.resuseids = [];
    }

	//tab administration
	getnewtabid(){
		if(this.resuseids.length == 0){
			return this.numberoftabs;
		} else {
			return this.resuseids.splice(-1, 1, 0);
		}
	}

	addresuseid(id){
		this.resuseids.push(id);
	}

	getactivetabs(){

	}

  	render(){
    	return(
			<div className="windowtabgroups">
				<TabGroup urls={["https://github.com"]}/>
			</div>
    	);
  	}
}
