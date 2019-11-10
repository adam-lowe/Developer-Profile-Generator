const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');

// function to make appending to aspects of response to file easier
function appendData(prePend, daType, apPend, rest) {
  fs.appendFileSync("profile.md", prePend + rest.data[daType]+ apPend + '\n\n', function(err) {

    if (err) {
      console.log(err);
    }
    
    });
  
}
// inquirer questions
inquirer.prompt([
    {
      type: "input",
      name: "gituser",
      message: "What is your github username?"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "color",
      choices: [
        "red",
        "orange",
        "yellow",
        "green",
        "brown",
        "purple",
        "blue"
      ]
    }
  ])  .then(function(response) {
    const username = response.gituser;
    const favcolor = response.color;
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl)
    .then(res => {
      if (fs.existsSync('./profile.md')) {fs.unlinkSync('./profile.md');}
      appendData('# ', 'name', '', res);
      appendData('![avatar picture](', 'avatar_url', ')', res);
      appendData('Username: ', 'login', '', res);
      appendData('Bio: ', 'bio', '', res);
      appendData('Following: ', 'following', '', res);
      appendData('Followers: ', 'followers', '', res);
      appendData('Public Repos: ', 'public_repos', '', res);
      appendData('Location: ', 'location', '', res);
      appendData('[Github Profile](', 'html_url', ')', res);
    })
    .catch(err => {
        console.error(err); 
    });
  });
  