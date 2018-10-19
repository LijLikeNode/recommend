import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Eight extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/five/transport1.png'),mainTxt:'嗜酒如命'},
                {imgUrl:require('../../assets/images/five/transport2.png'),mainTxt:'偶尔贪杯'},
                {imgUrl:require('../../assets/images/five/transport3.png'),mainTxt:'很少喝酒'},
                {imgUrl:require('../../assets/images/five/transport4.png'),mainTxt:'滴酒不沾'},
            ]
        }
    }



    render(){
        const { index,answers,changeAnswer } = this.props;
        return (
            // <TransitionGroup>
            //     <CSSTransition
            //     appear={true}
            //     classNames="appAppear"
            //     timeout={500}
            //     >
                    <div className="con2">
                        <img src={require('../../assets/images/eight/banner.png')} alt=""/>
                        <h1>您经常喝酒吗？</h1>

                        <div className="ansList top">
                            {
                                this.state.list.map((val,i)=>{
                                    return(
                                        <div key={i} className="item" onClick={()=>{
                                            changeAnswer(i+1)
                                        }}>
                                            
                                            <p><em className={answers[index]===i+1?'active':''}></em>{val.mainTxt}</p>
                                        </div> 
                                    )
                                })
                            }
                        </div>
                    </div>
            //     </CSSTransition>
            // </TransitionGroup>
        )
    }
}

export default Eight;