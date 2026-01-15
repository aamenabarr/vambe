"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
// Get the current file's directory path
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var componentsPath = path_1.default.join(__dirname, '../components/ui');
var indexFilePath = path_1.default.join(componentsPath, '../../index.tsx');
// Generate the index.tsx file by looping through all the files in the components folder
var componentFiles = fs_1.default.readdirSync(componentsPath);
var exportStatements = componentFiles.map(function (file) {
    var componentName = path_1.default.basename(file, '.tsx');
    return "export * from './components/ui/".concat(componentName, "';");
});
var indexFileContent = exportStatements.join('\n') + '\n';
fs_1.default.writeFileSync(indexFilePath, indexFileContent, 'utf8');
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'index.tsx file generated successfully.');
