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
                            <a className="btn btn-primary" onClick={() => store.dispatch(fetchCryptoData())}>refresh</a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    {props.currencies.map((curr) => (
                        <div className="col-sm-4" key={`crypto-${curr.name}`}>
                            <ul className="list-unstyled">
                                <li>
                                    <strong>{curr.name}</strong> <small>{curr.timestamp}</small>
                                </li>
                                <li>
                                    <strong>
                                        <small>Last:</small> ${curr.last}
                                    </strong>
                                </li>
                                <li>
                                    <small>Bid:</small> ${curr.bid}
                                </li>
                                <li>
                                    <small>Ask:</small> ${curr.ask}
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
