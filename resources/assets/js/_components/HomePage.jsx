import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, drinkActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(drinkActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users, drinks } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                {users.loading && <em>Loading drinks...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}

                {drinks.items &&
                    <ul className="chalkboard chalk list-group">
                        <li className="list-group-item">
                            <h1 className="chalk-fancy">Wired Cafe</h1>
                        </li>
                        {drinks.items.map((drink, index) =>
                            <li key={drink.id} className="list-group-item">
                                <h3>{drink.name} <small> - {drink.dosage}mg</small></h3>
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, drinks } = state;
    const { user } = authentication;
    return {
        user,
        users,
        drinks,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
