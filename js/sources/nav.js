'use strict';

import React from 'react';
import Svg from './SVG';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component {

  render() {
    return (
      <nav>
        <Svg />
        <NavLink exact to="/" className="nav__item">Products</NavLink>
        <NavLink to="/cart" className="nav__item nav__item_cart">
          <span>Cart</span>
          <span className={`cart-content${this.props.content > 0 ? ' show' : ''}`}>
            {this.props.content > 0 ? this.props.content : ''}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref="#cart"/>
          </svg>
        </NavLink>
      </nav>
    )
  }

}