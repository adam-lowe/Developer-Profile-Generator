const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');

function appendData(prePend, daType, apPend, rest) {
  fs.appendFileSync("profile.md", prePend + rest.data[daType]+ apPend + '\n\n', function(err) {

    if (err) {
      console.log(err);
    }
    
    });
  
}

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
      appendData('Bio: ', 'bio', '', res);
      // fs.appendFileSync("profile.md", res.data.name + '\n', function(err) {

      //   if (err) {
      //     console.log(err);
      //   }

      //   });
    })
    .catch(err => {
        console.error(err); 
    });
  });
  