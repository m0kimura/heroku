var RES={Bs: {}, Save: {}, Sec: [], Fdata: {},
//
// begin トリガー
//
  begin: function(op){
    var me=this; op=op||{};

    if(op.loadConfig){op=me.loadConfig(op);}

    $(window).on('load', function(){

      me.config(op, 'init'); me.section('init'); me.spanning(); me.ajaxSource();
      me.carousel('init'); me.tabs('init'); me.accordion('init'); me.map('init');
      me.sns();
      me.depend(); me.image('init'); me.hide();
      me.cell(); me.section('padding'); me.folding('init');
      me.zone(); me.body('init'); me.logo('init');
      me.section('position');
      me.another('init');
      me.footer('init', 0);

      $(window).on('resize', function(){
        me.config(); me.spanning();
        me.carousel('image'); me.tabs('cont'); me.accordion('cont');
        me.depend(); me.image(); me.hide(); me.cell(); me.section('padding'); me.folding();
        me.zone(); me.body(); me.scroll();
        me.map('cont'); me.logo('cont', $(window).scrollTop());
        me.another('cont');
        me.footer('resize', $(window).scrollTop());
        me.Save.mode=me.Bs.mode;
      });

      $(window).on('scroll', function(){
        var pos=me.scroll(); me.footer('cont', pos); me.section('indicator', pos);
        me.locateSide('cont', pos);
        me.modal('reset'); me.map('scroll'); me.logo('cont', pos); me.elevate('');
      });

      me.photoUp(); me.tipup();
      me.rollover(); me.modal('init'); me.locateSide('init'); me.elcontents(); me.slidein('init');

      var x=location.hash; if(x){me.section('goto', x);}

      me.Save.mode=me.Bs.mode;

    });
  },
//
// config　初期設定
//
  config: function(op, mode){
    var me=this;

    if(mode=='init'){
      me.Bs.minPc=op.MinPc||750;              // PC表示最小幅
      me.Bs.maxPc=op.MaxPc||1200;             // PC表示最大幅
      me.Bs.width=op.Width||1050;             // 設計基本幅(パソコン)
      me.Bs.widthMobile=op.WidthMobile||400;  // 設計基本幅(モバイル)
      me.Bs.maxMain=op.MaxMain||800;             // 設計基本メイン幅
      me.Bs.minSide=op.MinSide||200;          // 最小サイド幅
      me.Bs.animate=op.Animate||1000;         // 基本アニメートタイム
      me.Bs.interval=op.Interval||2000;       // 基本インターバルタイム
      me.Bs.parallax=me.Bs.parallax||0.5;     // 視差スピード比
      me.Bs.opacity=op.Opacity||0.7;          // 基本透過度
      me.Bs.locateSide=op.LocateSide||'no';
      me.Bs.domain=op.Domain||location.hostname.substr(4);
      me.Bs.cell=op.Cell||{};
      me.Bs.cell.priority=me.Bs.cell.priority||'width'; //優先モード
      me.Bs.cell.pc=me.Bs.cell.pc||200;       // Pcセル幅
      me.Bs.cell.mobile=me.Bs.cell.mobile||120; // Mobileセル幅
      me.Bs.cell.base=me.Bs.cell.base||120; // セル幅基準
      me.Bs.cell.max=me.Bs.cell.max||5; // 横並び最大個数
      me.Bs.cell.min=me.Bs.cell.min||2; // 横並び最小個数
      me.Bs.section=op.Section||{};
      me.Bs.section.mobile=me.Bs.section.mobile||'vertical';
      me.Bs.section.wide=me.Bs.section.wide||'no';
      me.Bs.image=op.Image||{};
      me.Bs.image.pc=me.Bs.image.pc||600;     // PC基本イメージ幅
      me.Bs.image.mobile=me.Bs.image.mobile||300; // mobile基本イメージ幅
      me.Bs.image.fixPc=me.Bs.image.fixPc||600;
      me.Bs.image.fixmobile=me.Bs.image.fixMobile||300;
      me.Bs.image.photoM=me.Bs.image.PhotoM||'auto';
      me.Bs.image.open=me.Bs.image.open||'/image/bg_open.png';
      me.Bs.image.close=me.Bs.image.close||'/image/bg_close.png';
      me.Bs.image.none=me.Bs.image.none||'/image/bg_none.png';
      me.Bs.carousel=op.Carousel||{};
      me.Bs.carousel.width=me.Bs.carousel.width||'auto';  // Pcカルーセル幅
      me.Bs.carousel.pc=me.Bs.carousel.pc||300;  // Pcカルーセル画像幅
      me.Bs.carousel.mobile=me.Bs.carousel.mobile||200; // Mobileカルーセル画像幅
      me.Bs.carousel.num=me.Bs.carousel.num||3;  // カルーセル表示個数pc
      me.Bs.carousel.num=me.Bs.carousel.nummb||2;  // カルーセル表示個数mobile
      me.Bs.carousel.direction=me.Bs.carousel.direction||'H';  // カルーセル移動方向
      me.Bs.carousel.animate=me.Bs.carousel.animate||me.Bs.animate;
      me.Bs.carousel.interval=me.Bs.carousel.interval||me.Bs.interval;
      me.Bs.carousel.priority=me.Bs.carousel.priority||'width'; //優先順位, width, num
      me.Bs.sns=op.Sns||{};
      me.Bs.sns.width=me.Bs.sns.width||500;
      me.Bs.sns.height=me.Bs.sns.height||500;
      me.Bs.sns.option=me.Bs.sns.option||'personalbar=0,toolbar=0,scrollbars=1,resizable=1';
      me.Bs.tab=op.Tab||{};
      me.Bs.tab.animate=me.Bs.tab.animate||me.Bs.animate;
      me.Bs.accordion=op.Accordion||{};
      me.Bs.accordion.image=me.Bs.accordion.image||'/image/sign.png';
      me.Bs.accordion.mobile=me.Bs.accordion.mobile||me.Bs.accordion.image;
      me.Bs.accordion.animate=me.Bs.accordion.animate||me.Bs.animate;
      me.Bs.map=op.Map||{};
      me.Bs.map.close=me.Bs.map.close||me.pngclose;
      me.Bs.map.scale=me.Bs.map.scale||10;
      me.Bs.map.animate=me.Bs.map.animate||me.Bs.animate;
      me.Bs.map.height=me.Bs.map.height||500;
      me.Bs.map.width=me.Bs.map.width||500;
      me.Bs.footer=op.Footer||{};
      me.Bs.footer.remain=me.Bs.footer.remain||0;
      me.Bs.footer.rate=me.Bs.footer.rate||80;
      me.Bs.footer.animate=me.Bs.footer.animate||me.Bs.animate;
      me.Bs.tipup=op.Tipup||{};
      me.Bs.tipup.xdiff=me.Bs.tipup.xdiff||30;
      me.Bs.tipup.ydiff=me.Bs.tipup.ydiff||60;
      me.Bs.scroll=op.Scroll||{};
      me.Bs.scroll.animate=me.Bs.scroll.animate||me.Bs.animate;
      me.Bs.analytics=op.Analytics||{};
      me.Bs.analytics.index=me.Bs.analytics.index||1;
      me.Bs.analytics.name=me.Bs.analytics.name||'key';
      me.Bs.analytics.value=me.Bs.analytics.value||'';
      me.Bs.analytics.scope=me.Bs.analytics.scope||3;
      me.Bs.logo=op.Logo||{};
      me.Bs.logo.right=me.Bs.logo.right||20;
      me.Bs.logo.top=me.Bs.logo.top||300;
      me.Bs.logo.next=me.Bs.logo.next||me.Bs.logo.top;
      me.Bs.logo.max=me.Bs.logo.max||120;
      me.Bs.logo.min=me.Bs.logo.min||me.Bs.logo.max;
      me.Bs.elcontents=op.Elcontents||[];
      me.Bs.slidein=op.Slidein||{};
      me.Bs.slidein.animate=me.Bs.slidein.animate||op.Animate;
    }


    me.Bs.wwi=$(window).width();
    me.Bs.mode='pc';                          // 現状モード
    if(me.Bs.wwi<me.Bs.minPc){me.Bs.mode='mobile';} if(me.Bs.wwi>me.Bs.maxPc){me.Bs.mode='wide';}
    if(me.Bs.mode=='wide' && me.Bs.section.wide=='no'){me.Bs.wwi=me.Bs.maxPc;}
    else{me.Bs.wwi=$('body').outerWidth();}
    
    if(me.Bs.mode=='mobile'){
//      me.Bs.scale=me.Bs.wwi/me.Bs.widthMobile;
      me.Bs.scale=me.Bs.wwi/me.Bs.maxPc;
    }else{
//      me.Bs.scale=me.Bs.wwi/me.Bs.width;      // 現状スケール
      me.Bs.scale=me.Bs.wwi/me.Bs.maxPc;
    }

  },
//
// loadConfig　サーバーからの自動設定
//
  loadConfig: function(op){
    var me=this; var m, e, out; op=op||{}; if(!op.loadConfig){return;}
    
    m='/config/'+location.pathname; e=$(this);
    $.ajax({async: false, url: m, success: function(data){
      out=JSON.parse(data); for(i in op){out[i]=op[i];}
    }});
    return out;
  },
//
//
//
  spanning: function(){
    var me=this; var wi, wm, ws;

    switch(me.Bs.mode){
     case 'mobile':
      wi=$(window).width(); wm=wi; ws=0; 
      break;
     case 'pc':
      wi=$(window).width();
      if(wi-me.Bs.minSide>me.Bs.maxMain){ws=wi-me.Bs.maxMain;}else{ws=me.Bs.minSide;}
      wi=wi-ws; wm=wi;
      break;
     case 'wide':
      if(me.Bs.section.wide=='yes'){wi=$(window).width();}else{wi=me.Bs.maxPc;}
      if(wi-me.Bs.minSide>me.Bs.maxMain){ws=wi-me.Bs.maxMain;}else{ws=me.Bs.minSide;}
      wm=wi-ws;
      if(me.Bs.section.wide=='yes'){wi=Math.floor((wm-10)/2);}else{wi=wm;}
      break;
    }
    $('#Content').find('section').each(function(){me.css($(this), {outerWidth: wi+'px'});});
    $('main').css({margin: 0});
    return {main: wm, sub: ws};
  },
//
// zone: Content, Sideゾーン制御
//
  zone: function(){
    var me=this; var d; var wm, ws, wi, ml, oh, num, wk, l, h, i, t, w, a;
    me.Save.slidein=me.Save.slidein||{}; me.Save.slidein.on=false;
////
//    padding
    var padding=function(wi){
      var pb=Math.floor($(window).height()/2); var hi=0;
      if(me.Bs.mode=='wide' && me.Bs.section.wide=='yes'){wi=Math.floor((wi-10)/2);}
      $('#Content').find('section').each(function(){
        me.css($(this), {height: 'auto', margin: 0, 'padding-bottom': pb+'px'});
        if($(this).outerHeight()>hi){hi=$(this).outerHeight();}
      });
      return {wi: wi, hi: hi};
    };
////
////
    if(me.Bs.mode=='wide' && me.Bs.section.wide=='no'){wi=me.Bs.maxPc;}
    else{wi=$('body').outerWidth();}

    if(me.Bs.mode=='mobile'){
      wm=$(window).width();
//      $('#Side').css({display: 'none'});
      if(me.Bs.section.mobile=='horizontal'){
        wk=padding(wm);
        l=0; h=0; i=0; num=0; $('#Content').find('section').each(function(){
          me.css($(this), {position: 'absolute', top: 0, left: l+'px', outerHeight: wk.hi+'px'});
          l=l+$(window).width();
          if(h<$(this).outerHeight()){h=$(this).outerHeight();}
        num++;});
        wm=wm*num; me.css('#Content', {outerWidth: wm, outerHeight: wk.hi});
      }else{
        wk=padding(wm);
        t=0; $('#Content').find('section').each(function(){
          h=$(this).outerHeight();
          me.css($(this), {position: 'absolute', top: t+'px', left: 0, outerHeight: h});
          t=t+h;
        });
        me.css('#Content', {outerWidth: wm, outerHeight: t+'px'});
      }
      oh=$('#Content').outerHeight();
      if($('#Side').outerHeight()>oh){oh=$('#Side').outerHeight();}
      me.css("#Content", {position: "absolute", top: 0, left: 0, outerWidth: wm,
        outerHeight: oh
      });
      me.css("#Side", {
        display: 'none', position: "absolute", top: 0, left: wm+"px", outerWidth: ws,
        outerHeight: oh, 'margin-left': 0
      });
//      $('#Side').css({height: 0});

    }else{
      if(wi-me.Bs.minSide>me.Bs.maxMain){ws=wi-me.Bs.maxMain;}else{ws=me.Bs.minSide;}
      wm=wi-ws;
      wk=padding(wm);
      if(me.Bs.mode=='wide' && me.Bs.section.wide=='yes'){
        i=0; f=true; a=[]; num=0; $('#Content').find('section').each(function(){
          h=$(this).outerHeight();
          if(f){a[i]=h; f=false;}else{if(h>a[i]){a[i]=h;} i++; f=true;}
        num++;});
        var f=true; t=0; i=0; $('#Content').find('section').each(function(){
          if(f){l=0; ml=0;}else{l=wk.wi; ml=10;}
          me.css($(this), {
            position: 'absolute', top: t+'px', left: l+'px',
            outerHeight: a[i]+'px', 'margin-left': ml+'px'
          });
          if(f){f=false;}else{f=true; t=t+a[i]; i++;}
        });
        oh=0; for(i in a){oh=oh+a[i];}
        me.css('#Content', {outerHeight: oh+'px'});
      }else{
        padding(wm);
        t=0; num=0; $('#Content').find('section').each(function(){
          h=$(this).outerHeight();
          me.css($(this), {position: 'absolute', top: t+'px', left: 0, outerHeight: h});
          t=t+h;
        num++;});
        me.css('#Content', {outerWidth: wm, outerHeight: t+'px'});
      }

      $('#Side').css({height: 'auto'});
      oh=$('#Content').outerHeight();
      if($('#Side').outerHeight()>oh){oh=$('#Side').outerHeight();}
      me.css("#Content", {position: "absolute", top: 0, left: 0, outerWidth: wm,
        outerHeight: oh
      });
      me.css("#Side", {
        display: 'block', position: "absolute", top: 0, left: wm+"px", outerWidth: ws,
        outerHeight: oh, 'margin-left': 0
      });
    }

    if(!me.Save.zone){if(me.Bs.section.mobile=='horizontal'){
      me.Fdata.section={area: $('main'), max: num, modal: false};
      me.flick(me.Fdata.section, function(data){me.section('indicator.mb', data);});
      me.Save.zone=true;
    }}

  },
//
// slidein 右メニュー
//
  slidein: function(mode){
    var me=this; if(!me.Bs.slidein.use){return;}
    
    var l, m;
    switch(mode){
     case 'init':
      me.Save.slidein=me.Save.slidein||{}; me.Save.slidein.on=false;
      $('#Logo').on('click', function(){
        if(me.Bs.mode!='mobile'){return;}
        if(me.Save.slidein.on){
          me.Save.slidein.on=false;
          l=$(window).width();
          $('#Side').stop();
          $('#Side').animate({'margin-left': 0}, me.Bs.slidein.animate, function(){
            $('#Side').css({display: 'none', 'z-index': 1, left: 0});
          });
        }else{
          me.Save.slidein.on=true;
          l=$(window).width(); 
          $('#Side').css({
            display: 'block', 'z-index': 700, position: 'absolute', top: 0, left: l+'px'
          });
          m=$('#Side').outerWidth()*-1;
          $('#Side').stop();
          $('#Side').animate({'margin-left': m+'px'}, me.Bs.slidein.animate);
        }
        return false;
      });
      me.Fdata.slidein={area: $('#Side'), mode: 'hider', modal: true};
      me.flick(me.Fdata.slidein, function(){
        $('#Side').css({display: 'none', 'z-index': 1, left: 0});
        me.Save.slidein.on=false;
      });
      return;
     case 'out':
      l=$(window).width();
      $('#Side').stop();
      $('#Side').animate({'margin-left': 0}, me.Bs.slidein.animate,function(){
        $('#Side').css({display: 'none', 'z-index': 1});
      });
      return false;
    }
  },
//
// body フレームワーク
//
  body: function(mode){
    var me=this; var hi, wi, f, x, lf, r, v, top, fixed, tag, main, area=true;

    lf=0;
    if(me.Bs.mode=='wide' && me.Bs.section.wide!='yes'){
      lf=Math.floor(($(window).width()-me.Bs.maxPc)/2);
      wi=me.Bs.maxPc;
    }else{
      wi=$('body').outerWidth();
    }
    me.Bs.margin=lf;

    var h1=$('#Content').outerHeight(); var h2=$('#Side').outerHeight();
    if(h1<h2){h1=h2;}
    me.css($('#Side'), {outerHeight: h1}); me.css($('#Content'), {outerHeight: h1});
    main=h1;

    me.Bs.shrinkHeight=0; me.Save.fixedTop=0; top=0; fixed=0;
    $('body').children().each(function(){
      tag=$(this)[0].localName;
      $(this).css({height: 'auto'});
      if($(this).css('display')=='none'){hi=0;}else{hi=$(this).outerHeight();}
      switch($(this).attr('pos')){
       case 'Fix':
        me.css($(this), {
          'z-index': 500, position: 'fixed', top: top+'px', left: lf+'px',
          width: wi+'px', outerHeight: hi+'px'
        });
        top=top+hi; me.Save.fixedTop+=hi; fixed=fixed+hi;
        break;
       case 'Under':
        hi=0;
        me.css($(this), {
          'z-index': 500, position: 'fixed', top: top+'px', left: lf+'px',
          width: wi+'px', outerHeight: hi+'px'
        });
        top=top+hi; me.Save.fixedTop+=hi; fixed=fixed+hi;
        break;
       case 'Behind':
        me.css($(this), {
          'z-index': 0, position: 'fixed', top: top+'px', left: lf+'px',
          width: wi+'px', outerHeight: hi+'px'
        });
        top=top+hi; me.Bs.shrinkHeight+=hi;
        break;
       case 'Parallax':
        me.css($(this), {
          'z-index': 0, position: 'absolute', top: top+'px', left: lf+'px',
          width: wi+'px', outerHeight: hi+'px'
        });
        $(this).attr('save', top); top=top+hi; me.Bs.shrinkHeight+=hi;
        v=$(this).attr('speed')||me.Bs.parallax; $(this).attr('speed', v-0);
        break;
       case 'Remain':
        me.css($(this), {
          'z-index': 500, position: 'absolute', top: top+'px', left: lf+'px',
          width: wi+'px', outerHeight: hi+'px'
        });
        $(this).attr('save', top); top=top+hi;
        $(this).attr('fixed', fixed); fixed=fixed+hi; me.Save.fixedTop+=hi;
        break;
       default:
        if(tag=='main'){hi=main;}
        if(area && tag!='a'){
          me.css($(this), {
            'z-index': 1, position: 'absolute', top: top+'px', left: lf+'px',
            width: wi+'px', outerHeight: hi+'px'
          });
          $(this).attr('save', top);
          top=top+hi;
        }
      }
      if(tag=='footer'){area=false;}
    });
  },
//
// footer フッタの位置調整
//
  footer: function(mode, pos){
    var me=this;
    var t, h, l, d, w={};

    if(mode=='init'){
      $('footer').css({'z-index': 700});
      $('#Menu').on('click', function(){if(me.Bs.mode=='mobile'){
        $('footer').css({top: $('body').scrollTop()});
        $('footer').attr('saveleft', $('footer').css('margin-left'));
        me.modal('set', function(){
          var l=$('footer').attr('saveleft');
          $('footer').animate({'margin-left': l}, me.Bs.footer.animate);
        });
        $('footer').animate({'margin-left': 0}, me.Bs.footer.animate);
        $('footer').attr('ix', 1);
      }});
      me.Fdata.footer={area: $('footer'), mode: 'hide', modal: true};
      me.flick(me.Fdata.footer);

      if(me.Bs.footer.remain){
        $("#FTlabel").on('click', function(){if(me.Bs.mode!='mobile'){
          t=$('footer').attr("savetop")-0;
          if(t){
            $('footer').stop(); $("footer").animate({top: t+"px"}, me.Bs.footer.animate);
            $('footer').attr("savetop", 0);
          }else{
            t=$('footer').position().top-0; $('footer').attr("savetop", t);
            t=$('footer').position().top-0-$('footer').outerHeight()+me.Bs.footer.remain;
            $('footer').stop(); $("footer").animate({top: t+"px"}, me.Bs.footer.animate);
          }
        }});
      }

    }

    if(me.Bs.mode=='mobile'){
      if(mode!='init'){$('footer').removeClass('pc');} $('footer').addClass('mobile');

      h=$(document).outerHeight(); l=Math.floor($(window).outerWidth()*me.Bs.footer.rate/100);
      $('footer').css({
        top: 0, 'margin-left': -l+'px', width: l+'px', height: h+'px', 'z-index': 700
      });
      $('footer').attr('min', 0); $('footer').attr('max', h);
      me.modal('clear');

    }else{
      if(mode!='init'){$('footer').removeClass('mobile');} $('footer').addClass('pc');

      w.ypos=pos+$(window).height()-me.Bs.shrinkHeight;
      w.limit=$('footer').attr('save')-0-me.Bs.shrinkHeight;
      w.usual=$(window).height()-me.Bs.footer.remain;
      if(me.Bs.footer.remain==0 || w.limit<=w.ypos){
        d=$('footer').attr('save')-me.Bs.footer.remain;
        $('footer').css({
          position: 'absolute', top: d+'px', width: me.Bs.wwi+'px',
          height: 'auto', 'margin-left': 0
        });
      }else{
        $('footer').css({position: 'fixed', top: w.usual+'px', 'margin-left': 0});
      }
    }

  },
//
// scroll スクロール移動
//
  scroll: function(){
    var me=this; var t, n, d;
    
    var p=$(window).scrollTop();
    $('body').children().each(function(){
      switch($(this).attr('pos')){
       case 'Parallax':
        t=$(this).attr('save')-0; n=t+($(this).attr('speed')-0)*p; $(this).css({top: n+'px'});
        break;
       case 'Remain':
        t=$(this).attr('save')-0; d=$(this).attr('fixed')-0;
        if(p>t-d){
          $(this).css({position: 'fixed', top: d+'px'});
         }else{
          $(this).css({position: 'absolute', top: t+'px'});
        }
        break;
      }
    });
    return p;    
  },
//
// depend: Dependクラス対応
//ok
  depend: function(){
    var me=this; if(me.Bs.mode==me.Save.mode){return;}
    
    $('.Depend').each(function(){
      var f; if(me.Bs.mode=='mobile'){f=$(this).attr('mobile');}else{f=$(this).attr('pc');}
      if(f){$(this).attr('src', f);}
    });

  },
//
// hide Pc, Mobile クラス対応
//ok
  hide: function(){
    var me=this; if(me.Bs.mode==me.Save.mode){return;}
    
    if(me.Bs.mode=='mobile'){
      $('.Pc').each(function(){$(this).css({display: 'none'});});
      $('.Mobile').each(function(){$(this).css({display: 'block'});});
    }else{
      $('.Pc').each(function(){$(this).css({display: 'block'});});
      $('.Mobile').each(function(){$(this).css({display: 'none'});});
    }
  },
//
// image: 画像大きさ制御
//
  image: function(mode){
    var me=this; var w, h, e, p, m, t, l, x, y, obj={};
    
                                            // 全幅
    $('.PhotoF').each(function(){
      if(me.Bs.wwi>me.Bs.maxPc){
        m=Math.floor((me.Bs.wwi-me.Bs.maxPc)/2);
        $(this).css({width: me.Bs.maxPc+'px', margin: '0 '+m+'px'});
      }else{
        $(this).css({width: me.Bs.wwi+'px', margin: 0});
      }
    });
                                            // モバイル
    $('.PhotoG').each(function(){
      if(!$(this).attr('sizeX')){
        $(this).attr('sizeX', $(this).width()); $(this).attr('sizeY', $(this).height());
        $(this).parent().eq(0).append('<div id="PG" style="overflow: hidden"></div>');
        $(this).appendTo('#PG');
      }
      if(me.Bs.wwi>me.Bs.maxPc){
        m=Math.floor((me.Bs.wwi-me.Bs.maxPc)/2); l=0; t=0;
        $(this).css({width: me.Bs.maxPc+'px', margin: '0 '+m+'px'});
      }else if(me.Bs.wwi<me.Bs.minPc){
        x=Math.floor($(this).attr('sizeX')*$(this).attr('zoom'));
        l=Math.floor(me.Bs.wwi*$(this).attr('gravityX')-x*0.5);
        y=Math.floor($(this).attr('sizeY')*$(this).attr('zoom'));
        h=Math.floor($(this).attr('sizeY')*me.Bs.wwi/$(this).attr('sizeX'));
        t=Math.floor(h*$(this).attr('gravityY')-y*0.5);
        $(this).css({width: w+'px', 'margin-top': t+'px', 'margin-left': l+'px'});
      }else{
        l=0; t=0;
        $(this).css({width: me.Bs.wwi+'px', margin: 0});
      }
      w=me.Bs.wwi;
      h=Math.floor($(this).attr('sizeY')*w/$(this).attr('sizeX'));
      $(this).parent().eq(0).css({width: w+'px', height: h+'px'});
    });
                                            // 親幅幅合わせ
    $(".PhotoP").each(function(){
      w=0; e=$(this);
      while(w==0){
        e=e.parent();
        if(e[0].tagName=='DIV' || e[0].tagName=='SECTION' ||
           e[0].tagName=='HEADER' || e[0].tagName=='FOOTER' || e[0].tagName=='NAV'){w=e.width();}
        if(w!=0){$(this).css({width: w+'px'});}
        if(e[0].tagName=='BODY'){w=-1;}
      }
    });
                                            // 縮尺比例
    $('.PhotoS').each(function(){
      if(me.Bs.mode=='mobile'){
        w=Math.floor(me.Bs.image.mobile*me.Bs.scale); $(this).css({width: w+'px'});
      }else{
        w=Math.floor(me.Bs.image.pc*me.Bs.scale); $(this).css({width: w+'px'});
      }
    });
                                            // モバイル100%
    $('.PhotoM, .photoM').each(function(){
      if(me.Bs.mode=='mobile'){w='100%';}else{w=me.Bs.image.photoM;}
      $(this).css({width: w});
    });
    $('.PhotoU, .photoU').each(function(){
      if(me.Bs.mode=='mobile'){w='100%';}else{w=me.Bs.image.photoM;}
      $(this).css({width: w, cursor: 'w-resize'});
    });
                                            // ２段階調整
    $('.PhotoC').each(function(){
      p=0; e=$(this); w=$(this).attr('width');
      while(p==0){
        e=e.parent();
        if(e[0].tagName=='DIV' || e[0].tagName=='SECTION' ||
           e[0].tagName=='HEADER' || e[0].tagName=='FOOTER' || e[0].tagName=='NAV'){p=e.width();}
        if(e[0].tagName=='BODY'){p=w;}
      }
      if(p<w*me.Bs.sRate){w=p;} $(this).css({width: w+"px"});
    });
                                            // デバイス依存
    $('.PhotoD').each(function(){
      var s; if(me.Bs.mode=='mobile'){
        w=$(this).attr('msize')||me.Bs.image.fixMobile;
      }else{
        w=$(this).attr('psize')||me.Bs.image.fixPc;
      }
      $(this).css({width: w+'px'});
    });
                                    // 写真の大きさを調整する(size:750)
    $(".PhotoL, .photoL").each(function(){
      w=0; e=$(this);
      while(w==0){
        e=e.parent();
        if(e[0].tagName=='DIV' || e[0].tagName=='SECTION'){f=false; w=e.width();}
        if(w!=0){me.css($(this), {outerWidth: w});}
        if(e[0].tagName=='BODY'){w=-1;}
      }
    });
  },
//
// locateSide サイドコンテンツの自動セクション位置づけ
//
  locateSide: function(mode, pos){
    var me=this;
    
    if(me.Bs.locateSide=='yes'){
      var d, k, l, p, h, s='#Top';
      if(mode=='init'){
        me.Save.sidepad=parseInt($('#Side').css('padding-top'))-0;
      }else{
        d=Math.floor($(window).height()/2);
        for(k in me.Sec){if(pos+d<me.Sec[k].pos){break;} s=k;}
        if(s=='#Top'){p=me.Save.sidepad;}else{p=me.Sec[s].pos-me.Bs.shrinkHeight+me.Save.sidepad;}
        var h=$('#Side').outerHeight();
        $('#Side').css({'padding-top': p+'px'});
        me.css($('#Side'), {outerHeight: h});
      }
    }

  },
//
// logo
//
  logo: function(mode, pos){
    var me=this; var tp, lf, lf, wi;
    if(!me.Bs.logo.image){return;}

////
//  molding
    switch(mode){
     case 'init':
      
      $('body').append('<a href="/index.html"><img id="Logo" src="'+me.Bs.logo.image+'" alt="ロゴマーク"/></a>');
//      $('body').append('<img id="Logo" src="'+me.Bs.logo.image+'" alt="ロゴマーク"/>');
      if(me.Bs.mode=='mobile'){
        wi=me.Bs.logo.min;
        $('#Logo').css({
          position: 'fixed', bottom: '10px', right: '10px', width: wi+'px', 'z-index': 1
        });
      }else{
        tp=Math.floor(me.Bs.logo.top*me.Bs.scale);
        lf=Math.floor(me.Bs.wwi-(me.Bs.logo.right+me.Bs.logo.max)*me.Bs.scale)+me.Bs.margin;
        wi=Math.floor(me.Bs.logo.max*me.Bs.scale);
        $('#Logo').css({
          position: 'absolute', top: tp+'px', left: lf+'px', width: wi+'px', 'z-index': 600
        });
      }
      return;
////
//  scroll
     case 'cont':
      if(me.Bs.mode=='mobile'){
        wi=me.Bs.logo.min;
        $('#Logo').css({
          position: 'fixed', bottom: '10px', right: '10px', width: wi+'px', 'z-index': 1,
          top: "", left: ""
        });
      }else{
        var p1=Math.floor(me.Bs.logo.top*me.Bs.scale);
        var p2=p1+Math.floor(me.Bs.logo.max*me.Bs.scale);
        var wl=Math.floor(me.Bs.logo.max*me.Bs.scale); var ws=me.Bs.logo.min;
        if(pos>p2){
          tp=Math.floor(me.Bs.logo.next*me.Bs.scale+pos-p2);
          wi=me.Bs.logo.min;
          lf=Math.floor(me.Bs.wwi-me.Bs.logo.right*me.Bs.scale-ws)+me.Bs.margin;
        }else if(pos>p1){
          tp=Math.floor(me.Bs.logo.top*me.Bs.scale
            +(me.Bs.logo.next-me.Bs.logo.top)*me.Bs.scale*(pos-p1)/(p2-p1));
          wi=Math.floor(wl-((wl-ws)*(pos-p1)/(p2-p1)));
          lf=Math.floor(me.Bs.wwi-(me.Bs.logo.right*me.Bs.scale+wi))+me.Bs.margin;
        }else{
          tp=Math.floor(me.Bs.logo.top*me.Bs.scale);
          lf=Math.floor(me.Bs.wwi-(me.Bs.logo.right+me.Bs.logo.max)*me.Bs.scale)+me.Bs.margin;
          wi=Math.floor(me.Bs.logo.max*me.Bs.scale);
        }
        $('#Logo').css({
          position: 'absolute', top: tp+'px', left: lf+'px', width: wi+'px', 'z-index': 600,
          bottom: "", right: ""
        });
      }
      return;
    };
  },
//
//elcontents コンテンツのエレベート
//
  elcontents: function(){
    var me=this; if(me.Bs.elcontents.length<1){return;} if(!me.Bs.elcontents[0].click){return;}

    var i, h, a, c, d;

    for(i in me.Bs.elcontents){
      c=me.Bs.elcontents[i].click; d=me.Bs.elcontents[i].html;
      a=me.Bs.elcontents[i].animate||me.Bs.animate;
      $('#'+c).on('click', function(){
        if(me.Bs.mode=='mobile'){
        h=$('#'+d).html(); me.elevate(h, a);
        return false;
      }});
    }
  },
//
// cell: セルの幅・高さ調整
//ok
  cell: function(){
    var me=this; var w, m, h, max, min, s, i, l, r, p;

    $('.Cell').each(function(){
      p=$(this).attr('priority')||me.Bs.cell.priority;
      if(p=='number'){
        w=$(this).attr('base')||me.Bs.cell.base;
        min=$(this).attr('min')||me.Bs.cell.min;
        max=$(this).attr('max')||me.Bs.cell.max;
        n=Math.floor($(this).width()/w);
        if(n<min){n=min;} if(n>max){n=max;}
        w=Math.floor($(this).width()/n);
        s=Math.floor(($(this).width()-w*n)/2);
        
        max=0; i=1; $(this).children().each(function(){
          r=0; l=0; if(i==1){l=s;} if(i==n){r=s;}
          $(this).css({'margin-left': l+'px', 'margin-right': r+'px', width: w+'px'});
          $(this).css({float: 'left'});
          h=$(this).height(); if(h>max){max=h;}
          i++; if(i>n){i=1;}
        });
        $(this).children().each(function(){$(this).css({height: max+'px'});});
      }else{
        if(me.Bs.mode=='mobile'){w=$(this).attr('mobile')||me.Bs.cell.mobile;}
        else{w=$(this).attr('pc')||me.Bs.cell.pc;}
        n=Math.floor($(window).width/w); m=($(window).width-(n*w))/(n*2);
        max=0;

        $(this).children().each(function(){
          $(this).css({'margin-left': m+'px', 'margin-right': m+'px', width: w+'px'});
          $(this).css({float: 'left'});
          h=$(this).height(); if(h>max){max=h;}
        });
        $(this).children().each(function(){$(this).css({height: max+'px'});});
      }
    });
  },
//
// carousel: カルーセル
//ok
  carousel: function(mode, ix){
    var me=this; var pm, op; ix=ix||0;
////
//  setsize
    var setSize=function(pm, obj){
      var wi, hi, wn, hn, w, n, a, max;

      if(me.Bs.mode=='mobile'){w=pm.mobile;}else{w=pm.pc;}

      a=obj.parent().width();
      if(pm.priority=='width'){n=Math.floor(a/w); w=Math.floor(a/n); pm.num=n;}
      else{if(me.Bs.mode=='mobile'){n=pm.nummb;}else{n=pm.num;} w=Math.floor(a/n);}

      pm.max=0;
      obj.find('li').each(function(){$(this).find('img').css({width: w+'px'}); pm.max++;});

      pm.wi=$('#'+pm.id+' img:first').width(); pm.hi=$('#'+pm.id+' img:first').height();
      pm.wf=(pm.wi*0)+"px"; pm.wt=(pm.wi*-1)+'px'; pm.wn=pm.wi*$('#'+pm.id+' img').size();
      pm.hf=(pm.hi*0)+"px"; pm.ht=(pm.hi*-1)+'px'; pm.hn=pm.hi*$('#'+pm.id+' img').size();
      $('#'+pm.id+' li:last').prependTo('#'+pm.id+' ul');
      if(pm.direction=='V'){
        $('#'+pm.id+' ul').css({height: pm.hn}); $('#'+pm.id+' ul').css("margin-top", pm.hf);
        pm.hn=pm.hi*pm.num; $('#'+pm.id).css({width: pm.wi, height: pm.hn, overflow: 'hidden'});
      }else{
        $('#'+pm.id+' ul').css({width: pm.wn});
        $('#'+pm.id+' ul').css({"margin-left": pm.wf}); $('#'+pm.id+' img').css({float: 'left'});
        pm.wn=pm.wi*pm.num; $('#'+pm.id).css({width: pm.wn, height: pm.hi, overflow: 'hidden'});
      }
      return pm;
    };
////
//  indicator
    var indicator=function(op, mode){
      var l=op.max, p=op.ix, mk='', i, j;
      if(mode=='init'){
        $('#'+op.id).empty();
        for(i=0; i<l; i++){
          if(i==0){mk=op.onf;}else{mk=op.off;} $('#'+op.id).append('<img src="'+mk+'" ix="'+i+'"/>');
        }
        $('#'+op.id).find('img').each(function(){
          $(this).on('click', function(){
            i=me.Save.carousel[op.pix].jx; j=$(this).attr('ix')-0;
            while(j!=i){
              $('#'+op.pid+' li:first').appendTo('#'+op.pid+' ul'); i++; if(i>=pm.max){i=0; break;}
            }
            i=0; $('#'+op.id).find('img').each(function(){
              if(i==j){mk=op.onf;}else{mk=op.off;} $(this).attr('src', mk);
            i++;});
            me.Save.carousel[op.pix].jx=j;
          });
        })
      }else{
        i=0; $('#'+op.id).find('img').each(function(){
          if(i==p){mk=op.onf;}else{mk=op.off;} $(this).attr('src', mk);
        i++;});
      }
    };
////
////
    switch(mode){
     case 'image':
                                            //
      ix=0; $('.Carousel').each(function(){
        me.Save.carousel[ix]=setSize(me.Save.carousel[ix], $(this));
      ix++;});
      return;

     case 'loop':
                                           //
      pm=me.Save.carousel[ix];

      if(pm.direction=='V'){
        $('#'+pm.id+' ul').animate({"marginTop": pm.ht}, pm.animate, "swing", function(){
          $(this).css("margin-top", pm.hf); $('#'+pm.id+' li:first').appendTo('#'+pm.id+' ul');
        })
      }else{
        $('#'+pm.id+' ul').animate({"marginLeft": pm.wt}, pm.animate, "swing", function(){
          $(this).css("margin-left", pm.wf); $('#'+pm.id+' li:first').appendTo('#'+pm.id+' ul');
        })
      }
      if(pm.indicator){
        pm.jx++; if(pm.jx>=pm.max){pm.jx=0;}
        indicator({id: pm.indicator, ix: pm.jx, onf: pm.onsign, off: pm.offsign});
      }

      pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);

      me.Save.carousel[ix]=pm;
      return;

     default:
                                            //
      $('.Carousel').each(function(){
        var k, i;
        op=me.Bs.carousel||{}; pm={};
        pm.id=$(this).attr('id');
        if(!pm.id){
          pm.id='CA'+Math.floor(Math.random()*1000); $(this).attr('id', pm.id);
        }
        k=[
          'num', 'direction', 'interval', 'animate', 'priority', 'pc', 'mobile',
          'down', 'up', 'fore', 'back', 'play', 'stop', 'toggle', 'indicator', 'onsign', 'offsign'
        ];
        for(i in k){pm[k[i]]=$(this).attr(k[i])||me.Bs.carousel[k[i]];}

        pm.iw=$(this).width();
        pm=setSize(pm, $(this));
        pm.jx=0;
        if(pm.indicator){
          indicator({id: pm.indicator, onf: pm.onsign, off: pm.offsign, max: pm.max, pix: ix}, 'init');
        }

        pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);

        if(pm.down){$('#'+pm.down).click(function(){
          clearTimeout(pm.tid); $('#'+pm.id+' ul').css("margin-top", pm.ht);
          $('#'+pm.id+' li:first').appendTo('#'+pm.id+' ul');
          $('#'+pm.id+' ul').css("margin-top", pm.hf);
          pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);
        });}
        
        if(pm.up){$('#'+pm.up).click(function(){
          clearTimeout(pm.tid); $('#'+pm.id+' ul').css("margin-top", 0);
          $('#'+pm.id+' li:last').prependTo('#'+pm.id+' ul');
          $('#'+pm.id+' ul').css("margin-top", -pm.hi);
          pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);
        });}

        if(pm.fore){$('#'+pm.fore).click(function(){
          clearTimeout(pm.tid);
          $('#'+pm.id+' ul').css("margin-left", pm.wf);
          $('#'+pm.id+' li:first').appendTo('#'+pm.id+' ul');
          pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);
        });}
        if(pm.back){$('#'+pm.back).click(function(){
          clearTimeout(pm.tid);
          $('div#'+pm.id+' div').css("margin-left", 0);
          $('#'+pm.id+' li:last').prependTo('#'+pm.id+' ul');
          $('#'+pm.id+' ul').css("margin-left", -pm.wi);
          pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);
        });}
        if(pm.play){$('#'+pm.play).click(function(){if(!pm.tid){
          pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);
        }});}
        if(pm.stop){$('#'+pm.stop).click(function(){if(pm.tid){
          clearTimeout(pm.tid); pm.tid='';
        }});}
        if(pm.toggle){$('#'+pm.toggle).click(function(){
          var cnvt=function(x){
            var a=x.split('.'); var o=''; var d='';
            for(i=a.length; i>0; i--){if(i==a.length-1){o='_x.'+o; d='.';}else{o=d+o;} o=a[i-1]+o;}
            return o;
          };
          if(pm.tid){
            clearTimeout(pm.tid); pm.tid='';
            var s=$('#'+pm.toggle).attr('src'); $('#'+pm.toggle).attr('data-save', s);
            s=cnvt(s); $('#'+pm.toggle).attr('src', s);
          }else{
            pm.tid=setTimeout(function(){me.carousel('loop', ix);}, pm.interval);
            var s=$('#'+pm.toggle).attr('data-save'); $('#'+pm.toggle).attr('src', s);
          }
        });}

        me.Save.carousel=me.Save.carousel||[]; me.Save.carousel[ix]=pm;
                                            //
        me.Save.carousel[ix]=setSize(me.Save.carousel[ix], $(this));

      });

      return;

    }

  },
