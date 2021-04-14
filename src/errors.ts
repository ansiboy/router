import { Errors } from "maishu-toolkit";

class MyErrors extends Errors {
    invalidRouteSegment(routeSegment: string) {
        let error = new Error(`Route segment ${routeSegment} is invalid.`);
        error.name = MyErrors.prototype.invalidRouteSegment.name;
        return error;
    }
    routeItemExists(name: string) {
        let error = new Error(`Route '${name}' is exists.`);
        error.name = MyErrors.prototype.routeItemExists.name;
        return error;
    }
    invalidPath(path: string) {
        let error = new Error(`Path '${path}' is invalid path.`);
        error.name = MyErrors.prototype.invalidPath.name;
        return error;
    }
}

export let errors = new MyErrors();