// JavaScript Document
function xxk(obj){
	var aLi=obj.getElementsByTagName('li');
	var oMenuCont=document.getElementById('menuCont');
	var a_cate_part=oMenuCont.getElementsByClassName('popup2');
	var leave_menu=null;//离开右侧 回到左侧
	
	//cate: n. 美食；佳肴；外购食物
	
	//删除所有li上的ac
	function del_li_ac(){
		for(var i=0; i<aLi.length; i++){
			aLi[i].className="";
		}
	}
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oMenuCont.style.display="block";
			del_li_ac();//删除所有li上的ac  
			this.className="ac";//自己增加ac
			
			//得到自己的data-index自定义属性
			var show_id=this.getAttribute("data-index");
			
			for(var j=0; j<a_cate_part.length; j++){
				a_cate_part[j].style.display="none";
			}
			//显示相对应的内容
			document.getElementById("cate_item"+show_id).style.display="block";
		};
		aLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oMenuCont.style.display="none";
				del_li_ac();//删除所有li上的ac  
			},100)
		};
	}
	
	oMenuCont.onmouseenter=function(ev){
		clearTimeout(leave_menu);
		this.style.display="block";
	};
	
	oMenuCont.onmouseleave=function(){
		del_li_ac();//删除所有li上的ac  
		this.style.display="none";
	};
}

//轮播图
function lbt(obj){
	var aBtn=obj.getElementsByTagName('ol')[0].children;
	
	var oUl=obj.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	
	var iNow=0; //前后切换用的计数器
	
	function changeBtn(){ //切换按钮样式
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className="";
		}
		aBtn[iNow].className="ac";
	}
	
	
	//让图片横排
	
	var li_w=aLi[0].offsetWidth; //一个li的宽度
	
	oUl.style.width=li_w*aLi.length+'px';
	
	for(var i=0; i<aBtn.length; i++){
		
		aBtn[i].index=i;//发牌照
		
		aBtn[i].onclick=function(){ //按钮绑事件
			
			iNow=this.index;
			
			changeBtn();
			
			hxsd_tools.move(oUl,{"left":-li_w*iNow}); //移动ul
		};
		
	};
	
	var preBtn=obj.children[2];
	var nextBtn=obj.children[3];
	
	//前后切换
	preBtn.onclick=function(){
		iNow--;
		
		if(iNow<0){ iNow=0}
		
		hxsd_tools.move(oUl,{"left":-li_w*iNow});
		changeBtn();
	};
	
	nextBtn.onclick=function(){
		iNow++;
		if(iNow>=aLi.length-1){
			iNow=aLi.length-1;
		};
		
		hxsd_tools.move(oUl,{"left":-li_w*iNow});
		changeBtn();
	
	
	};

};
function xxk2(obj){
		
			
			var aLi=obj.getElementsByTagName('li');
			var aTabItem=document.getElementsByClassName('yan');
			
			for(var i=0; i<aLi.length; i++){
				
				aLi[i].index=i;
				//li绑定事件
				aLi[i].onmousemove=function(){
					//切换ac
					for(var j=0; j<aLi.length; j++){
						aLi[j].className="";
						aTabItem[j].style.display="none";//隐藏所有div
						
					};
					
					this.className="ac"; //this指向调用该函数的对象
					//指定的div显示
					aTabItem[this.index].style.display="block";
				};
				
				//发牌照
				
			}
		
		
};
function dht(obj){
	
	
	
	var aLi=obj.getElementsByTagName('li');
	var aFloor=document.getElementsByClassName('section3');
	var arr=[];
		
	//-------------------------------------------------
		
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	//console.log(arr)
	
	window.onscroll=function(){
		//显示楼层编号-------------------------------------------------
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>100){
			obj.style.display='block';
		}else{
			obj.style.display='none';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var last_arr=[];
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
				last_arr.push(arr[j].name);
			}
		};
		
		console.log(last_arr);
		var li_index=last_arr[last_arr.length-1];

		for(var l=0; l<aFloor.length; l++){
			aLi[l].className='';
		};
		//页面上部如果有内容，没有楼层会放入新数组，产生错误
		last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
	};
	
	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move-------------------------------------------------------
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};



}


