#!/bin/sh

cd utility
node processImg
echo 'processImg ok'

node creatImgList
echo 'creatImgList ok'

cd ../
rsync -a ./photos root@39.106.58.106:~/web/static/
echo 'sync done'