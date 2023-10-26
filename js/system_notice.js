// A_0501 start
var $videoScreen = $('#my-video');
// 倍速の設定
var $speedOptions = $('#dropdown-item');
$speedOptions.each(function (index, option) {
    option.addEventListener('click', function () {
        const speed = parseFloat(option.getAttribute('data-speed'));
        $videoScreen.prop('playbackRate', speed);
    });
});
// リスニングデバイスの幅
window.addEventListener("resize", function () {
    var windowWidth = window.innerWidth;
    var thresholdWidth = 960;
    if (windowWidth < thresholdWidth) {
        $videoScreen.attr("controls", true);
    } else {
        $videoScreen.removeAttr("controls");
    }
});
// 時間フォーマットの変換
function format(seconds) {
    seconds = seconds.toString()
    seconds = seconds.substr(0, seconds.lastIndexOf('.'));
    let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
    seconds -= 3600 * hour;
    let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
    seconds -= 60 * min;
    let sec = seconds >= 10 ? seconds : '0' + seconds;
    return hour + ':' + min + ':' + sec;
}
// dialog自動ポップアップ
$(document).ready(function () {
    $('#exampleModal').modal('show');
    var windowWidth = window.innerWidth;
    var thresholdWidth = 960;
    if (windowWidth < thresholdWidth) {
        $videoScreen.attr("controls", true);
    } else {
        $videoScreen.removeAttr("controls");
    }

});
// フルスクリーン
function fullScreen() {
    vdo.requestFullscreen();
}
// ボタンのポップアップ
const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
// ビデオdomの作成
var vdo = document.getElementById("my-video");
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
$("#liveToastBtn").click(function () {
    toastBootstrap.show();
});
// ビデオの進行状況の調整
$('#seek-bar').on('input', function () {
    const time = vdo.duration * (seekBar.value / 100);
    vdo.currentTime = time;
});
$('#my-video').on('timeupdate', function () {
    const value = (vdo.currentTime / vdo.duration) * 100;
    seekBar.value = value;
    var $startTime = $('.video_controls_starttime');
    var $endTime = $('.video_controls_endtime');
    $startTime.text(format(vdo.currentTime));
    $endTime.text(format(vdo.duration))
});
// サウンドの調整
$('#volume-bar').on('input', function () {
    vdo.volume = volumeBar.value;
});
//開始と一時停止
function sta() {
    if (vdo.paused) {
        vdo.play();
        $('.video_controls_start').attr("class", "video_controls_pause");

    } else {
        vdo.pause();
        $('.video_controls_pause').attr("class", "video_controls_start");
    }
}
// ミュート
function ste() {
    if (vdo.muted == true) {//もしミュートされていなければ

    } else {             //音がしない
        vdo.muted = true;
    }
}
// 最後のビデオ
function previousVideo() {
    var sources = vdo.getElementsByTagName("source");
    for (var i = 0; i < sources.length; i++) {
        var sourceSrc = sources[i].getAttribute("src");
        sources[i].src = "./asset/sea.mp4"
        vdo.load();
    }
}
// 次のビデオ
function nextVideo() {
    var sources = vdo.getElementsByTagName("source");
    for (var i = 0; i < sources.length; i++) {
        var sourceSrc = sources[i].getAttribute("src");
        sources[i].src = "./asset/test.mp4"
        vdo.load();
    }
}
// A_0501 end


