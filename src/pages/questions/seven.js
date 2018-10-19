import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Seven extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/five/transport1.png'),mainTxt:'所到之处，烟熏火燎'},
                {imgUrl:require('../../assets/images/five/transport2.png'),mainTxt:'一天一包，赛活神仙'},
                {imgUrl:require('../../assets/images/five/transport3.png'),mainTxt:'一周两包，交际神器'},
                {imgUrl:require('../../assets/images/five/transport4.png'),mainTxt:'关爱生命，远离香烟'},
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
                    <div className="con2 bot">
                        
                        <h1>您经常吸烟吗？</h1>

                        <div className="ansList">
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
                        <img className="bot" src={require('../../assets/images/seven/banner.png')} alt=""/>
                    </div>
            //     </CSSTransition>
            // </TransitionGroup>
        )
    }
}

export default Seven;