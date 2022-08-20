$("div.button").click(function(e){
	$(e.target).addClass("pressed");
});

$("body").on( "webkitAnimationEnd oanimationend msAnimationEnd animationend",
	function(e) {
		$(e.target).removeClass("pressed");
	}
);