#!/usr/bin/env bash

#install the dependencies
npm install

#resizes images
npm run resize-images

#build & create a script to run app
npm run build

#check to make sure that this bash supports substring expansion
echo $BASH_VERSION
echo $S3_BUCKET_NAME

cd build

#create array of html file names
shopt -s nullglob
html_files=(*.html)

#sync from build directory to s3 bucket
aws s3 sync ./ s3://$S3_BUCKET_NAME --acl public-read 

#create a new Cloudfront invalidation as soon as the built files have been uploaded to S3
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST_ID --paths "/*"

# else
# echo "It's not a stage branch"
# exit 1

#fi