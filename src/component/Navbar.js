import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

export default class NavbarHeader extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Market Screener</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>


            
                {this.props.children}
             
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
