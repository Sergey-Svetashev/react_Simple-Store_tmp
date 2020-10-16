'use strict';

import React from 'react';
import Product from './product';
import DB from './DB';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.Prod = this.Prod.bind(this);
    this.productChoice = this.productChoice.bind(this);
  };

  productChoice (id, price) {
    return function () {
        this.props.choice(id, price)
      }.bind(this)
  }

  Prod(id, item) {
    return (
      <Product
        marked={this.props.marks.includes(id) ? ' mark' : ''}
        name={item.name}
        description={item.description}
        imgPath={item.image}
        price={item.price}
        currency={item.currency}
        key={id}
        choice={this.productChoice(id, item.price)}
      />
    )
  };

  render() {

    const products = [];

    for (let prod in DB) {
      products.push(this.Prod(Number(prod), DB[prod]))
    }

    return (
      <div className="product__list" id="productList">
        <h1 className="title">Our production</h1>
        {products}
      </div>
    )
  }
}
