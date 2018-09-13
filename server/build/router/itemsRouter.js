"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var items_1 = require("../models/items");
var ItemsRouter = /** @class */ (function () {
    function ItemsRouter() {
        var _this = this;
        /**
         * routes
         */
        this.routes = function () {
            _this.router.get('/', _this.fetchItems);
        };
        /**
         * fetchItems
         */
        this.fetchItems = function (req, res) {
            items_1.default.find().then(function (data) {
                res.status(200).json({ data: data });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        this.router = express_1.Router();
        this.routes();
    }
    return ItemsRouter;
}());
exports.ItemsRouter = ItemsRouter;
var itemRouter = new ItemsRouter();
itemRouter.routes();
exports.default = itemRouter.router;
//# sourceMappingURL=itemsRouter.js.map