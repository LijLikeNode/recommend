// 各种弹窗提示

const pops={},imageSrc="data:image/svg+xml,%3C!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL --%3E %3Csvg width='120' height='30' viewBox='0 0 120 30' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E %3Ccircle cx='15' cy='15' r='15'%3E %3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite' /%3E %3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite' /%3E %3C/circle%3E %3Ccircle cx='60' cy='15' r='9' fill-opacity='0.3'%3E %3Canimate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite' /%3E %3Canimate attributeName='fill-opacity' from='0.5' to='0.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite' /%3E %3C/circle%3E %3Ccircle cx='105' cy='15' r='15'%3E %3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite' /%3E %3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite' /%3E %3C/circle%3E %3C/svg%3E";

// 等待

// 等待开始
pops.waitstart=()=>{
	let el=document.getElementById('popwait');
	if(el && el.className.indexOf('fade')>0) return false;
	if(!!el) el.className='wait show';
	else{
		el=document.createElement('div');
		el.id='popwait';
		el.className='wait show';
		el.innerHTML='<figure><img src="'+imageSrc+'" alt="" /></figure>';
		// el.appendTo(document.body);
		document.body.appendChild(el);
	}
	setTimeout(()=>{
		el.className='wait show fadein';
	},50);
};
// 等待结束
pops.waitend=()=>{
	let el=document.getElementById('popwait');
	el.className='wait show';
	setTimeout(()=>{
		el.className='wait';
	},350);
};
//确定提示
pops.confirm=(txt='出错啦',href)=> {
	let el=document.getElementById('masks');
	if(!!el){
		// data.innerHTML = txt;
		let btn = document.createElement('span');
		btn.innerHTML = '确定';
		btn.id = 'close';
		// data.appendChild(btn);
		el.className='masks show';
	}
	else{
		el=document.createElement('div');
		el.id='masks';
		el.className='masks show';
		// el.innerHTML=txt;
		let con = document.createElement('div');
		con.id = 'data';
		con.className = 'conbox';
		con.innerHTML = txt;

		let btn = document.createElement('span');
		// btn.className = 'con';
		btn.innerHTML = '确定';
		btn.id = 'close';
		con.appendChild(btn);
		el.appendChild(con);
		// el.appendTo(document.body);
		document.body.appendChild(el);
	}
	setTimeout(()=>{
		el.className='masks show fadein';
	},50);
	document.getElementById('close').onclick = ()=>{
		// el.className='masks';
		setTimeout(()=>{
			el.className='masks show';
		},50);
		setTimeout(()=>{
			el.className='masks';
		},100);
	}
};

// 渐隐提示
pops.fade=(txt='出错啦')=> {
	let el=document.getElementById('popalert');
	if(!!el){
		el.innerHTML=txt;
		el.className='popalert show';
	}
	else{
		el=document.createElement('div');
		el.id='popalert';
		el.className='popalert show';
		el.innerHTML=txt;
		// el.appendTo(document.body);
		document.body.appendChild(el);
	}
	setTimeout(()=>{
		el.className='popalert show fadein';
	},50);
	setTimeout(()=>{
		el.className='popalert show';
	},2000);
	setTimeout(()=>{
		el.className='popalert';
	},2350);
};
pops.fade2=(txt='出错啦')=> {
	let el=document.getElementById('popalert');
	if(!!el){
		el.innerHTML=txt;
		el.className='popalert show';
	}
	else{
		el=document.createElement('div');
		el.id='popalert';
		el.className='popalert show';
		el.innerHTML=txt;
		// el.appendTo(document.body);
		document.body.appendChild(el);
	}
	// setTimeout(()=>{
	// 	el.className='popalert show fadein';
	// },50);
	// setTimeout(()=>{
	// 	el.className='popalert show';
	// },2000);
	// setTimeout(()=>{
	// 	el.className='popalert';
	// },2350);
};
pops.fadeStart=(txt='出错啦')=> {
	let el=document.getElementById('popalert');
	if(!!el){
		el.innerHTML=txt;
		el.className='popalert show';
	}
	else{
		el=document.createElement('div');
		el.id='popalert';
		el.className='popalert show';
		el.innerHTML=txt;
		// el.appendTo(document.body);
		document.body.appendChild(el);
	}
	setTimeout(()=>{
		el.className='popalert show fadein notouch';
	},50);
	/*setTimeout(()=>{
		el.className='popalert show';
	},2000);
	setTimeout(()=>{
		el.className='popalert';
	},2350);*/
};
// 等待结束
pops.fadeEnd=()=>{
	let el=document.getElementById('popalert');
	el.className='popalert show notouch';
	setTimeout(()=>{
		el.className='popalert';
	},350);
};


export default pops;