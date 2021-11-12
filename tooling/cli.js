import fs from 'fs';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { PAGES_DIR } from './lib.js';


const templates = {
  template: name => (`---
layout: base.njk
pagename: ${name}
permalink: "build/${name}/index.html"
permalinkBypassOutputDir: true
nickname: ${name}
---
<div class="${name}"> ${name} page </div>`),
  css: () => '',
  json: () => '',
  js: ()=> '',
}

function trimData(data) {
  return data.trim();
}

const fileExists = path => file => fs.existsSync(`${path}/${file}`);

const writeToPath = path => (file, content) => {
  const filePath = `${path}/${file}`;
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  fs.writeFile(filePath, content, err => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createFiles(path, name) {
  const files = {
    template: `${name}.njk`,
    css: `${name}-sync.css`,
    js: `${name}-module.js`,
    json: `${name}.json`,
  };
  const writeFile = writeToPath(path);
  const toFileMissingBool = file => !fileExists(path)(file);
  const checkAllMissing = (acc, cur) => acc && cur;

  const noneExist = Object.values(files)
    .map(toFileMissingBool)
    .reduce(checkAllMissing);

  if (noneExist) {
    console.log(`Detected new file: ${name}, ${path}`);
    Object.entries(files).forEach(([type, fileName]) => {
      writeFile(fileName, trimData(templates[type](name)));
    });
  }else{
    console.log(`File already exists: ${name}, ${path}`);
  }
}

/* yargs will be used for better command line interface
const parsedArguments = yargs(hideBin(process.argv)).argv;
console.log(parsedArguments);
*/
const fileName = process.argv[2];
if(fileName){
  createFiles(PAGES_DIR.pathname + `/${fileName}`, fileName);
}

