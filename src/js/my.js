/*  */
$('#exampleModalChange').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
})

//js 遮罩出现时给遮住对象加模糊效果
$('#Search').click(function(){
    e = window.event || e;
    var obj = e.srcElement || e.target;
    console.log(obj);
    if($(obj).is('#Search')){
        $('.container').removeClass('modal-blur');
    }
});
$('#Search button.close').click(function(){
    $('.container').removeClass('modal-blur');
});
$('.Search').click(function(){
    $('.container').addClass('modal-blur');
});

/* 私密回复 */
function secret(){
let holder = $('.comment-respond textarea').attr('placeholder');
$('#secret-button').click(function () {
    let textareaDom = $('.comment-respond textarea');
    if ($(this).is(':checked')) {
        textareaDom.attr('placeholder', '开启悄悄话~')
        $(".comment-respond textarea").addClass("secret-textarea");
    } else {
        textareaDom.attr('placeholder', holder)
        $(".comment-respond textarea").removeClass("secret-textarea");
    }
})
}

function tocMulu() {
    if ($('#TOC-text').length > 0) {
        var headerEl = 'h1,h2,h3,h4,h5,h6',  
            content = '.post-content',
            idArr = {}; 
        $(content).children(headerEl).each(function () {
            var headerId = $(this).text().replace(/[\s|\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\：|\，|\。]/g, '');
            headerId = headerId.toLowerCase();
            if (idArr[headerId]) {
                $(this).attr('id', headerId + '-' + idArr[headerId]);
                idArr[headerId]++;
            }
            else {
                idArr[headerId] = 1;
                $(this).attr('id', headerId);
            }
        });
     
        tocbot.init({
            tocSelector: '#TOC-text',
            contentSelector: content,
            headingSelector: headerEl,
            scrollSmooth: true,
            scrollSmoothOffset: 0,
            headingsOffset: 0
        });
    };
}


//lazyload
function lazy(){
    $("div.lazy,img.lazy").lazyload({effect: "fadeIn", effectspeed : 1000,failure_limit : 20, threshold: 50});
};

function backToTop(){
    $("#backToTop").on("click", function () {
        var _this = $(this);
        $('html,body').animate({ scrollTop: 0 }, 500, function () {
            _this.hide();
        });
    });
    $(window).scroll(function () {
        var htmlTop = $(document).scrollTop();//获取窗口的滚动条的垂直位置
        if( htmlTop >0 ){  //判断滚动后高度超过200px,就显示
            $("#backToTop").fadeIn(500).stop(); //淡入
        }else{
            $("#backToTop").stop().fadeOut(500); //如果返回或者没有超过,就淡出.必须加上stop()停止之前动画,否则会出现闪动
        }
    });
}

function dianzan(){
    //点赞
    $('.post-suport').on('click', function () {
        let cid = $(this).data('cid');
        $.ajax({
        url: `/?action=support`,
        type: 'POST',
        data: {
            cid: cid
        },
        dataType: 'json',
        success: res => {
            if (res.success) {
            $(this).removeClass('mdi-thumb-up-outline').addClass('mdi-thumb-up')
            $(this).text(' ' + res.count + ' ' + '赞')
                $.notify({
                    // options
                    message: '感谢支持！' 
                    },{
                    // settings
                    element: 'body',
                    position: "fixed",
                    type: "success",
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 1000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },
                    template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:10rem;background:rgb(71 183 76);color: white;box-shadow:rgb(71 183 76 / 50%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
                });
            } else {
                $.notify({
                    // options
                    message: '你已经点过赞了哦~' 
                    },{
                    // settings
                    element: 'body',
                    position: "fixed",
                    type: "info",
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 1000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },
                    template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
                });
            }
        }
        });
    });
}


