import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Six extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/five/transport1.png'),mainTxt:'每天一杯，元气全靠咖啡撑'},
                {imgUrl:require('../../assets/images/five/transport2.png'),mainTxt:'一周2~3杯，再喝也困'},
                {imgUrl:require('../../assets/images/five/transport3.png'),mainTxt:'几乎不喝，除非要出席的场合有分量'},
                {imgUrl:require('../../assets/images/five/transport4.png'),mainTxt:'从不喝，一沾就得晚上干瞪眼'},
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
                        <img src={require('../../assets/images/six/banner.png')} alt=""/>
                        <h1>平时喝咖啡吗？</h1>

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

export default Six;