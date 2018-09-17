import {FETCH_ITEMS} from '../actions/types';

const initialState = {
    items : []
}
const items = (state = initialState , action) => {
    switch(action.type){
        case FETCH_ITEMS : return {
            ...state,
            items : action.payload
        }
        default : return state;
    }
}

export default items;