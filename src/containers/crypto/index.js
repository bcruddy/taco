import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import Leadspace from '../../ui/leadspace';
import store from '../../store';
import {fetchCryptoData} from '../../modules/crypto';

setInterval(() => {
    store.dispatch(fetchCryptoData());
}, 20 * 1000);

const Crypto = props => {
    const {status, currencies} = props;
    if (status === 'init') {
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
                                <i className={classnames({
                                    'fa': true,
                                    'fa-2x': true,
                                    'fa-refresh': status === 'resolved',
                                    'fa-thumbs-down': status === 'rejected',
                                    'fa-spinner': status === 'loading',
                                    'fa-spin': status === 'loading'
                                })}></i>
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
                                        {curr.cache.map((cached) => (
                                            <li key={`cached-${curr.name}-${cached.id}`}>
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