//
// ドロップダウンメニュー
//
  dropdown: function(){
    var me=this; var op=me.Bs.dropdown; var vi;

    $('.Dropdown').each(function(){
      vi=op.animate||500;
      $(this).find('dd').css("display", "none");
      $(this).find('dt').click(function(){
        if($(this).siblings().css("display")=="block"){
          $(this).siblings().slideUp(vi); var o=$(this).find('img');
          if(o){var s=o.attr('data-src'); o.attr('src', s);}
        }else{
          $(this).siblings().slideDown(vi); var o=$(this).find('img');
          if(o){var s=o.attr('src'); o.attr('data-src', s); o.attr('src', me.insert(s, '_r'));}
        }
      });
    });

  },
//
// タブ操作
//ok
  tabs: function(mode){
    var me=this; var ix, jx;
////
//  molding HTMLを成形
    var molding=function(mode, obj, save, ix){
      var max=0, wi, hi;

      wi=obj.find('dt').outerWidth(); hi=obj.find('dt').outerHeight();
      obj.find('.Tabpage').each(function(){
        var h=$(this).outerHeight(); if(h>max){max=h;}
      });

      if(mode=='mobile'){
        var l=0, j=0; obj.find('.Tabpage').each(function(){
          me.css($(this), {
            outerHeight: max+'px', outerWidth: wi+'px',
            position: 'absolute', left: l+'px', top: 0,
            display: 'block'
          });
          me.Save.tabs[ix][j].width=wi;
        l=l+wi; j++;});
      }else{
        var j=0; obj.find('.Tabpage').each(function(){
          var d; if(save[j].open){d='block';}else{d='none';}
          me.css($(this), {
            outerHeight: max+'px', outerWidth: wi+'px',
            position: 'absolute', left: 0, top: 0,
            display: d
          });
          me.Save.tabs[ix][j].width=wi;
        j++;});
      }
      obj.find('dd').css({
        overflow: 'hidden', height: max+'px', width: wi+'px'
      });
      $('#'+me.Save.tabs[ix][0].id).css({
        position: 'relative', top: 0, left: 0, height: max+'px'
      });

    };
////
//  locating ページを位置づけ
    var locating=function(obj, ix, jx, direct){

      if(me.Bs.mode=='mobile'){
        l=me.Save.tabs[ix][0].width*jx*-1;
        if(direct){
          $('#'+me.Save.tabs[ix][0].id).css({marginLeft: l+'px'});
        }else{
          $('#'+me.Save.tabs[ix][0].id).animate({marginLeft: l+'px'}, me.Bs.tab.animate);
        }
      }else{
        j=0; obj.find('.Tabpage').each(function(){
          if(jx==j){$(this).css({display: 'block'});}else{$(this).css({display: 'none'});}
        j++;});
      }
    };
////
//
    var config=function(obj){

      var m, j, w, id, save=[];
      w=obj.outerWidth();
      id='TB'+Math.floor(Math.random()*1000);
      j=0; obj.find('.Tabpage').each(function(){
        var t, h, l;
        save[j]={};
        save[j].id=id;
        save[j].width=w;
        save[j].img=$(this).attr('img');
        if($(this).attr('mobile')){
          save[j].mobile=$(this).attr('mobile')||$(this).attr('img');
        }
        t=$(this).attr('title');
        switch(t){
         case 'h2': case 'h3': case 'h4':
          save[j].title=$(this).find(t).html();
          break;
         default:
          save[j].title=t;
        }
        save[j].open=$(this).attr('open');
      j++;});
      return save;
    };
////
//  createTabs タブを作成
    var createTabs=function(mode, obj, save){
      var s, m, j;
      obj.find('dt').append('<ul></ul>');
      for(j in save){
        if(save[j].img){
          if(mode=='mobile'){s=save[j].mobile;}else{s=save[j].img;}
          if(save[j].open){s=me.insert(s, '_r');}
          obj.find('dt').find('ul').append(
            '<li ix="'+ix+'" jx="'+j+'"><img src="'+s+'" alt="'+save[j].title+'"/></li>'
          );
        }else{
          if(save[j].open){s='Open';}else{s='Close';}
          obj.find('dt').find('ul').append(
            '<li ix="'+ix+'" jx="'+j+'" class="'+s+' '+mode+'">'+save[j].title+'</li>'
          );
        }
      }

      obj.find('dd').append('<div id="'+save[j].id+'"></div>');
      obj.find('dd').children().each(function(){
        $(this).appendTo('#'+save[j].id);
      });
    };
////
////  monitoring クリック監視
    var monitoring=function(mode, obj){
      var obk;
      obj.find('dt').each(function(){
        obk=$(this); o='';
        obk.find('li').each(function(){
          $(this).on('click', function(){
            var ix=$(this).attr('ix')-0; var jx=$(this).attr('jx')-0;
            var j, s;
            if(me.Save.tabs[ix][jx].img){
              j=0; obk.find('img').each(function(){
                if(jx==j){s=me.insert(me.Save.tabs[ix][jx].img, '_r');}
                else{s=me.Save.tabs[ix][jx].img;}
                $(this).attr('src', s);
              j++;});
            }else{
              j=0; obk.find('li').each(function(){
                if(jx==j){s='open';}else{s='close';}
                $(this).attr('class', s);
              j++;});
            }
            locating(obj, ix, jx);
          });
        });
      });
    };
////
//  changeTabs タブ画像切換
      var changeTabs=function(mode, obj, save){
        var i, j, s, f;
      
        obj.find('dt').each(function(){
          $(this).find('img').each(function(){
            j=$(this).attr('jx');
            s=$(this).attr('src'); f=s.find(/_r/);
            if(mode=='mobile'){s=save[j].mobile||save[j].img;}else{s=save[j].img;}
            if(f){s=me.insert(s, '_r');}
            $(this).attr('src', s);
          });
        });
      };
////
////
    var ix, obj, id, js, data=[];
    if(mode=='init'){
      me.Save.tabs=[];
      
      ix=0; $(".Tabs").each(function(){
        me.Save.tabs[ix]=config($(this)); 
        createTabs(me.Bs.mode, $(this), me.Save.tabs[ix]);
        molding(me.Bs.mode, $(this), me.Save.tabs[ix], ix);
        monitoring(me.Bs.mode, $(this));
        id=me.Save.tabs[ix][0].id;
        me.Fdata.tabs={area: $(this).find('dd'), object: $('#'+id), max: me.Save.tabs[ix].length};
        me.flick(me.Fdata.tabs);
      ix++;});
    }else{
        
      ix=0; $(".Tabs").each(function(){
        changeTabs(me.Bs.mode, $(this), me.Save.tabs[ix]);
        molding(me.Bs.mode, $(this), me.Save.tabs[ix], ix);
        jx=0; sj=0; $(this).find('dt').find('li').each(function(){
          if($(this).attr('open')=='y'){sj=jx;}
        jx++;});
        locating($(this), ix, sj, true);
      ix++;});

    }

    return;
  },
