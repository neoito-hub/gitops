//script to clone git repo. Incomplete
var prompt = require('prompt');
var shell = require('shelljs');

// function auth(user, pass) {
//   return 'Basic ' + (new Buffer(user + ':' + pass)).toString('base64'); 
// }

function cloneRepo(url,connection){
  let clone_url = '';

  let schema = {
      properties: {
        username: {
          message: 'Enter Your Credentials For cloning the repo,Username',
          required: true
        },
        password: {
          hidden: true
        }
      }
    };
    
    //NOTE: change later to ask for creds based on the value of this..
    let is_cred_required = true;

    if(is_cred_required){
      
      prompt.start();
      prompt.get(schema, function (err, result) {
        //ssh into server and clone
        // console.log('  username: ' + result.username);
        // console.log('  password: ' + result.password);

        //add credentials to repo url
        let repo_path = url.replace('https','');
        repo_path = repo_path.replace('http','')
        clone_url =`https://${result.username}:${result.password}@${repo_path}`;
        // console.log(clone_url)
        return clone_url;
        // var path = 'gitlab.com/neoitotech/PropertyOk-Website.git';
      });

    }
    else{
      clone_url =url;
      // console.log(clone_url)
      return clone_url;
    }
    
    

}
cloneRepo('gitlab.com/neoitotech/PropertyOk-Website.git')


