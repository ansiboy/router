import { createRouter, RouterItem } from "../out/index";
import * as assert from "assert";
import { parseRouterString } from "../out/route-item-collection";

describe("router", function () {
    it("test1", function () {
        let router = createRouter("/store");

        // assert.ok(routerItem.name == null);
        // assert.ok(routerItem.isOption == false);
        // assert.ok(routerItem.isWildcards == false);
        // assert.ok(routerItem.value == null);

        let r = router.match("/store");
        assert.ok(r != null)
    })

    // it("test2", function () {
    //     let router = createRouter("/store/:applicationId", {
    //         applicationId: /[0-9A-Fa-f\-]{36}/
    //     });
    //     let appIdItem = router.item("applicationId");
    //     assert.ok(appIdItem != null);
    //     let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd");
    //     assert.ok(m != null);
    //     assert.ok(m.applicationId, "7bbfa36c-8115-47ad-8d47-9e52b58e7efd")
    // })

    // it("test3", function () {
    //     let router = createRouter("/store/:applicationId/:pageId", {
    //         applicationId: /[0-9A-Fa-f\-]{36}/
    //     });
    //     let appIdItem = router.item("applicationId");
    //     assert.ok(appIdItem != null);
    //     let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7");
    //     assert.ok(m != null);
    //     assert.ok(m.applicationId, "7bbfa36c-8115-47ad-8d47-9e52b58e7efd")
    //     assert.ok(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7")
    // })

    // it("test4", function () {
    //     let router = createRouter("/store/:applicationId/:pageId/?productId", {
    //         applicationId: /[0-9A-Fa-f\-]{36}/,
    //         pageId: /[0-9A-Fa-f\-]{36}/,
    //         productId: /[0-9A-Fa-f\-]{36}/,
    //     });
    //     let appIdItem = router.item("applicationId");
    //     assert.ok(appIdItem != null);
    //     let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7");
    //     assert.ok(m != null);
    //     assert.ok(m.applicationId, "7bbfa36c-8115-47ad-8d47-9e52b58e7efd")
    //     assert.ok(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7")

    //     m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/06E53097-350A-428A-8D3B-7BECA8916F82");
    //     assert.ok(m != null);
    //     assert.ok(m.productId, "06E53097-350A-428A-8D3B-7BECA8916F82");


    // })

    // it("test41", function () {
    //     let router = createRouter("/store/:applicationId/:pageId/?productId", {
    //         applicationId: /[0-9A-Fa-f\-]{36}/,
    //         pageId: /[0-9A-Fa-f\-]{36}/,
    //         productId: /[0-9A-Fa-f\-]{36}/,
    //     });
    //     let appIdItem = router.item("applicationId");
    //     assert.ok(appIdItem != null);
    //     let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/06E53097-350A-428A-8D3B-7BECA8916F82");


    //     m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/abc/06E53097-350A-428A-8D3B-7BECA8916F82");
    //     assert.notStrictEqual(m, null);

    // })

    it("test5", function () {
        let router = createRouter("/store/:applicationId/:pageId/?productId/*filePath", {
            applicationId: /[0-9A-Fa-f\-]{36}/,
            pageId: /[0-9A-Fa-f\-]{36}/,
            productId: /[0-9A-Fa-f\-]{36}/,
            filePath: /[0-9A-Za-z\-_\/\.]/,
        });
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/node_modules/requirejs/requirejs.js");
        assert.ok(m != null);
        assert.strictEqual(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7");
        assert.strictEqual(m.filePath, "node_modules/requirejs/requirejs.js");

        router = createRouter("/store/:applicationId#[0-9A-Fa-f\-]{36}/:pageId#[0-9A-Fa-f\-]{36}/?productId#[0-9A-Fa-f\-]{36}/*filePath#[0-9A-Za-z-_\\/.]");
        m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/node_modules/requirejs/requirejs.js");
        assert.ok(m != null);
        assert.strictEqual(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7");
        assert.strictEqual(m.filePath, "node_modules/requirejs/requirejs.js");
    })

    it("test6", function () {
        let router = createRouter("/store/:applicationId/:pageId/?productId/*filePath", {
            applicationId: /[0-9A-Fa-f\-]{36}/,
            pageId: /[0-9A-Fa-f\-]{36}/,
            productId: /[0-9A-Fa-f\-]{36}/,
            filePath: /[0-9A-Za-z\-_\/\.]/,
        });
        let m = router.match("/store/7bbfa36c-8115-47ad-8d47-9e52b58e7efd/6a9f7e44-5554-baf3-31f9-9823387342c7/24569c92-69ee-458a-ac7f-d9627498083a");
        assert.ok(m != null);
        assert.strictEqual(m.pageId, "6a9f7e44-5554-baf3-31f9-9823387342c7");

    })

    it("test7", function () {
        let router = createRouter("/:id/?productId/*filePath", {
            id: /[0-9A-Fa-f\-]{36}/,
            productId: /[0-9A-Fa-f\-]{36}/,
            filePath: /[0-9A-Za-z\-_\/\.]/,
        })
        let url = "/3714effc-39c2-2fbf-ffd8-996a44e19d57?application-id=48e16c9a-9077-9e79-edbb-213b300d2bef";
        let m = router.match(url);

    })

    it("test8", function () {
        const pageNames = ["account", "checkout", "login", "home", "login", "order-detail", "order-list", "product", "product-list",
            "receipt-edit", "receipt-list", "search", "shipping", "shopping-cart"];

        let nameRegex = new RegExp(pageNames.join("|"));
        let routers = [
            createRouter("/:id/?productId/*filePath", {
                id: /^[0-9A-Fa-f\-]{36}$/,
                productId: /^[0-9A-Fa-f\-]{36}$/,
                filePath: /[0-9A-Za-z\-_\/\.]/,
            }),
            createRouter("/:name/:productId/*filePath", {
                name: /product/,
                productId: /^[0-9A-Fa-f\-]{36}$/,
                filePath: /[0-9A-Za-z\-_\/\.]/,
            }),
            createRouter("/:name/:productName/*filePath", {
                name: /product/,
                productName: /\\S+/,
                filePath: /[0-9A-Za-z\-_\/\.]/,
            }),
            createRouter("/:name/:orderId/*filePath", {
                name: /checkout|order-detail|shipping|register/,
                orderId: /^[0-9A-Fa-f\-]{36}$/,
                filePath: /[0-9A-Za-z\-_\/\.]/,
            }),
            createRouter("/:name/:orderId/*filePath", {
                name: /receipt-edit/,
                receiptId: /^[0-9A-Fa-f\-]{36}$/,
                filePath: /[0-9A-Za-z\-_\/\.]/,
            }),
            createRouter("/:name/*filePath", {
                name: nameRegex,
                filePath: /[0-9A-Za-z\-_\/\.]/,
            }),
        ];

        let m = routers[1].match("/product/05e983e5-6886-44f5-bfbf-7495e24824a6");
        assert.notStrictEqual(m, null);
        m = routers[1].match("/product/05e983e5-6886-44f5-bfbf-7495e24824a6");
        assert.notStrictEqual(m, null);
    })

    it("test9", function () {

        let r = createRouter("/:name", {
            name: /[0-9A-Za-z\-_]*/,
        })

        let m1 = r.match("/content/bootstrap.css");
        assert.strictEqual(m1, null);

        let m2 = r.match("/content");
        assert.notStrictEqual(m2, null);

    })

    it("parseRouterString9", function () {


        let items = parseRouterString("/:name#[0-9A-Za-z\-_]*");
        assert.strictEqual(items.length, 1);
        assert.strictEqual(items[0].name, "name");
        assert.strictEqual(items[0].regexp.toString(), "/[0-9A-Za-z\-_]*/")
    })

    it("test10", function () {

        let r = createRouter("/:name/*filePath", {
            name: /^[0-9A-Za-z\-_]*$/,
            filePath: /[0-9A-Za-z\-_\/\.]/,
        })

        let m = r.match("/checkout/preview.js");
        assert.notStrictEqual(m, null);
        assert.strictEqual(m.filePath, "preview.js");
    })

    it("parseRouterString", function () {
        let items = parseRouterString("/:name");
        assert.strictEqual(items.length, 1);
        assert.strictEqual(items[0].name, "name");
    })

    it("parseRouterString1", function () {
        let items = parseRouterString("/:name#^[0-9A-Za-z\-_]*$");
        assert.strictEqual(items.length, 1);
        assert.strictEqual(items[0].name, "name");
        assert.strictEqual(items[0].regexp.toString(), "/^[0-9A-Za-z\-_]*$/")
    })

    it("parseRouterString2", function () {
        let r = createRouter("/:store/:theme/:page#^[0-9A-Za-z\-\_]+$");
        let m = r.match("/gemwon-pc/website-config.js");
        assert.ok(m == null);
    })

    it("parseRouterString3", function () {
        let r = createRouter("/product-list/?categoryId#^[0-9A-Za-z\-\_]+$");
        let m = r.match("/product-list/xxxx.js");
        assert.ok(m == null);
    })


})