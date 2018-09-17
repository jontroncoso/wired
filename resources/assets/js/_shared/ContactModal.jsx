/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux';
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

import { contactActions, validationActions } from '../_actions';
class ContactModal extends React.Component {

    state = { contact:
        {
            subject: '',
            body: '',
        }
    };

    onChange = e =>
    {
        this.setState({contact: { ...this.state.contact, [e.target.name]: e.target.value }});
        this.props.dispatch(validationActions
            .error({
                [e.target.name]: (
                    e.target.value.search(/[0-9]{3}[^0-9][0-9]{2}[^0-9][0-9]{4}/) > -1
                    ? ['SSN detected! Please don\'t pass sensitive information!']
                    : []
                )}));
    }
    sendMessage = e => {
        e.preventDefault();
        this.props.dispatch(contactActions.save(this.state.contact));
    }

    render() {
        const { contact } = this.state;
        const { validation } = this.props;
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
                                invalid={validation.errors.subject && validation.errors.subject.length > 0}
                                />
                            { !(validation.errors.subject && validation.errors.subject.length) ? ''
                                : validation.errors.subject.map((error, index) => <FormFeedback key={index}>{error}</FormFeedback>) }
                        </FormGroup>
                        <Input
                            id="contact-body"
                            type="textarea"
                            value={contact.body}
                            name="body"
                            onChange={this.onChange}
                            placeholder="Message"
                            invalid={validation.errors.body && validation.errors.body.length > 0}
                            />
                        { !(validation.errors.body && validation.errors.body.length) ? ''
                            : validation.errors.body.map((error, index) => <FormFeedback key={index}>{error}</FormFeedback>) }
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

function mapStateToProps(state) {
    const { validation, contact } = state;
    return { validation, contact };
}

const connectedContactModal = connect(mapStateToProps)(ContactModal);
export { connectedContactModal as ContactModal };
