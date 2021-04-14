"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../out/index");
const assert = require("assert");
describe("router", function () {
    it("test1", function () {
        let router = index_1.createRouter("/store");
        let routerItem = router.items.all[0];
        assert.ok(routerItem.name == null);
        assert.ok(routerItem.isOption == false);
        assert.ok(routerItem.isWildcards == false);
        assert.ok(routerItem.value == null);
        let r = router.match("/store");
        assert.ok(r != null);
    });
    it("test2", function () {
        let router = index_1.createRouter("/store/:applicationId", {
            applicationId: /[0-9A-Fa-f\-]{36}/
        });
        let appIdItem = router.item("applicationId");
        assert.ok(appIdItem != null);
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd");
        assert.ok(m != null);
        assert.ok(m.applicationId, "7bbfa36c-8115-47ad-8d47-9e52b58e7efd");
    });
    it("test3", function () {
        let router = index_1.createRouter("/store/:applicationId/:pageId", {
            applicationId: /[0-9A-Fa-f\-]{36}/
        });
        let appIdItem = router.item("applicationId");
        assert.ok(appIdItem != null);
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7");
        assert.ok(m != null);
        assert.ok(m.applicationId, "7bbfa36c-8115-47ad-8d47-9e52b58e7efd");
        assert.ok(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7");
    });
    it("test4", function () {
        let router = index_1.createRouter("/store/:applicationId/:pageId/?productId", {
            applicationId: /[0-9A-Fa-f\-]{36}/,
            pageId: /[0-9A-Fa-f\-]{36}/,
            productId: /[0-9A-Fa-f\-]{36}/,
        });
        let appIdItem = router.item("applicationId");
        assert.ok(appIdItem != null);
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7");
        assert.ok(m != null);
        assert.ok(m.applicationId, "7bbfa36c-8115-47ad-8d47-9e52b58e7efd");
        assert.ok(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7");
        m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/06E53097-350A-428A-8D3B-7BECA8916F82");
        assert.ok(m != null);
        assert.ok(m.productId, "06E53097-350A-428A-8D3B-7BECA8916F82");
    });
    it("test41", function () {
        let router = index_1.createRouter("/store/:applicationId/:pageId/?productId", {
            applicationId: /[0-9A-Fa-f\-]{36}/,
            pageId: /[0-9A-Fa-f\-]{36}/,
            productId: /[0-9A-Fa-f\-]{36}/,
        });
        let appIdItem = router.item("applicationId");
        assert.ok(appIdItem != null);
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/06E53097-350A-428A-8D3B-7BECA8916F82");
        m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/abc/06E53097-350A-428A-8D3B-7BECA8916F82");
        assert.notStrictEqual(m, null);
    });
    it("test5", function () {
        let router = index_1.createRouter("/store/:applicationId/:pageId/?productId/*filePath", {
            applicationId: /[0-9A-Fa-f\-]{36}/,
            pageId: /[0-9A-Fa-f\-]{36}/,
            productId: /[0-9A-Fa-f\-]{36}/,
            filePath: /[0-9A-Za-z\-_\/\.]/,
        });
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/node_modules/requirejs/requirejs.js");
        assert.ok(m != null);
        assert.strictEqual(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7");
        assert.strictEqual(m.filePath, "node_modules/requirejs/requirejs.js");
    });
});
