import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Nine extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:'',mainTxt:'辗转反侧，难以入眠'},
                {imgUrl:'',mainTxt:'借助工具，帮助入眠'},
                {imgUrl:'',mainTxt:'不规律，沾枕头就着'},
                {imgUrl:'',mainTxt:'规律作息，到点就困'},
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
                        
                        <h1>您的睡眠质量好吗？</h1>

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
                        <img className="bot" src={require('../../assets/images/nine/banner.png')} alt=""/>
                    </div>
            //     </CSSTransition>
            // </TransitionGroup>
        )
    }
}

export default Nine;