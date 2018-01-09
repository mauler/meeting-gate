function get_navigator_user_media(success_callback, error_callback, index) {
    if (! index)
        index = 0;

    var n = navigator;
    if (n.mediaDevices && n.mediaDevices.getUserMedia) {
        n.mediaDevices.getUserMedia({
            video : {
                facingMode : "environment"
            },
            audio : false
        }).then(success_callback);
    } else {
        MediaStreamTrack.getSources(function(sourceInfos) {
            var videoSource = null;
            var videos = [];
            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                console.debug(i, sourceInfo);
                if (sourceInfo.kind === 'video'
                        && sourceInfo.facing === 'environment') {
                    videos.push(sourceInfo.id);
                }
            }
            // console.debug(videos, index);
            // $("#qrcode").val(videos)
            sourceSelected(videos[index]);
        });
        function sourceSelected(videoSource) {
            var constraints = {
                audio : false,
                video : {
                    optional : [ {
                        sourceId : videoSource
                    } ]
                }
            };
            if (n.getUserMedia) {
                n.getUserMedia(constraints, success_callback, error_callback);
            } else if (n.webkitGetUserMedia) {
                n.webkitGetUserMedia(constraints, success_callback, error_callback);
            } else if (n.mozGetUserMedia) {
                n.mozGetUserMedia(constraints, success_callback, error_callback);
            }
        }
    }

}

(function($) {
    jQuery.fn.extend({
        html5_qrcode: function(qrcodeSuccess, qrcodeError, videoError, videoIndex) {
            return this.each(function() {
                var currentElem = $(this);

                var height = currentElem.height();
                var width = currentElem.width();

                if (height == null) {
                    height = 250;
                }

                if (width == null) {
                    width = 300;
                }

                var vidElem = $('<video width="' + width + 'px" height="' + height + 'px"></video>').appendTo(currentElem);
                var canvasElem = $('<canvas id="qr-canvas" width="' + (width - 2) + 'px" height="' + (height - 2) + 'px" style="display:none;"></canvas>').appendTo(currentElem);

                var video = vidElem[0];
                var canvas = canvasElem[0];
                var context = canvas.getContext('2d');
                var localMediaStream;

                var scan = function() {
                    if (localMediaStream) {
                        context.drawImage(video, 0, 0, 307, 250);

                        try {
                            qrcode.decode();
                        } catch (e) {
                            qrcodeError(e, localMediaStream);
                        }

                        $.data(currentElem[0], "timeout", setTimeout(scan, 500));

                    } else {
                        $.data(currentElem[0], "timeout", setTimeout(scan, 500));
                    }
                };//end snapshot function

                window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

                var successCallback = function(stream) {
                    video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                    localMediaStream = stream;
                    $.data(currentElem[0], "stream", stream);

                    video.play();
                    $.data(currentElem[0], "timeout", setTimeout(scan, 1000));
                };

                // Call the getUserMedia method with our callback functions
                if (navigator.getUserMedia) {
                    get_navigator_user_media(
                        successCallback,
                        function(error) {
                            alert(error);
                            videoError(error, localMediaStream);
                        },
                        videoIndex);
                } else {
                    alert('Native web camera streaming (getUserMedia) not supported in this browser.');
                    // Display a friendly "sorry" message to the user
                }

                qrcode.callback = function (result) {
                    qrcodeSuccess(result, localMediaStream);
                };
            }); // end of html5_qrcode
        },
        html5_qrcode_stop: function() {
            return this.each(function() {
                //stop the stream and cancel timeouts
                $(this).data('stream').getVideoTracks().forEach(function(videoTrack) {
                    videoTrack.stop();
                });

                clearTimeout($(this).data('timeout'));
            });
        }
    });
})(jQuery);

