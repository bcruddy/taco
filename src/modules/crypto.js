import * as moment from 'moment';
import * as API from '../utils/api';

const REFRESH_CRYPTO_REQUESTED = 'crypto/REFRESH_REQUESTED';
const REFRESH_CRYPTO = 'crypto/REFRESH';
const REFRESH_CRYPTO_REJECTED = 'crypto/REFRESH_REJECTED';

const initialState = {
    status: 'init',
    currencies: [
        {
            name: 'BTC',
            price: '...',
            timestamp: '...'
        },
        {
            name: 'ETH',
            price: '...',
            timestamp: '...'
        },
        {
            name: 'LTC',
            price: '...',
            timestamp: '...'
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_CRYPTO:
            const currencies = action.currencies.map(c => {
                try {
                    c.timestamp = moment(new Date(c.timestamp)).format('M-D-YY h:mm:ss a');
                } catch (ex) {}

                return c;
            });

            return {
                ...state,
                currencies,
                status: 'resolved'
            };
        case REFRESH_CRYPTO_REQUESTED:
            return {
                ...initialState,
                status: 'loading'
            };
        case REFRESH_CRYPTO_REJECTED:
            return {
                ...state,
                status: 'rejected'
            };
        default:
            return {
                ...state,
                status: 'init'
            };
    }
};

export const fetchCryptoData = () => {
    const {btc, eth, ltc} = API.crypto;

    return dispatch => {
        dispatch({type: REFRESH_CRYPTO_REQUESTED});

        Promise.all([btc(), eth(), ltc()])
            .then(([btc, eth, ltc]) => {
                const currencies = [{
                    name: 'BTC',
                    ...btc.data
                }, {
                    name: 'ETH',
                    ...eth.data
                }, {
                    name: 'LTC',
                    ...ltc.data
                }];

                dispatch({type: REFRESH_CRYPTO, currencies});
            })
            .catch(err => {
                dispatch({type: REFRESH_CRYPTO_REJECTED});
            });
    }
};
