import { errors } from "./errors";

/** 路径分割，用于比较两个路径 */
export class PathSegment {
    private segments: string[];
    private _index: number = 0;

    constructor(path: string) {
        this.segments = path.split("/").filter(o => o);
        if (this.segments.length == 0)
            throw errors.invalidPath(path);
    }
    moveNext(): number | null {
        if (this._index >= this.segments.length - 1)
            return null;

        this._index = this._index + 1;
        return this._index;
    }
    get current() {
        return this.segments[this._index];
    }
    get index() {
        return this._index;
    }
    get else() {
        let arr = this.segments.slice(this.index);
        return arr.join("/");
    }
}