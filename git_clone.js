//script to clone git repo. Incomplete
var prompt = require('prompt');
var shell = require('shelljs');

function cloneRepo(url,connection){
    let schema = {
        properties: {
          username: {
            message: 'Enter Your Credentials For cloning the repo',
            required: true
          },
          password: {
            hidden: true
          }
        }
      };
    prompt.start();
    prompt.get(schema, function (err, result) {
    //ssh into server and clone
    console.log('input received:');
    console.log('  username: ' + result.username);
    console.log('  password: ' + result.password);
    let auth = result.username + '@' + result.password;
    // let command ='git clone' +' ' +'https://' + auth + ':'+url;
    let command ='git clone' +' ' +'https://' + url

    console.log(command)
    shell.exec(command);

    // conn.exec(command, function(err, stream) {
    //     if (err) throw err;
    //     stream.on('close', function(code, signal) {
    //       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
    //       conn.end();          
    //     }).on('data', function(data) {
    //       console.log('STDOUT: ' + data);
    //     }).stderr.on('data', function(data) {
    //       console.log('STDERR: ' + data);
    //     });
    //   });


    });

}

// cloneRepo('gitlab.com/neoitotech/PropertyOk-Website.git')