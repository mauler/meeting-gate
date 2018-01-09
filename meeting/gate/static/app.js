define('jquery', [], function () {
    'use strict';
    return jQuery;
});

requirejs.config({
    baseUrl: '/static/lib',
    urlArgs: "nocache=" + (new Date()).getTime(),
    paths: {
        app: '../app'
    }
});

requirejs(['app/main']);
