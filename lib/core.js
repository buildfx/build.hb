var fs = require('fs');
var buildfx = require('../build.fx/core');

var settings;
var settingsFile = 'buildhb.json';


exports.version = '0.0.2';

function buildTemplates(after) {
  console.log('\nBuilding templates...');
  buildfx.readSource(settings.src, function(templates) {
    var compiledTemplates = templates.map(function(t) {
      t.data = Ember.Handlebars.precompile(t.data.toString()).toString();
      return t;
    });

    var wrapPattern = 'Ember.TEMPLATES["%@"] = Ember.Handlebars.template(%@);';

    buildfx.concatenateToFile(compiledTemplates, settings.templates_file, wrapPattern);
    if (after) after();
  });
}


exports.main = function() {
  var hasWatchCommandlineArg = buildfx.hasCommandlineArg('watch');

  console.log('\nBuildHB \t\t\t version', exports.version);
  console.log('Copyright (c) 2012, Joubert Nel\n');

  settings = buildfx.loadSettings(settingsFile, hasWatchCommandlineArg);

  if (hasWatchCommandlineArg) {
    buildTemplates(function() {
      buildfx.watchForUpdates(settings.src, buildTemplates);
    });
  } else {
    buildTemplates();
  }

};