//
// accordion:アコーディオン
//ok
  accordion: function(mode){
    var me=this;
////
//  initialize 初期化
    var initialize=function(dl, op){
      var s=dl.attr('img')||me.Bs.accordion.image;
      if(me.Bs.mode=='mobile'){s=dl.attr('mobile')||me.Bs.accordion.mobile||s;}
      dl.attr('save', s);

      if(dl.attr('state')!='open'){s=me.insert(s, '_r'); dl.find('dd').css('display', 'none');}
      dl.find('dt').prepend('<img src="'+s+'"/>');
    };
////
//  changeImage イメージ対応
    var changeImage=function(dl){

      dl.find('dt').each(function(){
        s=dl.attr('save'); if(me.Bs.mode=='mobile'){s=dl.attr('mobile')||me.Bs.accordion.mobile||s;}
        if(dl.attr('state')!="open"){s=me.insert(s, '_r');}
        $(this).find('img').attr('src', s);
      });
    };
////
//  monitoring クリック監視
    var monitoring=function(dl, vi){
      dl.find('dt').each(function(){
        var dt=$(this), s;
        dt.on('click', function(){
          s=dl.attr('save');
          if(dl.attr('state')!='open'){
            dl.find('dd').slideDown(vi); dl.attr('state', 'open');
          }else{
            dl.find('dd').slideUp(vi); dl.attr('state', 'close'); s=me.insert(s, '_r');
          }
          dt.find('img').attr('src', s);
          me.section('position');
        });
      });
    };
////
    $('.Accordion').each(function(){
      var dl=$(this);
      var vi=dl.attr('animate')||me.Bs.accordion.animate;

      if(mode=='init'){
        initialize(dl, vi); monitoring(dl, vi);
      }else{
        changeImage(dl);
      }
    });
  },
