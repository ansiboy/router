import { Router, } from "./route";
export { Router } from "./route";
export { RouterItem } from "./route-item";

export function createRouter(pattern: string, rules?: { [key: string]: RegExp }) {
    let router = new Router(pattern, rules);
    return router;
}