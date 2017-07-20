export const crypto = {
    eth () {
        return fetch('/api/v1/crypto/eth').then(res => res.json());
    },

    btc () {
        return fetch('/api/v1/crypto/btc').then(res => res.json());
    }
};
