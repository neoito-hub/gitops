var shell = require('shelljs');
var prompt = require('prompt');
var configParser = require('./config_parser')
var executer = require('./execute_build')

var prompt_schema = {
  properties: {
    command: {
      message: 'Enter command to run followed by network eg: build staging',
      required: true
    }
  }
};


//check if git and ssh are installed . (can get rid of the git dependecy if no need to locally to any git ops.)
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
else if (!shell.which('ssh')) {
    shell.echo('Sorry, this script requires ssh');
    shell.exit(1);
  }
else{
    //git and ssh exists so proceeding
    //prompt user to enter what to do
    prompt.get(prompt_schema, function (err, result) {      
      let command = result.command;
      let config = configParser.getConfig();
      command = command.split(' ');
      // console.log('command and network hosts are:',command[0],config.networks[command[1]].hosts)
      let commands_to_execute = config.commands[command[0]]['run'].split(';')
      // console.log('execution',commands_to_execute) 
      executer.executeAll(commands_to_execute);
      shell.exit(1);
    });
}