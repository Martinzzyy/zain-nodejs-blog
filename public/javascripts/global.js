var Tools = {
    GetUrlQuerying: function () {
        var json = "";
        var query = location.search.substring(1);      // Get query string
        var pairs = query.split("&");                  // Break at ampersand
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');           // Look for "name=value"
            if (pos == -1) continue;                   // If not found, skip
            var argname = pairs[i].substring(0, pos); // Extract the name
            var value = pairs[i].substring(pos + 1);     // Extract the value
            try {
                value = decodeURIComponent(value).replace(/\'/g, "").replace(/\"/g, "");         // Decode it, if needed
            }
            catch (e) {
                value = unescape(value).replace(/\'/g, "").replace(/\"/g, "");
            }
            json += "\"" + argname + "\":\"" + value + "\",";
            // query += "";
            // args[argname] = value;                     // Store as a property
        }
        if (json.length > 0) {
            json = json.substring(0, json.length - 1);
        }
        json = "{" + json + "}";
        return eval("(" + json + ")");
    },
    checkCardId: function (id) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(id);//通过为true
    },
    checkＭobile: function (num) {
        var mobile = /^1[3|4|5|7|8]\d{9}$/;
        var tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
        if (mobile.test(num) || tel.test(num))
            return true;
        else
            return false;
    },
    compress: function (source_img_obj, quality, output_format, func) {
        var mime_type = output_format;
        func = func || function () { };
        var cvs = document.createElement('canvas');
        //naturalWidth真实图片的宽度
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d");
        ctx.drawImage(source_img_obj, 0, 0);

        func(cvs.toDataURL(mime_type, 0.5));
    },
    ChangeDateFormat: function (dateTime, fomate) {
        if (!dateTime) {
            return "";
        }
        var date;
        if (dateTime.indexOf("/Date") > 0) {
            date = new Date(parseInt(dateTime.replace("/Date(", "").replace(")/", ""), 10));
        } else {
            var d = dateTime.replace(/-/g, '/').replace('T',' ');
            date = new Date(Date.parse(d));
        }
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if (typeof (fomate) != "undefined") {
            if (fomate.indexOf("yyyy") >= 0) {
                fomate = fomate.replace("yyyy", date.getFullYear());
            }
            else if (fomate.indexOf("yy") >= 0) {
                fomate = fomate.replace("yy", (date.getFullYear() + "").substring(2, 4));
            }
            return fomate.replace("MM", month).replace("dd", currentDate).replace("HH", hour).replace("mm", min);
        } else {
            return date.getFullYear() + "-" + month + "-" + currentDate;
        }
    },
    isDefine: function (val) {
        if (typeof val == 'undefined' || val == "" || val == null || val == 'null' || val == undefined || val == '[]' || val == 'undefined')
            return false;
        else
            return true;
    },
    floatToInt: function (num) {
        var regu = /^[1-9]?[0-9]*\.[0-9]*$/ // 小数测试
        if (regu.test(num)) {
            var t = parseFloat(num);
            return parseInt(((t * 10) + 10) / 10);
        } else {
            return parseInt(num);
        }
    }
};