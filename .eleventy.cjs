'use strict';

const htmlmin = require('html-minifier');
const { basename } = require('path');
const { getImgSizes, getSrcSet, buildOutputDir, get_resized_image_url, getImageUrl  } = require('./tooling/eleventy.cjs');

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksShortcode('access', function(array, index) {
        return array[index];
    });

    eleventyConfig.addNunjucksFilter('slideImgSrcSet', function(slide, imgext="jpg") {
        const name = basename(slide.image);
        const sizes = getImgSizes(name);
        return getSrcSet(name, sizes, slide.intrinsicwidth, imgext);
    });

    eleventyConfig.addNunjucksFilter('imgObjSrcSet', function(imgObj, imgext="jpg") {
        const name = basename(imgObj.src);
        const sizes = getImgSizes(name);
        return getSrcSet(name, sizes, imgObj.intrinsicwidth, imgext);
    });

    eleventyConfig.addNunjucksFilter('cmsImgObjSrcSet', function(imgObj, type) {
        const dimensions = [320, 600, 640, 900, 1200, 1280, 1536] ;
        return get_resized_image_url(imgObj.src, dimensions, (type + "" ).trim());
    });

    eleventyConfig.addNunjucksFilter('theImgSrc', function(value) {
        return getImageUrl(value)
    });

    eleventyConfig.addNunjucksFilter('getImgSourceType', function(type='jpeg') {
        switch(type) {
            case 'jpg':
                return 'jpeg';
            default:
                return type;
        }
    });

    eleventyConfig.addPassthroughCopy({ 'components/lib': 'lib' });
    // dump object data.
    eleventyConfig.addNunjucksFilter( 'json', function ( value ) {
        let str = JSON.stringify(value)
        return str?.replace(/(<svg.*?<\/svg>)/g,"raw svg load from db")
    } )

    eleventyConfig.addPassthroughCopy('videos');
    
    eleventyConfig.addPassthroughCopy({ 'images/output': 'images' });

    eleventyConfig.addPassthroughCopy({ 'images/svg': 'images' });

    eleventyConfig.addPassthroughCopy('fonts');

    // to do -- move responsibility to esbuild + minify
    eleventyConfig.addPassthroughCopy('scripts');

    eleventyConfig.addPassthroughCopy('favicon.ico')
    
    eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
        if(outputPath.endsWith('.html')) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                collapseWhitespace: true,
                preserveLineBreaks: true
            });
        }
        return content;
    });

    return {
        dir: {
            output: 'build',
            input: 'pages',
            layouts: '_layouts',
            includes: '_includes'
        }
    };
}