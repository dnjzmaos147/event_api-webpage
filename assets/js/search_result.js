
$(document).ready(function() {
    var getParam = function(key){
        var _parammap = {};
        document.location.search.replace(/\?(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }
    
            _parammap[decode(arguments[1])] = decode(arguments[2]);
        });
    
        return _parammap[key];
    };
    var searchVal = getParam("eventsearch");
    $(".search-result").append("<h3>검색어 : [ "+searchVal+" ]</h3>");
    var page = 1;
    var eventUrl = "https://openapi.gg.go.kr/Ggculturevent?KEY=ecb53307d2ed48a0ba1ea4fcef3574e4&TYPE=xml&pIndex=" + page + "&pSize=1000";

    var callUrl = function (url, searchVal) {
        $.ajax({
            method: "GET",
            url: url,
        })
            .done(function (msg) {
                var $data = $(msg).find("row");
                if ($data.length > 0) {
                   
                    $.each($data, function (i, o) {
                        var $eventName =    //행사명
                            $(o).find("TITLE").text();
                        var $eventImg =     //이미지
                            $(o).find("IMAGE_URL").text();
                        var $eventHost =    //기관명
                            $(o).find("INST_NM").text();
                        var $eventKind =    //행사분류
                            $(o).find("EVENT_KIND_NM").text();
                        var $eventType =    //행사종류
                            $(o).find("CLASS_NM").text();
                        var $eventDate =    //행사기간
                            $(o).find("EVENT_PERD").text();
                        var $eventWeb =     //관련 홈페이지 주소
                            $(o).find("SNTNC_URL").text();
                        var $eventPlace =   //행사장소
                            $(o).find("EVENT_PLC").text();
                        var $eventContent = //행사내용 요약글
                            $(o).find("SUMMRY_SNTNC_CONT").text();
                        var $regDate =      //글등록 날짜
                            $(o).find("SNTNC_REGIST_DE").text();

                        if($eventName.indexOf(searchVal) !== -1){
                            var content =  $("<div />").append("<a href='infopage.html?eventsearch="+$eventName+"'><img width='300px' height='300px' src='"+$eventImg+"'/></a><P>"+$eventName+"<br>기간: "+$eventDate+"</p>");
                           $(".event-api").append(content);
                           
                        }
                    });
                }
            });
    }
    callUrl(eventUrl, searchVal);
    $("#search-button").click(function(){
        location.href="./searchpage.html?eventsearch="+$("#search").val();
    });
    $("#search").keypress(function (e) {
        if (e.which == 13){
            location.href="./searchpage.html?eventsearch="+$("#search").val();
        }
    });
});



