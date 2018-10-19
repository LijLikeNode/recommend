import React, { Component } from 'react';
import { Picker, List, Modal } from 'antd-mobile';
import ax from '../../api';
import popalert from '../../popalert';


const alert = Modal.alert;
class order extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:[''],
            dateList:[],
            tel:'',
        }
    }

    render() {
        let {subs} = this.props;
        return (
            <div className={this.props.orderShow?"orderMask":"orderMask hide"}>
                <div className="orderCon">
                    <b className="close" onClick={() =>{
                        this.props.toggleOrder(false);
                    }}></b>
                    <h1>保险专家</h1>
                    <h2>为您提供最专业、最精准的保障服务</h2>
                    <div className="icons">
                        <img src={require('../../assets/images/order/o1.png')} alt=""/>
                        <img src={require('../../assets/images/order/o2.png')} alt=""/>
                        <img src={require('../../assets/images/order/o3.png')} alt=""/>
                        <img src={require('../../assets/images/order/o4.png')} alt=""/>
                    </div>
                    <input type="tel" placeholder="请输入您的电话" onChange={this.telChange} value={this.state.tel}/>
                    <Picker data={this.state.dateList} value={this.state.date} cols={1} className="forss" onChange={(item)=>{
                        this.changeDate(item);
                    }}>
                        <List.Item arrow="horizontal" id="order"></List.Item>
                    </Picker>
                    <span onClick={this.submitData}>提交预约</span>
                    <p>保险专家团队已为<i>{subs}</i>客户提供满意服务</p>
                </div>
                <Modal className="order"></Modal>
                
            </div>
        );
    }

    telChange = (e) =>{
        let tel = e.target.value;
        this.setState({
            tel
        })
    }


    changeDate = (date) =>{
        this.setState({
            date
        })
    }

    submitData = ()=>{
        //检查电话号码格式
        if(!/^1[3|4|5|7|8|9][0-9]{9}$/.test(this.state.tel)){
            popalert.fade('请您输入正确的手机号');
            return;
        }

        //提交信息
        let {spare2} = this.props;
        let contactTime = this.state.date[0].slice(0,11);
        let data = {
            contactTime,
            contactInformation:this.state.tel,
            spare1:11,
            spare2
        }
        
        ax('expertTeam/saveOrUpdateForET2.do',{data:JSON.stringify(data)}).then(res =>{
            // console.log(res);
            if(res.data.result==="success"){
                this.props.toggleOrder(false);
                this.setState({
                    tel:''
                });
                alert(<h1 style={{color:'#ff5b5b',fontSize:'1em',margin:'0'}}>预约成功</h1>, <div>您已申请华夏保险专家咨询服务<br/>请注意接听<b style={{color:'#ff5b5b'}}>95300</b>来电！</div>, [
                    // { text: 'Cancel', onPress: () => console.log('cancel') },
                    { text: <div style={{backgroundColor:'#ff5b5b',color:'#fff',width:'60%',margin:'0 auto',lineHeight:'2em',borderRadius:'4px'}}>我知道了</div>, onPress: () => {} },
                ])
            }
            
        })
    }


    componentDidMount(){
        //预约日期
        ax("expertTeam/lxTime.do",{}).then(data=>{
            // console.log(data)
            let date =[data[0]];
            let dateList = [];
            
            for(let i = 0;i<data.length;i++){
                let str = data[i];
                dateList.push({label:str,value:str});
            };
            this.setState({
                date,
                dateList
            })

            // console.log(this.state.date)
        });
    }
}


export default order;