import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, drinkActions } from '../_actions';

class HomePage extends React.Component {

    state = {
        speechBubble: '',
    }

    componentDidMount() {
        this.props.dispatch(drinkActions.getAll());
    }

    componentWillUnmount() {

    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    onMouseOver(drink) {
        return e =>
        {
            console.log('drink ', drink);
            this.setState({speechBubble: drink.description});
        }
    }
    onMouseOut = (e) => {
        this.setState({speechBubble: ''});
    }

    render() {
        const { user, drinks } = this.props;
        return (
            <div className="row store-front">
                <div className="col-md-6">
                    {drinks.loading && <em>Loading drinks...</em>}
                    {drinks.error && <span className="text-danger">ERROR: {drinks.error}</span>}

                    {drinks.items &&
                        <ul className="chalkboard chalk list-group">
                            <li className="list-group-item">
                                <h1 className="chalk-fancy">Wired Cafe</h1>
                            </li>
                            {drinks.items.map((drink, index) =>
                                <li key={drink.id} className="list-group-item" onMouseOver={this.onMouseOver(drink)} onMouseOut={this.onMouseOut}>
                                    <button className="btn-link btn btn-lg">{drink.name}</button> <small> - {drink.dosage}mg</small>
                                </li>
                            )}
                        </ul>
                    }
                </div>
                <div className="col-md-6 in-front">
                    <div className="dude text-md-center text-right">
                        <span>&#128563;</span>
                            {this.state.speechBubble && <div className="speech-bubble">{this.state.speechBubble}</div>}

                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, drinks } = state;
    const { user } = authentication;
    return {
        user,
        drinks,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
