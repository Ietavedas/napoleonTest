import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({data: state});
const mapDispatchToProps = dispatch => ({
    getData: () => dispatch({type: 'LIST'})
});

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchQuery: ''
        };

        this.filterList = this.filterList.bind(this);
    }
    componentWillMount() {
        this.props.getData();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            data: nextProps.data
        });
    }
    filterList(event) {
        this.setState({
            searchQuery: event.target.value.toString()
        }, () => {
            let result = this.props.data.filter((el) => {
                for (let param in el) {
                    if(!!el[param] && el[param].toLocaleLowerCase().includes(this.state.searchQuery)) {
                        return el[param].toLocaleLowerCase().includes(this.state.searchQuery.toString());
                    }
                }
            });

            this.setState({
                data: result
            });
        });

    }
    render() {
        const {
            data
        } = this.state;

        return (
            <div className="inner">
                <div className="search">
                    <input
                        className="search__input"
                        type="text"
                        onChange={this.filterList}
                        placeholder="Search"
                    />
                </div>
                <div>
                    {!!data && data.map((item, index) => {

                        return (
                            <div className="card" key={index}>
                                <div>Страна: {item.country}</div>
                                <div>Бренд: {item.brand}</div>
                                <div>Марка: {item.model}</div>
                                <div>Год: {item.year}</div>
                                <div>vin-номер: {item.vin}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
