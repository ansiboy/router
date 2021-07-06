import { RouterItem } from "./route-item";

let signals = {
    star: "*",
    colon: ":",
    question: "?"
}
export class RouterItems {
    private _items: RouterItem[] = [];
    private _index = 0;

    constructor(routerString: string) {
        this._items = parseRouterString(routerString);
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

export function parseRouterString(routerString: string) {

    if (routerString.endsWith("/") == false)
        routerString = routerString + "/";

    // let routeRegex: string | undefined;
    let nameStart: number | undefined;
    let nameEnd: number | undefined;
    let regexStart: number | undefined;
    let regexEnd: number | undefined;

    let routerItems: RouterItem[] = [];

    let currentChar: string | undefined;
    let previousChar: string | undefined;
    for (let i = 0; i < routerString.length; i++) {
        previousChar = currentChar;
        currentChar = routerString[i];

        if (currentChar == '/') {
            if (previousChar == '\\')
                continue;

            if (nameStart == undefined) {
                nameStart = i + 1;
            }
            else if (nameStart != undefined && nameEnd == undefined && regexStart == undefined) {
                nameEnd = i - 1;
            }
            else if (regexStart != undefined) {
                regexEnd = i - 1;
            }

            if (nameStart != undefined && nameEnd != undefined) {
                console.assert(nameEnd > nameStart);

                var routeSegment = routerString.substring(nameStart, nameEnd + 1);
                let routeItem = new RouterItem(routeSegment);
                if (regexStart != undefined && regexEnd != undefined) {
                    var routeRegex = routerString.substring(regexStart, regexEnd + 1);

                    // 替换 \/ 为 /
                    routeRegex = routeRegex.replace(/\\\//, '/');
                    routeItem.regexp = new RegExp(routeRegex);
                }


                routerItems.push(routeItem);

                nameStart = undefined;
                nameEnd = undefined;
                regexStart = undefined;
                regexEnd = undefined;

                if (i + 1 <= routerString.length - 1) {
                    nameStart = i + 1;
                }
            }
        }
        else if (currentChar == '#') {
            regexStart = i + 1;
            nameEnd = i - 1;
        }
        else if (i == routerString.length - 1) {
            if (nameStart != undefined && nameEnd == undefined && regexStart == undefined)
                nameEnd = i;
            else if (regexStart != undefined)
                regexEnd = i;
        }



    }





    return routerItems;
}