import React from "react";
import "./App.css";
import { View, Text, Picker, TextInput } from "react-native";
import { List, AutoSizer } from "react-virtualized";
import Axios from "axios";

const api = Axios.create({
	baseURL: "https://telegrafme.herokuapp.com/indicator/"
});

const service = {
	fetchOhlcv: () => api.get("/binance")
};
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
		this.fetchAllTickers();
		this.interval = setInterval(async () => {
			const { data } = await service.fetchOhlcv();
			this.setState(state => ({
				market: state.market.map(item => {

          console.log(data.find(res => res.id === item.id))
					return {
            bg:item.bg,
						...data.find(res => res.id === item.id)
					};
				})
			}));
		}, 60000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	fetchLocalData = () => {
		this.localData = JSON.parse(localStorage.getItem("ohlcvData"));
	};

	fetchAllTickers = async () => {
		const { data } = await service.fetchOhlcv();
		const addExtraData = data.map(item => ({
			...item,
			bg: "white"
		}));
		this.setState({ market: addExtraData }, () => {
			this.getSocket();
		});
	};

	getSocket() {
		this.socket.onmessage = ({ data }) => {
			this.setState(state => ({
				market: state.market.map(item => {
					const last = JSON.parse(data).find(ws => ws.s === item.id);
					return {
						...item,
						ticker: {
							...item.ticker,
							last: !!last ? Number(last.c) : Number(item.ticker.last),
							percentage: !!last
								? percentage({ lastPrice: last.c, openPrice: last.o })
								: Number(item.ticker.percentage)
						},
						fib: {
							...item.fib,
							s1: {
								...item.fib.s1,
								percentage: !!last
									? percentage({ lastPrice: last.c, openPrice: item.data.s1 })
									: item.fib.s1.percentage
							}
						},
						bg: last
							? Number(last.c) > Number(item.ticker && item.ticker.last)
								? "#42f474"
								: Number(last.c) < Number(item.ticker && item.ticker.last)
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
			item =>
				[item.id, item.fib.s1.toString()]
					.join("")
					.indexOf(this.state.search.toUpperCase()) !== -1
		);

		const {
			id,
			ticker,
			rsi: { daily, fourly },
			market: { precision },
			bg,
			fib: { s3, s2, s1, p, r3, r2, r1 },
			ma: { maFourly }
		} = filteredData[index];

		return (
			<View
				style={[
					{
						flexDirection: "row",
						justifyContent: "space-between",
						flex: 1,
						borderBottomColor: "black",
						borderWidth: 1
					},
					style
				]}
				key={key}
			>
				<TextCenter text={id} />
				<TextCenter
					text={fixedNumberBy(ticker.last, precision.price)}
					backgroundColor={bg}
					bold
				/>
				<TextCenter
					text={Number(ticker.percentage).toFixed(2)}
					percentage
					backgroundColor={
						ticker.percentage > 0
							? "#42f474"
							: ticker.percentage < 0
							? "#f44141"
							: "white"
					}
				/>

				<TextCenter
					text={fixedNumberBy(fourly.lastRSI, 2)}
					backgroundColor={fourly.lastRSI < 25 ? "#42f474" : "white"}
				/>
				<TextCenter
					text={fixedNumberBy(daily.lastRSI, 2)}
					backgroundColor={daily.lastRSI < 25 ? "#42f474" : "white"}
				/>
				<TextCenter
					text={s1.percentage}
					percentage
					backgroundColor={s1.percentage < 1 ? "#42f474" : "white"}
				/>
				<TextCenter
					text={maFourly.percentage}
					percentage
					backgroundColor={ticker.last > maFourly.price ? "#42f474" : "#f44141"}
				/>

				<TextCenter text={fixedNumberBy(r3.price, precision.price)} />
				<TextCenter text={fixedNumberBy(r2.price, precision.price)} />
				<TextCenter text={fixedNumberBy(r1.price, precision.price)} />
				<TextCenter text={fixedNumberBy(p.price, precision.price)} />
				<TextCenter text={fixedNumberBy(s1.price, precision.price)} />
				<TextCenter text={fixedNumberBy(s2.price, precision.price)} />
				<TextCenter text={fixedNumberBy(s3.price, precision.price)} />
			</View>
		);
	};
	render() {
		const filterBase = this.state.market.filter(
			item => item.base === this.state.base
		);

		const filteredData = filterBase.filter(
			item =>
				[item.id, item.fib.s1.toString()]
					.join("")
					.indexOf(this.state.search.toUpperCase()) !== -1
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
						onValueChange={itemValue => this.setState({ base: itemValue })}
					>
						<Picker.Item label="BTC" value="BTC" />
						<Picker.Item label="USDT" value="USDT" />
						<Picker.Item label="TUSD" value="TUSD" />
						<Picker.Item label="PAX" value="PAX" />
						<Picker.Item label="ETH" value="ETH" />
					</Picker>

					<View
						style={{ flexDirection: "row", alignItems: "center", width: "20%" }}
					/>
					<Text>Search :</Text>
					<TextInput
						onChange={({ target: { value } }) =>
							this.setState({ search: value })
						}
						style={{
							borderColor: "black",
							width: 150,
							height: 25,
							borderWidth: 1
						}}
					/>
				</View>
				<HeaderIndicator />
				<AutoSizer>
					{({ width }) => (
						<List
							style={{ marginTop: 40 }}
							rowCount={filteredData.length}
							rowRenderer={this.renderIndicator}
							width={width}
							height={580}
							overscanRowCount={10}
							rowHeight={35}
						/>
					)}
				</AutoSizer>
			</View>
		);
	}
}

const HeaderIndicator = () => (
	<View
		style={{
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			top: 40,
			borderColor: "black",
			backgroundColor: "white",
			borderWidth: 1
		}}
	>
		<TextCenter bold text="Pair" />
		<TextCenter bold text="Last Price" />
		<TextCenter bold text="24h Chg%" />
		<TextCenter bold text="RSI 4H" />
		<TextCenter bold text="RSI 1D" />
		<TextCenter bold text="S1%" />
		<TextCenter bold text="MA90%" />
		<TextCenter bold text="R3" />
		<TextCenter bold text="R2" />
		<TextCenter bold text="R1" />
		<TextCenter bold text="P" />
		<TextCenter bold text="S1" />
		<TextCenter bold text="S2" />
		<TextCenter bold text="S3" />
	</View>
);

const TextCenter = ({ text, percentage, bold, backgroundColor }) => (
	<View
		style={{
			width: "6.0%",
			alignItems: "center",
			backgroundColor,
			justifyContent: "center"
		}}
	>
		<Text style={{ fontWeight: bold ? "bold" : "normal" }}>
			{text} {percentage ? "%" : ""}
		</Text>
	</View>
);
export default App;

const percentage = ({ lastPrice, openPrice }) => {
	return (
		((toNumber(lastPrice) - toNumber(openPrice)) / toNumber(openPrice)) *
		100
	).toFixed(2);
};

const fixedNumberBy = (number, precision) => Number(number).toFixed(precision);

const toNumber = item => Number(item);
