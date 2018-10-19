import React, { Component } from 'react';
import { observer,inject } from "mobx-react";
import productList from './productList';
import ProductItem from './productItem';
import Order from './order';
import FamilyMember from './member';
import Tag from './tag';
import ax from '../../api';

// const OWN = "本人";
const OTHER = "配偶";
const CHILD = "儿女";
const PARENT = "父母";
let [cqs2015, cqs2018, hxf, xyx, hsf, zabb, flm, cqt] = [0,0,0,0,0,0,0,0];

@inject('answers')
@observer
class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            orderShow:false,
            CheckedData:'',
            subs:0,
            spare2:''
        }
    }
    render() {
        let data;
        if(sessionStorage.answers){
            data = JSON.parse(sessionStorage.answers);
        }else{
            data = this.props.answers;
        }
        return (
            <div className="productList">
                <FamilyMember data={data} changeTab={this.changeTab}></FamilyMember>
                <Tag data={this.state.CheckedData}></Tag>
                <h3>适合险种</h3>
                {
                    this.state.list.map((listItem, i) =>{
                        return (
                            <ProductItem listItem={listItem} key={i}></ProductItem>
                        )
                    })
                }
                <img className="order" onClick={()=>{
                    this.toggleOrder(true)
                }} src={require('../../assets/images/product/orderBtn.png')} alt=""/>
                <Order orderShow={this.state.orderShow} toggleOrder={this.toggleOrder} spare2={this.state.spare2} subs={this.state.subs}></Order>
            </div>
        );
    }

    toggleOrder = (orderShow) =>{
        this.setState({
            orderShow
        })
    }

    changeTab = (name) =>{
        let data;
        if(sessionStorage.answers){
            data = JSON.parse(sessionStorage.answers);
        }else{
            data = this.props.answers;
        }
        this.initChechedData(JSON.stringify(data),name);
    }

    initChechedData = (data,name)=>{
        let CheckedData = JSON.parse(data);
        if(name===OTHER){
            //另一半性别
            CheckedData.answers[0]=CheckedData.answers[0]===1?2:1;
        }else if(name===CHILD){
            //孩子的年龄，家庭结构  赋值0  小于18岁
            CheckedData.answers[1]=CheckedData.answers[1]<=2?0:CheckedData.answers[1]===3?1:2;
            CheckedData.answers[1]===0?CheckedData.answers[2]=1:'';

        }else if(name===PARENT){
            //父母年龄
            CheckedData.answers[1]=CheckedData.answers[1]===1?3:CheckedData.answers[1]===2?4:CheckedData.answers[1];

        }else{
            // console.log(name);
        }
        this.setState({
            CheckedData
        })
        this.initWeightVal(CheckedData);

    }

    //计算 产品权重  重置产品列表
    initWeightVal = (data) =>{
        [cqs2015, cqs2018, hxf, xyx, hsf, zabb, flm, cqt] = [0,0,0,0,0,0,0,0];
        let {answers} = data;
        //性别
        if(answers[0]===1){
            this.WeightCalc([2,2,2,3,3,2,2,3]);
        }else{
            this.WeightCalc([3,3,3,2,2,3,3,2]);
        }
        //年龄
        if(answers[1]===0){
            this.WeightCalc([2,2,3,2,0,10,5,3]);
        }else if(answers[1]===1){
            this.WeightCalc([2,2,2,3,4,0,2,2]);
        }else if(answers[1]===2){
            this.WeightCalc([2,2,2,3,3,0,2,3]);
        }else if(answers[1]===3){
            this.WeightCalc([2,2,2,1,3,0,1,1]);
        }else if(answers[1]===4){
            this.WeightCalc([2,2,1,1,0,0,0,1]);
        }
        //家庭结构
        if(answers[2]===1){
            this.WeightCalc([1,1,1,2,1,0,1,1]);
        }else if(answers[2]===2){
            this.WeightCalc([1,1,1,1,1,1,1,1]);
        }else if(answers[2]===3){
            this.WeightCalc([2,2,2,1,1,2,2,2]);
        }else if(answers[2]===4){
            this.WeightCalc([1,1,1,1,2,2,1,1]);
        }
        //个人年余留
        //个人收入减去支出占比
        let i = data.personIncome[0].indexOf('~');
        let personIncome = parseInt(data.personIncome[0].slice(i+1));
        let index = data.lifePay[0].indexOf('~');
        let lifePay = parseInt(data.lifePay[0].slice(index+1))/100;
        let remainMoney = personIncome-personIncome*lifePay;
        if(remainMoney<=1){
            this.WeightCalc([2,2,2,0,5,0,0,2]);
        }else if(remainMoney>1&&remainMoney<=5){
            this.WeightCalc([2,2,2,0,3,1,1,2]);
        }else if(remainMoney>5&&remainMoney<=10){
            this.WeightCalc([5,5,2,0,3,1,1,2]);
        }else if(remainMoney>10&&remainMoney<=20){
            this.WeightCalc([5,5,4,5,3,5,5,4]);
        }else if(remainMoney>20&remainMoney<=50){
            this.WeightCalc([3,3,4,7,3,6,6,4]);
        }else if(remainMoney>=50){
            this.WeightCalc([3,3,4,8,3,7,7,4]);
        }

        //支出项
        if(data.lifePayKind.indexOf(1)!==-1){
            this.WeightCalc([1,1,1,1,1,1,1,1]);
        }
        if(data.lifePayKind.indexOf(6)!==-1){
            this.WeightCalc([1,1,1,1,1,1,1,1]);
        }
        if(data.lifePayKind.indexOf(8)!==-1){
            this.WeightCalc([1,1,1,1,1,1,1,1]);
        }
        if(data.lifePayKind.indexOf(5)!==-1){
            this.WeightCalc([1,2,1,0,0,0,4,0]);
        }
        if(data.lifePayKind.indexOf(7)!==-1){
            this.WeightCalc([4,3,4,0,0,0,1,5]);
        }
        if(data.lifePayKind.indexOf(3)!==-1){
            this.WeightCalc([1,1,3,0,0,5,0,0]);
        }
        if(data.lifePayKind.indexOf(2)!==-1){
            this.WeightCalc([3,3,3,0,0,0,0,3]);
        }
        if(data.lifePayKind.indexOf(5)!==-1){
            this.WeightCalc([2,2,2,0,0,0,0,2]);
        }


        //承担风险能力
        //1有无车房
        if(data.assetsKind.indexOf(1)!==-1||data.assetsKind.indexOf(2)!==-1){
            this.WeightCalc([4,4,4,4,4,4,4,0]);
        }
        //2家庭结构是否稳固
        if(answers[2]===4){
            this.WeightCalc([0,0,4,0,4,0,0,4]);
        }
        //3支出占比
        if(lifePay>0.6){
            this.WeightCalc([0,0,0,-4,0,-4,0,0]);
        }
        //4房贷车贷
        if(data.lifePayKind.indexOf(2)!==-1||data.lifePayKind.indexOf(2)!==-1){
            this.WeightCalc([0,0,0,0,0,0,-2,0]);
        }

        //资产
        let totalAssetMax = parseInt(data.totalAssets[0].split('~')[1]);
        if(data.totalAssets[0]==="1000万以上") totalAssetMax = 1100;
        if(Number(totalAssetMax)===50){
            this.WeightCalc([1,1,1,0,2,0,1,2]);
        }else if(Number(totalAssetMax)===100){
            this.WeightCalc([2,2,1,1,1,0,1,2]);
        }else if(Number(totalAssetMax)===500){
            this.WeightCalc([2,2,1,1,1,1,1,1]);
        }else if(Number(totalAssetMax)===1000){
            this.WeightCalc([0,0,1,1,1,2,1,0]);
        }else if(Number(totalAssetMax)>=1000){
            this.WeightCalc([0,0,1,2,0,2,1,0]);
        }

        //城市等级
        if(data.CityLevel===1||data.CityLevel===2){
            this.WeightCalc([1,1,1,2,1,1,2,0]);
        }else if(data.CityLevel===3){
            this.WeightCalc([1,1,0,1,1,1,1,1]);
        }else{
            this.WeightCalc([1,1,1,0,1,1,0,2]);
        }

        //风险等级
        let { healthIndex, assetsIndex, provideIndex, accidentIndex } = data.RiskScore;

        //健康
        if(healthIndex<=30){
            this.WeightCalc([1,1,2,0,1,1,0,2]);
        }else if(healthIndex>30&&healthIndex<=60){
            this.WeightCalc([2,2,1,1,1,0,0,1]);
        }else if(healthIndex>60&&healthIndex<=85){
            this.WeightCalc([1,1,1,1,1,0,0,2]);
        }else if(healthIndex>85){
            this.WeightCalc([1,1,1,1,1,0,0,1]);
        }
        //意外
        if(accidentIndex<=30){
            this.WeightCalc([3,3,1,0,0,5,3,1]);
        }else if(accidentIndex>30&&accidentIndex<=60){
            this.WeightCalc([2,2,1,0,0,0,2,1]);
        }else if(accidentIndex>60&&accidentIndex<=85){
            this.WeightCalc([0,0,1,0,0,0,0,1]);
        }else if(accidentIndex>85){
            this.WeightCalc([0,0,2,5,5,0,0,2]);
        }
        //财产
        if(assetsIndex<=30){
            this.WeightCalc([2,2,2,5,5,3,3,0]);
        }else if(assetsIndex>30&&assetsIndex<=60){
            this.WeightCalc([1,1,1,0,0,2,2,0]);
        }else if(assetsIndex>60&&assetsIndex<=85){
            this.WeightCalc([1,1,1,0,0,0,0,2]);
        }else if(assetsIndex>85){
            this.WeightCalc([1,1,1,0,0,0,0,3]);
        }
        //养老
        if(provideIndex<=30){
            this.WeightCalc([0,0,0,5,3,5,5,0]);
        }else if(provideIndex>30&&provideIndex<=60){
            this.WeightCalc([0,0,0,0,2,0,0,0]);
        }else if(provideIndex>60&&provideIndex<=85){
            this.WeightCalc([2,2,0,0,0,0,0,2]);
        }else if(provideIndex>85){
            this.WeightCalc([3,3,5,0,5,0,0,3]);
        }


        //根据个人年余留  性别  年龄  计算 保额
        this.coverageCalc(remainMoney,answers[0],answers[1]);


        console.log(cqs2015, cqs2018, hxf, xyx, hsf, zabb, flm, cqt)
        this.initProductList(cqs2015, cqs2018, hxf, xyx, hsf, zabb, flm, cqt)
    }

    coverageCalc = (remainMoney,sex,age) =>{
        // console.log(remainMoney,sex,age);
        if(remainMoney<1){
            if(sex===1){
                if(age===0){
                    this.updateProductTypeMoney(['10w','10w','7w','','','','3000元','2份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['5w','5w','5w','','1份','','2000元','1份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['5w','5w','3w','','1份','','2000元','1份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['3w','3w','2w','','','','','1份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['1w','1w','1w','','','','','1份']);
                }
            }else{
                if(age===0){
                    this.updateProductTypeMoney(['10w','10w','7w','','1份','','3000元','2份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['5w','5w','5w','','1份','','2000元','1份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['5w','5w','3w','','','','2000元','1份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['3w','3w','2w','','','','','1份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['1w','1w','1w','','','','','1份']);
                }
            }
        }else if(remainMoney>=1&&remainMoney<5){
            if(sex===1){
                if(age===0){
                    this.updateProductTypeMoney(['15w','15w','15w','','','','5000元','3份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['10w','10w','10w','','2份','','4000元','2份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['10w','10w','5w','','2份','','3000元','2份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['5w','5w','5w','','1份','','','2份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['3w','3w','2w','','','','','2份']);
                }
            }else{
                if(age===0){
                    this.updateProductTypeMoney(['20w','20w','15w','','','','4500元','3份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['10w','10w','10w','','2份','','4000元','2份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['10w','10w','7w','','2份','','3000元','2份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['5w','5w','5w','','1份','','','2份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['3w','3w','2w','','','','','2份']);
                }
            }
        }else if(remainMoney>=5&&remainMoney<10){
            if(sex===1){
                if(age===0){
                    this.updateProductTypeMoney(['35w','35w','35w','','','','9500元','8份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['25w','25w','21w','','2份','','8000元','5份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['20w','20w','15w','','2份','','6000元','5份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['10w','10w','9w','','2份','','1500元','3份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','5w','','','','','3份']);
                }
            }else{
                if(age===0){
                    this.updateProductTypeMoney(['40w','40w','35w','','','','9500元','8份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['30w','30w','25w','','2份','','8000元','5份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['20w','20w','20w','','2份','','6000元','5份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['10w','10w','11w','','2份','','2000元','3份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','6w','','','','','3份']);
                }
            }
        }else if(remainMoney>=10&&remainMoney<20){
            if(sex===1){
                if(age===0){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','','','2.8w','10份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['50w','50w','42w','1000w','2份','','2.4w','10份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['35w','35w','30w','1000w','2份','','1.1w','9份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['20w','20w','11w','','2份','','3000元','6份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','10w','','','','','6份']);
                }
            }else{
                if(age===0){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','','','2.8w','10份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['50w','50w','47w','1000w','2份','','2.4w','10份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['40w','40w','35w','1000w','2份','','1.1w','9份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['20w','20w','20w','','2份','','4000元','6份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','10w','','','','','6份']);
                }
            }
        }else if(remainMoney>=20&&remainMoney<50){
            if(sex===1){
                if(age===0){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','','','9.5w','10份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','8w','10份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','5.5w','10份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['20w','20w','20w','1000w','2份','','1.4w','10份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','10w','','','','','10份']);
                }
            }else{
                if(age===0){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','','','9.5w','10份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','8w','10份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','5.5w','10份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['20w','20w','20w','1000w','2份','','1.9w','10份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','10w','','','','','10份']);
                }
            }
        }else if(remainMoney>=50){
            if(sex===1){
                if(age===0){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','','','19w','10份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','16w','10份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','11w','10份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['20w','20w','20w','1000w','2份','','3w','10份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','10w','','','','','10份']);
                }
            }else{
                if(age===0){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','','','19w','10份']);
                }else if(age===1){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','16w','10份']);
                }else if(age===2){
                    this.updateProductTypeMoney(['50w','50w','50w','1000w','2份','','11w','10份']);
                }else if(age===3){
                    this.updateProductTypeMoney(['20w','20w','20w','1000w','2份','','4w','10份']);
                }else if(age===4){
                    this.updateProductTypeMoney(['5w','5w','10w','','','','','10份']);
                }
            }
        }

    }

    updateProductTypeMoney = (arr) =>{
        arr.forEach((val,i)=>{
            switch (i){
                case 0:
                productList.cqs2015.typeMoney = val;
                break;
                case 1:
                productList.cqs2018.typeMoney = val;
                break;
                case 2:
                hxf+=val;
                break;
                case 3:
                productList.xyx.typeMoney = val;
                break;
                case 4:
                productList.hsf.typeMoney = val;
                break;
                case 5:
                productList.zabb.typeMoney = val;
                break;
                case 6:
                productList.flm.typeMoney = val;
                break;
                case 7:
                productList.cqt.typeMoney = val;
                break;
                default:
                console.log(val)
            }
        })
    }

    initProductList = (cqs2015, cqs2018, hxf, xyx, hsf, zabb, flm, cqt) =>{

        let zj = [cqs2015, cqs2018, hxf];


        // let productArr = [...new Set([cqs2015, cqs2018, hxf, xyx, hsf, zabb, flm, cqt])];

        function sortArr(a,b){
            return b-a
        }


        let spare2 = '';
        let list = [];
        zj.sort(sortArr);

        if(zj[0]===cqs2015){
            list.push(productList.cqs2015);
            spare2 +='常青树2015 ';
        }else if(zj[0]===cqs2018){
            list.push(productList.cqs2018);
            spare2 +='常青树2018智慧版 ';
        }else{
            list.push(productList.hxf);
            spare2 +='华夏福 ';
        }


        if(xyx>=hsf){
            list.push(productList.xyx);
            spare2 +='逍遥行 ';
        }else{
            list.push(productList.hsf);
            spare2 +='护身福 ';
        }

        if(flm>=zabb){
            list.push(productList.flm);
            spare2 +='福临门 ';
        }else{
            list.push(productList.zabb);
            spare2 +='珍爱宝贝 ';
        }

        list.push(productList.cqt);
        spare2 +='常青藤 ';

        this.setState({
            spare2
        })
        

        // productArr.sort(sortArr)

        
        // productArr.forEach(item =>{
            
        //     if(item===cqs2015){
        //         list.push(productList.cqs2015);
        //     }
        //     if(item===cqs2018){
        //         list.push(productList.cqs2018);
        //     }
        //     if(item===hxf){
        //         list.push(productList.hxf);
        //     }
        //     if(item===xyx){
        //         list.push(productList.xyx);
        //     }
        //     if(item===hsf){
        //         list.push(productList.hsf);
        //     }
        //     if(item===cqt){
        //         list.push(productList.cqt);
        //     }
        //     if(item===zabb){
        //         list.push(productList.zabb);
        //     }
        //     if(item===flm){
        //         list.push(productList.flm);
        //     }
            
        // })

        this.setState({
            list
        })
        
    }

    WeightCalc = (arr) =>{

        arr.forEach((val,i)=>{
            switch (i){
                case 0:
                cqs2015+=val;
                break;
                case 1:
                cqs2018+=val;
                break;
                case 2:
                hxf+=val;
                break;
                case 3:
                xyx+=val;
                break;
                case 4:
                hsf+=val;
                break;
                case 5:
                zabb+=val;
                break;
                case 6:
                flm+=val;
                break;
                case 7:
                cqt+=val;
                break;
                default:
                // console.log(val)
            }
        })
        
    }

    componentDidMount(){
        this.changeTab('本人');

        //预约人数
        let subs =  0;
        ax('pcMaintainBase/maintain.do', null).then(data => {
            subs += data.subs.base;
            return ax('expertTeam/countExpertTeam.do', null)
        }).then(data => {
            subs += data.num;
            this.setState({
                subs
            })
        });

        
    }
}

export default index;