// execute commamnds obtained from config file on the specified server
var Client = require('ssh2').Client;
var async = require('async');
 

function executeAll(commands){
    let conn = new Client();    
    let connection_params = getConnectionParams();

    conn.on('ready', function() {
       async.eachSeries(commands,function(command,cbk){
        executeCommand(command,conn,function(){
            cbk();
        })
       },function(){
            console.log('FINISHED BUILD TASK')
       })
        
      }).connect(connection_params);
}

function executeCommand(command,conn,callback){
    conn.exec(command, function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
          callback();
        }).on('data', function(data) {
          console.log('STDOUT: ' + data);
          callback();
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
          callback();
        });
      });
}

function getConnectionParams(){
    return {
        host: '192.168.100.100',
        port: 22,
        username: 'frylock',
        privateKey: require('fs').readFileSync('/here/is/my/key')
      }
}

module.exports ={executeAll}