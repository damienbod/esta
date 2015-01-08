var test  = require('tape');
var chalk = require('chalk');
var FS = require('../lib/fs.js');

test(chalk.cyan('CHECK if a ') + chalk.red('_data ') + chalk.cyan('directory exists'), function (t) {
  FS.dataDirExists(function (err, exists) {
    // console.log(exists);
    t.equal(exists, false, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir does NOT exist on startup"));
    t.end();
  });
});

test(chalk.cyan('CREATE the ') + chalk.red('_data ') + chalk.cyan('directory'), function (t) {
  FS.createDataDir(function (err, created) {
    t.equal(created, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("CREATED!"));
    // console.log(' ----> '+created);
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir exists cause we created it!"));
      t.end();
    });
  });
});

test(chalk.cyan('DELETE the ') + chalk.red('_data ') + chalk.cyan('directory'), function (t) {
  FS.deleteDataDir(function (err, deleted) {
    t.equal(deleted, true, chalk.green("✓ ") + chalk.red('_data DELETED!'));
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, false, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir was deleted"));
      t.end();
    });
  });
});

test(chalk.cyan('CREATE the ') + chalk.red('_data ') + chalk.cyan('directory if it Does NOT already Exist'), function (t) {
  FS.createDataDirIfNotExists(function (err, created) {
    t.equal(created, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("CREATED!"));
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir exists cause we created it!"));
    });
    // its already created at this point so it will not create twice
    FS.createDataDirIfNotExists(function (err, created) {
      t.equal(created, false);
      t.end();
    });
  });


});

// fake record
var record = {
  type: 'tweet',
  index: 'twitter',
  id: Math.floor(Math.random() * (1000000)),
  message: "what evs"
}

test(chalk.cyan('Check if a FILE (record) exists'), function (t) {
  FS.fileExists(record, function (err, exists) {

    t.equal(exists, false, chalk.green("✓ ") + chalk.red('record did not exists'));
    FS.saveFile(record, function (err) {
      t.equal(err, null, chalk.green("✓ no error creating the file"));
      t.end();
    });
  });
});




test(chalk.cyan('TIDY UP TIME ( delete the ') + chalk.red('_data ') + chalk.cyan('directory )'), function (t) {
  FS.deleteDataDir(function (err, deleted) {
    t.equal(deleted, true, chalk.green("✓ ") + chalk.red('_data DELETED!'));
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, false, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir exists cause we created it!"));
      t.end();
    });
  });
});