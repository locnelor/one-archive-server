// const { statSync, readdirSync } = require("fs")
// const { join, basename } = require("path")
//     // const { exec } = require("child_process")

// // exec("java -jar ./java/out/artifacts/program_jar/program.jar  add MM.dd 30 D:/code/java/docx/task/", console.log)
// const getDirInfo = (path) => {
//     const stat = statSync(path);
//     if (stat.isFile()) return {
//         size: stat.size,
//         name: basename(path)
//     }
//     if (stat.isDirectory()) {
//         return readdirSync(path).map(name => getDirInfo(join(path, name)));
//     }
// }
// console.log(getDirInfo("./"))
const compressing = require("compressing")
const s = new compressing.zip.Stream();
s.addEntry("./dist")
const fs = require("fs");
const a = fs.createWriteStream("./b.zip");

s.pipe(a)