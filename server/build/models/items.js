"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var itemSchema = new mongoose_1.Schema({
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemInStock: {
        type: Boolean,
        required: true
    },
    itemImgUrl: {
        type: String,
        default: ''
    },
    itemDescription: {
        type: String,
        default: ''
    }
});
exports.default = mongoose_1.model('inventory', itemSchema);
//# sourceMappingURL=items.js.map