//
// folding メニュー折りたたみ
//
  folding: function(mode){
    var me=this;
    var h, f, g, op, cl, no, o;

    f=true; $('.Folding').eq(0).each(function(){f=false;}); if(f){return;}

    if(mode=='init'){
    
      $('.Folding dl dt').on('click', function(){
        f=false;
        o=$(this).parents().eq(1);
        switch(o.attr('mode')){
         case 'mobile': if(me.Bs.mode=='mobile'){f=true;} break;
         case 'pc': if(me.Bs.mode=='pc'){f=true;} break;
         default: f=true;
        }

        op=$(this).attr('open')||me.Bs.image.open;
        cl=$(this).attr('close')||me.Bs.image.close;
        no=$(this).attr('none')||me.Bs.image.none;

        if(f){
          $(this).parent('dl').siblings().each(function(){
            $(this).find('dt').css({'background-image': 'url('+cl+')'});
            $(this).find('dd').css({display: 'none'});
          });
          $(this).parent('dl').eq(0).find('dt').css({'background-image': 'url('+op+')'});
          $(this).parent('dl').eq(0).find('dd').css({display: 'block'});
        }
      });

    }

    $('.Folding').each(function(){

      f=false;
      switch($(this).attr('mode')){
       case 'mobile': if(me.Bs.mode=='mobile'){f=true;} break;
       case 'pc': if(me.Bs.mode=='pc'){f=true;} break;
       default: f=true;
      }

      op=$(this).attr('open')||me.Bs.image.open;
      cl=$(this).attr('close')||me.Bs.image.close;
      no=$(this).attr('none')||me.Bs.image.none;

      if(f){
        $(this).find('dl').each(function(){
          g=true; $(this).find('a').each(function(){
            if($(this).attr('class')=='now'){g=false;}
          });
          if(g){
            $(this).find('dt').css({'background-image': 'url('+cl+')'});
            $(this).find('dd').css({display: 'none'});
          }else{
            $(this).find('dt').css({'background-image': 'url('+op+')'});
            $(this).find('dd').css({display: 'block'});
          }
        });
      }else{
        $('.Folding').find('dl').each(function(){
          $(this).find('dt').css({'background-image': 'url('+no+')'});
          $(this).find('dd').css({display: 'block'});}
        );
      }
    });

  },
