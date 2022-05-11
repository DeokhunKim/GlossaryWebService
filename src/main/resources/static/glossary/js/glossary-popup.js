function getSelected() {
    if (window.getSelection) {
        return window.getSelection();
    }
    else if (document.getSelection) {
        return document.getSelection();
    }
    else {
        var selection = document.selection && document.selection.createRange();
        if (selection.text) {
            return selection.text;
        }
        return false;
    }
    return false;
}

$('#documents').mouseup(function() {
    var selection = $.trim(getSelected());

    if(selection != ''){
        $("span.popup-tag").css("display","block");
        $("span.popup-tag").css("top",window.scrollY + event.clientY + 10);
        $("span.popup-tag").css("left",event.clientX);
        //$("span.popup-tag").text('+ \'' + selection + '\' create page');
        $("span.popup-tag").text('+ create page');
        $("span.popup-tag").attr('onclick', 'location.href="/../glossary/new?title=' + selection + '"');


    }else{
        $("span.popup-tag").css("display","none");
    }
});