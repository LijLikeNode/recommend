import {
  observable,
  // computed,
  action
} from "mobx";
import popalert from '../popalert';


class Answers {
  @observable questionIndex = 0; //题目号
  @observable answers = ['', '', '', '', '', '', '', '', '',''];
  @observable personIncome = [''];//个人收入
  @observable familyIncome = [''];//家庭收入
  @observable lifePay = [''];//支出占比
  @observable lifePayKind = [];//支出占比
  @observable CityName = '';//居住地
  @observable CityLevel = '';//城市等级
  @observable totalAssets = [''];//总资产
  @observable assetsKind = [];//总资产类型
  @observable RiskScore = {};//总资产类型
  // 计算属性  
  // @computed
  // get total() {
  //   // return this.price * this.amount;
  // }

  // @observable length = 2;
  // @computed
  // get squared() {
  //   return this.length * this.length;
  // }
  // set squared(value) {
  //   // 这是一个自己的动作，不需要注解
  //   this.length = Math.pow(2, value);
  // }
  @action.bound
  setRiskScore(val){
    this.RiskScore = val;
  }


  @action.bound
  commitAnswer(an) {
    this.answers.push(an);
  }
  @action.bound
  changeAnswer(an, kind) {
    if (kind === "more" && this.answers[this.questionIndex] instanceof Array) {//多选 已选
      if(this.answers[this.questionIndex].indexOf(an)!==-1){ // 删除选项
        const index = this.answers[this.questionIndex].indexOf(an);
        this.answers[this.questionIndex].splice(index,1);
      }else{ //增加选项
        this.answers[this.questionIndex].push(an);
      }
    } else if (kind === "more") { //多选  未选
      this.answers[this.questionIndex] = [an];
    } else {
      this.answers[this.questionIndex] = an;
      setTimeout(this.nextQues,150);
    }
  }

  //11题 12题给收入赋值
  @action.bound
  setIncome(val,type){
    switch (type){
      case 'personIncome':
        this.personIncome = val;
        break;
      case 'familyIncome':
        this.familyIncome = val;
        break;
      case 'lifePay':
        this.lifePay = val;
        break;
      case 'totalAssets':
        this.totalAssets = val;
        break;
      default:
        return;
    }

  }
  //11题选择城市
  @action.bound
  EnsureCity(val,level=4){
    this.CityName = val;
    this.CityLevel = level;
  }

  //12题选择支出方式  多选
  @action.bound
  PayKindsCheck(val){
    
    let index = this.lifePayKind.indexOf(val);
    if(index===-1) {
      this.lifePayKind.push(val);
    }else{
      this.lifePayKind.splice(index,1);
    }
  }
  //输入总资产
  // @action.bound
  // totalAssetsChange(val){
  //   if(val.length===1&&val==='0') return;
  //   this.totalAssets = val;
  // }
   //13题选择主要资产  多选
   @action.bound
   AssetsKinkCheck(val){
    let index = this.assetsKind.indexOf(val);
    if(index===-1) {
      this.assetsKind.push(val);
    }else{
      this.assetsKind.splice(index,1);
    }
   }


  //下一题
  @action.bound
  nextQues(an) {
    if(this.questionIndex===10){//11题  更改判断逻辑

      if(this.CityName===''){
        popalert.fade('请您选择城市');
        return;
      }
      if(this.personIncome[0]===''){
        popalert.fade('请您选择个人年收入');
        return;
      }
      if(this.familyIncome[0]===''){
        popalert.fade('请您选择家庭年收入');
        return;
      }

      this.questionIndex++;

      return;
    }
    if(this.questionIndex===11){//12题
      if(this.lifePay[0]===''){
        popalert.fade('请您选择支出占比');
        return;
      }
      if(this.lifePayKind.length===0){
        popalert.fade('请您至少选择一个主要支出项');
        return;
      }

      this.questionIndex++;

      return;

    }
    if(this.questionIndex===12){//13 题
      if(this.totalAssets[0]===''){
        popalert.fade('请您输入您的总资产');
        return;
      }
      if(this.assetsKind.length===0){
        popalert.fade('请您至少选择一个主要资产');
        return;
      }

      
      this.questionIndex++;

      return;
    }
    !!this.answers[this.questionIndex] ? this.questionIndex++ : popalert.fade('请您选择答案');
  }
  
  // 上一題
  @action.bound
  prevQues(an) {
    this.questionIndex--;
  }

  //初始化数据
  @action.bound
  initData(){
   this.questionIndex = 0; //题目号
   this.answers = ['', '', '', '', '', '', '', '', '',''];
   this.personIncome = [''];//个人收入
   this.familyIncome = [''];//家庭收入
   this.lifePay = [''];//支出占比
   this.lifePayKind = [];//支出占比
   this.CityName = '';//居住地
   this.CityLevel = '';//居住地
   this.totalAssets = [''];//总资产
   this.assetsKind = [];//总资产类型
  }
}

export default Answers;