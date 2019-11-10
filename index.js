const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');

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
]).then(function (response) {
  const username = response.gituser;
  const favcolor = response.color;
  const queryUrl = `https://api.github.com/users/${username}`;
  axios.get(queryUrl)
    .then(res => {

      // function to make appending to aspects of response to file easier
      function appendData(prePend, daType, apPend) {
        fs.appendFileSync("profile.md", prePend + res.data[daType] + apPend + '\n\n', function (err) {

          if (err) {
            console.log(err);
          }

        });

      }
      
      if (fs.existsSync('./profile.md')) { fs.unlinkSync('./profile.md'); }
      appendData(`# <span style="color:${favcolor}">`, 'name', '</span>');
      appendData('![avatar picture](', 'avatar_url', ')');
      appendData('Username: ', 'login', '');
      appendData('Bio: ', 'bio', '');
      appendData('Following: ', 'following', '');
      appendData('Followers: ', 'followers', '');
      appendData('Public Repos: ', 'public_repos', '');
      appendData('Location: ', 'location', '');
      appendData('[Github Profile](', 'html_url', ')');
    })
    .catch(err => {
      console.error(err);
    });
});
