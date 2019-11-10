const inquirer = require('inquirer')
const fs = require('fs')
const axios = require('axios')

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
    const username = response.gituser
    const favcolor = response.color
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.error(err); 
    })
  });
  