import React, { Component } from 'react';

class tag extends Component {
    constructor(props){
        super(props);
        this.state = {
            tagList:[]
        }
    }

    render() {
        
        return (
            <div className="tagList">
                {
                    this.state.tagList.map(item =>{
                        return (
                            <div className="tagItem" key={item}>
                                <b></b>
                                <i></i>
                                {item}
                            </div>
                        )
                    })
                }
                
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        let { data } = nextProps;
        data!==''?this.addTagItem(data):'';
    }

    addTagItem(data){
        let tagList = [];
        let { answers } = data;
        
        //家庭结构
        if(answers[2]===1){
            if(answers[0]===1){
                tagList.push('黄金单身汉');
            }else{
                tagList.push('单身美少女');
            }
        }else if(answers[2]===2){
            if(answers[0]===1){
                tagList.push('家中顶梁柱');
            }else{
                tagList.push('幸福蜜月期');
            }
        }else if(answers[2]===3){
            if(answers[0]===1){
                tagList.push('风中港湾');
            }else{
                tagList.push('独立女性');
            }
        }else if(answers[2]===4){
            if(answers[0]===1){
                tagList.push('家有老小');
            }else{
                tagList.push('贤妻良母');
            }
        }

        //收入占比
        //个人收入  / 全家收入
        let {personIncome,familyIncome} = data;

        let i = personIncome[0].indexOf('~');
        personIncome = parseInt(personIncome[0].slice(i+1));
        let index = familyIncome[0].indexOf('~');
        familyIncome = parseInt(familyIncome[0].slice(index+1));
        let per = personIncome/familyIncome;
        if(per<0.6){
            tagList.push('家庭顶梁柱');
        }else if(per>=0.6&&per<=0.8){
            tagList.push('收入重臣');
        }else{
            tagList.push('全家的希望');
        }

        //资产
        let { assetsKind } = data;
        if(assetsKind.length===8){
            tagList.push('家里有矿');
        }
        if(assetsKind.indexOf(1)!==-1&&assetsKind.indexOf(2)!==-1){
            tagList.push('有房有车');
        }
        if(assetsKind.indexOf(5)!==-1){
            tagList.push('股市达人');
        }
        if((assetsKind.indexOf(3)!==-1||assetsKind.indexOf(4)!==-1)&&assetsKind.indexOf(5)===-1){
            tagList.push('保守理财');
        }

        //出行方式
        if(answers[4]===1){
            tagList.push('空中飞人');
        }else if(answers[4]===6){
            tagList.push('交通基本靠走');
        }

        //职业
        if(answers[3]===1||answers[3]===3){
            tagList.push('帅气白领');
        }else if(answers[3]===4){
            tagList.push('超文艺范');
        }else if(answers[3]===6){
            tagList.push('爱自由');
        }else{
            tagList.push('绿色健康');
        }

        //喝酒
        if(answers[7]===3){
            tagList.push('很少喝酒');
        }else if(answers[7]===4){
            tagList.push('滴酒不沾');
        }

        //抽烟
        if(answers[6]===1){
            tagList.push('大烟袋子');
        }else if(answers[6]===4){
            tagList.push('珍爱生命');
        }

        //咖啡
        if(answers[5]===1){
            tagList.push('咖啡达人');
        }

        //睡眠
        if(answers[8]===1){
            tagList.push('睡眠差');
        }else if(answers[8]===4){
            tagList.push('倒头就睡');
        }

        //健身
        if(answers[9]===1){
            if(answers[0]===1){
                tagList.push('宅男');
            }else{
                tagList.push('宅女');
            }
        }else if(answers[9]===3){
            tagList.push('偶尔运动');
        }else if(answers[9]===4){
            tagList.push('健身达人');
        }


        //收入
        let {lifePayKind} = data;
        if(lifePayKind.indexOf(2)!==-1||lifePayKind.indexOf(4)!==-1){
            tagList.push('月月还贷');
        }
        if(lifePayKind.indexOf(3)!==-1||lifePayKind.indexOf(7)!==-1){
            tagList.push('守护儿女');
        }
        




        console.log(tagList)

        // this.setState({
        //     tagList
        // })
        tagList = tagList.slice(0,4);
        

        this.setState({
            tagList
        })
    }
}


export default tag;