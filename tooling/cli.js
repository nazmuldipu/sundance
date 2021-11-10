import fs from 'fs';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


const template = `
---
layout: base.njk
pagename: sample
permalink: "build/sample/index.html"
permalinkBypassOutputDir: true
nickname: "Sample"
---
<div class="sample"> sample page </div>`;

const fileExists = path => file => fs.existsSync(`${path}/${file}`);

const writeToPath = path => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, err => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createFiles(path, name) {
  const files = {
    index: "index.jsx",
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
      writeFile(fileName, templates[type](name));
    });
  }
}
const parsedArguments = yargs(hideBin(process.argv)).argv;
const fileName = parsedArguments._[0];
console.log(`Creating new file: ${fileName}`);