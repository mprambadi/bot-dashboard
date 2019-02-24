import React from "react";
import "./App.css";
import { View, Text, Picker, TextInput, TouchableOpacity } from "react-native";
import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache
} from "react-virtualized";
import Axios from "axios";

const api = Axios.create({
	baseURL: "https://telegrafme.herokuapp.com/indicator"
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
		search: "",
		sort: false,
		favorite: [],
		page: "dashboard"
	};

	_cache = new CellMeasurerCache({ defaultHeight: 50, fixedWidth: true });
	_mostRecentWidth = 0;

	componentDidMount() {
		this.fetchAllTickers();
		this.interval = setInterval(async () => {
			const { data } = await service.fetchOhlcv();
			this.setState(state => ({
				market: state.market.map(item => {
					return {
						bg: item.bg,
						toggle: item.toggle,
						...data.find(res => res.id === item.id)
					};
				})
			}));
		}, 60000);
		this.getFavorite();
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
			bg: "white",
			toggle: false
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
	orderBy = () => {
		this.setState(state => {
			return {
				sort: !state.sort,
				market: state.sort
					? state.market.sort(
							(a, b) => a.ma.maFourly.percentage - b.ma.maFourly.percentage
					  )
					: state.market.sort(
							(a, b) => b.ma.maFourly.percentage - a.ma.maFourly.percentage
					  )
			};
		});
	};

	saveFavorite = () => {
		localStorage.setItem("favorite", JSON.stringify(this.state.favorite));
	};

	getFavorite = () => {
		const data = JSON.parse(localStorage.getItem("favorite"));
		this.setState({ favorite: data ? data : [] });
	};

	renderIndicator = ({ index, key, style, parent }) => {
		const { market, favorite, page, search, base } = this.state;

		const filterBase = market.filter(item => item.base === base);

		const filteredData = filterBase.filter(
			item =>
				[item.id, item.fib.s1.percentage]
					.join("")
					.indexOf(search.toUpperCase()) !== -1
		);

		const favorites =
			page === "dashboard"
				? filteredData
				: page === "ma725"
				? market.filter(
						item => item.ma.maFourly.twentyFiveSeven.cross.up === true
				  )
				: page === "macd"
				? market.filter(item => item.macd.cross.up === true)
				: favorite.map(item => market.find(filter => filter.id === item));

		const {
			id,
			ticker,
			rsi: { daily, fourly },
			market: { precision },
			bg,
			toggle,
			fib: { s3, s2, s1, p, r3, r2, r1 },
			ma: {
				maFourly: { ninety, twentyFiveSeven }
			},
			macd
		} = favorites[index];

		return (
			<CellMeasurer
				cache={this._cache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
				width={this._mostRecentWidth}
			>
				<View
					style={[
						{
							borderBottomColor: "black",
							borderWidth: 1,
							minHeight: 60
						},
						style
					]}
					key={key}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flex: 1
						}}
					>
						<TextCenter
							text={id}
							onPress={() =>
								this.setState(
									state => ({
										favorite:
											page === "dashboard"
												? [...state.favorite, id]
												: state.favorite.filter(item => item !== id)
									}),
									() => {
										this.saveFavorite();
									}
								)
							}
						/>

						<TextCenter
							text={fixedNumberBy(ticker.last, precision.price)}
							backgroundColor={bg}
							bold
							onPress={() =>
								this.setState(state => ({
									market: state.market.map(item =>
										item.id === id
											? { ...item, toggle: !item.toggle }
											: { ...item }
									)
								}))
							}
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
							text={ninety.percentage}
							percentage
							backgroundColor={
								ticker.last > ninety.price ? "#42f474" : "#f44141"
							}
						/>
						<TextCenter
							text={twentyFiveSeven.percentage.last}
							percentage
							backgroundColor={
								twentyFiveSeven.cross.up
									? "#42f474"
									: twentyFiveSeven.cross.down
									? "#f44141"
									: "white"
							}
						/>
						<TextCenter
							text={macd.percentage.last}
							percentage
							backgroundColor={
								macd.cross.up
									? "#42f474"
									: macd.cross.down
									? "#f44141"
									: "white"
							}
						/>

						<TextCenter text={fixedNumberBy(r3.price, precision.price)} />
						<TextCenter text={fixedNumberBy(r2.price, precision.price)} />
						<TextCenter text={fixedNumberBy(r1.price, precision.price)} />
						<TextCenter text={fixedNumberBy(p.price, precision.price)} />
						<TextCenter text={fixedNumberBy(s1.price, precision.price)} />
						<TextCenter text={fixedNumberBy(s2.price, precision.price)} />
						<TextCenter text={fixedNumberBy(s3.price, precision.price)} />
					</View>

					{toggle && (
						<View style={{ flex: 1, minHeight: 40, backgroundColor: "blue" }}>
							<View
								style={{
									flexDirection: "row",
									flex: 1,
									justifyContent: "space-around"
								}}
							>
								<Text>Ok 1</Text>
								<Text>Ok 2</Text>
								<Text>Ok 3</Text>
								<Text>Ok 4</Text>
								<Text>Ok 5</Text>
								<Text>Ok 6</Text>
								<Text>Ok 7</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									flex: 1,
									justifyContent: "space-around"
								}}
							>
								<Text>Ok 1</Text>
								<Text>Ok 2</Text>
								<Text>Ok 3</Text>
								<Text>Ok 4</Text>
								<Text>Ok 5</Text>
								<Text>Ok 6</Text>
								<Text>Ok 7</Text>
							</View>
						</View>
					)}
				</View>
			</CellMeasurer>
		);
	};

	render() {
		const { market, favorite, page, search, base } = this.state;

		const filterBase = market.filter(item => item.base === base);

		const filteredData = filterBase.filter(
			item =>
				[item.id, item.fib.s1.percentage]
					.join("")
					.indexOf(search.toUpperCase()) !== -1
		);

		const favorites =
			page === "dashboard"
				? filteredData
				: page === "ma725"
				? market.filter(
						item => item.ma.maFourly.twentyFiveSeven.cross.up === true
				  )
				: page === "macd"
				? market.filter(item => item.macd.cross.up === true)
				: favorite.map(item => market.find(filter => filter.id === item));

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
						alignItems: "center",
						justifyContent: "space-around"
					}}
				>
					<View style={{ flexDirection: "row" }}>
						<Text>Base Pair : </Text>
						<Picker
							selectedValue={base}
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
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
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

					<TextCenter
						text={"ma 7/25 up"}
						onPress={() => this.setState({ page: "ma725" })}
					/>
					<TextCenter
						text={"macd up"}
						onPress={() => this.setState({ page: "macd" })}
					/>
					<TextCenter
						text={`Favorite ${favorite.length}`}
						onPress={() => this.setState({ page: "favorite" })}
					/>
					<TextCenter
						text="Dashboard"
						onPress={() => this.setState({ page: "dashboard" })}
					/>
				</View>
				<HeaderIndicator orderBy={this.orderBy} />
				<AutoSizer>
					{({ width }) => {
						return (
							<List
								deferredMeasurementCache={this._cache}
								style={{ marginTop: 40 }}
								rowCount={favorites.length}
								rowRenderer={this.renderIndicator}
								width={width}
								height={600}
								overscanRowCount={1}
								rowHeight={this._cache.rowHeight}
							/>
						);
					}}
				</AutoSizer>
			</View>
		);
	}
}

const HeaderIndicator = ({ orderBy }) => (
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
		<TextCenter bold text="MA90%" onPress={() => orderBy()} />
		<TextCenter bold text="(MA7/25)%" />
		<TextCenter bold text="MACD%" />
		<TextCenter bold text="R3" />
		<TextCenter bold text="R2" />
		<TextCenter bold text="R1" />
		<TextCenter bold text="P" />
		<TextCenter bold text="S1" />
		<TextCenter bold text="S2" />
		<TextCenter bold text="S3" />
	</View>
);

const TextCenter = ({ text, percentage, bold, backgroundColor, onPress }) => (
	<TouchableOpacity
		style={{
			width: "6.0%",
			alignItems: "center",
			backgroundColor,
			justifyContent: "center"
		}}
		onPress={onPress}
	>
		<Text style={{ fontWeight: bold ? "bold" : "normal" }}>
			{text} {percentage ? "%" : ""}
		</Text>
	</TouchableOpacity>
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
