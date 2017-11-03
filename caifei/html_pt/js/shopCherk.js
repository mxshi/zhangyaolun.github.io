var o = {
	init:function(){
		FastClick.attach(document.body);
		/*if(!getCookie('userName')){
			window.location.href = 'login.html';
		}*/
		/*$('.clerkTop img').attr('src','/shop/shopstaff-qrcode/'+getCookie('id'));*/
		o.touchDate();
		/*o.clerkClick();
		o.oDate();*/
	},
	clerkClick:function(months,currPage){
		$('.clerkItem').on('click','em',function(){
			var item_index = $(this).index(),
				data =$(this).parent().parent().find('.clerkTitle').html(),
				name = $(this).context.innerText,
				oid = $(this).parent().attr('oid'),
				index = $(this).parent().attr('index');
			$('.ButTrue').attr('index',index);
			$('.ButTrue').attr('oid',oid);
			if($(this).hasClass('clerkActive')){
				o.quxiaoData(data,name)
			}else{
				o.alertData(data,name)
			}
		})
	},
	alertData:function(data,name){//弹出提示
		$('.alertBox').show();
		$('.alertTan .alertTitle').html('您是否设置 ' +data +' 为 '+ name);
		$('.ButFalse').on('click',function(){
			$('.alertBox').hide();
		})
		$('.ButTrue').on('click',function(){
			if(name == '店长'){
				var suc = function(data){
					if(data.result){
						window.location.reload();
						$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
						$('.alertBox').hide();
					}
				}
				var data = {
					'userInfoId':$('.ButTrue').attr('oid')
				}
				doAjax('/shop/bindUser/bindUser',data,suc);
			}else if(name == '店员'){
				var suc = function(data){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
					$('.alertBox').hide();
				}
				var data = {
					'getMsgId1':$('.ButTrue').attr('oid')
				}
				doAjax('/shop/bindUser/bindMsg1',data,suc);
			}else if(name == '收银员'){
			var suc = function(data){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em class="borderNone clerkActive">'+name+'</em>');
					$('.alertBox').hide();
				}
				var data = {
					'getMsgId2':$('.ButTrue').attr('oid')
				}
				doAjax('/shop/bindUser/bindMsg2',data,suc);
			}
		})
	},
	oDate:function(){
		var oAttr = [];
    	var currPage=1;
	    var data = {
			'currPage':currPage
		}
		$.ajax({
	        url : '/shop-account/searchUserList',
	        data :data,
	        type : 'POST',
	        async : false,
	        success : function(data){
	        	if(data.httpCode == 200){
		           oAttr.push(data.result.result);
		           currPage++;
		           var num = data.result.totalPages;
		           for(var i=currPage;i<=num;i++){
			           	var data = {
							'currPage':i,
						}
					    $.ajax({
				       		url : '/shop-account/searchUserList',
					        data :data,
					        type : 'POST',
					        async : false,
					        success : function(data){
					        	if(data.httpCode == 200){
						           oAttr.push(data.result.result);
					        	}
					        }
					    });       		
					}
	        	}
	        }
	    });
	    o.htmlData(oAttr);
	},
	htmlData:function(oAttr){
		var oHtml = '',moreAttr=[];
		console.log(oAttr)
		for(var i = 0;i < oAttr.length; i++){
			for(var j = 0;j < oAttr[i].length; j++){
				moreAttr.push(oAttr[i][j]);
			}
		}
		for(var s = 0;s< moreAttr.length; s++){
			if(moreAttr[s].jiaose == 1){
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">店长</em></div><div class="btn">删除</div></li>'
			}else if(moreAttr[s].jiaose == 2){
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">店员</em></div><div class="btn">删除</div></li>'
			}else if(moreAttr[s].jiaose == 3){
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em class="borderNone clerkActive">收银员</em></div><div class="btn">删除</div></li>'
			}else{
				oHtml+='<li class="clear list-li"><img src="'+moreAttr[s].userIcon+'" class="clerkImg left"/><div class="clerkTitle left">'+moreAttr[s].nickname+'</div><div class="clerkButton left" index="'+s+'" oid="'+moreAttr[s].id+'"><em>店长</em><em>店员</em><em class="borderNone">收银员</em></div><div class="btn">删除</div></li>'
			}
		}
		$('.clerkItem').append(oHtml);
	},
	quxiaoData:function(data,name){
		$('.alertBox').show();
		$('.alertTan .alertTitle').html('您是否取消 ' +data +' 为 '+ name);
		$('.ButFalse').on('click',function(){
			$('.alertBox').hide();
		})
		$('.ButTrue').on('click',function(){
			console.log(name)
			if(name == '店长'){
				var suc = function(data){
					if(data.result){
						window.location.reload();
						$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
						$('.alertBox').hide();
					}
				}
				var data = {
					'userInfoId':''
				}
				doAjax('/shop/bindUser/bindUser',data,suc);
			}else if(name == '店员'){
				var suc = function(data){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
					$('.alertBox').hide();
				}
				var data = {
					'getMsgId1':''
				}
				doAjax('/shop/bindUser/bindMsg1',data,suc);
			}else if(name == '收银员'){
			var suc = function(data){
					window.location.reload();
					$('.clerkItem li').eq($('.ButTrue').attr('index')).find('.clerkButton').html('<em>店长</em><em>店员</em><em class="borderNone">收银员</em>');
					$('.alertBox').hide();
				}
				var data = {
					'getMsgId2':''
				}
				doAjax('/shop/bindUser/bindMsg2',data,suc);
			}
		})
	},
	touchDate:function(){
		var initX; //触摸位置
	    var moveX; //滑动时的位置
	    var X = 0; //移动距离
	    var objX = 0; //目标对象位置
	    window.addEventListener('touchstart', function(event) {
	        event.preventDefault();
	        var obj = event.target.parentNode;
	        console.log(obj.className)
	        if (obj.className == "clear list-li") {
	        	console.log('touchstart')
	            initX = event.targetTouches[0].pageX;
	            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
	        }
	        if (objX == 0) {
	            window.addEventListener('touchmove', function(event) {
	                event.preventDefault();
	                var obj = event.target.parentNode;
	                if (obj.className == "clear list-li") {
	                    moveX = event.targetTouches[0].pageX;
	                    X = moveX - initX;
	                    if (X >= 0) {
	                        obj.style.WebkitTransform = "translateX(" + 0 + "px)";
	                    } else if (X < 0) {
	                        var l = Math.abs(X);
	                        obj.style.WebkitTransform = "translateX(" + -l + "px)";
	                        if (l > 100) {
	                            l = 100;
	                            obj.style.WebkitTransform = "translateX(" + -l + "px)";
	                        }
	                    }
	                }
	            });
	        } else if (objX < 0) {
	            window.addEventListener('touchmove', function(event) {
	                event.preventDefault();
	                var obj = event.target.parentNode;
	                if (obj.className == "clear list-li") {
	                    moveX = event.targetTouches[0].pageX;
	                    X = moveX - initX;
	                    if (X >= 0) {
	                        var r = -100 + Math.abs(X);
	                        obj.style.WebkitTransform = "translateX(" + r + "px)";
	                        if (r > 0) {
	                            r = 0;
	                            obj.style.WebkitTransform = "translateX(" + r + "px)";
	                        }
	                    } else { //向左滑动
	                        obj.style.WebkitTransform = "translateX(" + -100 + "px)";
	                    }
	                }
	            });
	        }
	
	    })
	    window.addEventListener('touchend', function(event) {
	        event.preventDefault();
	        var obj = event.target.parentNode;
	        if (obj.className == "clear list-li") {
	            objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
	            if (objX > -100) {
	                obj.style.WebkitTransform = "translateX(" + 0 + "px)";
	                objX = 0;
	            } else {
	                obj.style.WebkitTransform = "translateX(" + -100 + "px)";
	                objX = -100;
	            }
	        }
	    })
	}
}
o.init();