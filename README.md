# speedline

This application runs on JavaScript react to be specific and Next.js
It was built using https://vercel.com/ so could test next.js locally, as well as using RAPID API marketplace
for APIs

- the key is hidden in a file you will need to create called .env.build the only contents are as follows

<code>RAPIDAPI_KEY=[Your Key goes here]</code> or REACT_APP_API_KEY = ......

Used https://vercel.com/ as NOW CLI to test project locally. You will need to create and account or use other methods

- if you use other methods be sure to remove the next.config.js and now.json files.

Steps

1. Download <code>npm i -g now</code> at your project root
2. Make sure create your .env.build file
   - I already have the API set up and the next.config.js and now.json files you will need this file before
     you can run next command.
3. Run <code>now login</code>
   - you will be prompted to login asking for email for verification
4. run <code>now</code>
5. Follow promps, I did not overide any settings ... if you do you are on your own
6. Run <code>now dev</code> The application should again be available at http://localhost:3000
7. In the project root make sure tin run <code>npm install isomorphic-unfetch --save</code>
   and <code>npm install react-google-maps --save</code>
   - none of my node packages are here so you need to make sure to install them
