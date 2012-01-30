Overview
========
Build.hb is a development tool for hacking Handlebars templates for your Ember.js project. 
It uses the Handlebars compiler that ships with Ember to precompile the templates, producing a single
.js file that you can include in your Ember.js project. 

Build.hb can be run ad hoc or with a --watch flag, in which case it monitors the list of source
files and refreshes the single .js output file as and when any of the templates change. 


Settings
========
Configure your project in a buildhb.json file. These settings can be configured:

- templates_file (optional; default=templates.js)

- src


templates_file
--------------
By default build.hb creates a single output file named "templates.js". You can override the default
with the templates_file setting.


src
---
An array of .handlebars files. 


Running Build.hb
================
Run bin/buildhb from the directory that contains your project's buildhb.json configuration.
To continuously produce the output .js output file, add the --watch flag.


Example project
===============
See the examples/simple/ directory for an example project.