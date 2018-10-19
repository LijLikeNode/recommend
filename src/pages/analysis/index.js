import React, { Component } from 'react';
import { observer,inject } from "mobx-react";
import calcFuc from './calcFuc';
import getPara from './paragraph';

const F2 = require('@antv/f2');
const btnStyle = {
  'textAlign':'right',
  'width':'86%',
  'margin':'2em auto 0',
  'position':'relative'
}
const imgStyle = {
  'width':'10em'
}
const arrow = {
  'position':'absolute',
  'top':'50%',
  'transform':'translateY(-80%) rotate(-135deg)',
  'right':'.7em',
  'width':'.5em',
  'height':'.5em',
  'borderTop':'.2em solid #ff6369',
  'borderLeft':'.2em solid #ff6369',
}
@inject("answers")
@observer
class Analysis extends Component {
    constructor(props){
      super(props);
      this.state = {
        healthIndex: 0, 
        assetsIndex: 0, 
        provideIndex: 0, 
        accidentIndex: 0, 
        otherIndex: 0 ,
        para:'',
        riskLevel:''
      }
      // console.log(this.state)
    }

    paintChart = (dom) =>{
      console.log(this.state)
        const data = [
            { img:require('../../assets/images/analysis/health.png'), name: '健康', value: this.state.healthIndex },
            { img:require('../../assets/images/analysis/accident.png'), name: '意外', value: this.state.accidentIndex },
            { img:require('../../assets/images/analysis/money.png'), name: '财产', value: this.state.assetsIndex },
            { img:require('../../assets/images/analysis/old.png'), name: '养老', value: this.state.provideIndex },
            { img:require('../../assets/images/analysis/other.png'), name: '其他', value: this.state.otherIndex },
        ];
        // Step 1: 创建 Chart 对象
        const chart = new F2.Chart({
            el: dom,
            pixelRatio: window.devicePixelRatio // 指定分辨率
        });
  
        chart.source(data, {
            value: {
              min: 0,
              max: 100
            }
          });
          chart.coord('polar');
          chart.tooltip(false); // 关闭 tooltip
          
          chart.axis('value', {
            grid: {
              lineDash: null,
            },
            label: null,
            line: null
          });
          chart.axis('name', {
            grid: {
              lineDash: null
            },
            style: {
                fill: 'red',
                fontWeight: '600' // 图例项 value 值文本样式
            },
            label: null
          });
          chart.area().position('name*value').color('#FE5C5B').style({
            fillOpacity: 0.8
          }).animate({
            appear: {
              animation: 'groupWaveIn'
            }
          });
          chart.line().position('name*value').color('#FE5C5B').size(1).animate({
            appear: {
              animation: 'groupWaveIn'
            }
          });
          chart.point().position('name*value').color('#FE5C5B').animate({
            appear: {
              delay: 300
            }
          });
          
          data.forEach(function(obj,i) {
            let positions = [['50%','-24%'],['80%','34%'],['70%','100%'],['30%','100%'],['20%','34%']][i];
            chart.guide().html({
              position: positions,
              html: '<div style="width: 80px;height: 24px;text-align: center">' + '<img src="' + obj.img + '" style="width: 24px;height: 24px;" />' + '<div style="color: #fff;transform:scale(0.8, 0.8);font-size:1.2em;">' + obj.name + '</div>' + '</div></div>',
              // offsetY: offsetY
            });
          });
          chart.render();
    }

    lookPlan = () =>{
      this.props.history.push("/product");
    }

    render() {
        // const answers = JSON.parse(JSON.stringify(this.props.answers));
        // console.log(this.state)
        return (
            <div className="page home analysis">
                <h1>经分析： 您的风险等级 <span>{this.state.riskLevel}</span></h1>
                <canvas id="myCanvas"  height="170"></canvas>



                <div className="dashContainer">
                  <div className="lineContainer">
                    <p>{this.state.para}</p>
                  </div>
                </div>
                <div style={btnStyle} onClick={this.lookPlan}>
                  <img style={imgStyle} src={require('../../assets/images/analysis/lookBtn.png')} alt=""/>
                  <span style={arrow}></span>
                </div>
                
            </div>
        );
    }

    riskLevelCalc = (data,index) =>{
      if(data.answers[3]===5){
        this.setState({
          riskLevel:'低'
        })

        return;
      }

      let largerThan80 = 0;
      for(let i in index){
        if(index[i]>=80) largerThan80++;
      }
      let assetsKindHigh = data.assetsKind.indexOf(1)===-1||data.assetsKind.indexOf(1)===-1;
      let workHigh = data.answers[3]===2||data.answers[3]===4||data.answers[3]===6;
      if(largerThan80>=3||assetsKindHigh||workHigh){
        this.setState({
          riskLevel:'高'
        })

        return;
      }

      let assetsKindMid = data.assetsKind.indexOf(1)!==-1||data.assetsKind.indexOf(1)!==-1;
      let workMid = data.answers[3]===1;
      if(largerThan80<3||largerThan80>0||assetsKindMid||workMid){
        this.setState({
          riskLevel:'中'
        })

        return;
      }

      let assetsKindBot = data.assetsKind.indexOf(1)!==-1||data.assetsKind.indexOf(1)!==-1;
      let workBot = data.answers[3]===3;
      if(largerThan80===0||assetsKindBot||workBot){
        this.setState({
          riskLevel:'低'
        })

        return;
      }

    }

    componentDidMount(){
      if(!sessionStorage.answers) sessionStorage.answers = JSON.stringify(this.props.answers);
      

      let Index = {...calcFuc(JSON.parse(sessionStorage.answers))};
      this.props.answers.setRiskScore(Index);
      this.setState(Index,function () {
        this.paintChart(document.getElementById('myCanvas'));
        this.riskLevelCalc(JSON.parse(sessionStorage.answers),Index);
        this.setState({para:getPara(JSON.parse(sessionStorage.answers),this.state.healthIndex)})
      });
      
    }
}


export default Analysis;