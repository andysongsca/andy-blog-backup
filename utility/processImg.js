const fs = require("fs");
const path = "../photos/";
const sharp=require('sharp');

fs.readdir(path, function (err, files) {
    if (err) {
	    console.log('localerror', err);
        return;
    }
    files.forEach((k, i) => {
        const nameArr = files[i].split('.');
        const ext = nameArr[nameArr.length-1].toLowerCase();
        const name = nameArr[0];
        if (k.indexOf('.small.') !== -1 || k.indexOf('.big.') !== -1 || !/jpg|png|jpeg/ig.test(ext)) {
            return;
        }

        sharp(path + files[i])
        .resize(640, 640)
        .toFile(path + name + '.big.' + 'jpg', function(err, info) {
        })
        .resize(190, 190)
        .toFile(path + name + '.small.' + 'jpg', function(err, info) {
        })
    });
});
