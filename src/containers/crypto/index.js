import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Leadspace from '../../ui/leadspace';
import store from '../../store';
import {fetchCryptoData} from '../../modules/crypto';

const livePriceInterval = setInterval(() => {
    store.dispatch(fetchCryptoData());
}, 20 * 1000);

const Crypto = props => {
    const {status, currencies} = props;
    if (status === 'init') {
        store.dispatch(fetchCryptoData());
    }

    let fontAwesomeIcon;
    if (status === 'resolved') {
        fontAwesomeIcon = 'fa-refresh';
    }
    else if (status === 'rejected') {
        fontAwesomeIcon = 'fa-thumbs-down';
    }
    else {
        fontAwesomeIcon = 'fa-spinner fa-spin fa-fw';
    }

    return (
        <section className="taco--crypto">
            <Leadspace title="Crypto Currencies" />
            <main className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            <a className="btn btn-primary" onClick={() => store.dispatch(fetchCryptoData())}>
                                <i className={`fa fa-2x ${fontAwesomeIcon}`}></i>
                            </a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    {status === 'rejected' ? (
                        <div className="alert alert-warning">
                            <p className="text-center">Whoops. Looks like we broke something. Sorry about that.</p>
                        </div>
                    ) : currencies.map((curr, index) => (
                        <div className="col-sm-4" key={`crypto-${index}`}>
                            <ul className="list-unstyled">
                                <li>
                                    <strong>{curr.name}</strong> ${curr.price}
                                </li>
                                <li>
                                    <small>
                                        <strong>Updated:</strong> {curr.datetime}
                                    </small>
                                </li>
                                <li>
                                    <hr />
                                    <ul>
                                        {curr.cache.map((cached, index) => (
                                            <li key={`cached-${curr.name}-${index}`}
                                                className={fuckItClasserizeritizer(curr.price, cached.price)}>
                                                <small><strong>${cached.price}</strong>  {cached.datetime}</small>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
        </section>
    );
};

function fuckItClasserizeritizer (livePrice, historicalPrice) {
    let className;

    if (livePrice > historicalPrice) {
        className = 'bg-red';
    }
    else if (livePrice < historicalPrice) {
        className = 'bg-green';
    }
    else {
        className = '';
    }

    console.log('fuckItClasserizeritizer', {className});
    return className;
}

const mapStateToProps = state => ({
    cache: state.crypto.cache,
    currencies: state.crypto.currencies,
    error: state.crypto.error,
    status: state.crypto.status
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCryptoData
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Crypto);
