import {model,Schema} from 'mongoose';

const itemSchema : Schema = new Schema({
    itemId : {
        type : String,
        required : true
    },
    itemName : {
        type : String,
        required : true
    },
    itemInStock : {
        type : Boolean,
        required : true
    },
    itemImgUrl : {
        type : String,
        default : ''
    },
    itemDescription : {
        type : String,
        default: ''
    }
});

export default model('items',itemSchema);

