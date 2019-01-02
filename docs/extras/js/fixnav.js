function fixnav() {
    let top = parseInt($('.navbar').css("height"))+10;
    $('body').css('padding-top', top);

    // let atleast = Math.max(top - $(window).scrollTop(), 80);
    $('.bs-sidebar.affix').css('top', top);
}

// function fixside(){
//
// }

$(window).resize(fixnav);
$(window).load(fixnav);
// $(window).scroll(fixnav);