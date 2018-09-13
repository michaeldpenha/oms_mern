"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var database_1 = require("./config/database");
var application_1 = require("./config/application");
var itemsRouter_1 = require("./router/itemsRouter");
var itemRouter = new itemsRouter_1.ItemsRouter();
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        /**
         * config
         */
        this.config = function () {
            _this.app.use(cors());
            _this.intializeCors();
            _this.globalError();
        };
        this.intializeCors = function () {
            // cors
            _this.app.use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', application_1.default.baseUrl);
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
                res.header('Access-Control-Allow-Credentials', 'true');
                next();
            });
        };
        /**
         * routes
         */
        this.routes = function () {
            var router = express.Router();
            _this.app.use('/', router);
            _this.app.use('/api/v1/items', itemRouter.router);
        };
        this.globalError = function () {
            process.on('uncaughtException', function (err) {
                console.log('Caught exception: ' + err);
            });
            process.on('unhandledRejection', function (err) {
                console.log('Caught Rejecction: ' + err);
            });
        };
        this.app = express();
        this.initializMongoDb();
        this.config();
        this.routes();
    }
    /**
     * initializMongoDb
     */
    Server.prototype.initializMongoDb = function () {
        var mongo_url = database_1.default.url;
        mongoose.connect(mongo_url);
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map