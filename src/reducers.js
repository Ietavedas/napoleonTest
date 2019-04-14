import data from './data.json';
import { fromJS, List } from 'immutable';

const CHARACTERS = {
    country: {
        type: 'type',
        value: 'value',
        children: 'children'
    },
    brand: {
        type: 'type',
        value: 'value',
        children: 'children'
    },
    model: {
        type: 'type',
        value: 'value',
        children: 'children'
    },
    year: {
        type: 'type',
        value: 'value',
        children: 'children'
    },
    vin: {
        type: 'type',
        value: 'value',
        children: 'children'
    }
};

export default function (state, action) {
    switch (action.type) {
        case 'LIST': {
            let newState = [];
            action.res = data;

            action.res.map((country) => {

                return country.children.map((brand) => {

                    return brand.children.map((model) => {
                        if (!!model.children) {
                            if (!!model.children.children) {

                                return model.children.children.map((item) => {

                                    return newState.push({
                                        country: country[CHARACTERS.country.value],
                                        brand: brand[CHARACTERS.brand.value],
                                        model: model[CHARACTERS.model.value],
                                        year: model.children[CHARACTERS.year.value].toString() || null,
                                        vin: item[CHARACTERS.vin.value] || null,
                                    });
                                });
                            }

                            return newState.push({
                                country: country[CHARACTERS.country.value],
                                brand: brand[CHARACTERS.brand.value],
                                model: model[CHARACTERS.model.value],
                                year: null,
                                vin: model.children[CHARACTERS.vin.value] || null,
                            });
                        }

                        return newState.push({
                            country: country[CHARACTERS.country.value],
                            brand: brand[CHARACTERS.brand.value],
                            model: model[CHARACTERS.model.value],
                            year: null,
                            vin: model.children[CHARACTERS.vin.value],
                        });
                    });
                });
            });

            return newState;
        }
        default:
            return state;
    }
};
