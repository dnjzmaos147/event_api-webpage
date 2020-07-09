function openNav() {
    document.getElementById("mySidenav").style.width = "220px";
    document.getElementById("open").style.marginRight = "220px";
    $('.openbtn').hide();
    $('.closebtn').show();
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("open").style.marginRight = "0";
    $('.openbtn').show();
    $('.closebtn').hide();
}