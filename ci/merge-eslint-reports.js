const fs = require("fs");
const path = require("path");

const dirPath = "../";
const mergedFileName = "merged_eslint_report.json";

function getJsonFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = getJsonFiles(path.join(dir, file), fileList);
        } else {
            if (path.extname(file) === ".json" && file === "eslint_report.json") {
                fileList.push(path.join(dir, file));
            }
        }
    });
    return fileList;
}

const jsonFiles = getJsonFiles(dirPath);

let mergedContent = [];

jsonFiles.forEach((file) => {
    const content = JSON.parse(fs.readFileSync(file, "utf8"));
    mergedContent = [...mergedContent, ...content];
});

fs.writeFileSync(
    mergedFileName,
    JSON.stringify(mergedContent),
    "utf8"
);
