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

    state = { contactForm:
        {
            subject: '',
            body: '',
        }
    };

    onChange = e =>
    {
        this.setState({contactForm: { ...this.state.contactForm, [e.target.name]: e.target.value }});
        this.validateText(e.target.name, e.target.value);
    }
    validateText = (name, value) => {
        const validated = (value.search(/[0-9]{3}[^0-9][0-9]{2}[^0-9][0-9]{4}/) === -1);
        const existingErrors = this.props.validation.errors[name] ? this.props.validation.errors[name] : [];
        const errorMessage = 'SSN detected! Please don\'t pass sensitive information!';

        // need to add error to errors
        if(!validated && existingErrors.indexOf(errorMessage) === -1)
        {
            existingErrors.push(errorMessage);
            this.props.dispatch(validationActions.error({ [name]: existingErrors }));
        }

        // need to remove all errors
        if(validated && existingErrors.indexOf(errorMessage) > -1)
        {
            this.props.dispatch(validationActions.error({ [name]: [] }));
        }
    }
    sendMessage = e => {
        e.preventDefault();
        this.props.dispatch(contactActions.save(this.state.contactForm));
    }

    render() {
        const { contactForm } = this.state;
        const { validation } = this.props;

        return (
            <Modal isOpen={this.props.open}>
                <Form onSubmit={this.sendMessage}>
                    <ModalHeader>Contact Me</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input
                                id="contact-subject"
                                value={contactForm.subject}
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
                            value={contactForm.body}
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
    const { validation } = state;
    return { validation };
}

const connectedContactModal = connect(mapStateToProps)(ContactModal);
export { connectedContactModal as ContactModal };
