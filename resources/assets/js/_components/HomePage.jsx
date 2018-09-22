import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { authActions } from '../_actions';

import { PokemonSearch } from '../_shared';

class HomePage extends React.Component {

    render() {
        const { loggedIn } = this.props;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2><strong>Welcome</strong> to the World of Tomorrow!!!</h2>
                <p>This is a collection of the various code-challenges people have asked me to do.</p>
                { loggedIn
                    ? (<Link to="/cafe">Click Here to see the Cafe</Link>)
                    : (<Link to="/login">Click Here to login to the Cafe</Link>)
                }
                <PokemonSearch placeholder="Type in here to search for pokemon"></PokemonSearch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
