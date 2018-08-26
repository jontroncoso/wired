import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { drinkActions, sipActions, authActions } from '../_actions';

import { timer, halfLife, healthPercentage, displayFace } from '../_helpers';

class HomePage extends React.Component {

    state = {
        speechBubble: '',
        amount: 0,
    }

    componentDidMount() {
        this.props.dispatch(drinkActions.getAll());
        this.props.dispatch(sipActions.getAll());
        this.setState({timer: setInterval(this.tick, 100)});
        if(!this.props.users || !this.props.users.item || !this.props.users.item.id) {
            this.props.dispatch(authActions.getMe());
        }
    }

    tick = () => {
        const unix_now = Math.round((new Date()).getTime());
        const me = this.props.users.item ? this.props.users.item : [];
        const amount = (this.props.sips.items ? this.props.sips.items : [])
            .map(sip => halfLife({sip, unix_now, metabolism: me.metabolism}))
            .reduce((a, b) => a + b, 0);
        const health = healthPercentage({amount});

        this.setState({
            amount,
            health,
            face: displayFace({health}),
        });
    }

    componentWillUnmount() {
        this.clearInterval(this.state.timer);
    }

    onMouseOver = drink => e => this.setState({speechBubble: drink.description});
    onMouseOut = e => this.setState({speechBubble: ''});

    consume = drink => e => this.props.dispatch(sipActions.consume(drink));

    logout = e =>
    {
        this.props.dispatch(authActions.logout());
        window.location.href = '/';
    }

    render() {
        const { user, drinks } = this.props;
        return (
            <div className="row store-front">
                <div className="col-12"><button onClick={this.logout} className="btn btn-primary">Log Out</button></div>
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
                    <div className="dude text-right">
                        <h2>{this.props.users.item.name}</h2>
                        <div className="face" dangerouslySetInnerHTML={{__html: this.state.face}}></div>
                        {this.state.speechBubble && <div className="speech-bubble">{this.state.speechBubble}</div>}
                        <div className="health-bar">
                            <div className="progress" style={{width: this.state.health + '%'}}>
                                <span className={this.state.health < 20 ? 'aligned-left' : 'aligned-right'}>{Math.round(this.state.amount)}mg</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, drinks, sips, users } = state;
    const { user } = authentication;
    return {
        user,
        drinks,
        sips,
        users,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
