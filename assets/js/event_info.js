var keyCnt = parseInt(localStorage.getItem("keyCnt"));
var eventArr = [];
for (var i = 1; i <= keyCnt; i++) {
    eventArr.push(localStorage.getItem("last-event" + i));
}

var getParam = function (key) {
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
$(".search-result").append("<h3>검색어 : [ " + searchVal + " ]</h3>");
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

                    if ($eventName == searchVal) {
                        var $eventImg = $(o).find("IMAGE_URL").text();//이미지
                        var $eventHost = $(o).find("INST_NM").text();//기관명
                        var $eventType = $(o).find("CLASS_NM").text();//행사종류
                        var $eventDate = $(o).find("EVENT_PERD").text(); //행사기간
                        var $eventWeb = $(o).find("SNTNC_URL").text(); //관련 홈페이지 주소
                        var $eventPlace = $(o).find("EVENT_PLC").text();//행사장소
                        var $eventContent = $(o).find("SUMMRY_SNTNC_CONT").text();//행사내용 요약글
                        var $regDate = $(o).find("SNTNC_REGIST_DE").text();//글등록 날짜
                        var eventInfo = JSON.stringify({ ename: $eventName, eimage: $eventImg });
                        var checkEvent = eventArr.every(function (ele) {
                            return ele != eventInfo;
                        });
                        if (keyCnt != 0) {
                            if (checkEvent) {
                                if (keyCnt < 5) {
                                    keyCnt++;
                                    localStorage.setItem("keyCnt", keyCnt);
                                    localStorage.setItem("last-event" + keyCnt, eventInfo);
                                }else{
                                    for (var i = 1; i < 5; i++) {
                                        localStorage.setItem("last-event"+i, localStorage.getItem("last-event"+(i+1)));
                                    }
                                    localStorage.setItem("last-event" + keyCnt, eventInfo);
                                }
                            }
                        } else {
                            keyCnt++;
                            localStorage.setItem("keyCnt", keyCnt);
                            localStorage.setItem("last-event" + keyCnt, eventInfo);
                        }     
                        $(".pc-header").append("<img src='" + $eventImg + "'/><p>"+$eventName+"</p>");
                        var tb = $("<table class='table' />").append(
                            $("<tr />").append("<th class='type-cell'>기관명</th><td>" + $eventHost + "</td>"),
                            $("<tr />").append("<th>행사장소</th><td class='mapicon'>" + $eventPlace + "<a href='map.html?eventsearch=" + $eventPlace + "  '><img src='/assets/img/mapicon.png'/>길찾기 </a></td>"),
                            $("<tr />").append("<th>행사종류</th><td>" + $eventType + "</td>"),
                            $("<tr />").append("<th>행사기간</th><td>" + $eventDate + "</td>"),
                            $("<tr />").append("<th>내용</th><td>" + $eventContent + "</td>"),
                            $("<tr />").append("<th>홈페이지</th><td><a href='" + $eventWeb + "'>" + $eventWeb + "</a></td>"),
                            $("<tr />").append("<td colspan='2'><div class='addthis_inline_share_toolbox'></div></td>")
                        );
                        $(".event-info").append(tb);

                        //mobile
                        $(".back-image").append("<img src='" + $eventImg + "'/>");
                        $(".front-image").append("<img src='" + $eventImg + "'/>");
                        var mobileHeader = $("<div />").append("<p>"+$eventName+"</p><div class='addthis_inline_share_toolbox'></div>");
                        var tbm = $("<table class='table' />").append(
                            $("<tr />").append("<th>기관명</th><td>" + $eventHost + "</td>"),
                            $("<tr />").append("<th>행사장소</th><td class='mapicon'>" + $eventPlace + "<a href='map.html?eventsearch=" + $eventPlace + "  '><img src='/assets/img/mapicon.png'/>길찾기 </a></td>"),
                            $("<tr />").append("<th>행사종류</th><td>" + $eventType + "</td>"),
                            $("<tr />").append("<th>행사기간</th><td>" + $eventDate + "</td>"),
                            $("<tr />").append("<th>내용</th><td>" + $eventContent + "</td>"),
                            $("<tr />").append(`<th>홈페이지</th><td><a href='${$eventWeb}'>${$eventWeb}</a></td>`)
                        );
                        
                        $(".mobileHeader").append(mobileHeader);
                        $(".event-info-m").append(tbm);

                    }

                });
            }
        });
}

callUrl(eventUrl, searchVal);
$("#search-button").click(function () {
    location.href = "./searchpage.html?eventsearch=" + $("#search").val();
});

$("#search").keypress(function (e) {
    if (e.which == 13) {
        location.href = "./searchpage.html?eventsearch=" + $("#search").val();
    }
});