//
// map: 地図
//
  map: function(mode){
    var me=this; var ix, obj;
    if(!me.Bs.map.key){return;}
////
//  blockMap 埋め込み地図  
    var blockMap=function(obj, ix){
      var a, ti, s, w, h, e, o;
      w=obj.attr('wi')||me.Bs.map.width; h=obj.attr('hi')||me.Bs.map.height;
      if(me.Bs.mode=='mobile'){
        h=obj.attr('mobile')||h;
        obj.css({width: '100%', height:h+'px', display: 'block'});
      }else{
        w=Math.floor(w*me.Bs.scale); h=Math.floor(h*me.Bs.scale);
        obj.css({width: w+'px', height: h+'px', display: 'block'});
      }
      var o={};
      me.Save.map[ix]={};
      o.zoom=obj.attr('scale')-0||me.Bs.map.scale;
      o.mapTypeId=google.maps.MapTypeId.ROADMAP;
      me.Save.map[ix].obj=new google.maps.Map(obj[0], o);
      var lat=obj.attr('lat')-0||35; var lon=obj.attr('lon')-0||135;
      var ps=new google.maps.LatLng(lat, lon);
      me.Save.map[ix].obj.setCenter(ps);
      ti=obj.attr('title')||'';
      var mk=new google.maps.Marker({position: ps, map: me.Save.map[ix].obj, title: ti});
 
      google.maps.event.addDomListener(window, "resize", function() {
        var ce=me.Save.map[ix].obj.getCenter();
        google.maps.event.trigger(me.Save.map[ix].obj, "resize");
        me.Save.map[ix].obj.setCenter(ce);
      });
      
    };
////
//
    var onload=function(){
      me.Save.map=[];
      var ix=0; $('.Map').each(function(){
        obj=$(this); $(this).attr('ix', ix);
        if(obj[0].localName=='img'){monitoring(obj, ix);}else{blockMap(obj, ix);}
      ix++; });
    };
////
//  molding タグ成形
    var molding=function(){
      if(!document.getElementById('Pbody')){
        var apikey=me.Bs.map.key;
        $('body').append('<div id="Pbody" ix=0> </div>');
        $('body').append('<img src="'+me.Bs.map.close+'" alt="close" id="Pclose"/>');
        var el=document.createElement('script');
        var flg=true;
        el.type='text/javascript';
        el.src='https://maps.googleapis.com/maps/api/js?key='+me.Bs.map.key+'&language=ja&region=JP"';
        el.onload=function(){if(flg){flg=false; onload();}};
        el.onreadystatechange=function(){
          if(this.readyState=="loaded"||this.readyState=='complete'){if(flg){flg=false; onload();}}
        };
        document.body.appendChild(el);
      }else{
        $('#Pbody').html('');
      }
      $("#Pbody").css({
        "display": "none", "position": "absolute", "padding": "0 0 12px 0", 'z-index': 900
      });
      $("#Pclose").css({
        "border": "none","display": "none","position": "absolute", 'z-index': 901
      });
    };
////
//  monitoring 監視
    var monitoring=function(obj, ix){
      me.Save.map[ix]={};
      obj.on('click', function(){
        var ix=$(this).attr('ix'); $('#Pbody').attr('ix', ix);
        if(!me.Save.map[ix]){me.Save.map[ix]={};}
        if(me.Save.map[ix].toggle){dimout(ix);}
        else{if(me.Bs.mode=='mobile'){elevate($(this), ix);}else{popup($(this), ix);}}
        return false;
      });

      $("#Pclose").on('click', function(){dimout(ix);});
    };
////
//  popup 地図のポップアップ
    var popup=function(obj, ix){
      var lat=obj.attr("lat")-0||35; var lon=obj.attr("lon")-0||135; var ti=obj.attr("title")||'';
      var ra=obj.attr("rate")||me.Bs.map.rate||80;
      var tp=$(window).scrollTop()+$(window).height()*(100-ra)/200;
      var wi=Math.floor($(window).width()*ra/100);
      var hi=Math.floor($(window).height()*ra/100);
      var lf=($(window).width()-wi)/2; var cl=lf+wi-$('#Pclose').width();
      $('#Pbody').attr('ix', ix); $('#Pbody').attr('rate', ra);
      $("#Pbody").css({
        display: 'block', width: wi+'px', height: hi+'px', top: tp+'px', left: lf+'px',
        'z-index': 900
      });
      lf=lf+wi-$('#Pclose').width();
      $("#Pclose").css({
        position: 'abosolute', left: lf+'px', top: tp+'px',
        display: 'block', 'z-index': 901
      });
      var o={};
      o.zoom=obj.attr('scale')||me.Bs.map.scale;
      o.mapTypeId=google.maps.MapTypeId.ROADMAP;

      var x=document.getElementById('Pbody');
      me.Save.map[ix].obj=new google.maps.Map(x, o);
      me.Save.map[ix].obj.setCenter(new google.maps.LatLng(lat, lon));
      var ps=new google.maps.LatLng(lat, lon);
      new google.maps.Marker({position: ps, map: me.Save.map[ix].obj, title: ti});
      me.Save.map[ix].toggle=true;
      $('#Pbody').animate({opacity: 1.0}, me.Bs.map.animate);
    };
////
//  elevate 地図のせり上がり
    var elevate=function(obj, ix){
      var lat=obj.attr("lat")-0||35; var lon=obj.attr("lon")-0||135; var ti=obj.attr("title")||'';
      var ra=obj.attr("rate")||me.Bs.map.rate||50;
      var tp=Math.floor($(window).scrollTop()+$(window).height()*(100-ra)/100);
      var wi=$(window).width();
      var hi=Math.floor($(window).height()*(100-ra)/100);
      var lf=$(window).width()-$('#Pclose').outerWidth();
      $('#Pbody').attr('ix', ix); $('#Pbody').attr('rate', ra);
      $("#Pbody").css({
        position: 'fixed', top: $(window).height()+'px', left: 0,
        display: 'block', width: wi+'px', height: hi+'px', 'z-index': 900
      });
      $("#Pclose").css({
        position: 'absolute', left: lf+'px', top: $(window).height()+'px',
        display: 'block', 'z-index': 901
      });
      var o={}; o.zoom=obj.attr('scale')||me.Bs.map.scale; o.mapTypeId=google.maps.MapTypeId.ROADMAP;
      var x=document.getElementById('Pbody'); map=new google.maps.Map(x, o);
      map.setCenter(new google.maps.LatLng(lat, lon));
      var ps=new google.maps.LatLng(lat, lon);
      new google.maps.Marker({position: ps, map: map, title: ti});
      $('#Pbody').animate({top: tp+'px'}, me.Bs.map.animate);
      $('#Pclose').animate({top: tp+'px'}, me.Bs.map.animate);
      me.Save.map[ix].toggle=true;
    };
////
//    dimout
    var dimout=function(ix){
      if(me.Bs.mode=='mobile'){
        var t=$(window).height()+$(window).scrollTop();
        $('#Pbody').animate({top: t+'px'}, me.Bs.map.animate, function(){
          $("#Pbody").css("display","none");
        });
        $('#Pclose').animate({top: t+'px'}, me.Bs.map.animate, function(){
          $("#Pclose").css("display","none");
        });
      }else{
        $("#Pclose").css("display","none"); $("#Pbody").fadeOut("fast");
      }
      me.Save.map[ix].toggle=false;
    };
////
//  cancel
    var cancel=function(obj){
      if(me.Bs.mode!='mobile'){
        $("#Pclose").css("display","none");
        $("#Pbody").animate({opacity: 0, height: 0}, me.Bs.map.animate);
        var ix=$("#Pbody").attr('ix');
        me.Save.map[ix]={};
      }
    };
////
//  resize
    var resize=function(){
      $('.Map').each(function(){
        var a, ti, s, w, h, e, o, obj;
        obj=$(this);
        if(obj[0].localName!='img'){
          w=obj.attr('wi')||me.Bs.map.width; h=obj.attr('hi')||me.Bs.map.height;
          if(me.Bs.mode!='mobile'){
            w=Math.floor(w*me.Bs.scale); h=Math.floor(h*me.Bs.scale);
            obj.css({width: w+'px', height: h+'px'});
          }else{
            h=obj.attr('mobile')||obj.attr('hi')||me.Bs.map.height;
            obj.css({width: '100%'});
          }
        }else{cancel(obj);}
      });
    };
////
//  scroll
    var scroll=function(){
      var tp, ra;
      if(me.Bs.mode=='mobile'){
        ra=$('#Pbody').attr("rate");
        tp=Math.floor($(window).scrollTop()+$(window).height()*(100-ra)/100);
        $("#Pbody").css({top: tp+'px'}); $("#Pclose").css({top: tp+'px'});
      }else{
        ra=$('#Pbody').attr("rate");
        tp=Math.floor($(window).scrollTop()+$(window).height()*(100-ra)/200);
        $("#Pbody").css({top: tp+'px'}); $("#Pclose").css({top: tp+'px'});
      }
    };
////
////
    switch(mode){
     case 'init': molding(); break;
     case 'cont': resize(); break;
     case 'scroll': scroll(); break;
    }
  },