$(function () {

    //E_0101
    $('.btn_group0').on('click', function () {
        if ($(this).hasClass('btn_group_active')) {
            $(this).removeClass('btn_group_active')
        } else {
            $('.btn_group0').removeClass('btn_group_active')
            $(this).addClass('btn_group_active')
        }
    });
    $('.btn_group1').on('click', function () {
        if ($(this).hasClass('btn_group_active')) {
            $(this).removeClass('btn_group_active')
        } else {
            $('.btn_group1').removeClass('btn_group_active')
            $(this).addClass('btn_group_active')
        }
    });
    $('.btn_group2').on('click', function () {
        if ($(this).hasClass('btn_group_active')) {
            $(this).removeClass('btn_group_active')
        } else {
            $('.btn_group2').removeClass('btn_group_active')
            $(this).addClass('btn_group_active')
        }
    });
    $('.item_labels_submit').on('click', function () {
        $("#active_item_labels").empty();
        var activeDom = $('.group_active_find').find(".btn_group_active");
        activeDom.each(function () {
            var text = $(this).text();
            var htmlString = `<button type="button" class="btn btn_group_active btn_group_margin">`
                +
                text
                +
                `<i class="bi bi-x-lg margin_left--2 item_labels_cancel"></i> 
                </button>`
            $("#active_item_labels").append(htmlString);
        });
    });
    $("#active_item_labels").on("click", ".item_labels_cancel", function () {
        $(this).parent().css("display", "none");

    });

    // 共通機能
    document.querySelectorAll(".dropdown-menu-secondary").forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    })
    
    // E_0201
    $('#tutorialHome').on('shown.bs.modal', function () {
        $.getJSON('/asset/json/tutorial1.json', function(data) {
            var $carouselInner = $('#carousel-inner');
            $carouselInner.empty();
            $.each(data, function(index, value) {
                var carouselItem = $('<div class="carousel-item">');
                    if (index === 0) {
                      carouselItem.addClass('active'); // 第一项设置为 active
                      $('#inner_text_title').text(value.title);
                        $('#inner_text_content').text(value.content);
                    }
                    var img = $('<img>').attr('src', value.imgurl).attr('alt', "");
                    var caption = $('<div class="carousel-caption">').text("");
                    carouselItem.append(img);
                    carouselItem.append(caption);
                        console.log(carouselItem);
                    $carouselInner.append(carouselItem);
                  });
            })
          
          .fail(function(jqxhr, textStatus, error) {
            console.log("An error occurred: " + error);
          });
    })
    $('#tutorialHome').on('hidden.bs.modal', function () {
        $('#carouselExampleCaptions').carousel(0);
      })
    $('#carouselExampleCaptions').on('slide.bs.carousel', function(event) {
      var currentIndex = event.to;
      $.getJSON('/asset/json/tutorial1.json', function(data) {
        $.each(data, function(index, value) {
            if(index === currentIndex) {
                $('#inner_text_title').text(value.title);
                $('#inner_text_content').text(value.content);
            }
        })
    });
      if(currentIndex == 0) {
        $('#carouselBack').css('display','none');
        $('#carouselNext').css('display','inline-block');
        $('#carouselEnter').css('display','none');
      }else if (currentIndex == 3){
        $('#carouselBack').css('display','none');
        $('#carouselNext').css('display','none');
        $('#carouselEnter').css('display','inline-block');
      }else {
        $('#carouselBack').css('display','inline-block');
        $('#carouselNext').css('display','inline-block');
        $('#carouselEnter').css('display','none');
      }
    });

    // E_0205
    $('#tutorialReport').on('shown.bs.modal', function () {
        $.getJSON('/asset/json/tutorial2.json', function(data) {
            var $carouselInner = $('#carousel-inner1');
            $carouselInner.empty();
            $.each(data, function(index, value) {
                var carouselItem = $('<div class="carousel-item">');
                    if (index === 0) {
                      carouselItem.addClass('active'); // 第一项设置为 active
                      $('#inner_text_title1').text(value.title);
                        $('#inner_text_content1').text(value.content);
                    }
                    var img = $('<img>').attr('src', value.imgurl).attr('alt', "");
                    var caption = $('<div class="carousel-caption">').text("");
                    carouselItem.append(img);
                    carouselItem.append(caption);
                        console.log(carouselItem);
                    $carouselInner.append(carouselItem);
                  });
            })
          
          .fail(function(jqxhr, textStatus, error) {
            console.log("An error occurred: " + error);
          });
    })
    $('#tutorialReport').on('hidden.bs.modal', function () {
        $('#carouselExampleCaptions1').carousel(0);
      })
    $('#carouselExampleCaptions1').on('slide.bs.carousel', function(event) {
      var currentIndex = event.to;
      $.getJSON('/asset/json/tutorial2.json', function(data) {
        $.each(data, function(index, value) {
            if(index === currentIndex) {
                $('#inner_text_title1').text(value.title);
                $('#inner_text_content1').text(value.content);
            }
        })
    });
      if(currentIndex == 0) {
        $('#carouselBack1').css('display','none');
        $('#carouselNext1').css('display','inline-block');
        $('#carouselEnter1').css('display','none');
      }else if (currentIndex == 3){
        $('#carouselBack1').css('display','none');
        $('#carouselNext1').css('display','none');
        $('#carouselEnter1').css('display','inline-block');
      }else {
        $('#carouselBack1').css('display','inline-block');
        $('#carouselNext1').css('display','inline-block');
        $('#carouselEnter1').css('display','none');
      }
    });

})

