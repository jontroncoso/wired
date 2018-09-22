/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { connect } from 'react-redux';

import { pokemonActions } from '../_actions';

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
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

class PokemonSearch extends React.Component {
    state = {
        value: '',
        timeout: 0,
    }

    onChange = e =>
    {
        clearTimeout(this.state.timeout);
        this.setState({
            ...this.state,
            value: e.target.value,
            timeout: this.searchForPokemon(e.target.value),
        });
    }

    searchForPokemon = (value) =>
    {
        clearTimeout(this.state.timeout);
        if(!value) { return false; }
        return setTimeout(() => this.props.dispatch(pokemonActions.search(value)), 500);
    };

    render() {
        const { value } = this.state;
        const { pokemon } = this.props;
        return (
            <div>
                <Input
                    placeholder={this.props.placeholder}
                    value={value}
                    onChange={this.onChange}
                    name="value"
                    />
                <ListGroup>
                    { pokemon.map(p => (
                        <ListGroupItem>
                            <h5>{p.name}</h5>
                            <p>
                                {p.types.map(t => (
                                    <span>{t.name} </span>
                                ))}
                            </p>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const pokemon = state.pokemon.items;
    return { pokemon };
}

const connectedPokemonSearch = connect(mapStateToProps)(PokemonSearch);
export { connectedPokemonSearch as PokemonSearch };
