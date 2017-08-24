import * as moment from 'moment';
import * as API from '../utils/api';
import shortid from 'shortid';

const REFRESH_CRYPTO_REQUESTED = 'crypto/REFRESH_REQUESTED';
const REFRESH_CRYPTO = 'crypto/REFRESH';
const REFRESH_CRYPTO_REJECTED = 'crypto/REFRESH_REJECTED';

const cache = {
    btc: [],
    eth: [],
    ltc: []
};

const initialState = {
    status: 'init',
    currencies: [
        {
            name: 'BTC',
            price: '...',
            datetime: '...',
            cache: cache.btc
        },
        {
            name: 'ETH',
            price: '...',
            datetime: '...',
            cache: cache.eth
        },
        {
            name: 'LTC',
            price: '...',
            datetime: '...',
            cache: cache.ltc
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_CRYPTO:
            const {currencies} = action;
            currencies.forEach(c => {
                const currencyName = c.name.toLowerCase();

                c.id = shortid.generate();
                cache[currencyName].unshift(c);
                c.cache = cache[currencyName];
            });

            return {
                ...state,
                currencies,
                status: 'resolved'
            };
        case REFRESH_CRYPTO_REJECTED:
            return {
                ...initialState,
                cache,
                status: 'rejected'
            };
        case REFRESH_CRYPTO_REQUESTED:
        default: // loading and REFRESH_CRYPTO_REQUESTED
            return {
                ...initialState,
                cache,
                status: 'loading'
            };
    }
};

export const fetchCryptoData = () => {
    const {btc, eth, ltc} = API.Crypto;

    return dispatch => {
        dispatch({type: REFRESH_CRYPTO_REQUESTED});

        Promise.all([btc(), eth(), ltc()])
            .then(currencyData => currencyData.map(c => {
                return {
                    datetime: moment(new Date(c.data.timestamp)).format('M-D-YY h:mm:ss a'),
                    ...c.data
                };
            }))
            .then(currencies => dispatch({type: REFRESH_CRYPTO, currencies}))
            .catch(err => {
                dispatch({type: REFRESH_CRYPTO_REJECTED});
            });
    }
};
