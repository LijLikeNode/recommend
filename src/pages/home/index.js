import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
// 引入观察者
import { observer, inject } from "mobx-react";

@inject("home")
@observer
class Home extends Component {

    componentDidMount(){
        sessionStorage.removeItem('answers')
    }

    render() {

        return (
            <div className="page home">
                <div className="logo">
                    <img src={require('../../assets/images/logo.png')} alt="logo"/>
                </div>
                <div className="banner">
                    <img src={require('../../assets/images/yHomeBanner.png')} alt="title"/>
                </div>
                <Link className="homeBtn" to='/questions'></Link>
            </div>
        )
        
    }
}


export default Home;