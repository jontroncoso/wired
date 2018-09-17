/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
    Button,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import { contactActions } from '../_actions';
export class DrinkModal extends React.Component {

    state = { drink:
        {
            name: '',
            description: '',
            price: 0,
            dosage: 0,
            id: 0,
        }
    };

    componentDidUpdate(previousProps)
    {
        if (this.props.drink && this.props.drink.id !== previousProps.drink.id) {
            this.resetForm();
        }
    }

    onChange = e => this.setState({drink: { ...this.state.drink, [e.target.name]: e.target.value }})
    resetForm = e => this.setState({ drink: this.props.drink});
    consume = e => this.props.dispatch(sipActions.consume(this.state.drink));
    removeDrink = e => this.props.dispatch(drinkActions.remove(this.state.drink.id));
    saveDrink = e => {
        e.preventDefault();
        this.props.dispatch(drinkActions.save(this.state.drink));
    }

    render() {
        const { drink } = this.state;
        const { isAdmin } = this.props;
        if(!drink) return (<div></div>);
        return (
            <Modal isOpen={this.props.open} toggle={this.props.close} className={this.props.className}>
                <Form onSubmit={this.saveDrink}>
                    <div className="modal-header">
                        <h5 className="modal-title">{drink.name}</h5>
                        <span className="float-right">${drink.price}</span>
                    </div>
                    <ModalBody>
                        { !isAdmin ? drink.description : (
                            <div>
                                <FormGroup>
                                    <Label for="drink-name">Name</Label>
                                    <Input
                                        id="drink-name"
                                        value={drink.name}
                                        name="name"
                                        onChange={this.onChange}
                                        />
                                </FormGroup>

                                <FormGroup row>
                                    <Col sm={6}>
                                        <Label for="drink-price">Price</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                            <Input
                                                id="drink-price"
                                                type="number"
                                                step=".01"
                                                value={drink.price}
                                                name="price"
                                                onChange={this.onChange}
                                                />
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <Label for="drink-dosage">Dosage</Label>
                                        <InputGroup>
                                            <Input
                                                id="drink-dosage"
                                                type="number"
                                                step="1"
                                                value={drink.dosage}
                                                name="dosage"
                                                onChange={this.onChange}
                                                />
                                            <InputGroupAddon addonType="append">mg</InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="drink-description">Description</Label>
                                    <Input
                                        id="drink-description"
                                        type="textarea"
                                        value={drink.description}
                                        name="description"
                                        onChange={this.onChange}
                                        />
                                </FormGroup>
                            </div>
                        )}
                    </ModalBody>
                    { !isAdmin ?
                        (<ModalFooter>
                            <span>{drink.dosage}mg</span>
                            <Button color="primary" onClick={this.consume}>Drink</Button>
                            <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                        </ModalFooter>)
                        :
                        (<ModalFooter>
                            <span>{drink.dosage}mg</span>
                            { !this.state.drink.id ? '' : (<Button color="primary" onClick={this.consume}>Drink</Button>) }
                            <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                            <Button color="success" type="submit">Save</Button>
                            <Button color="danger" onClick={this.removeDrink}>Delete</Button>
                        </ModalFooter>)
                    }
                </Form>
            </Modal>
        );
    }
}
