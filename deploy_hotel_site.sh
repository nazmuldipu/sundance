#!/usr/bin/env bash

#install the dependencies
npm install

#resizes images
npm run resize-images

#build & create a script to run app
npm run build

#check to make sure that this bash supports substring expansion
echo $BASH_VERSION

cd build

#create array of html file names
shopt -s nullglob
html_files=(*.html)

#sync from build directory to s3 bucket
aws s3 sync ./ s3://$S3_BUCKET_NAME --acl public-read --exclude "*.html" #--dryrun

#copy each .html file and rename it without file extension on s3
for i in "${html_files[@]}"
do
    object_name=${i:0:-5}
    echo "${object_name}"
    aws s3 cp ${i} s3://$S3_BUCKET_NAME/${object_name} --acl public-read --content-type "text/html" #--dryrun
done

#rm synced .html files
aws s3 rm s3://$S3_BUCKET_NAME --recursive --exclude "*" --include "*.html" #--dryrun


#create a new Cloudfront invalidation as soon as the built files have been uploaded to S3
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths "/*"

# else
# echo "It's not a stage branch"
# exit 1

fi