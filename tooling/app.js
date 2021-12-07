import fs from 'fs';
import readline from 'readline';

export const getFirstLine = async(pathToFile)=> {
    const readable = fs.createReadStream(pathToFile);
    const reader = readline.createInterface({ input: readable });

    const line = await new Promise((resolve) => {
      reader.on('line', (line) => {
        if(line.length === 0) {
            console.log('empty line');
        }  
        reader.close();
        resolve(line);
      });
    });

    readable.close();
    return line;
}

/* const line = await getFirstLine('./empty.js');
console.log('test');
console.log(line.replace(/\s+/g, '').startsWith('//ignore')); */

var count = 0;
var lineReader = readline.createInterface({
    input: fs.createReadStream('./empty.js')
});
lineReader.on('line', function (line) {
    ++count;  // keep a count of number of lines
    if (line.length > 0) {
        console.log('Line from file:', line);
    }else{
        console.log('empty line');
    }
});
