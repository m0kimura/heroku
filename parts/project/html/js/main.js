var Main={
  Sec: {},                          // セクション管理
  Now: "top",                       // 現在セクション
  Device: "pc",                     // デバイスタイプ(pc/mobile)
  Type: "",                         // 画面幅タイプ(normal/wide)
  Fdata: {},                        // フリック用制御変数
  Class: "",                        // 設定クラスを保存
  Save: {},                         // データ保存変数
//
// 起動トリガー
//
  begin: function(op){
    var me=this; op=op||{};
    $(window).on("load", function(){

      op.header=op.header||{}; op.footer=op.footer||{}; op.body=op.body||{};
      op.scroll=op.scroll||{};
                                    // 省略時初期値
      op.animate=op.animate||700;                       // アニメーション時間
      op.header.color=op.header.color||"#ffffff";       // ガイドの色
      op.header.selcolor=op.header.selcolor||"#db07eb"; // ガイドの反転色
      op.menuWidth=op.menuWidth||200;                   // メニューエリアの幅
      op.footer.animate=op.footer.animate||op.animate;
                                    // 初期設定
      me.Now="#top";
      me.save('#navbar', ['height']);
      me.save('header #guide', ['outerHeight']);
      me.save('#menu', ['outerWidth']);
                                    // スクロールのためのダミーブロックを加える
      var b='<div id="dummy" style="display: block; width: 100%"></div>';
      $('main').append(b);
                                    // モーダル用ブロック追加
      x="<div id='modal'></div>";
      $("body").append(x); 
      $("#modal").css({
        position: "fixed", top: 0, left: 0, height: "100%", width: "100%", 
        backgroundColor: "#000000", opacity: 0.5, "z-index": 10000, display: 'none'
      });

      me.guide();
      me.ajaxSource();

      me.mainproc(op);
      me.indicatorPc(op, 0); me.indicatorMb();
      me.toolbox('init', op); me.toolbox('icon', op);
      me.posHeader(op, 0);
      me.posTrailer(op, 0);
      me.folding(op);
                                    // ウィンドリサイズ時の対応
      $(window).on('resize', function(){
        me.mainproc(op);
        me.positionning(op, me.Now, true);
        var p=$(window).scrollTop();
        me.posHeader(op, p);
        me.posTrailer(op, p);
        me.folding(op, 'change');
      });
                                    // ウィンドウスクロール時の対応
      $(window).on('scroll', function(){
        var p=$(window).scrollTop(), t;
        me.posHeader(op, p); me.posTrailer(op, p);
        if(me.Device=='pc'){
          me.indicatorPc(op, p);    // 
          me.toolbox('scroll', op);  // ツールボックス編集
          me.locateMenu(op, p);     // メニューの位置づけ
        }
      });
                                    // モーダルクリック
      $("#modal").click(function(){
        $(this).hide();
        var k=$(this).attr('cms-save');
        switch(k){
         case 'menu':
          var f=$('footer').attr('cms-save');
          $('footer').animate({'margin-left': f}, op.footer.animate);
          $('footer').attr('cms-save', '');
          break;
         case 'photoU':
          $('#photoU').css({display: 'none', opacity: 0});
          break;
        }
        $(this).attr('cms-save', '');
      });
                                    // フッタラベルクリック時の対応
      me.showFooter(op);
                                    // ガイドクリック時の画面スクロール
      $("#guide a").click(function(){
        var x=$(this).attr('href'); me.positionning(op, x);
        return false;
      });
                                    // ツールボックスクリック
      me.toolbox('click', op);
                                    // モバイル、フリックアクション
      me.flick(me.Fdata['main'], me.indicatorMb);
      me.flick(me.Fdata['footer'], function(){$('#modal').hide();});
                                    // hover でのALT表示
      me.tipup(op);
                                    // 画像の拡大表示
      me.photoUp();
    });
  },
//
// 基本処理
//
  mainproc: function(op){
    var me=this;

    me.Save.windowWidth=$('#titlebar').outerWidth();
    var wwi=me.Save.windowWidth;
                                    // 画面幅による設定
    me.Device='mobile'; me.Type='standard';
    switch(true){
      case wwi > 1150: me.Type='wide';
      case wwi > 750: me.Device='pc';
    }

                                    // フッタのクラスを設定(pc/mobile)
    if(me.Class){$('footer').removeClass(me.Class);}
    $('footer').addClass(me.Device); me.Class=me.Device;
    if(me.Device=='pc'){me.layoutPc(op);}else{me.layoutMb(op);}
    me.decorate(op);
    op=me.configure(op);

  },
//
// 個別要素の大きさを特定します。
//
  adjust: function(op){
    var me=this;
    var e, l, w, f;

    var wwi=me.Save.windowWidth;
                                    // 写真の大きさを調整する(size:300)
    $('.photoM, .photoU').each(function(){
      if(wwi<550){w='100%';}else{w=300+'px';} $(this).css({width: w+"px"});
    });

                                    // 写真の大きさを調整する(size:750)
    $(".photoL").each(function(){
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
// PCページ内の部品を配置
//
  layoutPc: function(op){
    var me=this;
    var l, l1, l2, t, h, h1, h2, b, w, w1, w2, d1, d2, n, i, s, g;
    var wwi=me.Save.windowWidth; //$(window).width();
                                    // ナビゲーションバーを配置
    me.css('#navbar', {display: 'block', saveHeight: 1, outerWidth: wwi});
                                    // ヘッダーを配置
    t=$('#navbar').outerHeight(); $('header').css({'margin-top': t+'px'});
                                    // 画像をwindow幅に合わせる
    $(".adjust").each(function(){
      if(wwi>950){
        l=Math.floor((wwi-950)/2);
        $(this).css({width: "950px", padding: '0 '+l+'px'});
      }else{
        $(this).css({width: wwi+"px", padding: 0});
      }
    });
                                    // ガイド高を調整
    if(me.Type=='wide'){
      $('header #guide').css({display: 'none'});
    }else{
      me.css('header #guide', {display: 'block'});
    }
                                    // ボディの縦位置をマージンで調整
    t=$('#navbar').outerHeight()+$('header').outerHeight();
    $('main').css({'margin-top': t+'px', 'margin-left': 0});
    me.Save.mainTop=t; me.Save.minTop=me.Save.mainTop-$('#headerimg').outerHeight();
                                    // コンテンツとメニューの横位置(left)を調整する
    if(wwi<950 || me.Type=='wide'){
      w2=me.Save['#menu'].outerWidth; w1=wwi-w2;
    }else{
        w1=950-me.Save['#menu'].outerWidth;
        w2=wwi-w1;
    }
    me.css("#content", {position: "absolute", top: 0, left: 0, outerWidth: w1});
    me.css("#menu", {display: 'block', position: "absolute", top: 0, left: w1+"px", outerWidth: w2});
                                    // セクションをスタティックに xfloat
    if(me.Type=='wide'){
                                    // セクションの横幅を調整する
      w1=$('#content').outerWidth(); d1=$('#content').outerWidth()-$('#content').width();
      n=Math.floor(w1*2/950); w1=Math.floor(w1/n); me.Save.horizon=n;
      $('section').each(function(){
        me.css($(this), {outerWidth: w1});
      });

      me.adjust(op);
                                    // 同じ行のセクションの高さを合わせる
      i=0; s=[]; h=0; $('section').each(function(){
        if(h<$(this).outerHeight()){h=$(this).outerHeight();}
        s[Math.floor(i/n)]=h+150;                     // 150pxの隙間を空ける
        i++;
        if(Math.floor(i/n)==(i/n)){h=0;}
      });
      i=0; l=0; t=0; $('section').each(function(){
        h=s[Math.floor(i/n)]-$(this).outerHeight()+$(this).height();
        $(this).css({height: h+'px', position: 'absolute', top: t+'px', left: l+'px'});
        l=l+w1;
        i++;
        if(Math.floor(i/n)==(i/n)){l=0; t=t+h;}
      });
                                    // コンテンツの高さを合計で合わせる
      h=0; for(i in s){h=h+s[i];}
      me.css('#content', {outerHeight: h});
    }else{
                                    // セクションをスタティックにし、親の幅に合わせる
      w=$('#content').width();
      $('section').each(function(){
        me.css($(this), {position: 'static', outerWidth: w});
      });

      me.adjust(op);
                                    // 1セクションの高さを表示のために確保
      t=me.cut($('main').css('margin-top'))-$('#headerimg').outerHeight();
      g=0; $('section').each(function(){
        h=$(this).outerHeight(); id=$(this).attr('id');
        t+=h;
        f=$(window).height();
        if(h<f){$(this).css({"padding-bottom": (f-h)+"px"}); t+=f-h;}
        g=g+$(this).outerHeight();
      });
      me.css('#content', {outerHeight: g});
    }
                                    // コンテンツとメニューの高さを調整
    h1=$("#menu").outerHeight(); h2=$("#content").outerHeight();
    if(h1>h2){h=h1;}else{h=h2;}
    me.css("#menu",{outerHeight: h}); me.css("#content", {outerHeight: h});
                                    // フッタの位置と高さを調整
    t=$(window).height()-$('#FTlabel').outerHeight();
    h=$('footer dl').outerHeight();
    $("footer").css({position: "fixed", top: t+'px', left: 0, height: h+'px'});
    $("footer").css({'margin-left': 0, 'margin-top': 0});
                                    // ダミー位置、高さを設定
    h=$('footer').outerHeight();
    t=$('#content').outerHeight();
    $("#dummy").css({height: h+"px", position: "absolute", top: 0, left: 0, 'margin-top': t+'px'});
    me.Save.footerTop=$('#navbar').outerHeight()+$('header').outerHeight()+$('#content').outerHeight();

  },
//
// モバイルページ内の部品を配置
//
  layoutMb: function(op){
    var me=this;
    var l1, l2, t, h1, h2, b, w, w1, w2, id;

    var wwi=me.Save.windowWidth;
                                    // ナビゲーションバーを非表示
    $('#navbar').css({display: 'none', height: 0});
                                    // ヘッダを配置
    $('header').css({'margin-top': 0});
    me.css('header #guide', {display: 'block'});
                                    // ヘッダ画像を調整
    $(".adjust").each(function(){
        $(this).css({width: wwi+"px", padding: 0});
    });
                                    // ボディの縦位置をマージンで調整
    t=$('header').outerHeight(); $('main').css({'margin-top': t+'px'});
                                    // コンテンツとメニューの横位置(left)を調整する
    $("#menu").css({display: 'none', position: "absolute", top: 0, left: "-500px", height: 0});
    w=Math.floor(wwi*0.8)-me.cut($("#menu").css('margin-left'))-me.cut($("#menu").css('margin-left'));
    $('#menu').css({width: w+'px'});
    me.css("#content", {position: "absolute", top: 0, left: 0, outerWidth: wwi});
                                    // セクションを横並びに
    w=$('#content').outerWidth();
    l=0; h=0; i=0; $('section').each(function(){
      me.css($(this), {position: 'absolute', left: l+'px', outerWidth: w, 'margin-top': 0});
      l=l+me.Save.windowWidth;
      if(h<$(this).outerHeight()){h=$(this).outerHeight();}
    });

    me.adjust(op);
    
    $('#content').css({height: h+'px'});
                                    // フッタ(スライドメニュー)位置を設定
    w=Math.floor($(window).outerWidth()*0.8); l=0-w; h=$(window).height();
    $("footer").css({position: "fixed", top: 0, left: 0, height: h+'px', width: w+'px'});
    $("footer").css({'margin-left': l+'px'});
                                    // ダミー位置、高さを設定
    $("#dummy").css({height: 0, position: "absolute", top: 0});

  },
//
//装飾
//
  decorate: function(op){
    var me=this;
                                    // タイトルアイコンを設定
    if(me.Device=='pc'){
      $('#titleimg').attr('src', '/image/title.png');
      t=$('#navbar').outerHeight()+$('#headerimg').outerHeight();
      $('#titleimg').css({'margin-top': t+'px'});
    }else{
      $('#titleimg').attr('src', '/image/menu.png');
      t=$('#headerimg').outerHeight(); $('#titleimg').css({'margin-top': t+'px'});
    }
                                    // ガイドの初期反転を設定する
    $('header').find('li').eq(0).attr('class', 'now');
                                    // アンカータグの非表示
    $('a').each(function(){
      var h=$(this).attr('href');
      if(h==""){$(this).css({opacity: 0.3});}
    });

    $('.photoU').each(function(){

    });

  },
//
// 諸設定
//
  configure: function(op){
    var me=this; var h, i, k, y;
                                    // セクションの位置を記録
    i=0; $('section').each(function(){
      k='#'+$(this).attr('id');
      if(k=='#top'){y=0;}else{y=$(k).position().top+$('#headerimg').outerHeight();}
      me.Sec[k].pos=y; me.Sec[k].index=i; i++;
    });

    if(me.Device=='pc'){
    }else{
                                    // フリック用データ設定(footer)
      me.Fdata['footer']={area: 'footer', threshold: 70, menu: true, wi: $('footer').outerWidth()};
                                    // フリック用データ設定(main)
      h=$(window).height()-$('header').outerHeight();
      me.Fdata['main']={
        area: 'main', max: $('section').length, wi: me.Save.windowWidth, hi: h,
        color: op.header.color, selcolor: op.header.selcolor
      };

      data=me.Fdata['main'];
      var h; $(data.area).find('section').each(function(){
        h=parseInt($(this).css('margin-top')); $(this).attr('cms-max', h);
        if(data.hi>$(this).outerHeight()){h=0;}else{h=h-($(this).outerHeight()-data.hi);}
        $(this).attr('cms-min', h);
      });
    }
    
  },
//
// セクションガイドの生成
//
  guide: function(){
    var me=this;
    var id, p, t, out='<ul>';

    $('section').each(function(){
      id='#'+$(this).attr('id'); t=$(this).find('h2').html();
      if(t){
        p=t.search(/\//); if(p>0){t=t.substr(0, p);}
        out+='<li><a href="'+id+'">'+t+'</a></li>';
      if(!me.Sec[id]){me.Sec[id]={};} me.Sec[id].title=t;
      }else{
        console.log('<h2>tag not found');
        if(!me.Sec[id]){me.Sec[id]={};} me.Sec[id].title="Not Found";
      }
    });
    out+='</ul>';
    $('#guide').html(out);
    return out;
  },
//
//ツールボックス編集
//
  toolbox: function(cmd, op, href){
    var me=this;   

    switch(cmd){
//
     case "icon":
      $('.sns').each(function(){
        switch($(this).attr('href')){
         case '#twitter':
          $(this).html('<img class="tip" src="/image/twitter.png" alt="tweetしましょう" />'); break;
         case '#facebook':
          $(this).html('<img class="tip" src="/image/facebook.png" alt="facebook いいね！" />'); break;
         case '#gplus':
          $(this).html('<img class="tip" src="/image/gplus.png" alt="google plus +1" />'); break;
        }
      });
      break;
//
     case 'click':
      $(".toolbox a").click(function(){
        var x=$(this).attr('href');
        if($(this).attr('class')=='sns'){
          switch(x){
           case '#twitter': 
            window.open(
              'https://twitter.com/intent/tweet?url='+location.href+'&text='+document.title
                +'&tw_p=tweetbutton',
              'tweet',
              'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1'
            );
            break;
           case '#facebook':
            window.open(
//              'http://www.facebook.com/plugins/like.php?href='+location.href,
              'https://www.facebook.com/sharer/sharer.php?u='+location.href,
              'facebookいいね',
              'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1'
            );
            break;
           case '#gplus':
            window.open(
              'https://plusone.google.com/_/+1/confirm?hl=ja&url='+location.href+'&title='
                +document.title,
              '_blank',
              'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1'
            );
            break;
          }
          return false;
        }

        if(x.charAt(0)=='#'){me.positionning(op, x); return false;}
        if(!x){return false;}
      });
      break;
//
     default:
      var href={}, title={}, f, k, h, n, nx, bf;
      href.prevs=''; href.nexts=''; n=0; nx='#top'; bf='#top';
      f=false; for(k in me.Sec){
        if(me.Type=='wide'){
          if(n==0){nx=k;} if(n==me.Save.horizon-1){bf=k;}
          if(f && href.nexts==""){href.nexts=nx; title.nexts='次項:'+me.Sec[nx].title;}
          if(k==me.Now){f=true;}
          if(!f){href.prevs=bf; title.prevs='前項:'+me.Sec[bf].title;}
          n++; if(n==me.Save.horizon){n=0;}
        }else{
          if(f && href.nexts==""){href.nexts=k; title.nexts='次項:'+me.Sec[k].title;}
          if(k==me.Now){f=true;}
          if(!f){href.prevs=k; title.prevs='前項:'+me.Sec[k].title;}
        }
      }
                                    // fillクラスを置き換え
      $('.fill').each(function(){
        k=$(this).attr('cms-save'); if(!k){k=$(this).attr('href'); $(this).attr('cms-save', k);}
        h=href[k];
        if(h){
          $(this).attr('href', h); $(this).children('img').attr('alt', title[k]);
          $(this).css({opacity: 1.0});
        }else{
          $(this).attr('href', ''); $(this).children('img').attr('alt', '');
          $(this).css({opacity: 0.3});
        }
      });
    }

  },
//
// ヘッダの位置調整
//
  posHeader: function(op, pos){
    var me=this;
    var t, m;

    var span=$('#headerimg').outerHeight();
    var top=$('#navbar').outerHeight();
    if(pos>span){t=pos-span+top; m=pos+top;}else{t=top; m=top+span;}
    $("header").css({'margin-top': t+"px"}); $('#titleimg').css({'margin-top': m+'px'});

  },
//
// フッタの位置調整
//
  posTrailer: function(op, pos){
    var me=this;

    if(me.Device=='pc'){
      var t, w={};

      w.ypos=pos+$(window).height();
      w.limit=me.Save.footerTop+$('#FTlabel').outerHeight();
      w.usual=$(window).height()-$('#FTlabel').outerHeight();
      if(w.limit<w.ypos){t=w.usual-(w.ypos-w.limit);}else{t=w.usual;}

      $('footer').css({top: t+'px', width: '100%'});
      me.Save.footerKeep=t;
    }

  },
//
// セクションのポジショニング
//
  positionning: function(op, x, direct){
    var me=this; var tag, ix, f;
    if(navigator.userAgent.toLowerCase().indexOf('applewebkit')>0){tag='body';}else{tag='html';}

    if(x.charAt(0)=='#'){
      if(me.Device=='pc'){
        op.scroll.animate=op.scroll.animate||op.animate;
        me.Now=x;
        var y; if(x=='#top'){y=0;}else{y=$(x).position().top+$('#headerimg').outerHeight();}
        if(direct){$(tag).scrollTop(y);}
        else{$(tag).animate({"scrollTop":y}, op.scroll.animate, "swing");}
      }else{
        op.scroll.animate=op.scroll.animate||op.animate;
        if(direct){$(tag).scrollTop(0);}
        me.Now=x;
        var i=1, k; for(k in me.Sec){
          if(k==me.Now){me.Fdata.main.move=i; me.flick(me.Fdata.main, me.indicatorMb, direct);}
          i++;
        }
      }
      return false;
    }

  },
//
// メニューを位置づけ
//
  locateMenu: function(op, pos){
    var me=this;
    var d, k, l, p, s='top';
    
    d=Math.floor($(window).height()/2);
    for(k in me.Sec){if(pos+d<me.Sec[k].pos){break;} s=k;}
    if(s=='#top'){p=0;}else{p=me.Sec[s].pos-$('#headerimg').outerHeight();}
    $('#menu').find('ul').eq(0).css({'margin-top': p+'px'});

  },
//
// フッタ表示・非表示
//
  showFooter: function(op){
    var me=this;
    var f, t;
    
    $("#FTlabel").find('span').eq(0).click(function(){if(me.Device=='pc'){
      f=$(this).attr("cms-save");
      if(f!='y'){
        t=$("footer").position().top;
        t=$(window).height()-$('footer').outerHeight();
        $("footer").animate({top: t+"px"}, op.footer.animate);
        $(this).attr("cms-save", 'y');
       }else{
         t=me.Save.footerKeep;
        $("footer").animate({top: t+"px"}, op.footer.animate);
         $(this).attr("cms-save", "n");
      }
    }});

    $('#titleimg').click(function(){if(me.Device=='mobile'){
      $('#modal').show(); $('#modal').attr('cms-save', 'menu');

      var l=$('footer').css('margin-left');
      var f=$('footer').attr('cms-save');
      if(l=='0px'){
        $('footer').animate({'margin-left': f}, op.footer.animate);
        $('footer').attr('cms-save', '');
      }else{
        $('footer').attr('cms-save', $('footer').css('margin-left'));
        $('footer').animate({'margin-left': 0}, op.footer.animate);
      }
    }});

  },
//
// folding メニュー折りたたみ
//
  folding: function(op, mode){
    var me=this; var h, f;

    if(me.Device=='mobile'){
      $('.FTunit').each(function(){
        f=true; $(this).find('a').each(function(){
          if($(this).attr('class')=='now'){f=false;}
        });
        if(f){
          $(this).find('dt').css({'background-image': 'url(/image/bg_close.png)'});
          $(this).find('dd').css({display: 'none'});
        }else{
          $(this).find('dt').css({'background-image': 'url(/image/bg_open.png)'});
        }
      });
    }else{
      $('.FTunit').each(function(){
        $(this).find('dt').css({'background-image': 'url(/image/bg_none.png)'});
        $(this).find('dd').css({display: 'block'});}
      );
    }
    
    if(mode=='change'){return;}

    $('.FTunit').click(function(){if(me.Device=='mobile'){
      $('.FTunit').each(function(){
        $(this).find('dt').css({'background-image': 'url(/image/bg_close.png)'});
        $(this).find('dd').css({display: 'none'});
      });
      $(this).find('dd').css({display: 'block'});
      $(this).find('dt').css({'background-image': 'url(/image/bg_open.png)'});
    }});
  },
//
// フリック操作
//
  flick: function(data, indicator, direct){
    var me=this;
    if(me.Device=='pc'){return;}
                                    // 構造データ
    data.area=data.area||'#fzone';              // area: 移動オブジェクト
    data.wi=data.wi||300;                       // wi: 移動体幅(px)
    data.hi=data.hi||500;                       // hi: 窓高(px)
    data.ix=data.ix||1;                         // ix: 表示開始頁(1~)
    data.max=data.max||2;                       // max:最大個数
    data.threshold=data.threshold||100;         // threshold: 動くかどうかの閾値(px)
    data.animate=data.animate||400;             // animate: アニメーション時間(ms)
    data.menu||false;                          // menu: メニュー動作(true/false)
    data.move||0;                               // move: 指定されたixに移動

    indicator=indicator||function(){};         // インディケーター表示アクション

    if(data.move>0){
      if(data.ix>data.max){return;}
      var l=(1-data.move)*data.wi;
      if(direct){$(data.area).css({'margin-left': l+'px'});}
      else{$(data.area).animate({'margin-left': l+'px'}, data.animate);}
      data.ix=data.move; data.move=0;
      indicator(data);
      return;
    }
    
    var isTouch=('ontouchstart' in window);

    $(data.area).bind({

      'touchstart mousedown': function(e){
        data.flg=true;
        data.stx=(isTouch ? event.changedTouches[0].pageX : e.pageX);
        data.sty=(isTouch ? event.changedTouches[0].pageY : e.pageY);
        data.object=$(data.area).find('section').eq(data.ix-1);
        data.iny=parseInt($(data.object).css('margin-top'));
        data.maxtop=$(data.object).attr('cms-max')-0;
        data.minbot=$(data.object).attr('cms-min')-0;
      },

      'touchmove mousemove': function(e){if(data.flg){
        e.preventDefault();
        var nx=(isTouch ? event.changedTouches[0].pageX : e.pageX);
        var ny=(isTouch ? event.changedTouches[0].pageY : e.pageY);
        var dx=data.wi*(data.ix-1)*-1+nx-data.stx;
        var dy=ny-data.sty;
        if(Math.abs(nx-data.stx)>Math.abs(dy)){
          if(dx<0){$(data.area).css({'margin-left': dx+'px'});}
        }else{
          var ty=data.iny+dy;
          if(ty>data.maxtop){ty=data.maxtop;} if(ty<data.minbot){ty=data.minbot;}
          $(data.object).css({'margin-top': ty+'px'});

        }
      }},

      'touchend mouseup': function(e){
        data.flg=false;
        var n=(isTouch ? event.changedTouches[0].pageX : e.pageX);
        var df=n-data.stx;
        if(df<0-data.threshold){
          data.ix++; if(data.ix>data.max){data.ix=data.max;}
        }
        if(df>data.threshold){
          data.ix--; if(data.ix<1){data.ix=1;}
        }
        var d=data.wi*(data.ix-1)*-1;
        $(data.area).animate({'margin-left': d}, data.animate); indicator(data);

        if(data.menu){data.ix=1;}
      }
    });

  },
//
// ポジションインディケータ(guide for PC)
//
  indicatorPc: function(op, pos){
    var me=this;
    if(me.Device=='pc'){
      var i, k, d, s, j, f;

      d=Math.floor($(window).height()/2);
      s='#top'; j=0; f=true; i=0;
      for(k in me.Sec){
        $('header').find('li').eq(i).attr('class', '');
        if(pos+d<me.Sec[k].pos){f=false;} if(f){s=k; j=i;}
        i++;
      }
      $('header').find('li').eq(j).attr('class', 'now');
      me.Now=s;
    }
  },
//
// フリック時のインジケータ反転(guide for Mobile)
//
  indicatorMb: function(data){
    var me=Main;
    if(!data){$('header #guide li').eq(0).attr('class', 'now'); return;}
    if(me.Device=='mobile'){
      var i=1; $('header #guide li').each(function(){
        if(i==data.ix){
          $(this).attr('class', 'now');
        }else{
          $(this).attr('class', '');
        }
        i++;
      });
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
// tipup ホーバーでの説明文ポップアップ
//
  tipup: function(){
    var x, y, t, w;
    var elm=document.getElementById('Q1tarea');
    if(!elm){
      $("body").append('<div id="Q1tarea"></div>');
      $("#Q1tarea").css({opacity:0.9, position:"fixed", display:"none"});
    }
    $(".tip").mouseover(function(e){
      y=$('#FTlabel').outerHeight()+10;
      $("#Q1tarea").css({bottom: y+"px", left: 0});
      t=$(this).attr("alt"); $("#Q1tarea").html(t);
      w=$('#Q1tarea').outerWidth();
      x=Math.floor(e.pageX-10-w/2); if(x<0){x=10;} if(x>$(window).width()){x=$(window).width()-x-10;} 
      $("#Q1tarea").css({left: x+"px"});
      if(t){$("#Q1tarea").show();}
    });
    $(".tip").mouseout(function(){$("#Q1tarea").hide();  $("#Q1tarea").html('');});
  },
//
// ajaxSource Ajaxによるソースのダイナミックロード
//
  ajaxSource: function(){
    var me=this; var m, e;
    
    $('.load').each(function(){
      m=$(this).attr('href'); e=$(this);
      $.ajax({async: false, url: m, success: function(data){
        e.html(data);
      }});
    });

  },
//
// photoUp
//
  photoUp: function(){
    var me=this;
    var e, w, h, w, x, wn, hn, px, py, r, rh, rw, f, a;

    x='<img id="photoU" src="" />';
    $('body').append(x);
//
    $('#photoU').click(function(){
        $('#modal').hide(); $('#photoU').css({display: 'none', opacity: 0});
        $('#modal').attr('cms-save', '');
    });
//
    $('#photoU').on('load', function(){
      rh=$(window).height()/$('#photoU').height(); rw=$(window).width()/$('#photoU').width();
      if(rh>1.1 && rw>1.1){
        py=Math.floor(($(window).height()-$('#photoU').height())/2);
        px=Math.floor(($(window).width()-$('#photoU').width())/2);
        hn=$('#photoU').height(); wn=$('#photoU').width();
      }else{
        if(rh<rw){r=rw*0.9;}else{r=rh*0.9;}
        hn=Math.floor($('#photoU').height()*r); wn=Math.floor($('#photoU').width()*r);
        py=Math.floor(($(window).height()-hn)/2);
        px=Math.floor(($(window).width()-wn)/2);
      }
      $('#photoU').css({
        width: wn+'px', height: hn+'px',
        position: 'fixed', top: py+'px', left: px+'px',
        'z-index': 10001, opacity: 0
      });
      $('#photoU').animate({opacity: 1}, 1000);
    });
//
    $(".photoU").click(function(){
      f=$(this).attr('href');
      if(!f){a=$(this).attr('src').split('.'); f=a[0]+'b.'+a[1];}
      $('#photoU').attr('src', f);
      $('#photoU').css({display: 'block'}); $('#photoU').animate({opacity: 1.0});
      $('#modal').show(); $('#modal').attr('cms-save', 'photoU');
    });
//
  },
//
//
//
  css: function(selector, para){
    if(!selector){return false;}
    var e; if(typeof(selector)=='object'){e=selector;}else{e=$(selector);} if(!e){return false;}
    var me=this, para=para||{}, v;

    if(para.outerHeight){
      v=para.outerHeight-parseInt(e.css('padding-top'))-parseInt(e.css('padding-bottom'));
       para.height=v+'px'; delete para['outerHeight'];
    }
    
    if(para.outerWidth){
      v=para.outerWidth-parseInt(e.css('padding-left'))-parseInt(e.css('padding-right'));
       para.width=v+'px'; delete para['outerWidth'];
    }

    if(para.fullHeight){
      v=para.fullHeight-parseInt(e.css('padding-top'))-parseInt(e.css('padding-bottom'))
       -parseInt(e.css('margin-top'))-parseInt(e.css('margin-bottom'));
      para.height=v+'px'; delete para['gullHeight'];
    }

    if(para.fullWidth){
      v=para.fullwidth-parseInt(e.css('padding-left'))-parseInt(e.css('padding-right'))
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
  save: function(selector, para){
    var me=this; var i, e=$(selector); if(!e){return false;}
    me.Save[selector]=me.Save[selector]||{};
    for(i in para){
      switch(para[i]){
        case 'outerHeight': me.Save[selector][para[i]]=e.outerHeight(); break;
        case 'outerWidth': me.Save[selector][para[i]]=e.outerWidth(); break;
        default: me.Save[selector][para[i]]=e.css(para[i]);
      }
    }
  },
//
  cut: function(x){
    var p=x.search(/px/); if(p>-1){return x.substring(0, p)-0;}else{return x-0;}
  },
//
  finish: function(){}
};

