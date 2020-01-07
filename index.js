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
                <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         text-align: center;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .ele {
            text-align: center;
            justify-content: center;
        }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between center;
           margin-top: 20px;
           margin-bottom: 20px;
           text-align: center;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           margin: 20px;
           text-align: center;
         }
         .title {
             margin-top: 60px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         ul {
            list-style-type: none;
            margin: 0 auto;
            padding: 0;
            overflow: hidden;
            justify-content: center;
            text-align: center;
          }
          
          li {
            float: center;
          }
          
          li a {
            display: block;
            text-align: center;
            padding: 5px;
            text-decoration: none;
          }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>

        </head>
            
        <body>
    <main>
        <div class="container">
            <div class="card">
                <div class="photo-header">
                    <img src="${userData.profilePic}" alt="profile pic height=" 200 " width="200 ">
                </div>
                <h1 class="title">Hi!</h1>
                <h1>My name is ${userData.name}</h1>
                <h3>Currently ${userData.worksfor} </h3>
                <ul>
                    <li><a href='https://www.google.com/maps/place/${userData.location}/'>${userData.location}</a></li>
                    <li><a href='https://github.com/${userData.userid}'>Github</a></li>
                    <li><a href=“${userData.website}“>Website</a></li>
                </ul>
            </div>
        <div class="row ">
           <h4>${userData.bio}<h4>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="row ele">
                        <h3>Public Repositories</h3>
                    </div>
                    <div class="row ele">
                        <h4>${userData.repo}</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="row ele">
                        <h3>Followers<h3>
                    </div>
                    <div class="row ele">
                        <h4>${userData.followers}<h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="row ele">
                        <h3>Github Stars<h3>
                    </div>
                    <div class="row ele">
                        <h4>${userData.stars}<h4>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="row ele">
                        <h3>Following<h3>
                    </div>
                    <div class="row ele">
                        <h4>${userData.following}<h4>
                    </div>
                </div>
            </div>
        </div>

    </div>
            
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