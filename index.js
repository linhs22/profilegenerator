const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var gs = require('github-scraper');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([{
        type: "input",
        name: "username",
        message: "What is your Git Hub username?"
    }]);
}

const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};


async function init() {
    console.log("hi")
    try {
        const answers = await promptUser();

        function generateHTML(userData) {
            console.log(userData.profilePic)
            return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <body>
    <h1><img src=${userData.profilePic} alt="Smiley face" height="200" width="200"></h1>
</body>`

        }
        const data = await gs(answers.username, function(err, data) {
            const userData = {
                profilePic: data.avatar,
                userid: data.username,
                location: data.location,
                github: `https://github.com/${data.username}`,
                bio: data.bio,
                repo: data.repos,
                followers: data.followers,
                stars: data.stars,
                following: data.following
            }

            generateHTML(userData);
        });







        await writeFileAsync("index.html", generateHTML(userData));

        console.log("Successfully wrote to index.html");
    } catch (err) {
        console.log(err);
    }
}

init();