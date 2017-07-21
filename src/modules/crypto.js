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
            bid: '...',
            ask: '...',
            last: '...',
        },
        {
            name: 'ETH',
            bid: '...',
            ask: '...',
            last: '...',
        },
        {
            name: 'LTC',
            bid: '...',
            ask: '...',
            last: '...',
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_CRYPTO:
            const currencies = action.currencies.map(c => {
                c.timestamp = moment(new Date(c.volume.timestamp)).format('M-D-YY h:mm:ss a');

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
                    last: parseFloat(ltc.data.price, 10).toFixed(2),
                    ask: '??',
                    bid: '??',
                    volume: {
                        timestamp: ltc.data.timestamp * 1000
                    }
                }];

                dispatch({type: REFRESH_CRYPTO, currencies});
            })
            .catch(err => {
                dispatch({type: REFRESH_CRYPTO_REJECTED});
            });
    }
};
