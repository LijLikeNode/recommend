import React, { Component } from 'react';

class member extends Component {

    constructor(props){
        super(props);
        this.state = {
            members:[],
            activeTab:'本人',
        }
    }

    render() {
        return (
            <div className="memberTab">
                {
                    this.state.members.map(item =>{
                        return (
                            <div key={item.name} className={this.state.activeTab===item.name?'active tabItem':'tabItem'}>
                                <img onClick={()=>{this.swichTab(item.name)}} src={this.state.activeTab===item.name?item.activePic:item.pic} alt='' />
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    swichTab = (activeTab) =>{
        this.setState({
            activeTab
        });

        this.props.changeTab(activeTab);
    }

    componentDidMount(){
        const {answers} = this.props.data;
        let own,another,child,parent,members;
        if(answers[0]===1){
            own = {
                pic:require('../../assets/images/product/head/man.png'),
                activePic:require('../../assets/images/product/head/man_1.png'),
                name:'本人',
            }
            another = {
                pic:require('../../assets/images/product/head/woman.png'),
                activePic:require('../../assets/images/product/head/woman_1.png'),
                name:'配偶',
            }
        }else{
            own = {
                pic:require('../../assets/images/product/head/woman.png'),
                activePic:require('../../assets/images/product/head/woman_1.png'),
                name:'本人',
            }
            another = {
                pic:require('../../assets/images/product/head/man.png'),
                activePic:require('../../assets/images/product/head/man_1.png'),
                name:'配偶',
            }
        }
        child = {
            pic:require('../../assets/images/product/head/child.png'),
            activePic:require('../../assets/images/product/head/child_1.png'),
            name:'儿女',
        }
        parent = {
            pic:require('../../assets/images/product/head/parent.png'),
            activePic:require('../../assets/images/product/head/parent_1.png'),
            name:'父母',
        }
        //分析家庭结构
        if(answers[2]===1){
            members = [own]
        }else if(answers[2]===2){
            members = [own,another]
        }else if(answers[2]===3){
            members = [own,child]
        }else{
            members = [own,another,child]
        }

        if(answers[1]<3){
            members.push(parent);
        }

        this.setState({
            members
        })
    }
}


export default member;