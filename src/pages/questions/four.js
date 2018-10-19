import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";

@observer
class Four extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : [
                {imgUrl:require('../../assets/images/four/profession1.png'),mainTxt:'金融、软件'},
                {imgUrl:require('../../assets/images/four/profession2.png'),mainTxt:'农林耕种'},
                {imgUrl:require('../../assets/images/four/profession3.png'),mainTxt:'政府企事业单位'},
                {imgUrl:require('../../assets/images/four/profession4.png'),mainTxt:'文娱艺术'},
                {imgUrl:require('../../assets/images/four/profession5.png'),mainTxt:'学生'},
                {imgUrl:require('../../assets/images/four/profession6.png'),mainTxt:'自由职业者'},
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
                        <h1>您从事的职业？</h1>

                        <div className="flex">
                            {
                                this.state.list.map((val,i)=>{
                                    return(
                                        <div key={i} className="item six" onClick={()=>{
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

export default Four;