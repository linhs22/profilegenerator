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

        function generateHTML(userData) {}
        const data = await gs(answers.username, function(err, data) {

            const userData = {
                website: data.website,
                name: data.name,
                profilePic: data.avatar,
                userid: data.username,
                location: data.location,
                bio: data.bio,
                repo: data.repos,
                followers: data.followers,
                stars: data.stars,
                following: data.following
            }
            const html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
                <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                <title>Document</title>
            </head>
            
            <body>
                <div class="container">
                    <h1><img src="https://avatars0.githubusercontent.com/u/55717746?s=400&v=4" alt="Smiley face" height="200" width="200"></h1>
                    <h1>Hi!</h1>
                    <h1>My name is ${userData.name}</h1>
                    <h3>Currently ${userData.worksfor} </h3>
                    <ul>
                        <li><a href='https://www.google.com/maps/place/${userData.location}/'><i class=“fas fa-location-arrow”></i>${userData.location}</a></li>
                        <li><a href=“https://github.com/${userData.userid}“><i class=“fas fa-location-arrow”></i>Github</a></li>
                        <li><a href=“${userData.website}“><i class=“fas fa-location-arrow”></i>Website</a></li>
                    </ul>
                    <div class="row">
                        ${userData.bio}
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                Public Repositories
                            </div>
                            <div class="row">
                                ${userData.repo}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                Followers
                            </div>
                            <div class="row">
                                ${userData.followers}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                Github Stars
                            </div>
                            <div class="row">
                                ${userData.stars}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                Following
                            </div>
                            <div class="row">
                                ${userData.following}
                            </div>
                        </div>
                    </div>
            
                </div>
            
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
            </body>
            
            </html>`

            generateHTML(userData);
            writeFileAsync("index.html", html);

            console.log("Successfully wrote to index.html");
        });

    } catch (err) {
        console.log(err);
    }
}

init();