
var _cur_pos = 0;
var _modal_show;
var _show_y = 70;
var _animation_time = 5000;

function _get_window_height() {
    return window.innerHeight || 
           document.documentElement.clientHeight ||
           document.body.clientHeight || 0;
}

function _get_window_Yscroll() {
    return window.pageYOffset || 
           document.body.scrollTop ||
           document.documentElement.scrollTop || 0;
}

function _get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, 
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, 
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, 
        document.documentElement.clientHeight || 0
    );
}

function _get_scroll_percents() {
    return Math.round(((_get_window_Yscroll() + _get_window_height()) / _get_doc_height()) * 100);
}

function _disable_modal() {
    setCookie("disable_modal", "true");
    _modal_close(_animation_time);
}

function _close_modal(){
    setCookieSession("disable_modal", "true");
    _modal_close(_animation_time);
}

function _modal_is_disabled() {
    return getCookie("disable_modal") == "true";
}

function _modal_open(a_time) {
    if(_modal_is_disabled() != true) {
        $( "#scroll-modal" ).animate({
            opacity: 1,
            left: "20px"
        }, a_time );
    }
}

function _modal_close(a_time) {
    $( "#scroll-modal" ).animate({
            opacity: 0,
            left: "-330px"
    }, a_time );
}

function _scroll_up(perc) {
    if(perc < _show_y && _modal_show == true) {
        _modal_close(_animation_time);
        _modal_show = false;
    }
}

function _scroll_down(perc) {
    if(perc >= _show_y && _modal_show != true) {
        _modal_open(_animation_time);
        _modal_show = true;
    }
}

function scroll_modal_init(show_y, a_time) {
    _animation_time = a_time;
    _show_y = show_y;
    $(document).ready(function() {
        $("#scroll-modal").prepend("<div id='close-btn'>Закрыть</div><div id='clear-box'></div>");
        $("#close-btn").click(_close_modal);
        $("#modal-bottom").click(_disable_modal);
        _modal_show = _get_scroll_percents() >= _show_y;
        if(_modal_show)
            _modal_open(0);
        $(window).scroll(function() {
            var _perc = _get_scroll_percents();
            if(_cur_pos > _perc) {
                _scroll_up(_perc);
            }else if(_cur_pos < _perc) {
                _scroll_down(_perc);
            }
            _cur_pos = _perc;
        });
    });
}

scroll_modal_init(70, 800);