import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Two extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/two/ylife1.png'),mainTxt:'初入职场',tips:'（19～30）岁'},
                {imgUrl:require('../../assets/images/two/ylife2.png'),mainTxt:'有为青年',tips:'（31～40）岁'},
                {imgUrl:require('../../assets/images/two/ylife3.png'),mainTxt:'成家立业',tips:'（41～50）岁'},
                {imgUrl:require('../../assets/images/two/ylife4.png'),mainTxt:'人到中年',tips:'（51～60）岁'},
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
                        <h1>请选择当前人生阶段？</h1>

                        <div className="flex">
                            {
                                this.state.list.map((val,i)=>{
                                    return(
                                        <div key={i} className="item four" onClick={()=>{
                                            changeAnswer(i+1)
                                        }}>
                                            <img src={val.imgUrl} alt=''/>
                                            <p>{val.mainTxt}</p>
                                            <p className="tips">{val.tips}</p>
                                            <em className={answers[index]===i+1?'active':''}></em>
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

export default Two;