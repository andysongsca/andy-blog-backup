"use strict";
const fs = require("fs");
const path = "../photos/";

fs.readdir(path, function (err, files) {
    if (err) {
	    console.log('localerror', err);
        return;
    }
    let arr = [];
    (function iterator(index) {
        if (index == files.length) {
            fs.writeFile("../source/photos/imgList.json", JSON.stringify(arr, null, "\t"));
            return;
        }

        fs.stat(path + files[index], function (err, stats) {
            if (err) {
                return;
            }
            if (stats.isFile()) {
                const nameArr = files[index].split('.');
                const ext = nameArr[nameArr.length-1].toLowerCase();
                if (!(files[index].indexOf('.small.') !== -1 || files[index].indexOf('.big.') !== -1) && /jpg|png|jpeg/ig.test(ext)) {
                    arr.push(files[index].split('.')[0]);
                }
            }
            iterator(index + 1);
        });
    }(0));
});
