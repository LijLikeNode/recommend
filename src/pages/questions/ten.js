import React, { Component } from 'react';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Ten extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:'',mainTxt:'宅男/宅女一枚'},
                {imgUrl:'',mainTxt:'微信步数，偶尔上榜'},
                {imgUrl:'',mainTxt:'经常捐步数，偶尔户外'},
                {imgUrl:'',mainTxt:'喜好户外，经常健身'},
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
                        <img src={require('../../assets/images/ten/banner.png')} alt=""/>
                        <h1>您经常健身吗？</h1>

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

export default Ten;