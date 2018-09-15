import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, PrivateRoute } from '../_helpers';
import { alertActions } from '../_actions';
import { HomePage, LoginPage, RegisterPage } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, authentication } = this.props;
        // if()
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    <Route exact path="/"  render={props => (
                                        localStorage.getItem('user')
                                            ? <Redirect to={{ pathname: '/cafe', state: { from: props.location } }} />
                                            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    )} />
                                <PrivateRoute logout={authentication.logout} exact path="/cafe/:id?" component={HomePage} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
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
