import React from 'react';
import { connect } from 'react-redux';
import Search from "../../components/Search";
import {getList, searchAction} from "../../actions";

import DATA from '../../data.json';
import Card from "../../components/Card";

const mapStateToProps = state => ({
    data: state.get('carsList').filter((el) => {
        for (let param in el) {
            let property = el[param];
            // этот момент мне и самому не нравится, но на нормальный поиск у меня сейчас нет времени)
            if(!!property && property.toLocaleLowerCase().includes(state.get('searchQuery'))) {
                return property.toLocaleLowerCase().includes(state.get('searchQuery').toString());
            }
        }
    }),
});
const mapDispatchToProps = dispatch => ({
    getData: (data) => dispatch(getList(data)),
    search: (query) => dispatch(searchAction(query)),
});

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.getSearchQuery = this.getSearchQuery.bind(this);
    }
    componentWillMount() {
        if(!this.props.data.length) {
            const data = this.restructuring(DATA);
            this.props.getData(data);
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }
    restructuring(data) {
        let newArray = [];

        data.map((country) => {

            return country.children.map((brand) => {

                return brand.children.map((model) => {
                    if (!!model.children) {
                        if (!!model.children.children) {

                            return model.children.children.map((item) => {

                                return newArray.push({
                                    country: country.value,
                                    brand: brand.value,
                                    model: model.value,
                                    year: model.children.value.toString() || null,
                                    vin: item.value || null,
                                });
                            });
                        }

                        return newArray.push({
                            country: country.value,
                            brand: brand.value,
                            model: model.value,
                            year: null,
                            vin: model.children.value || null,
                        });
                    }

                    return newArray.push({
                        country: country.value,
                        brand: brand.value,
                        model: model.value,
                        year: null,
                        vin: model.children.value,
                    });
                });
            });
        });

        return newArray;
    }
    getSearchQuery(event) {
        this.props.search(event.target.value.toString())
    }
    render() {
        const {
            data,
        } = this.props;

        return (
            <div className="inner">

                <Search
                    getSearchQuery={this.getSearchQuery}
                />

                <div>
                    {!!data && data.map((item, index) => {

                        return (
                            <Card
                                item={item}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
