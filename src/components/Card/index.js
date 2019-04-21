import React from 'react';
import './style.scss';

const Card = props => (
    <div className="card">
        <div>Страна: {props.item.country}</div>
        <div>Бренд: {props.item.brand}</div>
        <div>Марка: {props.item.model}</div>
        <div>Год: {props.item.year}</div>
        <div>vin-номер: {props.item.vin}</div>
    </div>
);

export default Card;
