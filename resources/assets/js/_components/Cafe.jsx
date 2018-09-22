import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import { drinkActions, sipActions, authActions } from '../_actions';
import { timer, halfLife, healthPercentage, displayFace } from '../_helpers';
import { DrinkModal, ContactModal } from '../_shared';

class Cafe extends React.Component {

    state = {
        speechBubble: '',
        amount: 0,
        formattedSips: [],
    };

    constructor(props) {
        super(props);
        if (props.match.params.id) {
            props.dispatch(drinkActions.get(props.match.params.id));
        }
    }

    componentDidUpdate(previousProps)
    {
        if (this.props.match.params.id && this.props.match.params.id !== previousProps.match.params.id) {
            this.props.dispatch(drinkActions.get(this.props.match.params.id));
        }
        if (this.props.drinks.modalPosition === 'closed' && this.props.drinks.modalPosition !== previousProps.drinks.modalPosition) {
            this.closeModal();
        }

        if(this.props.contact.modalPosition === 'closed' && this.props.contact.modalPosition !== previousProps.contact.modalPosition){
            this.toggleContactModal();
        }

    }

    componentDidMount() {
        this.props.dispatch(drinkActions.getAll());
        this.props.dispatch(sipActions.getAll());
        this.setState({timer: setInterval(this.tick, 100)});
        if(!this.props.users || !this.props.users.item || !this.props.users.item.id) {
            this.props.dispatch(authActions.getMe());
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    tick = (returnObject = false) => {
        const unix_now = Math.round((new Date()).getTime());
        const me = this.props.users.item ? this.props.users.item : [];
        const formattedSips = (this.props.sips.items ? this.props.sips.items : [])
            .map(sip => {
                const amount = halfLife({sip, unix_now, metabolism: me.metabolism});
                const health = healthPercentage({amount});
                // console.log('amount ', amount);
                // console.log('health ', health);
                const drink = this.props.drinks.items.find(d => d.id === sip.drink_id);
                const momentCreated = moment.unix(sip.created_at);
                return {
                    amount,
                    health,
                    drink,
                    momentCreated,
                    ...sip,
                }
            });
        const amount = formattedSips.reduce((a, b) => a + b.amount, 0);
        const health = healthPercentage({amount});
        const newState = {
            amount,
            health,
            formattedSips,
            face: displayFace({health}),
        };
        if(returnObject) { return newState; }
        this.setState(newState);
    }

    onMouseOver = drink => e => this.setState({speechBubble: drink.description});
    onMouseOut = e => this.setState({speechBubble: ''});

    logout = e =>
    {
        this.props.dispatch(authActions.logout());
        window.location.href = '/login';
    }

    createDrinkModal = e => this.props.dispatch(drinkActions.createDrinkModal());
    closeModal = e => {
        this.props.dispatch(drinkActions.closeModal());
        this.props.dispatch(drinkActions.getAll());
        this.props.dispatch(sipActions.getAll());
        this.props.history.push('/cafe');
    }

    toggleContactModal = e => this.setState({ contactModalPosition: !this.state.contactModalPosition });

    render() {
        const { users, drinks, alert } = this.props;

        return (
            <div className="row store-front">
                <div className="col-12">
                    <button onClick={this.logout} className="btn btn-primary">Log Out</button>
                    <button onClick={this.createDrinkModal} className="btn btn-success">Add Drink</button>
                    <button onClick={this.toggleContactModal} className="btn btn-secondary">Contact Me</button>
                </div>
                <div className="col-md-6">
                    {drinks.loading && <em>Loading drinks...</em>}
                    {drinks.error && <span className="text-danger">ERROR: {drinks.error}</span>}

                    {drinks.items &&
                        <div className="chalkboard chalk list-group">
                            <h1 className="chalk-fancy">Wired Cafe</h1>
                            {drinks.items.map((drink, index) =>
                                <Link
                                    key={drink.id}
                                    onMouseOver={this.onMouseOver(drink)}
                                    onMouseOut={this.onMouseOut}
                                    className="btn-link btn-lg list-item"
                                    to={'/cafe/' + drink.id}
                                    >
                                    <span>{drink.name}</span>
                                     <small> - {drink.dosage}mg</small>
                                     <small> - ${drink.price}</small>
                                </Link>
                            )}
                        </div>
                    }
                </div>
                <div className="col-md-6 in-front">
                    <div className="dude text-right">
                        <h2 className="text-left">{this.props.users.item.name}</h2>
                        <div className="health-bar">
                            <div className="progress" style={{width: this.state.health + '%'}}>
                                <span className={this.state.health < 20 ? 'aligned-left' : 'aligned-right'}>{Math.round(this.state.amount)}mg</span>
                            </div>
                        </div>
                        <div className="face" dangerouslySetInnerHTML={{__html: this.state.face}}></div>
                        {this.state.speechBubble && <div className="speech-bubble">{this.state.speechBubble}</div>}

                    </div>

                    <div className="log">
                        {this.state.formattedSips.map((sip, index) =>
                            (
                                <div className="log-entry" key={sip.drink_id + '-' + sip.user_id + '-' + sip.created_at}>
                                    <h4>{sip.drink.name} | {sip.id}</h4>
                                    <div className="health-bar">
                                        <div className="progress" style={{width: sip.health + '%'}}>
                                            <span className={sip.health < 20 ? 'aligned-left' : 'aligned-right'}>{Math.round(sip.amount)}mg</span>
                                        </div>
                                    </div>
                                    <p>{sip.momentCreated.calendar()}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <ContactModal
                    errors={alert.errors}
                    dispatch={this.props.dispatch}
                    open={!!this.state.contactModalPosition}
                    close={this.toggleContactModal}
                    ></ContactModal>

                <DrinkModal
                    open={drinks.modalPosition === 'open'}
                    dispatch={this.props.dispatch}
                    isAdmin={users.isAdmin}
                    drink={drinks.item}
                    close={this.closeModal}
                    ></DrinkModal>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, drinks, sips, users, alert, contact } = state;
    const { user } = authentication;
    return { user, authentication, drinks, sips, users, alert, contact };
}

const connectedCafe = connect(mapStateToProps)(Cafe);
export { connectedCafe as Cafe };
