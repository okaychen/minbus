/**
 * Created by 程小白 on 2017/6/5.
 */
new function () {
    dom = [];
    dom.isReady = false;
    dom.isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    };
    dom.Ready = function (fn) {
        dom.initReady();
        if (dom.isFunction(fn)) {
            if (dom.isReady) {
                fn();
            } else {
                dom.push(fn);
            }
        }
    };
    dom.fireReady = function () {
        if (dom.isReady)  return;
        dom.isReady = true;
        for (var i = 0, n = dom.length; i < n; i++) {
            var fn = dom[i];
            fn();
        }
        dom.length = 0;
    };
    dom.initReady = function () {
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function () {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                dom.fireReady();
            }, false);
        } else {
            if (document.getElementById) {
                document.write("<script id=\"ie-domReady\" defer='defer' src=\"//:\"><\/script>");
                document.getElementById("ie-domReady").onreadystatechange = function () {
                    if (this.readyState === "complete") {
                        dom.fireReady();
                        this.onreadystatechange = null;
                        this.parentNode.removeChild(this)
                    }
                };
            }
        }
    }
};


dom.Ready(function () {
    /*
    * 让单选框可重复点击
    * */
    document.body.onmousedown = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.type === 'radio') {
            target.previousValue = target.checked;
        }
    };
    document.body.onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.type === 'radio') {
            if (target.previousValue) {
                target.checked = false;
            }
        }
    };
    /*
    *BusInformation
    * */
    $(".busInformation ul li").each(function () {
        $(this).click(function () {
            $(this).children('.user-header').slideToggle();
        })
    })


});