import * as moment from 'moment';
import * as API from '../utils/api';

const REFRESH_CRYPTO_REQUESTED = 'crypto/REFRESH_REQUESTED';
const REFRESH_CRYPTO = 'crypto/REFRESH';

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
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_CRYPTO_REQUESTED:
            return {
                ...initialState,
                status: 'loading'
            };
        case REFRESH_CRYPTO:
        // moment(new Date(curr.volume.timestamp)).format('M-D-YY h:mm:ss a')
            const currencies = action.currencies.map(c => {
                c.timestamp = moment(new Date(c.volume.timestamp)).format('M-D-YY h:mm:ss a');

                return c;
            });
            return {
                ...state,
                currencies,
                status: 'resolved'
            };
        default:
            return {
                ...state,
                status: 'init'
            };
    }
};

export const fetchCryptoData = () => {
    const {btc, eth} = API.crypto;

    return dispatch => {
        dispatch({type: REFRESH_CRYPTO_REQUESTED});

        Promise.all([btc(), eth()])
            .then(([btc, eth]) => {
                const currencies = [{
                    name: 'BTC',
                    ...btc.data
                }, {
                    name: 'ETH',
                    ...eth.data
                }];

                return dispatch({type: REFRESH_CRYPTO, currencies});
            });
    }
};
