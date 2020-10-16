'use strict';

import React from 'react';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={`product__case${this.props.marked}`} onClick={this.props.choice}>
        <div className="product__name">
          {this.props.name}
        </div>
        <p className="product__description">
          {this.props.description}
        </p>
        <div className="price">
          Price: {this.props.price} {this.props.currency}
        </div>
        <div className="product__photo">
          <img src={this.props.imgPath} alt="photo"/>
        </div>
      </div>
    )
  }
}