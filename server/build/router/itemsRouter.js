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
            _this.router.put('/', _this.updateItems);
            _this.router.delete('/:itemId', _this.deleteItems);
            _this.router.get('/:itemId', _this.fetchItemInfo);
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
        /**
         * updateItems
         */
        this.updateItems = function (req, res) {
            var _a = req.body, itemId = _a.itemId, itemName = _a.itemName, itemInStock = _a.itemInStock, itemImgUrl = _a.itemImgUrl, itemDescription = _a.itemDescription;
            var item = new items_1.default({
                itemId: itemId,
                itemName: itemName,
                itemInStock: itemInStock,
                itemImgUrl: itemImgUrl,
                itemDescription: itemDescription
            });
            items_1.default.findOneAndUpdate({ itemId: itemId }, req.body).then(function (data) {
                res.status(201).json({ data: data });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        /**
         * deleteItems
         */
        this.deleteItems = function (req, res) {
            var itemId = req.params ? req.params.itemId : '';
            items_1.default.findOneAndRemove({ itemId: itemId }).then(function (data) {
                res.status(200).json({ data: data });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        /**
         * fetchItemInfo
         */
        this.fetchItemInfo = function (req, res) {
            var itemId = req.params ? req.params.itemId : '';
            items_1.default.findOne({ itemId: itemId }).then(function (data) {
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