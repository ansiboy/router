import { errors } from "./errors";
import { RouterItem } from "./route-item";

export class RouterItems {
    private _items: RouterItem[] = [];
    private _index = 0;

    constructor(routerString: string) {
        let arr = routerString.split("/").filter(o => o);
        for (let i = 0; i < arr.length; i++) {
            let item = new RouterItem(arr[i]);
            let isExists = this._items.filter(o => o.name == item.name).length > 0;
            if (isExists)
                throw errors.routeItemExists(arr[i]);

            this._items.push(item);
        }
    }

    get all() {
        return this._items;
    }

    moveNext(): number | null {
        if (this._index >= this._items.length - 1)
            return null;

        this._index = this._index + 1;
        return this._index;
    }

    reset() {
        this._index = 0;
    }

    get index() {
        return this._index;
    }

    get current() {
        return this._items[this._index];
    }
}