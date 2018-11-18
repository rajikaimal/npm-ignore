const test = require("tape");
const mkdirp = require("mkdirp");
const rmdir = require("rmdir");
const path = require("path");
const fs = require("fs");
const npmIgnore = require("./index");

test("npmIgnore should return true for new .npmignore", t => {
  mkdirp.sync(".tmp");

  npmIgnore(".tmp").then(created => {
    console.log(created);
    t.true(created);
    t.end();
  });
});

test("npmIgnore shouldn't override existing .npmignore", t => {
  mkdirp.sync(".tmp");

  const filePath = path.join(".tmp", ".npmignore");
  fs.writeFile(filePath, ".*.swp", err => {
    if (err) t.end(err);
    npmIgnore(".tmp").then(created => {
      t.true(created);
      t.end();
    });
  });
});

test("teardown", (t) => {
  rmdir(".tmp");
  t.end();
});
