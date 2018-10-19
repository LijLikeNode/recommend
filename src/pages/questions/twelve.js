import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { Picker, List } from 'antd-mobile';

// const Item = List.Item;


@observer
class twelve extends Component {
    constructor(props){
        super(props);
        this.state = {
            lifePay : [
                {label:'30%以内',value:'30%以内'},
                {label:'30%~50%',value:'30%~50%'},
                {label:'50%~70%',value:'50%~70%'},
                {label:'70%~80%',value:'70%~80%'},
                {label:'80%以上',value:'80%以上'},
            ],
            payList:[
                {mainTxt:'日常消费'},
                {mainTxt:'房贷'},
                {mainTxt:'子女教育'},
                {mainTxt:'车贷'},
                {mainTxt:'赡养老人'},
                {mainTxt:'房租'},
                {mainTxt:'医疗支出'},
                {mainTxt:'其他支出'},
            ],
            
        }
    }


    render() {
        const { setIncome,lifePay,PayKindsCheck,lifePayKind } = this.props.answers;
        return (
            <div className="costCon">
                <h1>您日常支出占收入多少？</h1>
                <Picker data={this.state.lifePay} value={lifePay} cols={1} className="forss" onChange={(item)=>{
                    setIncome(item,'lifePay');
                }}>
                    <List.Item id="noBorder" extra={'请选择占比'} arrow="horizontal"></List.Item>
                </Picker>
                <img src={require('../../assets/images/twelve/phone.png')} alt=""/>
                <h1>其中主要支出项：<span>（可多选）</span></h1>
                <ul className="t12">
                    {
                        this.state.payList.map((item,i) =>{
                            return(
                                <li onClick={() =>{
                                    PayKindsCheck(i+1);
                                }} key={item.mainTxt}><em className={lifePayKind.indexOf(i+1)!==-1?'active':''}></em>{item.mainTxt}</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

// twelve.propTypes = {

// };

export default twelve;