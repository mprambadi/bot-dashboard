import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalExample extends React.Component {
	render() {
		return (
			<div>
				<Modal
					isOpen={this.props.modal}
					toggle={this.props.toggle}
					className="modal-lg"
				>
					<ModalHeader toggle={this.toggle}>{this.props.item.id}</ModalHeader>
					<ModalBody>{this.props.children}</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.props.toggle}>
							Do Something
						</Button>
						<Button color="secondary" onClick={this.props.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ModalExample;
