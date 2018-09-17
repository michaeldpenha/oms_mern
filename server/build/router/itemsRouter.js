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
            _this.router.delete('/:itemName', _this.deleteItems);
            _this.router.get('/:itemName', _this.fetchItemInfo);
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
            var _a = req.body, itemName = _a.itemName, itemInStock = _a.itemInStock, itemImgUrl = _a.itemImgUrl, itemDescription = _a.itemDescription;
            var item = new items_1.default({
                itemName: itemName,
                itemInStock: itemInStock,
                itemImgUrl: itemImgUrl,
                itemDescription: itemDescription
            });
            items_1.default.count({ itemName: itemName }).then(function (data) {
                (!data) ? _this.saveItem(item, req, res) : res.status(200).json({ message: 'Item already exists' });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        /**
         * saveItem
         */
        this.saveItem = function (item, req, res) {
            item.save().then(function (data) {
                res.status(201).json({ message: 'Item Added successfully', data: data });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        /**
         * updateItems
         */
        this.updateItems = function (req, res) {
            var _a = req.body, itemName = _a.itemName, itemInStock = _a.itemInStock, itemImgUrl = _a.itemImgUrl, itemDescription = _a.itemDescription;
            var item = new items_1.default({
                itemName: itemName,
                itemInStock: itemInStock,
                itemImgUrl: itemImgUrl,
                itemDescription: itemDescription
            });
            items_1.default.findOneAndUpdate({ itemName: itemName }, req.body).then(function (data) {
                res.status(201).json({ data: data });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        /**
         * deleteItems
         */
        this.deleteItems = function (req, res) {
            var itemName = req.params ? req.params.itemName : '';
            items_1.default.findOneAndRemove({ itemName: itemName }).then(function (data) {
                res.status(200).json({ data: data });
            }, function (err) {
                res.status(500).json({ err: err });
            });
        };
        /**
         * fetchItemInfo
         */
        this.fetchItemInfo = function (req, res) {
            var itemName = req.params ? req.params.itemName : '';
            items_1.default.findOne({ itemName: itemName }).then(function (data) {
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