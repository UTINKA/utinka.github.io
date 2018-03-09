(function($) {
    $(".ripple-effect").click(function(e){
        var rippler = $(this);

        if(rippler.find(".ripl").length == 0) {
            rippler.append("<span class='ripl'></span>");
        }

        var ripl = rippler.find(".ripl");
        ripl.removeClass("animate");

        if(!ripl.height() && !ripl.width())
        {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ripl.css({height: d, width: d});
        }

        var x = e.pageX - rippler.offset().left - ripl.width()/2;
        var y = e.pageY - rippler.offset().top - ripl.height()/2;

        ripl.css({
            top: y+'px',
            left:x+'px'
        }).addClass("animate");
    })
})(jQuery);