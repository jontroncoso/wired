import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { drinkActions, sipActions } from '../_actions';

import { timer, halfLife, healthPercentage } from '../_helpers';

class HomePage extends React.Component {

    state = {
        speechBubble: '',
        amount: 0,
    }

    componentDidMount() {
        this.props.dispatch(drinkActions.getAll());
        this.props.dispatch(sipActions.getAll());
        this.setState({timer: setInterval(this.tick, 100)});
    }

    tick = () => {
        const unix_now = Math.round((new Date()).getTime() / 1000);
        const amount = this.props.sips.items
            .map(sip => halfLife({sip, unix_now}))
            .reduce((a, b) => a + b, 0);

        this.setState({
            amount,
            health: healthPercentage({amount})
        });
    }

    componentWillUnmount() {
        this.clearInterval(this.state.timer);
    }

    onMouseOver = drink => e => this.setState({speechBubble: drink.description});
    onMouseOut = e => this.setState({speechBubble: ''});

    consume = drink => e => this.props.dispatch(sipActions.consume(drink));

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
                                <li
                                    key={drink.id}
                                    className="list-group-item"
                                    onMouseOver={this.onMouseOver(drink)}
                                    onMouseOut={this.onMouseOut}
                                    onClick={this.consume(drink)}
                                    >
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
                <pre className="col">{this.state.amount}</pre>
                <pre className="col">{this.state.health}</pre>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, drinks, sips } = state;
    const { user } = authentication;
    return {
        user,
        drinks,
        sips,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
