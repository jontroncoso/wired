import React from 'react';
import { Router, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, PrivateRoute } from '../_helpers';
import { alertActions } from '../_actions';
import { Cafe, LoginPage, RegisterPage, HomePage } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
    }

    render() {
        const { alert, authentication } = this.props;
        // if()
        return (
            <Router history={history}>
                <div>

                    <h1 className="col"><Link to="/">Jonathan Troncoso</Link></h1>
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    {alert.message &&
                                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                                    }
                                        <div>
                                            <Route exact path="/" component={HomePage} />
                                            <Route path="/login" component={LoginPage} />
                                            <Route path="/register" component={RegisterPage} />
                                            <PrivateRoute logout={authentication.logout} exact path="/cafe/:id?" component={Cafe} />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, alert } = state;
    return {
        alert,
        authentication,
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
