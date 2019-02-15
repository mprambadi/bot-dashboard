import React, { Component } from "react";
import { service } from "../../helper/api";

class Home extends Component {
	state = {
		loading: false,
		data: []
	};

	componentDidMount() {
		this.fetchData();
	}
	async fetchData() {
		this.setState({ loading: true });
		const { data } = await service.weaklyData('WAVES/IDR');

		this.setState({
			data,
			loading: false
		});
   }
   
	render() {
		console.log(this.state.data);
		return <div />;
	}
}

export default Home;
