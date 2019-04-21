import {Map} from "immutable";

const initialState = Map({
    carsList: [],
    searchQuery: '',
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LIST': {
            return state.set('carsList', action.payload);
        }
        case 'SEARCH': {
            return state.set('searchQuery', action.payload)
        }
        default:
            return state;
    }
};
