'use strict';

import React from 'react';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cart__field">
        <div className="cart__name">{this.props.name}</div>
        <div className="cart__pict">
          <img src={this.props.imgPath} alt="Photo"/>
        </div>
        <div className="cart__price">{this.props.price * this.props.count} {this.props.currency}</div>
        <div className="cart__count">
          <span>{this.props.count}</span>
          <div className="cart__trigger">
            <span data-increase="" onClick={this.props.increase}/>
            <span className={this.props.count > 1 ? 'active' : ''} data-decrease="" onClick={this.props.decrease}/>
          </div>
        </div>
        <div className="cart__button" onClick={this.props.clickToRemove}/>
      </div>
    )

  }
}