//
//
//
  another: function(mode){
    var me=this;

    switch(mode){
     case 'init':
      $(".Another").on('click', function(){
        if(me.Bs.mode=='mobile'){
          me.elevate('<iframe src="'+$(this).attr("href")+'"></iframe>');
        }else{
          var wi=$(this).attr("popWidth")-0||me.Bs.pop.width;
          var hi=$(this).attr("popHeight")-0||me.Bs.pop.height;
          var bar=$(this).attr("data-bar")||me.Bs.pop.bar; if(bar=='yes'){var x=',scrollbars=yes';}
          window.open($(this).attr("href"), "", "width="+wi+",height="+hi+x);
          return false;
        }
      });
      return;

     case 'cont':
        if(me.Bs.mode=='mobile'){me.elevate('');}
      return;
    }
  },
//
// rollover ロールオーバー
//ok
  rollover: function(){
    var me=this; var op=me.Bs.rollover||{}; op.over=op.over||'_r';

    $('img.Rollover').each(function(){var x=$(this).attr('src'); $(this).attr('save', x);});

    $('img.Rollover').on('mouseover', function(){
      var x=$(this).attr('save'); x=me.insert(x, op.over); $(this).attr('src', x);
    });

    $('img.Rollover').on('mouseout', function(){
      var x=$(this).attr('save'); if(x){$(this).attr('src', x);}
    });

  },