// A0001 A0301
var systemNotice = {
    init: function () {
        _system_this = this;
        _system_this.systemNoticeScroll();
        _system_this.systemNoticeItemScroll();
        _system_this.formCheck();
    },
    formCheck: function () { //A_0301
        $('.form-check-input').change(function () {
            if ($(this).is(':checked')) {
                $("#agree-button").prop("disabled", false);
            }
            else {
                $("#agree-button").prop("disabled", true);
            }
        });
    },
    systemNoticeScroll: function () {  // A_0001ログインボタンのスクロール
        $(window).scroll(function () {
            var windowHeight = $(window).height();//897
            var documentHeight = $(document).height();//1784
            var scrollPosition = $(window).scrollTop();
            let height = documentHeight - scrollPosition
            if (height < windowHeight + 100) {
                $(".footer_login_button").removeClass("footer--opacity");
            } else {
                $(".footer_login_button").addClass("footer--opacity");
            }
        });
    },
    systemNoticeItemScroll: function () { // A_0001タッチしてスクロールする
        $(".system_notice_items").click(function (event) {
            event.preventDefault();
            var targetId = $(this).children().attr("href");
            $("html").animate(
                {
                    scrollTop: $(targetId).offset().top
                },
                {
                    duration: 400,
                    easing: 'linear'
                }
            );
        });
    },
}


