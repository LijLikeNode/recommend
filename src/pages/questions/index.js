import React,{ Component,Fragment } from 'react';
import { Redirect } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// 引入观察者
import { observer, inject } from "mobx-react";
import One from './one';
import Two from './two';
import Three from './three';
import Four from './four';
import Five from './five';
import Six from './six';
import Seven from './seven';
import Eight from './eight';
import Nine from './nine';
import Ten from './ten';
import Eleven from './eleven';
import Twelve from './twelve';
import Thirteen from './thirteen';

@inject("answers")
@observer

class Questions extends Component {



    checkIndex = (i,ans,change,setIncome) => {
        switch (i){
            case 0:
                return <One index={i} answers={ans} changeAnswer={change}></One>
            case 1:
                return <Two index={i} answers={ans} changeAnswer={change}></Two>
            case 2:
                return <Three index={i} answers={ans} changeAnswer={change}></Three>
            case 3:
                return <Four index={i} answers={ans} changeAnswer={change}></Four>
            case 4:
                return <Five index={i} answers={ans} changeAnswer={change}></Five>
            case 5:
                return <Six index={i} answers={ans} changeAnswer={change}></Six>
            case 6:
                return <Seven index={i} answers={ans} changeAnswer={change}></Seven>
            case 7:
                return <Eight index={i} answers={ans} changeAnswer={change}></Eight>
            case 8:
                return <Nine index={i} answers={ans} changeAnswer={change}></Nine>
            case 9:
                return <Ten index={i} answers={ans} changeAnswer={change}></Ten>
            case 10:
                return <Eleven answers={this.props.answers}></Eleven>
            case 11:
                return <Twelve answers={this.props.answers}></Twelve>
            case 12:
                return <Thirteen answers={this.props.answers}></Thirteen>
            case 13:
                return  <Redirect push to="/analysis" />;
            default:
                return;
        }
    }

    componentDidMount(){
        this.props.answers.initData();
    }



    render() {

        const { questionIndex,answers,changeAnswer,nextQues,prevQues,setIncome } = this.props.answers;
        // console.log(changeAnswer)

        return (
            <div className="page gray">
                <div className="container">
                    { this.checkIndex(questionIndex,answers,changeAnswer,setIncome) }
                </div>
                <div className={questionIndex<12?"footer show":'footer'}>
                    {
                        questionIndex===0?
                        (<button onClick={nextQues}>下一题</button>):
                        (<Fragment>
                            <button onClick={nextQues}>下一题</button><button onClick={prevQues}>上一题</button>
                        </Fragment>)
                    }
                </div>
                <div onClick={nextQues} className={questionIndex===12?"qsBtn show":'qsBtn'}>查看风险分析</div>
            </div>
        )
    }
}


export default Questions;