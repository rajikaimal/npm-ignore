const fs = require("fs");
const path = require("path");
const fileExists = require("file-exists");
const npmIgnore = ".npmignore";

const npmIgnoreContent = `.*.swp\n._*\n.DS_Store\n.git\n.hg\n.npmrc\n.lock-wscript\n.svn\n.wafpickle-*\nconfig.gypi\nCVS\nnpm-debug.log`;

module.exports = directoryPath => {
  return new Promise((resolve, reject) => {
    const npmIgnorePath = path.join(directoryPath, npmIgnore);
    fileExists(npmIgnorePath)
      .then(exists => {
        if (exists) resolve(exists);
        else {
          fs.writeFile(npmIgnorePath, npmIgnoreContent, err => {
            if (err) reject(err);

            resolve(true);
          });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