//
// セクションガイド(#Posbar)
//ok
  section: function(mode, pos, direct){
    var me=this; var id, p, t, i, out;
    
    switch(mode){

     case 'init':
                                    // 初期化
      me.Save.section=false;
      $('#Posbar').each(function(){
        out='<ul>';
        var now='now';
        $('section').each(function(){
          id='#'+$(this).attr('id'); t=$(this).find('h2').html();
          if(t){
            p=t.search(/\//); if(p>0){t=t.substr(0, p);}
            out+='<li class="'+now+'"><a href="'+id+'">'+t+'</a></li>';
            now='';
            if(!me.Sec[id]){me.Sec[id]={};} me.Sec[id].title=t;
          }else{
            console.log('<h2>tag not found');
            if(!me.Sec[id]){me.Sec[id]={};} me.Sec[id].title="Not Found";
          }
        });
        out+='</ul>';
        $('#Posbar').html(out);
        me.Save.section=true;
      });

      if(me.Bs.mode!='mobile'){http://localhost/image/cloud22.jpg
        var obj=$('#Posbar').find('li').eq(1);
        if(obj.length){
          $('#SectionNext').attr('href', obj.find('a').attr('href'));
          $('#SectionNext').attr('alt', obj.find('a').html());
          $('#SectionNext').css({opacity: 1.0});
        }else{
          $('#SectionNext').attr('href', '');
          $('#SectionNext').attr('alt', '');
          $('#SectionNext').css({opacity: 0.5});
        }

        $('#SectionPrev').attr('href', '');
        $('#SectionPrev').attr('alt', '');
        $('#SectionPrev').css({opacity: 0.5});
      }
      $('#Posbar').find('li').eq(0).attr('class', 'now');

      $("#Posbar a").click(function(){
        var x=$(this).attr('href'); if(x){me.section('goto', x);}
        return false;
      });

      $("#SectionNext, #SectionPrev").click(function(){
        var x=$(this).attr('href'); if(x){me.section('goto', x);}
        return false;
      });

      return;

     case 'position':

      if(!me.Save.section){return;}
      i=0; $('section').each(function(){
        k='#'+$(this).attr('id');
        if(k=='#top'){y=0;}else{y=$(k).position().top+$('main').position().top-me.Save.fixedTop;}
        me.Sec[k].pos=y; me.Sec[k].index=i; i++;
      });
      return;

     case 'goto':
                                      // セクションのポジショニング
      if(!me.Save.section){return;}

      if(me.Bs.mode=='mobile' && me.Bs.section.mobile=='horizontal'){
        me.Fdata.section.move=me.Sec[pos].index+1;
        me.flick(me.Fdata.section, function(data){me.section('indicator.mb', data);});
      }else{
        var tag, ix, f;
        if(navigator.userAgent.toLowerCase().indexOf('applewebkit')>0){tag='body';}else{tag='html';}
        if(pos.charAt(0)=='#'){
          me.Now=pos;
          var y;
          if(pos=='#Top'){y=0;}else{y=$(pos).position().top+$('main').position().top-me.Save.fixedTop;}
          if(direct){$(tag).scrollTop(y);}
          else{$('body').animate({"scrollTop": y}, me.Bs.scroll.animate, "swing");}
        }
      }
      return false;

     case 'indicator':
                                      // ガイド表示
      if(!me.Save.section){return;}
      var i, k, d, s, j, f, y;
      d=Math.floor($(window).height()/2);
      s='#Top'; j=0; f=true; i=0;
      for(k in me.Sec){
        $('#Posbar').find('li').eq(i).attr('class', '');
        y=$(k).position().top+$('main').position().top-me.Save.fixedTop;
        if(pos<y){f=false;} if(f){s=k; j=i;}
        i++;
      }
      $('#Posbar').find('li').eq(j).attr('class', 'now');
      
      me.Now=s;

      var nx=j+1; var pr=j-1; var obj;
        obj=$('#Posbar').find('li').eq(nx);
      if(obj.length){
        $('#SectionNext').attr('href', obj.find('a').attr('href'));
        $('#SectionNext').attr('alt', obj.find('a').html());
        $('#SectionNext').css({opacity: 1.0});
      }else{
        $('#SectionNext').attr('href', '');
        $('#SectionNext').attr('alt', '');
        $('#SectionNext').css({opacity: 0.5});
      }

      if(pr<0){
        $('#SectionPrev').attr('href', '');
        $('#SectionPrev').attr('alt', '');
        $('#SectionPrev').css({opacity: 0.5});
      }else{
        obj=$('#Posbar').find('li').eq(pr);
        $('#SectionPrev').attr('href', obj.find('a').attr('href'));
        $('#SectionPrev').attr('alt', obj.find('a').html());
        $('#SectionPrev').css({opacity: 1.0});
      }
      return;
    
     case 'indicator.mb':
      if(me.Bs.mode=='mobile'){
        var i=1; $('#Posbar').find('li').each(function(){
          if(i==pos.ix){$(this).attr('class', 'now');}else{$(this).attr('class', '');}
        i++;});
      }
      return;

    }
  },
//
// ajaxSource Ajaxによるソースのダイナミックロード
//ok
  ajaxSource: function(){
    var me=this; var m, e;
    
    $('.Load').each(function(){
      m=$(this).attr('href'); e=$(this);
      $.ajax({async: false, url: m, success: function(data){e.html(data);}});
    });

  },
//
// photoUp
//
  photoUp: function(){
    var me=this;
    var e, w, h, w, x, wn, hn, px, py, r, rh, rw, f, a;

    if(!document.getElementById('PhotoU')){x='<img id="PhotoU" src="" />'; $('body').append(x);}
    me.Fdata.photo={area: $('#PhotoU'), mode: 'move'};
    me.flick(me.Fdata.photo);
    $('#PhotoU').on('load', function(){
      rh=$(window).height()/$('#PhotoU').height(); rw=$(window).width()/$('#PhotoU').width();
      if(rh>1.1 && rw>1.1){
        py=Math.floor(($(window).height()-$('#PhotoU').height())/2);
        px=Math.floor(($(window).width()-$('#PhotoU').width())/2);
        hn=$('#PhotoU').height(); wn=$('#PhotoU').width();
      }else{
        if(rh<rw){r=rw*0.9;}else{r=rh*0.9;}
        hn=Math.floor($('#PhotoU').height()*r); wn=Math.floor($('#PhotoU').width()*r);
        py=Math.floor(($(window).height()-hn)/2);
        px=Math.floor(($(window).width()-wn)/2);
      }
      $('#PhotoU').css({
        width: wn+'px', height: hn+'px',
        position: 'fixed', top: py+'px', left: px+'px',
        'z-index': 1010
      });
    });
//
    $(".PhotoU, .photoU").on('click', function(){
      f=$(this).attr('href');
      if(!f){f=me.insert($(this).attr('src'), '_r');}
      $('#PhotoU').attr('src', f);
      $('#PhotoU').css({display: 'block'});
      me.modal('set', function(){
        $('#PhotoU').css({display: 'none'});
      });
    });
//
  },
//
// tipup ホーバーでの説明文ポップアップ
//
  tipup: function(){
    var me=this; var x, y, z, t, w;

    var elm=document.getElementById('Tipup');
    if(!elm){
      $("body").append('<div id="Tipup"> </div>');
      $("#Tipup").css({opacity:0.9, position:"fixed", display:"none", 'z-index': 1000});
    }

    $(".Tipup").on('mouseover', function(e){
      y=e.clientY-me.Bs.tipup.ydiff; x=e.clientX+me.Bs.tipup.xdiff;
      t=$(this).attr("alt"); $("#Tipup").html(t);
      w=$('#Tipup').outerWidth();
      z=e.pageX+me.Bs.tipup.xdiff+w;
      if(z>$(window).width()){x=$(window).width()-w-20;}
      $("#Tipup").css({top: y+"px", left: x+'px'});
      if(t){$("#Tipup").show();}
    });
    $(".Tipup").on('mouseout', function(){$("#Tipup").hide();  $("#Tipup").html('');});
    $(".Tipup").on('mousemove', function(e){
      y=e.clientY-me.Bs.tipup.ydiff; x=e.clientX+me.Bs.tipup.xdiff;
      t=$(this).attr("alt"); $("#Tipup").html(t);
      w=$('#Tipup').outerWidth();
      z=e.pageX+me.Bs.tipup.xdiff+w;
      if(z>$(window).width()){x=$(window).width()-w-20;} 
      $("#Tipup").css({top: y+"px", left: x+'px'});
    });
  },
//
//sns SNS編集
//
  sns: function(mode){
    var me=this;
    
    var wi=me.Bs.sns.width; var hi=me.Bs.sns.height; var op=me.Bs.sns.option;
    var f=true, t=true;
    $('.Sns').each(function(){
      if($(this).attr('alt')=='twitter'){if(t){me.twitter(); t=false;}}
      if($(this).attr('alt')=='facebook'){if(f){me.facebook(); f=false;}}
    });

    $('.Sns').on('click', function(){
      switch($(this).attr('alt')){
       case 'twitter':
        window.open(
          'https://twitter.com/intent/tweet?url='+location.href+'&text='+document.title
            +'&tw_p=tweetbutton',
          'tweet',
          'width='+wi+',height='+hi+','+op
        );
        break;
       case 'facebook':
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u='+location.href,
          'facebookいいね',
          'width='+wi+',height='+hi+','+op
        );
        break;
       case 'gplus':
        window.open(
          'https://plusone.google.com/_/+1/confirm?hl=ja&url='+location.href+'&title='
            +document.title,
          'google plus',
          'width='+wi+',height='+hi+','+op
        );
        break;
      }
      return false;
    });

  },
//
// analytics
//
  analytics: function(){
    var me=this; var a;

//    if(me.Bs.analytics.account){
    if(false){
      _gaq.push(['_setAccount', me.Bs.analytics.account], ['_setDomainName', me.Bs.domain]);
      a=[]; if(me.Bs.analytics.value){
        a[0]='_setCustomVar'; a[1]=me.Bs.analytics.index;
        a[2]=me.Bs.analytics.name; a[3]=me.Bs.analytics.value; a[4]=me.Bs.analytics.scope;
        _gaq.push(a);
      }
      a=[]; if(me.Bs.analytics.vertial){
        a[0]='_trackPageview'; //a[1]=me.Bs.analytics.vertial;
        _gaq.push(a);
      }
      _gaq.push(['_setCustomVar', 1, 'Section', 'Life & Style', 3]);
      _gaq.push(['_trackPageview']);

      window.anlyt=(function(){
        var ga=document.createElement('script'); ga.type='text/javascript'; ga.async=true;
        ga.src=('https:' == document.location.protocol ? 'https://ssl' : 'http://www')
          +'.google-analytics.com/ga.js';
        var s=document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      });
    }
  },
//
// twitter
//
  twitter: function(){
    window.twttr=(function(d,s,id){
      var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};
      if(d.getElementById(id))return;
      js=d.createElement(s); js.id=id; js.src="https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js,fjs);
      t._e=[];t.ready=function(f){t._e.push(f);};return t;
    }(document,"script","twitter-wjs"));
  },
