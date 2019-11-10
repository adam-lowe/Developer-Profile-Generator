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
      name: "contact",
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
  ]).then(function(data) {
    console.log(data)
  });