'use strict';

class TabGroup extends React.Component{
	constructor(props){
		super(props);
		this.numberoftabs = 0;
		this.tabids = [];
	}

	tabgroupinfo(){
		let tabinfo = [];
		this.tabs.forEach((item, i) => {
			tabinfo.push(item.tabinfo());
		});
		return {"numberoftabs": this.numberoftabs, "tabids": this.tabids, "tabinfo": tabinfo};
	}

	render(){
		return(
			<div className="tabgroup">
				<Tab tabid={0} tabnumer={0} url={this.props.urls[0]} event={"activate"}/>
			</div>
		);
	}
}
