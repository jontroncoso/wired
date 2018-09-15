/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { drinkActions } from '../_actions';
export class DrinkModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            drink: props.drink
        };
    }

    state = {
        open: false,
    }


    close = () => {
        this.setState({
            open: false
        });
    }

    //
    // onMouseOver = drink => e => this.setState({speechBubble: drink.description});
    // onMouseOut = e => this.setState({speechBubble: ''});

    render() {
        return (
            <Modal isOpen={this.props.open} toggle={this.props.close} className={this.props.className}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.close}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
