import fs from 'fs'

import { basename } from 'path'

const arg = process.argv[2]

console.log(arg, typeof(arg))

const filePaths = arg.split(",").map(p => p.trim())
console.log(filePaths, typeof(filePaths))

const ignores = ["**/node_modules/**"]

for (const path of filePaths){
            let filename = basename(path)
        if (filename === '/') continue

            ignores.push(`pages${path}/${filename}.njk`)
            ignores.push(`pages${path}/${filename}.11tydata.cjs`)
}

const ignoreText = ignores.join("\n")
fs.writeFileSync(".eleventyignore", ignoreText)