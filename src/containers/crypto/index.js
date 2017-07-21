import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Leadspace from '../../ui/leadspace';
import store from '../../store';
import {fetchCryptoData} from '../../modules/crypto';


const Crypto = props => {
    if (props.status === 'init') {
        store.dispatch(fetchCryptoData());
    }

    return (
        <section className="taco--crypto">
            <Leadspace title="Crypto Currencies" />
            <main className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            <a className="btn btn-primary" onClick={() => store.dispatch(fetchCryptoData())}>
                                refresh {props.status !== 'resolved' ? props.status : ''}
                            </a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    {props.status === 'rejected' ? (
                        <div className="alert alert-warning">
                            <p className="text-center">Whoops. Looks like we broke something. Sorry about that.</p>
                        </div>
                    ) : ''}
                    {props.currencies.map((curr) => (
                        <div className="col-sm-4" key={`crypto-${curr.name}`}>
                            <ul className="list-unstyled">
                                <li>
                                    <strong>{curr.name}</strong>
                                </li>
                                <li>
                                    <small>Last:</small> ${curr.price}
                                </li>
                                <li>
                                    <small>Updated:</small> {curr.timestamp}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
        </section>
    );
};

const mapStateToProps = state => ({
    error: state.crypto.error,
    status: state.crypto.status,
    currencies: state.crypto.currencies
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCryptoData
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Crypto);
