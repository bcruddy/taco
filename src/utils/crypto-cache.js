import * as _ from 'lodash'

export class CurrencyCache {
    // {name, price, datetime, cache}
    constructor () {
        this.btc = [];
        this.eth = [];
        this.ltc = [];
    }

    get btc () {
        return this.btc;
    }

    set btc (value) {
        this.btc = this.btc || [];
        this.btc.push(value);
    }

    get name () {
        return this._name;
    }

    set name (value) {
        this._name = value;
    }
}
