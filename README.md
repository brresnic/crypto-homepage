# Daily Hot Cryptos Code/Design Challenge

This project enables users to 
1) consume an overview of the most popular crypto assets 
2) drill into a specific crypto asset in order to see a more detailed visualization of its information.

## Instructions on how to setup and serve the webpage

In the project directory, you can run:

#### `npm install`

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Instructions on navigating about the webpage

The page consists of a legend, bubble chart, and list of cryptos. Click on the legend, a crypto, or a bubble to see further details.

## A note on requirements versus implementation

I implemented this project as a single page app. I did not implement a specialized page for each crypto asset, and instead implemented expandable cards. I think this creates a better experience for my design. 

I also did not include icons for each cryptocurrency. Instead, I prioritized creating a bubble chart. My goal was to fulfill the intent of the prompt, while delivering the best user experience possible, within the time that I had.   

## TODOs

If I were to continue working on this repo, some things I would do include:

1. Refactor style
2. Improve error handling (for example, while fetching data)
3. Refactor components for reusability/extensibility (for example, require certain props)
4. Make the page responsive, and mobile friendly
5. Add placeholder content while data is loading
6. Add a yellow marker to the legend indicating the return of the currently selected crypto
7. User test and address usability issues

## Misc notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project is also hosted here: https://github.com/brresnic/crypto-homepage