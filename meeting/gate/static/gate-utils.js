window.GATE_API_URL = '/api/ʋ666'

window.is_ticket_qrcode = function (s) {
  return ((s.length == 1) ||
          /^\d+$/.test(s) ||
          /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(s));
}

window.is_wristband = function (s) {
  return s.length == 2 || /^\d{10}$/i.test(s);
}

window.getCookie = function (name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
