const getPara = (data,healthIndex) =>{
    console.log(data)
    let para='';
    //第三题
    para +=[
        '一人吃饱、全家不饿',
        '虐死单身狗、天天喂狗粮',
        '独自一人、艰辛育儿',
        '上有老、下有小，家庭美满'
    ][data.answers[2]-1]+'，';
    //第二题 
    para +='您正处于人生的'+[
        '黄金期',
        '蜜月期',
        '低谷期',
        '高压期'
    ][data.answers[2]-1]+'，';
    //
    para +='对于家庭来说，这个阶段是'+[
        '自给自足，不给家人造成负担',
        '财富积累的最佳时期，收入增加支出稳定',
        '财富积累困难，收入较稳定',
        '老人和孩子被关注度高，但也需要考虑自身，支出会持续增加，经济压力日益增大'
    ][data.answers[2]-1]+'，';

    para +='从保障上来说，保额需'+[
        '足以保障自身，保费不造成经济压力，一方面关注健康保障，另一方面，谨防意外风险',
        '足以负担贷款及双方家庭的赡养责任',
        '足以应对未来自己及孩子的生活保障',
        '足以负担贷款及双方家庭的赡养责任'
    ][data.answers[2]-1]+'，';

    para +=[
        '万一患有严重疾病时，不会影响服务的生活水平，并能弥补自己的收入损失。',
        '通过小投入获得高额的身价保障。',
        '为孩子及家人提前考虑，减轻自身各方面压力。',
        '万一父母或自己出现问题，确保双方家庭在经济上不受影响。'
    ][data.answers[2]-1];

    if(data.assetsKind.indexOf(5)===-1){
        para +='在财务允许情况下，可以尝试定投或其他理财方式，争取获得更高收入。'
    }
    if(data.answers[2]===2&&data.assetsKind.indexOf(1)!==-1){
        para +='此外，如有生育计划，可以追加一些投资，为即将带来的新生儿做准备。'
    }
    if(healthIndex<50){
        para +='生活习惯中有过多不良习惯，为自己及家人，建议改善生活习惯，保持一个健康的体魄，更长久的伴随家人。'
    }
    // console.log(para)
    return para;
}

export default getPara;