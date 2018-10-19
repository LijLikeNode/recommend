import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Five extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/five/transport1.png'),mainTxt:'飞机'},
                {imgUrl:require('../../assets/images/five/transport2.png'),mainTxt:'自行车'},
                {imgUrl:require('../../assets/images/five/transport3.png'),mainTxt:'火车'},
                {imgUrl:require('../../assets/images/five/transport4.png'),mainTxt:'公交车'},
                {imgUrl:require('../../assets/images/five/transport5.png'),mainTxt:'轿车'},
                {imgUrl:require('../../assets/images/five/transport6.png'),mainTxt:'步行'},
            ]
        }
    }



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
                        <h1>您常用的出行方式？（可多选）</h1>

                        <div className="flex">
                            {
                                this.state.list.map((val,i)=>{
                                    return(
                                        <div key={i} className="item six" onClick={()=>{
                                            changeAnswer(i+1,'more')
                                        }}>
                                            <img src={val.imgUrl} alt=''/>
                                            <p>{val.mainTxt}</p>
                                            <em className={answers[index].indexOf(i+1)!==-1?'active':''}></em>
                                        </div> 
                                    )
                                })
                            }
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default Five;