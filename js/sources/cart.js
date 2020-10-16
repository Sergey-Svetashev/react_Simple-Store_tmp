'use strict';

import React from 'react';
import DB from "./DB";
import {NavLink} from 'react-router-dom';
import Field from './cart_field'

class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {products: this.props.values};
    this.cartField = this.cartField.bind(this);
    this.fieldRemove = this.fieldRemove.bind(this);
    this.cartIncrease = this.cartIncrease.bind(this);
    this.cartDecrease = this.cartDecrease.bind(this);
  }

  cartIncrease(id, price) {
    return function () {
      this.props.increase(id, price)
    }.bind(this)
  }

  cartDecrease(id, price) {
    return function () {
      this.props.decrease(id, price)
    }.bind(this)
  }

  fieldRemove(id, price) {
    return function () {
      this.props.onRemove(id, price)
    }.bind(this)
  }

  cartField(id, item) {
    return (
      <Field
        name={item.name}
        description={item.description}
        imgPath={item.image}
        price={item.price}
        currency={item.currency}
        key={id}
        count={this.props.added[id]}
        increase={this.cartIncrease(id, item.price)}
        decrease={this.cartDecrease(id, item.price)}
        clickToRemove={this.fieldRemove(id, item.price)}
      />
    )
  };

  render() {

    const chosenFields = this.state.products;
    const renderFields = [];

    for (let f = 0; f < chosenFields.length; f++) {
      for (let prod in DB) {
        chosenFields[f] === Number(prod) ? renderFields.push(this.cartField(Number(prod), DB[prod])) : false;
      }
    }

    return (
      <div className="cart" id="cart">
        <div className="title">Chosen products</div>
        {
          renderFields.length > 0
            ? renderFields :
            <div className="cart__notification">
              <p>Cart is empty.</p>
              <NavLink to="/">Choose Products</NavLink>
            </div>
        }
        <div className="cart__total">{`Total: ` + this.props.totalPrice + ` ` + DB[1].currency}</div>
      </div>
    )
  }
}

export default Cart;