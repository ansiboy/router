import { createRouter, RouterItem } from "../out/index";
import * as assert from "assert";

describe("routeItem", function () {
    it("test1", function () {
        let routerItem = new RouterItem("store");

        assert.ok(routerItem.name == null);
        assert.ok(routerItem.isOption == false);
        assert.ok(routerItem.isWildcards == false);
        assert.ok(routerItem.value == null);
    })

    it("test2", function () {
        let routerItem = new RouterItem("*store");

        assert.ok(routerItem.name == "store");
        assert.ok(routerItem.isOption == false);
        assert.ok(routerItem.isWildcards == true);
        assert.ok(routerItem.value == null);
    })

    it("test3", function () {
        let routerItem = new RouterItem(":store");

        assert.ok(routerItem.name == "store");
        assert.ok(routerItem.isOption == false);
        assert.ok(routerItem.isWildcards == false);
        assert.ok(routerItem.value == null);
    })

    it("test4", function () {
        let routerItem = new RouterItem("?store");

        assert.ok(routerItem.name == "store");
        assert.ok(routerItem.isOption == true);
        assert.ok(routerItem.isWildcards == false);
        assert.ok(routerItem.value == null);
    })
})

