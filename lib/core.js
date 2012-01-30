var fs = require('fs');
var buildtools = require('./buildtools');

var settings;
var settingsFile = 'buildhb.json';


require('./ember-headless');

exports.version = '0.0.1';

function buildTemplates(after) {
  console.log('\nBuilding templates...');
  buildtools.readSource(settings.src, function(templates) {
    var compiledTemplates = templates.map(function(t) {
      t.data = Ember.Handlebars.precompile(t.data.toString()).toString();
      return t;
    });

    var wrapPattern = 'Ember.TEMPLATES["%@"] = Ember.Handlebars.template(%@);';

    buildtools.concatenateToFile(compiledTemplates, settings.templates_file, wrapPattern);
    if (after) after();
  });
}


exports.main = function() {
  var hasWatchCommandlineArg = buildtools.hasCommandlineArg('watch');

  console.log('\nBuildHB \t\t\t version', exports.version);
  console.log('Copyright (c) 2012, Joubert Nel\n');

  settings = buildtools.loadSettings(settingsFile, hasWatchCommandlineArg);

  if (hasWatchCommandlineArg) {
    buildTemplates(function() {
      buildtools.watchForUpdates(settings.src, buildTemplates);
    });
  } else {
    buildTemplates();
  }

};

