
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');


const questions = [
    {
        type: 'input',
        message: "GitHub username? (@ Not Needed)",
        name: 'username',
        default: 'CalvinEstrada',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Name your Github repo",
        name: 'repo',
        default: 'default',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Title your project",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Describe the steps required to install your project (Installation Section).",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use ( Usage section).",
        name: 'usage'
    },
    {
        type: 'input',
        message: "Provide guidelines on how other developers can contribute to your project, if needed.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "Provide any tests written for your application and provide examples on how to run them if needed.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "License for your project?",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'ISC', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success! Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);



async function init() {
    try {

        
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Fetching your GitHub data");
    
        
        const userInfo = await api.getUser(userResponses);
        console.log("GitHub user info: ", userInfo);
    
        
        console.log("Generating your README...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        
        await writeFileAsync('SampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();