//
// facebook
//
  facebook: function(){
    window.facebk=(function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if(d.getElementById(id)){return;}
      js=d.createElement(s); js.id=id;
      js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
//
// フリック操作
//
  flick: function(data, indicator, direct){
    var me=this;

                                                // 構造データ
    data.mode=data.mode||'page';                // 操作モード(page, hide, move)
    data.area=data.area;                        // area: 移動オブジェクト
    data.wi=data.wi||data.area.outerWidth();    // wi: 移動体幅(px)
    data.hi=data.hi||data.area.outerHeight();   // hi: 窓高(px)
    data.ix=data.ix||1;                         // ix: 表示開始頁(1~)
    data.max=data.max||0;                       // max:最大個数
    data.threshold=data.threshold||100;         // threshold: 動くかどうかの閾値(px)
    data.animate=data.animate||400;             // animate: アニメーション時間(ms)
    data.move=data.move||0;                     // move: 指定されたixに移動
    data.menu=data.menu||false;                // menu: メニュー動作(true/false)
    data.modal=data.modal||false;              // modal 消去
    data.object=data.object||data.area;
    indicator=indicator||function(){};         // インディケーター表示アクション

    if(data.mode=='hide'){data.max=2; data.ix=1;}
    if(data.mode=='hider'){data.max=2; data.ix=2;}
    $(data.area).attr('ix', data.ix);
    if(data.move>0){
      if(data.ix>data.max){return;}
      var l=(1-data.move)*data.wi;
      if(direct){data.object.css({'margin-left': l+'px'});}
      else{data.object.animate({'margin-left': l+'px'}, data.animate);}
      data.ix=data.move; data.move=0;
      indicator(data);
      return;
    }
    
    var isTouch=('ontouchstart' in window);

    data.area.on({

      'touchstart mousedown': function(e){
        if(me.Bs.mode!='mobile'){return;}

        data.flg=true;
        data.wi=data.area.outerWidth();
        data.hi=data.area.outerHeight();
        data.stx=(isTouch ? event.changedTouches[0].pageX : e.pageX);
        data.sty=(isTouch ? event.changedTouches[0].pageY : e.pageY);
        data.inx=parseInt($(data.object).css('margin-left'));
        data.iny=parseInt($(data.object).css('margin-top'));
        var a=$(data.object).attr('min'); if(a){data.maxtop=(a-0)*-1;}else{data.maxtop=0;}
        var b=$(data.object).attr('max'); if(b){data.minbot=(b-0)*-1;}else{data.minbot=0;}
      },

      'touchmove mousemove': function(e){if(data.flg){
        if(me.Bs.mode!='mobile'){return;}

        e.preventDefault();
        var nx=(isTouch ? event.changedTouches[0].pageX : e.pageX);
        var ny=(isTouch ? event.changedTouches[0].pageY : e.pageY);
        var dx, dy;
        if(data.mode=='move'){dx=nx-data.stx;}else{dx=data.wi*(data.ix-1)*-1+nx-data.stx;}
        dy=ny-data.sty;
        if(Math.abs(nx-data.stx)>Math.abs(dy)){
          if(data.mode=='move'){
            var tx=data.inx+dx;
            if(ty>data.maxtop){ty=data.maxtop;} if(ty<data.minbot){ty=data.minbot;}
            data.object.css({'margin-left': tx+'px'});
          }else{
            if(dx<0){data.object.css({'margin-left': dx+'px'});}
          }
        }else{
          var ty=data.iny+dy;
          if(ty>data.maxtop){ty=data.maxtop;} if(ty<data.minbot){ty=data.minbot;}
          $(data.object).css({'margin-top': ty+'px'});

        }
      }},

      'touchend mouseup': function(e){
        if(me.Bs.mode!='mobile'){return;}

        data.flg=false;

        if(data.mode!='move'){
          data.ix=data.area.attr('ix')-0;
          var n=(isTouch ? event.changedTouches[0].pageX : e.pageX);
          var df=n-data.stx;
          if(df<0-data.threshold){
            data.ix++; if(data.ix>data.max){data.ix=data.max;}
            if(data.modal){me.modal('clear');}
          }
          if(df>data.threshold){
            data.ix--; if(data.ix<1){data.ix=1;}
            if(data.modal){me.modal('clear');}
          }
          var d=data.wi*(data.ix-1)*-1; if(data.mode=='hider'){d=0;}
          data.object.stop();
          data.object.animate({'margin-left': d}, data.animate, function(){
            indicator(data);
          });
          data.area.attr('ix', data.ix);
        }
      }
    });

  },
//
// elevate
//
  elevate: function(html, animate){
    var me=this; var t, l; animate=animate||me.Bs.animate;

    if(!document.getElementById('Elevate')){
      $('body').append('<div id="Elevate" style="display: none;"><img id="Eclose" src="'+me.pngclose+'"/></div>');

      $('#Elevate').on('click', '#Eclose', function(){
        if($('#Elevate').attr('state')=='on'){
          t=$(window).height()+$(window).scrollTop(); $('#Elevate').stop();
          $('#Elevate').animate({top: t+'px'}, animate, function(){
            $('#Elevate').attr('state', ''); $('#Elevate').html('');
            $('#Elevate').css({display: 'none'});
          });
        }
      });
    }
    if(html==''){
      if($('#Elevate').attr('state')=='on'){
        t=$(window).height(); $('#Elevate').css({top: t+'px'});
        $('#Elevate').attr('state', ''); $('#Elevate').html('');
        $('#Elevate').css({display: 'none'});
      }
    }else{
      t=$(window).height()+$(window).scrollTop(); w=$(window).width();
      me.css($('#Elevate'), {
        position: 'absolute', top: t+'px', left: 0, outerWidth: w, 'z-index': 800,
        display: 'block'
      });
      $('#Elevate').html('<img id="Eclose" src="'+me.pngclose+'"/>'+html);
      l=$(window).width()-$('#Eclose').outerWidth();
      $('#Eclose').css({position: 'absolute', top: 0, left: l+'px', 'z-index': 810});
      t=t-$('#Elevate').outerHeight();
      $('#Elevate').stop(); $('#Elevate').animate({top: t+'px'}, animate);
      $('#Elevate').attr('state', 'on');
    }
  },
//
//modal モーダルスクリーン
//
  modal: function(mode, proc){
    var me=this; var t, l;
    
    switch(mode){
     case 'init':
      $('body').append('<div id="Modal"></div>');
      $('body').append('<img id="Mclose" src="" />');
      $("#Mclose").attr("src", me.pngclose);
      t=$(window).scrollTop(); l=$(window).width()-$('#Mclose').width();
      $('#Modal').css({
        position: 'absolute', top: 0, left: 0,
        'background-color': '#000', opacity: me.Bs.opacity, display: 'none', 'z-index': 600
      });

      $('#Mclose').css({
        position: 'absolute', top: 0, left: 0, display: 'none', 'z-index': 1020
      });
      me.Save.proc=function(){};
      $('#Modal, #Mclose').on('click', function(){
        me.Save.proc(); $('#Modal').css({display: 'none'}); $('#Mclose').css({display: 'none'});
        me.Save.proc=function(){};
      });
      break;
     case 'set':
      proc=proc||function(){};
      $('#Modal').css({
        display: 'block', width: $(document).width()+'px', height: $(document).height()+'px',
      });
      t=$(window).scrollTop(); l=$(window).width()-$('#Mclose').width();
      $('#Mclose').css({display: 'block', top: t+'px', left: l+'px'});
      me.Save.proc=proc;
      break;
     case 'paste':
      proc=proc||function(){};
      $('#Modal').css({
        display: 'block', width: $(document).width()+'px', height: $(document).height()+'px',
      });
      me.Save.proc=proc;
      break;
     case 'clear':
      $('#Modal').css({display: 'none'}); $('#Mclose').css({display: 'none'});
      me.Save.proc=function(){};
      break;
     case 'reset':
      me.Save.proc();
      $('#PhotoU').css({display: 'none'});
      $('#Modal').css({display: 'none'}); $('#Mclose').css({display: 'none'});
      me.Save.proc=function(){};
      break;
    }
  },
//
// パラメタの展開
//
  parm: function(ln, dt, ix, i, j, c, sw, out, cc, key){
    var me=this; sw=0; out=''; key=''; if(!ix){ix=0;}
    if(!ln){return '';}
    for(i=0; i<ln.length; i++){
      c=ln.substr(i, 1); cc=ln.substr(i, 2);
      switch(sw){
       case 0:
        switch(cc){
          case '?{': sw=1; i++; key='';
          default: if(cc>'?0' && cc<'?9'){sw=9;}else{out+=c;} break;
        } break;
       case 1:
        if(c=='}'){if(PARM[key]!==undefined){out+=PARM[key];} sw=0;}
        else{key+=c;} break;
      }
    }

    return out;
  },
//
// css 設定
//
  css: function(selector, para){
    if(!selector){return false;}
    var e; if(typeof(selector)=='object'){e=selector;}else{e=$(selector);} if(!e){return false;}
    var me=this, para=para||{}, v;

    if(para.outerHeight){
      v=parseInt(para.outerHeight)-parseInt(e.css('padding-top'))-parseInt(e.css('padding-bottom'));
      para.height=v+'px'; delete para['outerHeight'];
    }
    
    if(para.outerWidth){
      v=parseInt(para.outerWidth)-parseInt(e.css('padding-left'))-parseInt(e.css('padding-right'));
      para.width=v+'px'; delete para['outerWidth'];
    }

    if(para.fullHeight){
      v=parseInt(para.fullHeight)-parseInt(e.css('padding-top'))-parseInt(e.css('padding-bottom'))
      -parseInt(e.css('margin-top'))-parseInt(e.css('margin-bottom'));
      para.height=v+'px'; delete para['gullHeight'];
    }

    if(para.fullWidth){
      v=parseInt(para.fullwidth)-parseInt(e.css('padding-left'))-parseInt(e.css('padding-right'))
       -parseInt(e.css('margin-left'))-parseInt(e.css('margin-right'));
      para.height=v+'px'; delete para['fullWidth'];
    }
    if(para.saveHeight){
      v=me.Save[selector].height; para.height=v; delete para['saveHeight'];
    }

    if(para.saveWidth){
      v=me.Save[selector].width; para.width=v; delete para['saveWeight'];
    }

    if(para.saveColor){
      v=me.Save[selector].color; para.color=v; delete para['saveColor'];
    }

    if(para.saveOuterHeight){
      v=me.Save[selector].outerHeight
       -parseInt(e.css('padding-top'))-parseInt(e.css('padding-bottom'));
       para.height=v+'px'; delete para['saveOuterHeight'];
    }

    if(para.saveOuterWidth){
      v=me.Save[selector].outerWidth
       -parseInt(e.css('padding-top'))-parseInt(e.css('padding-bottom'));
       para.width=v+'px'; delete para['saveOuterWidth'];
    }

    if(para){$(selector).css(para);}
  },
//
  get: function(cmd, obj, op){
    switch(cmd){
     case 'fullHeight':
      return parseInt(obj.css('margin-top'))+parseInt(obj.css('margin-bottom'))+obj.outerHeight();
     case 'fullWidth':
      return parseInt(obj.css('margin-left'))+parseInt(obj.css('margin-right'))+obj.outerWidth();
    }
  },
//
  cut: function(x){
    var p=x.search(/px/); if(p>-1){return x.substring(0, p)-0;}else{return x-0;}
  },
//
  insert: function(txt, over){
    var sw, out, x, i; sw=0; out=''; if(!txt){return '';}
    for(i=txt.length; i>0; i--){
      x=txt.substr(i-1, 1);
      if(sw==0){if(x=='.'){out=over+'.'+out; sw=1;}else{out=x+out;}}else{out=x+out;}
    }
    return out;
  },
//
  pngclose: 'data:image/png;base64,'+ // close
       'iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAByElEQVR42t2W2YrCQBBF/RoN6JNxR'+
       'eMC7t/r9iouT4r6RTWchpI2dmcZxxmYgpAYk5zcqludKsgvRuFPYIPBQOr1uoRhaPa1Ws0cs9ffaZ'+
       'vrOp77AqtUKh9RUy6XX2G8xSfCfq4TViqVpNPpyOFwyP3wzWYj1WrVpJSgFC8w+yQggL1eT/b7fWb'+
       'Qer02L8298/ncr0zfhDidTqawCtztdqmg5XL5AI3HY7ndbtnSSJBCBfb7/UQgoEajYa5dLBZyvV6z'+
       '10wDAKAgCGQ4HDprCKjVaj1Sp4pcGUt1I8AoigwQpcfj8ckM7XbbgGazmVwul/xujAeKABaLRWMeT'+
       'LPdbo0izgGyU/cWTIHdbteo0NVBQfHUvQ0jUEQNALJRR5+it2HUSO2NKlJr19AVuQzialgcqo0PMK'+
       'nxcyvD3pq+yWQi9/vdKNK2AOjrQ+dy5YMlNawC+Y+2cAGdyuw38DWsywwAdKVhH2/8TGmkRnbDns9'+
       'nb5oBsoZiGhxqmybVIKvVSprN5gOUZm+78fXzpKZJVcb3iJum02liw8YDRepSapkJxrFrUc0SKCSV'+
       'o9HI70Z7VvjJsGebp+nKnpJ0svruplOac7r6d0PqF4sKdR93ekf9AAAAAElFTkSuQmCC',
//
  finish: function(){
  }
}
