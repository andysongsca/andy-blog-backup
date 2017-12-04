"use strict";
const fs = require("fs");
const path = "../photos/";

fs.readdir(path, function (err, files) {
    if (err) {
	    console.log('localerror', err);
        return;
    }
    const jsonArr = [];
    (function iterator(index) {
        if (index == files.length) {
            fs.writeFile("../source/photos/imgList.json", JSON.stringify(jsonArr, null, "\t"));
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
                    const nameStr = nameArr[0];
                    const titleArr = nameStr.split('-');
                    let hasIt = false;
                    jsonArr.forEach((v, i) => {
                        if (v.chapter === titleArr[0]) {
                            jsonArr[i].images.push({
                                src: nameStr,
                                desc: titleArr[2]
                            });
                            hasIt = true;
                        }
                    });
                    !hasIt && jsonArr.push({
                        chapter: titleArr[0],
                        section: titleArr[1],
                        images: [{
                            src: nameStr,
                            desc: titleArr[2]
                        }]
                    });
                
                }
            }
            iterator(index + 1);
        });
    }(0));
});