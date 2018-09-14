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
            _this.router.post('/', _this.addItems);
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
        /**
         * addItems
         */
        this.addItems = function (req, res) {
            console.log(req.body);
            var _a = req.body, itemId = _a.itemId, itemName = _a.itemName, itemInStock = _a.itemInStock, itemImgUrl = _a.itemImgUrl, itemDescription = _a.itemDescription;
            var item = new items_1.default({
                itemId: itemId,
                itemName: itemName,
                itemInStock: itemInStock,
                itemImgUrl: itemImgUrl,
                itemDescription: itemDescription
            });
            item.save().then(function (data) {
                res.status(201).json({ data: data });
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