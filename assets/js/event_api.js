
var page = 1;
var eventUrl = "https://openapi.gg.go.kr/Ggculturevent?KEY=ecb53307d2ed48a0ba1ea4fcef3574e4&TYPE=xml&pIndex=" + page + "&pSize=600";

var callUrl = function (url, startDate, endDate) {

    var height = $(document).scrollTop();
    $(".re").load(window.location.href + " .re");

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
                    var $eventDate =    //행사기간
                        $(o).find("EVENT_PERD").text();


                    var dateArr = $eventDate.split('~');
                    var endEvent = parseInt(dateArr[1].replaceAll('-', ''));


                    if ((endEvent >= startDate) && (endEvent <= endDate)) {

                        var content = $("<div />").append("<a href='infopage.html?eventsearch=" + $eventName + "'><img width='300px' height='300px' src='" + $eventImg + "'/></a><P>" + $eventName + "<br>기간: " + $eventDate + "</p>");

                        $(".event-api").append(content);
                    }
                });
            }
        });
    setTimeout(function () {
        $(window).scrollTop(height);
    }, 150);
}
callUrl(eventUrl, "20191201", "20201230");

$("#search-button").click(function () {
    location.href = "./searchpage.html?eventsearch=" + $("#search").val();
});
$("#search").keypress(function (e) {
    if (e.which == 13) {
        location.href = "./searchpage.html?eventsearch=" + $("#search").val();
    }
});
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}
//날짜검색
$(".date-search").click(function () {
    if (($("#start-date").val() == "")||($("#end-date").val() == "")) {
        alert("날짜를 선택해 주세요.")
    } else {
        var startDate = $("#start-date").val().replaceAll("/", "");
        var endDate = $("#end-date").val().replaceAll("/", "");
        callUrl(eventUrl, startDate, endDate);
    }
});

$(".date-search-m").click(function () {
    if (($("#start-date-m").val() == "")||($("#end-date-m").val() == "")) {
        alert("날짜를 선택해 주세요.")
    } else {
        var startDate = $("#start-date-m").val().replaceAll("/", "");
        var endDate = $("#end-date-m").val().replaceAll("/", "");
        callUrl(eventUrl, startDate, endDate);
    }
});
