/* 切换夜间模式 */
function switchNightMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "0";
    if (night == "0") {
      document.body.classList.add("dark-mode");
      document.cookie = "night=1;path=/";
      console.log("夜间模式开启")
    } else {
      document.body.classList.add("dark-mode");
      document.cookie = "night=1;path=/";
      console.log("夜间模式开启")
    }
  } (function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "") {
      if (new Date().getHours() > 21 || new Date().getHours() < 6) {
        document.body.classList.add("dark-mode");
        document.cookie = "night=1;path=/";
        console.log("夜间模式开启")
      } else {
        document.body.classList.add("dark-mode");
        document.cookie = "night=1;path=/";
        console.log("夜间模式开启")
      }
    } else {
      var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "0";
      if (night == "0") {
        document.body.classList.add("dark-mode")
      } else {
        if (night == "1") {
          document.body.classList.add("dark-mode")
        }
      }
    }
  })();

  function dark() {
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var n, e, i, h, t = .05,
		s = document.getElementById("universe"),
		o = !0,
		a = "180,184,240",
		r = "226,225,142",
		d = "226,225,224",
		c = [];

	function f() {
		n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
	}
	function u() {
		h.clearRect(0, 0, n, e);
		for (var t = c.length, i = 0; i < t; i++) {
			var s = c[i];
			s.move(), s.fadeIn(), s.fadeOut(), s.draw()
		}
	}
	function y() {
		this.reset = function() {
			this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
		}, this.fadeIn = function() {
			this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
		}, this.fadeOut = function() {
			this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do /2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
		} else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
		h.closePath(), h.fill()
	}, this.move = function() {
		this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
	}, setTimeout(function() {
		o = !1
	}, 50)
}
function m(t) {
	return Math.floor(1e3 * Math.random()) + 1 < 10 * t
}
function l(t, i) {
	return Math.random() * (i - t) + t
}
f(), window.addEventListener("resize", f, !1), function() {
	h = s.getContext("2d");
	for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
	u()
}(), function t() {
	document.getElementsByTagName('body')[0].getAttribute('class') == 'dark-mode' && u(), window.requestAnimationFrame(t)
}()
};
dark()

function Ajax_next_post() {
$('.next').click(function() {
    $this = $(this);
    $this.addClass('loading').text('正在努力加载');
    var href = $this.attr('href');
    if (href != undefined) {
        $.ajax({
            url: href,
            type: 'post',
            complete:function(){
                lazy();
                backToTop();
                dianzan();
            },
            error: function(request) {
            },
            success: function(data) {
                $this.removeClass('loading').text('查看更多');
                var $res = $(data).find('.article');
                $('.content').append($res.fadeIn(500));
                var newhref = $(data).find('.next').attr('href');
                if (newhref != undefined) {
                    $('.next').attr('href', newhref);
                } else {
                    $('.next').remove();
                }
                lazy();
                $.notify({
                    // options
                    message: '加载成功！' 
                },{
                    // settings
                    element: 'body',
                    position: "fixed  ",
                    type: "success",
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 1000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },
                    template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:10rem;background:rgb(71 183 76);color: white;box-shadow:rgb(71 183 76 / 50%) 0px 0px 30px 0px;">' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>' 
                });
            }
        });
    }
    return false;
});
}

//PjAX配置
if (Config.Pjax === 'true') {
    $(document).pjax('a[href^="' + Config.homeUrl + '"]:not(a[target="_blank"], a[no-pjax])', {
        container: '#pjax-container',
        fragment: '#pjax-container',
        timeout: 8000
    })
    .on('pjax:send', function() { 
        NProgress.start(); 
    })
    .on('pjax:complete', function() {
        //NProgress
        NProgress.done();
        Ajax_next_post();
        lazy();
        backToTop();
        dianzan();
        secret();
        tocMulu();
        if($(".OwO").length>0){
			new OwO({
				logo: '<i class="mdi mdi-emoticon-happy-outline mdi-24px"></i>',
				container: document.getElementsByClassName('OwO')[0],
				target: document.getElementsByClassName('OwO-textarea')[0],
				api: Config.owoJson,
				position: 'up',
				width: '450px',
				maxHeight: '250px'
			});
		}
        ajaxcomments();
		
    });
}

//不使用pjax情况下的调用

(function() {
    Ajax_next_post();
    lazy();
    backToTop();
    dianzan();
    secret();
    tocMulu();
    ajaxcomments();
})();
