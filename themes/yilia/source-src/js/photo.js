 var photo = {
    page: 1,
    offset: 20,
    init: function () {
        var that = this;
        this.loadData(function (data) {
            that.render(that.page, data);

            that.scroll(data);
        });
    },

    render: function (page, data) {
        var begin = (page - 1) * this.offset;d
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            li += '<li><div class="img-box">' +
                '<a class="img-bg" rel="example_group" href="../assets/photos/' + data[i] + '"</a>' +
                '<img lazy-src="../assets/photos/' + data[i] + '" />' +
                '</li>';
        }

        $(".img-box-ul").append(li);
        $(".img-box-ul").lazyload();
        $("a[rel=example_group]").fancybox();
    },

    scroll: function (data) {
        var that = this;
        $(window).scroll(function() {
            var windowPageYOffset = window.pageYOffset;
            var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
            var sensitivity = 0;

            var offsetTop = $(".instagram").offset().top + $(".instagram").height();

            if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                that.render(++that.page, data);
            }
        })
    },
    loadData: function (success) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/photo/output.json?t=' + +new Date(), true);

        xhr.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            var res = JSON.parse(this.response);
            searchData = res;
            success(searchData);
          } else {
            console.error(this.statusText);
          }
        };

        xhr.onerror = function() {
          console.error(this.statusText);
        };

        xhr.send();
    }
}
photo.init();
