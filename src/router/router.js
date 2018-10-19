import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from '../pages/home';
import Questions from '../pages/questions';
import Analysis from '../pages/analysis';
import Product from '../pages/product';


class RouterContainer extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component ={Home}></Route>
                    <Route path="/questions" exact component ={Questions}></Route>
                    <Route path="/analysis" exact component ={Analysis}></Route>
                    <Route path="/product" exact component ={Product}></Route>
                </Switch>
            </HashRouter>
        )
    }
}

export default RouterContainer;