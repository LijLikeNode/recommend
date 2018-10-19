import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class One extends Component {

    render(){
        const { index,answers,changeAnswer } = this.props;
        return (
            <TransitionGroup>
                <CSSTransition
                appear={true}
                classNames="appAppear"
                timeout={500}
                >
                    <div className="con1">
                        <h1>您的性别？</h1>
                        <div className="flex">
                            <div className="item" onClick={()=>{
                                changeAnswer(1)
                            }}>
                                <img src={require('../../assets/images/one/yman.png')} alt="男"/>
                                <p>男</p>
                                <em className={answers[index]===1?'active':''}></em>
                            </div>
                            <div className="item" onClick={()=>{
                                changeAnswer(2)
                            }}>
                                <img src={require('../../assets/images/one/ywomen.png')} alt="女"/>
                                <p>女</p>
                                <em className={answers[index]===2?'active':''}></em>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default One;