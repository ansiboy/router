import { errors } from "./errors";
import { PathSegment } from "./path-segment";
import { RouterItems } from "./route-item-collection";

export class Router {

    private _pattern: string;
    private rules: { [key: string]: RegExp; };

    constructor(pattern: string, rules?: { [key: string]: RegExp }) {
        if (!pattern) throw errors.argumentNull("pattern");

        this.rules = rules || {};

        this._pattern = pattern;

    }

    match(path: string): { [key: string]: string } | null {

        let p = new PathSegment(path);
        let c = this.createRouterItems(this._pattern);

        do {
            let testOK = c.current.isWildcards ? c.current.regexp.test(p.else) : c.current.regexp.test(p.current);
            if (!testOK) {
                if (c.current.isOption)
                    continue;
                else
                    return null;
            }

            c.current.value = c.current.isWildcards ? p.else : p.current;
            if (!p.moveNext())
                break;
        }
        while (c.moveNext() != null);

        let r: { [key: string]: string } = {};
        for (let i = 0; i < c.all.length; i++) {
            let name = c.all[i].name;
            let value = c.all[i].value;
            if (name == null)
                continue;

            r[name] = value;
        }

        return r;
    }

    private createRouterItems(pattern: string) {
        var _items = new RouterItems(pattern);
        for (let i = 0; i < _items.all.length; i++) {
            let name = _items.all[i].name;
            if (name != null && this.rules[name] != null) {
                _items.all[i].regexp = this.rules[name];
            }
        }

        return _items;
    }

    // item(name: string) {
    //     let r = this._items.all.filter(o => o.name == name)[0];
    //     return r;
    // }

    // get items() {
    //     return this._items;
    // }

    get pattern() {
        return this._pattern;
    }
}

