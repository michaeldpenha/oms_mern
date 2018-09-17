import { FETCH_ITEMS } from './types';

let fetchItems = () => dispatch => {
    let url = `http://localhost:8000/api/v1/items`;
    fetch(url)
        .then(res => res.json())
        .then(res => dispatch({
            type: FETCH_ITEMS,
            payload: res.data
        }))
}
export default fetchItems;