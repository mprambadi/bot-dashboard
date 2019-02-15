import React, { Component } from "react";
import "./App.css";
import ccxt from "ccxt";
import {
	FlatList,
	View,
	Text,
	Picker,
	TouchableOpacity,
	TextInput
} from "react-native";
import { pivotFib } from "./utils/Indicator";
import * as _ from "lodash";

const binance = new ccxt.binance({
	proxy: "https://cors-anywhere.herokuapp.com/"
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
class App extends Component {
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
		this.fetchMarkets();
	}

	fetchMarkets = async () => {
		const tickers = await binance.fetchTickers();

		const data = Object.values(tickers);
		const btc = data.filter(
			item => item.symbol.split("/")[1] === this.state.base
		);

		console.log(btc);

		const addExtraData = btc.map(item => ({
			...item,
			ohlcv: [],
			id: item.symbol.split("/").join(""),
			bg: "white"
		}));
		this.setState({ market: addExtraData }, () => {
			this.fetchOhlcv();
		});
	};

	fetchOhlcv = async () => {
		try {
			for (const market of this.state.market) {
				const ohlcv = await binance.fetchOHLCV(market.symbol, "1w");
				this.setState(state => ({
					market: state.market.map(item =>
						item.id === market.id ? { ...item, ohlcv } : { ...item }
					)
				}));
				sleep(binance.rateLimit);
			}

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

	render() {
		const filteredData = this.state.market.filter(
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
							this.setState({ base: itemValue, market: [] }, () => {
								this.fetchMarkets();
							})
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
				<FlatList
					refreshing={this.state.market.length < 5}
					data={filteredData}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => <Indicator item={item} />}
					extraData={filteredData}
					showsHorizontalScrollIndicator={false}
					style={{ padding: 10, marginTop: 80 }}
					ItemSeparatorComponent={() => (
						<View
							style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
						/>
					)}
					stickyHeaderIndices={[0]}
				/>
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

const Indicator = ({ item }) => (
	<View
		style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
	>
		<TextCenter text={item.symbol} />
		{
			<TextCenter
				text={Number(item.last).toFixed(8)}
				backgroundColor={item.bg}
				bold
			/>
		}
		{<TextCenter text={Number(item.percentage).toFixed(2)} percentage />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).r3} />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).r2} />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).r1} />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).p} />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).s1} />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).s2} />}
		{!!item.ohlcv.length && <TextCenter text={pivotFib(item.ohlcv).s3} />}
	</View>
);

export default App;
