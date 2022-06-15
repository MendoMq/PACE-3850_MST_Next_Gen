# Handover Instructions

## Dependencies

**Node.js**: Install the latest version of Node.js (the one that says Recommended For Most Users) https://nodejs.org/en/ (please note that when development started, we all utilised version 16.14.2)

## Packages

These are the packages installed in our project, they are not necessary for you to install by hand, many of these will be added and installed automatically in the steps for installation below

**React**: React is the framework that runs off of node.js. Its purpose is to interpret the HTML / JS / CSS into a format that is both easy to develop for and allows for integration of other web-based node packages. 

**Nodemon**: Nodemon is a global extension to Node.js which allows us during development to edit the webpage while it is live.

**Material UI**: Material UI is the library of premade user interface components (Buttons, Sliders, Menus, etc..).

**Axios**: Axios is a package that expedites the process of calling an API using REST client commands (GET, POST, etc..).

**Cors**: Cors is a middle-man package that handles data communication between the front-end and back-end servers.

**Express**: Express handles information retrival and storage for our API using JSON. We paired this package with a MongoDB database for our persistent data storage.

**Mongoose**: MongoDB data schemas are created and communicated using Mongoose, we use this package to interpret the MongoDB JSON.

**ReactDom**: This package is an extension to React which provides components specialising in page routing. Links and page loading is handled here.

## Running the website on your local system

<ol>
  <li>Clone the repository to your system (save it in a location which you will remember)</li>

  <li>Navigate to the "mst-next-gen" folder (inside the downloaded folder) in the Terminal/Command Prompt (or you can right click on the folder in your File Explorer and open it in the Terminal/Command Prompt)</li>

  <img src="./mst-next-gen/commandPromptScreenshot.png" width = 600/>
  <li>Enter the command "npm install -g nodemon" (this will install all of the packages needed to run the React application, and may take a bit of time)</li>
  <li>Enter the command "npm install" (this will install all of the packages needed to run the React application, and may take a bit of time)</li>
  <li>Enter the command "npm run build"</li>
  <li>Enter the command "npm run server"</li>
  <li>Enter the command "npm run initData"</li>
  <li>In your web browser (preferably Chrome), type in the address 127.0.0.1:3001 into the search bar</li>
  <li>The website should appear.</li>
</ol>

## Database
We have utilised a MongoDB database for this project. 
The database is public, and you can access it by ... (SAMMY FILL OUT)

## Other Notes
There were some features that due to time constraints, we were not able to implement. Please see the slides from our final presentation (Deliverable 6) for most information on this. 

Please also feel free to reach out to us if you have any questions about the code.



