//script to parse the yaml config file
yaml = require('js-yaml');
fs   = require('fs');

function getConfig(fileName){
  // Get document, or throw exception on error
  try {
    var doc = yaml.safeLoad(fs.readFileSync('example_conf.yml', 'utf8'));
    return doc;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {getConfig}