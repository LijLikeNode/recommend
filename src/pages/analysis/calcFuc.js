const calcFuc = (data) => {
    // console.log(data);

    //健康指数计算
    let [healthIndex, assetsIndex, provideIndex, accidentIndex, otherIndex ] = [0,0,0,0,0];
    //第四题 职业：金融软件+5 1  政府企事业-10 3
    if(data.answers[3]===3){
        healthIndex-=10;
    }else if(data.answers[3]===1){
        healthIndex+=5;
    }

    let healtRelateArr = data.answers.slice(5,10);
    healtRelateArr.forEach(item =>{
        healthIndex += [18, 13, 8, 3][item-1];
    })

    // console.log(healthIndex);

    //财产指数计算
    //第四题 职业：5,8,3,8,5,10
    assetsIndex +=[5,8,3,8,5,10][data.answers[3]-1];

    //11题  收入
    if(data.personIncome[0]==='3万以内'||data.personIncome[0]==='3~5万'){
        assetsIndex += 5;
    }else if(data.personIncome[0]==="5~10万"){
        assetsIndex += 10;
    }else if(data.personIncome[0]==="10~20万"){
        assetsIndex += 15;
    }else if(data.personIncome[0]==="20~50万"){
        assetsIndex += 20;
    }else if(data.personIncome[0]==="50~100万"){
        assetsIndex += 25;
    }else{
        assetsIndex += 30;
    }
    //12题 支出
    if(data.lifePay[0]==='30%以内'){
        assetsIndex += 15;
    }else if(data.lifePay[0]==='30%~50%'){
        assetsIndex +=10;
    }else if(data.lifePay[0]==='50%~70%'){
        assetsIndex +=20;
    }else if(data.lifePay[0]==='70%~80%'){
        assetsIndex +=25;
    }else{
        assetsIndex +=30;
    }
    //分析还款占比  12题还款项
    if(data.lifePayKind.length<=4){
        data.lifePayKind.indexOf(2)!==-1&&data.lifePayKind.indexOf(4)!==-1?assetsIndex +=5:'';
    }
    if(data.lifePayKind.length<=2){
        data.lifePayKind.indexOf(2)!==-1||data.lifePayKind.indexOf(4)!==-1?assetsIndex +=5:'';
    }
    //13题 资产 选了 +1 未选+5
    assetsIndex +=data.assetsKind.length*1+(5-data.assetsKind.length)*5;

    // console.log(assetsIndex)


    //3.养老风险

    //第二题
    let twoAnswer = [0.2, 0.7, 0.9, 0.3][data.answers[1]-1];
    //第三题
    let thrAnswer;
    if(data.answers[2]===1){
        thrAnswer = 0.2;
    }else if(data.answers[2]===2){
        thrAnswer = 0.4;
    }else if(data.answers[2]===3){
        if(data.answers[0]===1){
            thrAnswer = 0.6;
        }else{
            thrAnswer = 0.6;
        }
    }else{
        thrAnswer = 0.9;
    }

    provideIndex +=Math.round(twoAnswer*thrAnswer*10000)/100;

    //12题  有赡养项 加10;
    data.assetsKind.indexOf(5)!==-1||data.assetsKind.indexOf(7)!==-1?provideIndex+=10:'';


    // console.log(provideIndex)

    //4.意外风险指数
    //第四题 职业
    accidentIndex +=[15, 8, 5, 15, 7, 9][data.answers[3]-1];
    //出行方式
    let totalPerc = 0;
    if(data.answers[4].indexOf(1)!==-1){
        totalPerc +=0.9;
    }
    
    if(data.answers[4].indexOf(2)!==-1){
        totalPerc +=0.8;
    }
    
    if(data.answers[4].indexOf(3)!==-1){
        totalPerc +=0.3;
    }
    
    if(data.answers[4].indexOf(4)!==-1){
        totalPerc +=0.4;
    }
    
    if(data.answers[4].indexOf(5)!==-1){
        totalPerc +=0.6;
    }

    if(data.answers[4].indexOf(6)!==-1){
        totalPerc +=0.1;
    }

    accidentIndex += Math.round(totalPerc/data.answers[4].length*80*100)/100;

    // console.log(accidentIndex)

    //其他风险
    let AllIndex = Math.round((healthIndex+assetsIndex+provideIndex+accidentIndex)*100)/100/4;
    otherIndex = AllIndex >= 60 ? 60:30;

    data.RiskScore = {
        healthIndex, 
        assetsIndex, 
        provideIndex, 
        accidentIndex, 
        otherIndex 
    }
    sessionStorage.answers = JSON.stringify(data);
    return {
        healthIndex, 
        assetsIndex, 
        provideIndex, 
        accidentIndex, 
        otherIndex 
    }

}


export default calcFuc;