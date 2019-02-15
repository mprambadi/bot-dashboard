import React from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "../component/Navigation";
import NavLeft from "../component/NavLeft";
import Home from "./Home";

const RootNavigation = () => {
	return (
		<Router>
			<React.Fragment>
				<Navigation />
				<Container>
					<Row>
						<Col>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/login" render={() => <div>Login</div>} />
								<Route path="/dashboard" render={() => <div>Dashboard</div>} />
							</Switch >
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		</Router>
	);
};

export default RootNavigation;
