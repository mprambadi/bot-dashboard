import React, { Component } from "react";
import "./App.css";
import ccxt from "ccxt";
import { FlatList, View, Text, Picker, TextInput } from "react-native";
import { pivotFib } from "./utils/Indicator";
import { List, AutoSizer } from "react-virtualized";
import plimit from "p-limit";
import Axios from "axios";

const limit = plimit(3);
const binance = new ccxt.binance({
	proxy: "https://cors-anywhere.herokuapp.com/"
});

const api = Axios.create({
	baseURL: "https://telegrafme.herokuapp.com/indicator/"
});

const service = {
	fetchOhlcv: () => api.get("/binance")
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
class App extends React.PureComponent {
	constructor() {
		super();
		this.socket = new WebSocket(
			"wss://stream.binance.com:9443/ws/!miniTicker@arr@3000ms"
		);
	}
	state = {
		market: [],
		chunk: [],
		base: "BTC",
		search: ""
	};
	componentDidMount() {
		this.fetchLocalData();
		this.fetchAllTickers();
	}

	fetchLocalData = () => {
		this.localData = JSON.parse(localStorage.getItem("ohlcvData"));
	};

	fetchAllTickers = async () => {
		// const tickers = await binance.fetchTickers();

		// const data = Object.values(tickers);
    const { data } = await service.fetchOhlcv();
    

		const addExtraData = data.map(item => ({
			...item,
			id: item.symbol,
			bg: "white"
		}));

		console.log(addExtraData);

		this.fetchLocalData();

		this.setState({ market: addExtraData }, () => {
			this.getSocket();
		});
	};

	fetchOhlcv = async () => {
		try {
			const { data } = await service.fetchOhlcv();

			console.log(data);
			// data.map(market => {
			// 	this.setState(state => ({
			// 		market: state.market.map(item =>
			// 			item.id === market.symbol ? { ...item, ohlcv:market.data, data:market.ohlcv } : { ...item }
			// 		)
			//   }));
			// })

			this.getSocket();
		} catch (error) {
			console.log(error);
		}
	};

	getSocket() {
		this.socket.onmessage = ({ data }) => {
			this.setState(state => ({
				market: state.market.map(item => {
					const last = JSON.parse(data).find(ws => ws.s === item.id);
					return {
						...item,
						last: last ? Number(last.c) : Number(item.last),
						bg: last
							? Number(last.c) > Number(item.last)
								? "#42f474"
								: Number(last.c) < Number(item.last)
								? "#f44141"
								: "white"
							: item.bg
					};
				})
			}));
		};
	}

	renderIndicator = ({ index, key, style }) => {
		const filterBase = this.state.market.filter(
			item => item.base === this.state.base
		);

		const filteredData = filterBase.filter(
			item => item.id.indexOf(this.state.search.toUpperCase()) !== -1
		);
		return (
			<View
				style={[
					{
						flexDirection: "row",
						justifyContent: "space-between",
						flex: 1
					},
					style
				]}
				key={key}
			>
				<TextCenter
					text={filteredData[index].symbol && filteredData[index].symbol}
				/>
				{
					<TextCenter
						text={Number(
							!!filteredData[index].ticker && filteredData[index].ticker.last
						).toFixed(8)}
						backgroundColor={filteredData[index].bg}
						bold
					/>
				}
				{
					<TextCenter
						text={Number(
							!!filteredData[index].ticker &&
								filteredData[index].ticker.percentage
						).toFixed(2)}
						percentage
					/>
				}
				{<TextCenter text={filteredData[index].data.r3} />}
				{<TextCenter text={filteredData[index].data.r2} />}
				{<TextCenter text={filteredData[index].data.r1} />}
				{<TextCenter text={filteredData[index].data.p} />}
				{<TextCenter text={filteredData[index].data.s1} />}
				{<TextCenter text={filteredData[index].data.s2} />}
				{<TextCenter text={filteredData[index].data.s3} />}
			</View>
		);
	};
	render() {
		const filterBase = this.state.market.filter(
			item => item.base === this.state.base
		);

		const filteredData = filterBase.filter(
			item => item.id.indexOf(this.state.search.toUpperCase()) !== -1
		);

		return (
			<View>
				<View
					style={{
						width: "100%",
						backgroundColor: "white",
						borderColor: "black",
						position: "fixed",
						left: 10,
						top: 0,
						paddingTop: 10,
						zIndex: 1,
						flexDirection: "row",
						alignItems: "center"
					}}
				>
					<Text>Base Pair : </Text>
					<Picker
						selectedValue={this.state.base}
						style={{
							height: 30,
							width: 100
						}}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({ base: itemValue })
						}
					>
						<Picker.Item label="BTC" value="BTC" />
						<Picker.Item label="USDT" value="USDT" />
						<Picker.Item label="TUSD" value="TUSD" />
						<Picker.Item label="PAX" value="PAX" />
						<Picker.Item label="ETH" value="ETH" />
					</Picker>

					<View
						style={{ flexDirection: "row", alignItems: "center", width: "20%" }}
					>
						<Text>Pagination : </Text>
					</View>
					<Text>Search :</Text>
					<TextInput
						onChange={({ target: { value } }) =>
							this.setState({ search: value })
						}
						style={{
							borderColor: "black",
							width: 100,
							height: 25,
							borderWidth: 1
						}}
					/>
				</View>
				<HeaderIndicator />
{/* 
				<AutoSizer>
					{({ width, height }) => ( */}
						<List
							style={{ marginTop: 80 }}
							rowCount={filteredData.length}
							rowRenderer={this.renderIndicator}
							width={window.innerWidth-20}
							height={window.innerHeight-80}
							rowHeight={50}
						/>
				{/* // 	)}
				// </AutoSizer> */}
			</View>
		);
	}
}

const HeaderIndicator = () => (
	<View
		style={{
			flexDirection: "row",
			justifyContent: "space-between",
			width: "100%",
			alignItems: "center",
			position: "fixed",
			top: 40,
			zIndex: 1,
			borderColor: "black",
			backgroundColor: "white",
			borderWidth: 1
		}}
	>
		<TextCenter bold text="Pair" />
		<TextCenter bold text="Last Price" />
		<TextCenter bold text="24h Chg%" />
		<View style={{ width: "100%" }}>
			<View style={{ alignContent: "center" }}>
				<Text> Pivot Fibonnaci Weekly</Text>
			</View>
			<View style={{ flexDirection: "row", width: "100%" }}>
				<TextCenter bold text="R3" />
				<TextCenter bold text="R2" />
				<TextCenter bold text="R1" />
				<TextCenter bold text="P" />
				<TextCenter bold text="S1" />
				<TextCenter bold text="S2" />
				<TextCenter bold text="S3" />
			</View>
		</View>
	</View>
);

const TextCenter = ({ text, percentage, bold, backgroundColor }) => (
	<View style={{ width: "10%", alignItems: "center", backgroundColor }}>
		<Text style={{ fontWeight: bold ? "bold" : "normal" }}>
			{text} {percentage ? "%" : ""}
		</Text>
	</View>
);
export default App;
