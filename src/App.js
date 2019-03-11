import React from "react";
import Axios from "axios";
import classNames from "classnames";
import NavbarHeader from "./component/Navbar";
import ModalExample from "./component/Modal";
import { NavItem, NavLink } from "reactstrap";

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
		toggle: {
			ticker: {
				last: ""
			},
			rsi: {
				daily: "",
				fourly: "",
				secondHourly: "",
				fifteen: "",
				thirty: "",
				hourly: "",
				five: ""
			},
			fib: { s3: "", s2: "", s1: "", p: "", r3: "", r2: "", r1: "" },
			market: { precision: "" },
			id: "",
			ma: {
				maDaily: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				},
				maFourly: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				},
				maSecondHourly: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				},
				maHourly: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				},
				maThirty: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				},
				maFifteen: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				},
				maFive: {
					ninety: {
						price: "",
						cross: {
							up: "",
							down: ""
						},
						condition: {
							bearish: "",
							bullish: ""
						}
					}
				}
			}
		},
		modal: false,
		page: "dashboard"
	};

	componentDidMount() {
		this.fetchAllTickers();
		this.interval = setInterval(async () => {
			const { data } = await service.fetchOhlcv();
			this.setState(state => ({
				market: state.market.map((item, index, arr) => {
					return {
						bg: item.bg,
						togle: arr[0],
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
			bg: "white"
		}));
		this.setState({ market: addExtraData }, () => {
			this.getSocket();
		});
	};

	togglePressed = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
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
							quoteVolume: !!last ? last.q : item.ticker.quoteVolume,
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
								? "bg-success"
								: Number(last.c) < Number(item.ticker && item.ticker.last)
								? "bg-danger"
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

	setPage = value => {
		this.setState({ page: value });
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

		let favorites = filteredData;

		switch (page) {
			case "usdt":
				favorites = market.filter(item => item.base === "USDT");
				break;
			case "ma725":
				favorites = market.filter(
					item => item.ma.maFourly.twentyFiveSeven.cross.up === true
				);
				break;
			case "ma90":
				favorites = market.filter(
					item => item.ma.maFourly.ninety.cross.up === true
				);
				break;
			case "macd1d":
				favorites = market.filter(
					item => item.macd.macdDaily.cross.up === true
				);
				break;
			case "macd4h":
				favorites = market.filter(
					item => item.macd.macdFourly.cross.up === true
				);
				break;
			case "macd2h":
				favorites = market.filter(
					item => item.macd.macdSecondHourly.cross.up === true
				);
				break;
			case "macd1h":
				favorites = market.filter(
					item => item.macd.macdHourly.cross.up === true
				);
				break;
			case "macd30":
				favorites = market.filter(
					item => item.macd.macdThirty.cross.up === true
				);
				break;
			case "macd15":
				favorites = market.filter(
					item => item.macd.macdFifteen.cross.up === true
				);
				break;
			case "macd5":
				favorites = market.filter(item => item.macd.macdFive.cross.up === true);
				break;
			case "favorite":
				favorites = favorite.map(item =>
					market.find(filter => filter.id === item)
				);
				break;
			default:
				favorites = filteredData;
				break;
		}

		const {
			rsi: { daily, fourly, secondHourly, fifteen, thirty, hourly, five },
			fib: { s3, s2, s1, p, r3, r2, r1 },
			ma
		} = this.state.toggle;
		return (
			<div>
				<NavbarHeader>
					<NavItem>
						<NavLink
							onClick={() => this.setState({ page: "dashboard", base: "BTC" })}
						>
							Dashboard <span className="sr-only">(current)</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink onClick={() => this.setState({ page: "usdt" })}>
							USDT <span className="sr-only">(current)</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink onClick={() => this.setState({ page: "ma725" })}>
							MA 7/25 UP
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink onClick={() => this.setState({ page: "macd4h" })}>
							MACD 4h Up
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink onClick={() => this.setState({ page: "favorite" })}>
							Favorite {this.state.favorite.length}
						</NavLink>
					</NavItem>
					<NavItem>
						<form className="form-inline my-2 my-lg-0">
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
								onChange={({ target: { value } }) =>
									this.setState({ search: value })
								}
							/>
						</form>
					</NavItem>
				</NavbarHeader>

				<div className="table-responsive">
					<table className="table table-hover mt-2" cellPadding="10">
						<thead>
							<tr className=" text-center m-2">
								<th onClick={() => this.setPage("dashboard")}>Pair</th>
								<th>Last Price</th>
								<th>24h Chg</th>
								<th>Volume</th>
								<th>S1%</th>
								<th onClick={() => this.setPage("ma90")}>MA90%</th>
								<th onClick={() => this.setPage("ma725")}>MA7/25</th>
								<th onClick={() => this.setPage("macd5")}>MACD5m</th>
								<th onClick={() => this.setPage("macd15")}>MACD15m</th>
								<th onClick={() => this.setPage("macd30")}>MACD30m</th>
								<th onClick={() => this.setPage("macd1h")}>MACD1h</th>
								<th onClick={() => this.setPage("macd2h")}>MACD2h</th>
								<th onClick={() => this.setPage("macd4h")}>MACD4h</th>
								<th onClick={() => this.setPage("macd1d")}>MACD1d</th>
							</tr>
						</thead>
						<tbody>
							{favorites.map(item => {
								const {
									id,
									ticker,
									market: { precision },
									bg,
									fib,
									ma: {
										maFourly: { ninety, twentyFiveSeven }
									},
									macd: {
										macdFive,
										macdFifteen,
										macdThirty,
										macdHourly,
										macdSecondHourly,
										macdFourly,
										macdDaily
									}
								} = item;
								return (
									<tr key={id} className=" text-center">
										<td
											onClick={() =>
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
										>
											{id}
										</td>
										<td
											className={classNames(bg, "m-5")}
											onClick={() =>
												this.setState(state => ({
													...state,
													toggle: item,
													modal: true
												}))
											}
										>
											{fixedNumberBy(ticker.last, precision.price)}
										</td>
										<td
											className={
												ticker.percentage > 0
													? "bg-success"
													: ticker.percentage < 0
													? "bg-danger"
													: "white"
											}
										>
											{Number(ticker.percentage).toFixed(2)} %
										</td>
										<td>{fixedNumberBy(ticker.quoteVolume, 2)}</td>
										<td className={fib.s1.percentage < 0 && "bg-success"}>
											{fib.s1.percentage}%
										</td>
										<td
											className={
												ninety.cross.up
													? "bg-success"
													: ninety.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{ninety.percentage}%{" "}
										</td>
										<td
											className={
												twentyFiveSeven.cross.up
													? "bg-success"
													: twentyFiveSeven.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{twentyFiveSeven.percentage.last}
										</td>
										<td
											className={
												macdFive.cross.up
													? "bg-success"
													: macdFive.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdFive.percentage.last}
										</td>
										<td
											className={
												macdFifteen.cross.up
													? "bg-success"
													: macdFifteen.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdFifteen.percentage.last}
										</td>
										<td
											className={
												macdThirty.cross.up
													? "bg-success"
													: macdThirty.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdThirty.percentage.last}
										</td>
										<td
											className={
												macdHourly.cross.up
													? "bg-success"
													: macdHourly.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdHourly.percentage.last}
										</td>
										<td
											className={
												macdSecondHourly.cross.up
													? "bg-success"
													: macdSecondHourly.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdSecondHourly.percentage.last}
										</td>
										<td
											className={
												macdFourly.cross.up
													? "bg-success"
													: macdFourly.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdFourly.percentage.last}
										</td>
										<td
											className={
												macdDaily.cross.up
													? "bg-success"
													: macdDaily.cross.down
													? "bg-danger"
													: "white"
											}
										>
											{macdDaily.percentage.last}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{!!this.state.market.length || (
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				)}

				<ModalExample
					modal={this.state.modal}
					toggle={this.togglePressed}
					item={this.state.toggle}
				>
					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<td>R3</td>
									<td>R2</td>
									<td>R1</td>
									<td>P</td>
									<td>S1</td>
									<td>S2</td>
									<td>S3</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{fixedNumberBy(
											r3.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td>
										{fixedNumberBy(
											r2.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td>
										{fixedNumberBy(
											r1.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td>
										{fixedNumberBy(
											p.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td>
										{fixedNumberBy(
											s1.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td>
										{fixedNumberBy(
											s2.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td>
										{fixedNumberBy(
											s3.price,
											this.state.toggle.market.precision.price
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<td>RSI 5m</td>
									<td>RSI 15m</td>
									<td>RSI 30m</td>
									<td>RSI 1h</td>
									<td>RSI 2h</td>
									<td>RSI 4h</td>
									<td>RSI 1d</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className={five.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(five.lastRSI, 2)}
									</td>
									<td className={fifteen.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(fifteen.lastRSI, 2)}
									</td>
									<td className={thirty.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(thirty.lastRSI, 2)}
									</td>
									<td className={hourly.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(hourly.lastRSI, 2)}
									</td>
									<td className={secondHourly.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(secondHourly.lastRSI, 2)}
									</td>
									<td className={fourly.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(fourly.lastRSI, 2)}
									</td>
									<td className={daily.lastRSI < 25 && "bg-success"}>
										{fixedNumberBy(daily.lastRSI, 2)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<td>MA90 5m</td>
									<td>MA90 15m</td>
									<td>MA90 30m</td>
									<td>MA90 1h</td>
									<td>MA90 2h</td>
									<td>MA90 4h</td>
									<td>MA90 1d</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										className={
											ma.maFive.ninety.price < this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maFive.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td
										className={
											ma.maFifteen.ninety.price < this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maFifteen.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td
										className={
											ma.maThirty.ninety.price < this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maThirty.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td
										className={
											ma.maHourly.ninety.price < this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maHourly.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td
										className={
											ma.maSecondHourly.ninety.price <
											this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maSecondHourly.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td
										className={
											ma.maFourly.ninety.price < this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maFourly.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
									<td
										className={
											ma.maDaily.ninety.price < this.state.toggle.ticker.last
												? "bg-success"
												: "bg-danger"
										}
									>
										{fixedNumberBy(
											ma.maDaily.ninety.price,
											this.state.toggle.market.precision.price
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</ModalExample>
			</div>
		);
	}
}

export default App;

const percentage = ({ lastPrice, openPrice }) => {
	return (
		((toNumber(lastPrice) - toNumber(openPrice)) / toNumber(openPrice)) *
		100
	).toFixed(2);
};

const fixedNumberBy = (number, precision) => Number(number).toFixed(precision);

const toNumber = item => Number(item);
