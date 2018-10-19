import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Three extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/three/family1.png'),mainTxt:'单身'},
                {imgUrl:require('../../assets/images/three/family2.png'),mainTxt:'已婚无孩'},
                {imgUrl:require('../../assets/images/three/family3.png'),mainTxt:'独身有娃'},
                {imgUrl:require('../../assets/images/three/family4.png'),mainTxt:'上有老下有小'},
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
                        <h1>您的家庭结构？</h1>

                        <div className="flex">
                            {
                                this.state.list.map((val,i)=>{
                                    return(
                                        <div key={i} className="item four" onClick={()=>{
                                            changeAnswer(i+1)
                                        }}>
                                            <img src={val.imgUrl} alt=''/>
                                            <p>{val.mainTxt}</p>
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

export default Three;