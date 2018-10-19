import React,{ Component } from 'react';
import { observer } from "mobx-react";
import { Picker, List } from 'antd-mobile';
import City from './citys';

@observer
class eleven extends Component {
    constructor(props){
        super(props);
        this.state = {
            personIncome : [
                {label:'3万以内',value:'3万以内'},
                {label:'3~5万',value:'3~5万'},
                {label:'5~10万',value:'5~10万'},
                {label:'10~20万',value:'10~20万'},
                {label:'20~50万',value:'20~50万'},
                {label:'50~100万',value:'50~100万'},
                {label:'100万以上',value:'100万以上'}
            ],
            familyIncome : [
                {label:'3万以内',value:'3万以内'},
                {label:'3~5万',value:'3~5万'},
                {label:'5~10万',value:'5~10万'},
                {label:'10~20万',value:'10~20万'},
                {label:'20~50万',value:'20~50万'},
                {label:'50~100万',value:'50~100万'},
                {label:'100万以上',value:'100万以上'}
            ],
            cityListShow:false,
        }
    }

    render(){
        const { setIncome,personIncome,familyIncome,CityName } = this.props.answers;

        return (
            <div className="city">
                <h1>您所在的城市</h1>
                <div className="chooseCity" onClick={this.chooseCity}>
                    <span>{CityName===''?'点击选择城市':CityName}</span>
                    <img className="loc" src={require('../../assets/images/eleven/loc.png')} alt=""/>
                </div>
                <img className="pig" src={require('../../assets/images/eleven/pig.png')} alt=""/>
                <Picker data={this.state.personIncome} value={personIncome} cols={1} className="forss" onChange={(item)=>{
                    setIncome(item,'personIncome');
                }}>
                    <List.Item arrow="horizontal">个人年收入</List.Item>
                </Picker>

                <Picker data={this.state.familyIncome} value={familyIncome} cols={1} className="forss" onChange={(item)=>{
                    setIncome(item,'familyIncome');
                }}>
                    <List.Item arrow="horizontal">家庭年收入</List.Item>
                </Picker>
                <City show={this.state.cityListShow} EnsureCity={this.ensureCity}></City>
            </div>
        )
    }

    chooseCity = ()=>{
        this.setState({
            cityListShow:true
        })
    }

    ensureCity = (val,level)=>{
        this.props.answers.EnsureCity(val,level);
        this.setState({
            cityListShow:false
        })
    }
}



export default eleven;