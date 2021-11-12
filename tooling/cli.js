import fs from 'fs';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { PAGES_DIR } from './lib.js';


const templates = {
  template: `
  ---
  layout: base.njk
  pagename: sample
  permalink: "build/sample/index.html"
  permalinkBypassOutputDir: true
  nickname: "Sample"
  ---
  <div class="sample"> sample page </div>`,
  css: '',
  json: '',
}


const fileExists = path => file => fs.existsSync(`${path}/${file}`);

const writeToPath = path => (file, content) => {
  const filePath = `${path}/${file}`;
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  console.log(content);
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
      writeFile(fileName, templates[type]);
    });
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