var homepage = {
    init: function () {
        _this = this;

        $(window).on('load', function () {
            console.log("load");
            _this.updateDivHeight();
        });

        $(window).on('resize', function () {
            console.log("resize");
            _this.updateDivHeight();
        });
        _this.updateDivHeight();
        // ウィンドウ サイズ変更イベントをリッスンする
        $('#qa_tab_select').on('shown.bs.tab', function (e) {
            _this.updateDivHeight();
        })
        $('#profile-tab').on('shown.bs.tab', function (e) {
            _this.updateDivHeight();
        })
        $('#my_study').on('shown.bs.tab', function (e) {
            _this.updateDivHeight();
        })
        $('#Ngaku_Class_Announce').on('click', function () {
            $('#right_page').hide();
            $('.nav_ngaku_announce').show();
            $('#right_page_ngaku_class_announce').show();
            $('#ngaku_navi_home_room_tab').removeClass('active')
            _this.updateDivHeight();

        })
        $('#Ngaku_Voice').on('click', function () {
            $('#right_page').hide();
            $('.nav_ngaku_voice').show();
            $('#right_page_ngakuvoice').show();
            $('#ngaku_navi_home_room_tab').removeClass('active')
            _this.updateDivHeight();

        })
        $('#Class_Voice').on('click', function () {
            $('#right_page').hide();
            $('.nav_class_voice').show();
            $('#right_page_classvoice').show();
            $('#ngaku_navi_home_room_tab').removeClass('active')
            _this.updateDivHeight();
        })
        // left
        $('#ngaku_navi_home_room_tab').on('shown.bs.tab', function () {
            $('#right_page').show();
            $('.nav_ngaku_announce').hide();
            $('.nav_ngaku_voice').hide();
            $('.nav_class_voice').hide();
            $('#right_page_ngaku_class_announce').hide();
            $('#right_page_ngakuvoice').hide();
            $('#right_page_classvoice').hide();
            _this.updateDivHeight();
        })
        $('#ngaku_navi_my_study_tab').on('shown.bs.tab', function () {
            $('#right_page').show();
            $('#right_page_ngaku_class_announce').hide();
            $('#right_page_ngakuvoice').hide();
            $('#right_page_classvoice').hide();
            _this.updateDivHeight();
        })
        $('.toHomePage').on('click', function () {
            $('#right_page').show();
            _this.updateDivHeight();
        })

        _this.smartShowFilter()
        _this.smartHeader()
        _this.addHtml()




        // $("#ngaku_subject_status_tab").on('click', function (e) { alert(1) })
        // $("#ngaku_schooling_status_tab").on('click', function (e) { alert(2) })
        // $("#ngaku_my_qna_tab").on('click', function (e) { alert(3) })
    },
    smartHeader: function () {//B_0101 Nav-Tab
        $('#ngaku_page_smart_header li a').on('shown.bs.tab', function (e) {
            const target = $(e.target).attr('data-bs-target');
            $('#ngaku_header_lower a[data-bs-target="' + target + '"]').tab('show');
        });

        $('#ngaku_header_lower a').on('shown.bs.tab', function (e) {
            const target = $(e.target).attr('data-bs-target');
            $('#ngaku_page_smart_header li a[data-bs-target="' + target + '"]').tab('show');
        });
    },
    smartShowFilter: function () {// SP0801 0901「ファイルオプションを表示」をクリックします
        $(".show_filter").click(function () {
            $(".ngakuannounce_and_classannounce_radio_group ").show();
        });
        $(".hide_filter").click(function () {
            $(".ngakuannounce_and_classannounce_radio_group ").hide();
        });
        $("#Show_filter_results").click(function () {
            $(".ngakuannounce_and_classannounce_radio_group ").hide();
        });
    },
    addHtml: function () { //リストの生成に使用されます、実装後削除う
        var html = '<div class="d-flex flex_column system_notice_list">' +
            '<div class="order--1 white_space--nowrap">' +
            '<span class="margin_right--3">2023.12.12</span>' +
            '<span class="badge  home_system_notice_badge system_notice_badge--8B84A0">N学</span>' +
            '</div>' +
            ' <div class="me-auto order--2">' +
            '<a href="#" class="w-100 link--unstyled one-line-truncate">文化祭の催しについて</a>' +
            '</div>' +
            '<div class="home_system_notice_survey order--3">アンケートあり</div></div>';
        for (let index = 0; index < 6; index++) {
            $('.ngakuannounce_and_classannounce_container_list').append(html)
        }

        var html2 = '<div class="ngaku_my_qa_content ngaku_parts_contents " >' +
            '<input type="hidden" class="query_kamoku_video_id" value="6163">' +
            '<div>質問' +
            '<span class="top-0 start-100 badge rounded-pill bg-danger margin_left--1">' +
            '未読' +
            '<span class="visually-hidden">unread messages</span>' +
            '</span>' +
            '</div>' +
            '<div class="d-flex padding_top_bottom--4">' +
            '<div class="margin_right--3">言語文化五六七八九〇一二三四五 第1回 分かりやすさの秘訣とは？三四五六七八九〇</div>' +
            '</div>' +
            '<div class="d-flex padding_top--4 font_size--3">再生位置：3分24秒</div>' +
            '<div class="d-flex padding_top--4">' +
            '<div class="three-line-truncate ngaku_my_qa_content_text">ここここここここここここここここここここここここここここここここここちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されますこちらに質問が表示されます</div>' +
            '</div>' +
            '<div class="d-flex padding_top--4 font_size--3">' +
            '<div class="margin_right--3">2000.00.00</div>' +
            '<div>投稿者：名前</div>' +
            '</div>' +
            '<div class="d-flex padding_top_bottom--4 font_size--3">' +
            '<div class="margin_right--3">回答数：1件</div>' +
            '<div>返信数：2件</div>' +
            '</div>' +
            '<div class="d-flex justify_content-end">' +
            '<a href="javascript:void(0)" class="link--unstyled ">ビデオ教材の質問を開く<i class="bi bi-chevron-right"></i></a>' +
            '</div>' +
            '</div>';

        for (let index = 0; index < 6; index++) {
            $('#ngaku_my_qna_div').append(html2)
        }
        function createHTML(title, unit, deadline) {
            var html = `
              <div class="excess_report_num d-flex excess_report_item">
                  <div class="col-11 d-flex flex-column flex-md-column flex-lg-row">
                      <div class="col-12 col-md-6 excess_report_title line_truncate--2">
                          ${title}
                      </div>
                      <div class="excess_report_unito d-flex flex-row flex-lg-column col-12 col-md-4">
                          <div class="flex-md-fill padding_right--5">${unit}</div>
                          <div class="flex-md-fill">ユニット：1</div>
                      </div>
                      <div class="col-2 excess_report_right">
                          <span class="text-nowrap d-lg-none d-xl-none d-xxl-none">${deadline}</span>2000.00.00
                      </div>
                  </div>
                  <div class="col-1 excess_report_right justify-content-end">
                      <i class="bi bi-chevron-right"></i>
                  </div>
              </div>
            `;
            return html;
        }


        var title = "英語コミュニケーションⅠ英語コミュニケーションⅠ英語コミュニケーションⅠ";
        var unit = "第12回";
        var html3 = createHTML(title, unit, "提出期限：");
        var html4 = createHTML(title, unit, "再提出期限：");


        for (let index = 0; index < 6; index++) {
            $('.excess_report_scroll').append(html3)
        }
        for (let index = 0; index < 6; index++) {
            $('.resubmit_report_scroll').append(html4)
        }
        var html6 = `<div class="d-flex flex-column margin_top_bottom--5 margin_left_right--3">
                    <a href="#"
                    class="link--unstyled line_truncate--3">一二三四五六七八九〇一二三四五六七八九〇一二三四五六七八九〇一二三四五六七八九〇一二一二三四五六七八九〇一二三四五六七八九〇一二三四五六七八九〇一二三四五六七八九〇一二</a>
                    <div class="d-flex flex-row margin_top--1">
                    <div class="notice_group_text">2023.00.00 00:00</div>
                    <div class="notice_group_text">投稿者：一二三四五六七八九〇一二三四五</div>
                    </div>
                    </div>`
        for (let index = 0; index < 6; index++) {
            $('.ngakuvoice').append(html6)
        }
    },
    updateDivHeight: function () {//b0101 c0101
        screenHeight = $(window).height();
        // メソッドを呼び出して高さとスクロールを設定する
        _this.setScrollHeight($(".ngaku_parts_left_scroll"), screenHeight, 0);
        _this.setScrollHeight($(".nav_right_scroll"), screenHeight, 60);
        _this.setScrollHeight($(".announce_list_scroll"), screenHeight, 60);
        _this.setScrollHeight($("#ngakuvoice_sroll"), screenHeight, 60);
        _this.setScrollHeight($("#classvoice_scroll"), screenHeight, 60);

        //マイスタディTAB
        _this.setScrollHeight($(".report_learning_scroll"), screenHeight, 60);
        _this.setScrollHeight($("#ngaku_my_qna_div"), screenHeight, 60);
        _this.setScrollHeight($("#ngaku_schooling_scroll"), screenHeight, 60);
        _this.setScrollHeight($(".ngaku_parts_contents_schooling_sp_scroll"), screenHeight, 60);
        

    },
    setScrollHeight: function ($element, screenHeight, buffer) {
        var $scrollElement = $element;
        var elementTop = $scrollElement.offset().top;
        console.log(elementTop)//250
        console.log(screenHeight)//250
        var elementHeight = screenHeight - elementTop - buffer;
        $scrollElement.css({
            "height": elementHeight,
            "overflow": "scroll"
        });
    }
}
