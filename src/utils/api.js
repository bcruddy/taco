export class Crypto {
    static btc () {
        return fetch('/api/v1/crypto/btc').then(res => res.json());
    }

    static eth () {
        return fetch('/api/v1/crypto/eth').then(res => res.json());
    }

    static ltc () {
        return fetch('/api/v1/crypto/ltc').then(res => res.json());
    }
}
