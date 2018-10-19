import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { Picker, List } from 'antd-mobile';
@observer
class thirteen extends Component {
    constructor(props){
        super(props);
        this.state = {
            assets:[
                {imgUrl:require('../../assets/images/thirteen/house.png'),mainTxt:'房产'},
                {imgUrl:require('../../assets/images/thirteen/car.png'),mainTxt:'车产'},
                {imgUrl:require('../../assets/images/thirteen/bank.png'),mainTxt:'银行存款'},
                {imgUrl:require('../../assets/images/thirteen/fund.png'),mainTxt:'基金'},
                {imgUrl:require('../../assets/images/thirteen/shares.png'),mainTxt:'股票'},
            ],
            totalAssets:[
                {label:'50万以内',value:'50万以内'},
                {label:'50~100万',value:'50~100万'},
                {label:'100~500万',value:'100~500万'},
                {label:'500~1000万',value:'500~1000万'},
                {label:'1000万以上',value:'1000万以上'},
            ]
        }
    }
    render() {
        const { setIncome,totalAssets,assetsKind,AssetsKinkCheck } = this.props.answers;
        return (
            <div className="costCon">
                <h1>您拥有的资产有多少？</h1>
                <Picker data={this.state.totalAssets} value={totalAssets} cols={1} className="forss" onChange={(item)=>{
                    setIncome(item,'totalAssets');
                }}>
                    <List.Item arrow="horizontal" id="assets">总资产</List.Item>
                </Picker>

                <h1>您的资产主要有哪些？<span>（可多选）</span></h1>
                <ul className="t13">
                    {
                        this.state.assets.map((item,i) =>{
                            return (
                                <li key={item.mainTxt} onClick={()=>{
                                    AssetsKinkCheck(i+1);
                                }}>
                                    <div className="imgCon">
                                        <img src={item.imgUrl} alt=""/>
                                    </div>
                                    <em className={assetsKind.indexOf(i+1)!==-1?'active':''}></em>
                                    {item.mainTxt}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

// thirteen.propTypes = {

// };

export default thirteen;