import { errors } from "./errors";

export class RouterItem {

    private _isOption: boolean = false;
    private _isWildcards: boolean = false;
    private _name: string | null = null;
    private _regexp: RegExp;
    private _value: string

    constructor(routeSegment: string) {
        let regexp = /[*|:|?]{0,1}(\S+)/;
        let m = regexp.exec(routeSegment);
        if (!m) throw errors.invalidRouteSegment(routeSegment);

        switch (routeSegment[0]) {
            case '*':
                this._isWildcards = true;
                this._regexp = /\S+/;
                this._name = m[1];
                break;
            case ':':
                this._regexp = /\S+/;
                this._name = m[1];
                break;
            case '?':
                this._regexp = /\S+/;
                this._name = m[1];
                this._isOption = true;
                break;
            default:
                this._regexp = new RegExp(routeSegment);
                break;
        }
    }

    get isOption(): boolean {
        return this._isOption;
    }

    get isWildcards(): boolean {
        return this._isWildcards;
    }

    get name() {
        return this._name;
    }

    get regexp() {
        return this._regexp;
    }
    set regexp(value) {
        this._regexp = value;
    }

    get value() {
        return this._value;
    }
    set value(value: string) {
        this._value = value;
    }
}
