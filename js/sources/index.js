import '@css/slick.css'
import '@css/_reset.sass'
import '@css/main.sass'
import '@css/media.sass'
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import Nav from './nav';
import ProductList from './product_list';
import Cart from './cart';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chosen: [],
      inCart: {},
      totalPrice: 0,
    };
    this.chosenProducts = this.chosenProducts.bind(this);
    this.increaseProduct = this.increaseProduct.bind(this);
    this.decreaseProduct = this.decreaseProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.totalProduct = this.totalProduct.bind(this);
  }

  chosenProducts(id, price) {

    let currentState = this.state.chosen;
    let currentPrice = Number(price);
    let currentProducts = this.state.inCart[id] * currentPrice;

    currentState.includes(id)
      ? currentState.splice(currentState.indexOf(id), 1)
      : currentState.push(id);

    this.setState(function (state) {
      return [
        state.chosen = currentState,
        id in state.inCart ? delete state.inCart[id] : state.inCart[id] = 1,
        id in state.inCart ? state.totalPrice += currentPrice : state.totalPrice -= currentProducts,
      ]
    });

  }

  increaseProduct(id, price) {
    let currentPrice = Number(price);

    this.setState((state) => {
      return (
        [
          state.inCart[id]++,
          state.totalPrice += currentPrice,
        ]
      )
    });
  }

  decreaseProduct(id, price) {
    let currentPrice = Number(price);
    let currentProducts = this.state.inCart[id];

    this.setState((state) => {
      return (
        [
          state.inCart[id] === 1 ? false : state.inCart[id]--,
          currentProducts === 1 ? false : state.totalPrice -= currentPrice,
        ]
      )
    });
  }

  removeProduct(id, price) {

    let chosen = this.state.chosen;
    let currentPrice = Number(price) * this.state.inCart[id];

    for (let i = 0; i < chosen.length; i++) {
      chosen[i] === id ? chosen.splice(i, 1) : false
    }

    this.setState(function (state) {
      return [
        id in state.inCart ? delete state.inCart[id] : false,
        state.chosen = chosen,
        state.totalPrice -= currentPrice,
      ]
    });
  }

  totalProduct() {
    let total = 0;

    for (let prod in this.state.inCart) {
      if (this.state.inCart.hasOwnProperty(prod)) {
        total += Number(this.state.inCart[prod]);
      }
    }

    return total
  }

  render() {
    return (
      <Router history={createBrowserHistory}>
        <div className="container">
          <Nav content={this.totalProduct()}/>
          <Switch>
            <Route exact path="/" render={
              () => <ProductList choice={this.chosenProducts} marks={this.state.chosen}/>
            }/>
            <Route path="/cart" render={() => (<Cart
              values={this.state.chosen}
              added={this.state.inCart}
              increase={this.increaseProduct}
              decrease={this.decreaseProduct}
              onRemove={this.removeProduct}
              totalPrice={this.state.totalPrice}/>)}
            />
          </Switch>
        </div>
      </Router>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));