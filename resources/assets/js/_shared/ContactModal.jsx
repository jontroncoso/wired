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
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import { contactActions } from '../_actions';
export class ContactModal extends React.Component {

    state = { contact:
        {
            subject: '',
            body: '',
        }
    };

    onChange = e => this.setState({contact: { ...this.state.contact, [e.target.name]: e.target.value }})
    sendMessage = e => {
        e.preventDefault();
        this.props.dispatch(contactActions.save(this.state.contact)).then(() => {}, this.props.close);
    }

    render() {
        const { contact } = this.state;
        return (
            <Modal isOpen={this.props.open}>
                <Form onSubmit={this.sendMessage}>
                    <ModalHeader>Contact Me</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input
                                id="contact-subject"
                                value={contact.subject}
                                name="subject"
                                onChange={this.onChange}
                                placeholder="Subject"
                                />
                            { !this.props.errors ? '' : (<FormFeedback>{this.props.errors.subject}</FormFeedback>) }
                        </FormGroup>
                        <Input
                            id="contact-body"
                            type="textarea"
                            value={contact.body}
                            name="body"
                            onChange={this.onChange}
                            placeholder="Message"
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}
