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
  <li>Enter the command "npm install -g nodemon"</li>
  <li>Enter the command "npm install" (this will install all of the packages needed to run the React application, and may take a bit of time)</li>
  <li>Enter the command "npm run build"</li>
  <li>Enter the command "npm run server"</li>
  <li>Enter the command "npm run initData"</li>
  <li>In your web browser (preferably Chrome), type in the address 127.0.0.1:3001 into the search bar</li>
  <li>The website should appear.</li>
</ol>

## Database
We have utilised a MongoDB database for this project, and we currently access the public database with an account that is registered with Xiaokai's student email. 

We strongly suggest that you register a new MongoDB account for this project since this is Xiaokai's personal account. The data in this database currently is all test data, so you will need to create and store your own real data regardless. 

After you register an account with MongoDB, it will generate a connection link/string (like the string below in dbURL).
Then, you just need to replace the link in the dbURL variable in **config.js**, which you can find in the directory **"mst-next-gen > Server > db"**. This is the variable that allows us to access the correct database.
> dbURL: 'mongodb+srv://sammyzzzzz:cxz13978@cluster0.yxp6nfp.mongodb.net/test'

We also recommend downloading a program called MongoDB Compass to manage the database.

There is a file called **initData.js** in **"Server > db"**,
you can delete it after you get the real data in the future.

## Other Notes
There were some features that due to time constraints, we were not able to implement. Please see the slides from our final presentation (Deliverable 6) for most information on this. 

Please also feel free to reach out to us if you have any questions about the code.



