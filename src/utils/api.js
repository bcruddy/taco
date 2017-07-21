export const crypto = {
    btc () {
        return fetch('/api/v1/crypto/btc').then(res => res.json());
    },

    eth () {
        return fetch('/api/v1/crypto/eth').then(res => res.json());
    },

    ltc () {
        return fetch('/api/v1/crypto/ltc').then(res => res.json());
    }
};
