var wingBanner = function () {
    var keyCnt = 0;
    var getLast = {};
    if (localStorage.getItem("keyCnt") == null) {
        localStorage.setItem("keyCnt", "0");
    } else {
        keyCnt = parseInt(localStorage.getItem("keyCnt"));
        
        for (var i = 1; i <= keyCnt; i++) {
            getLast = JSON.parse(localStorage.getItem("last-event"+i));
            $(".sidenav-info").prepend("<a href='infopage.html?eventsearch=" + getLast.ename + "'><img width='130px' height='125px' src='" + getLast.eimage + "' /></a>");
           
        }
    }



}
wingBanner();