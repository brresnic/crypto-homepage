# Daily Hot Cryptos

This project enables users to 
1) consume an overview of the most popular crypto assets 
2) drill into a specific crypto asset in order to see a more detailed visualization

## Instructions on how to setup and serve the webpage

In the project directory, you can run:

#### `npm install`

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Instructions on navigating about the webpage

The page consists of a legend, bubble chart, and list of cryptos. Click on the legend, a crypto, or a bubble to see further details.

Cryptos are colorcoded according to their daily change in value, as determined by coincap.io

 
## TODOs

If I were to continue working on this repo, some things I would do include:

1. Add icons (using https://static.coincap.io/assets/icons/cryptoasset@2x.png)
2. Add a yellow marker to the legend indicating the return of the currently selected crypto
3. Refactor style
4. Improve error handling (for example, while fetching data)
5. Refactor components for reusability/extensibility (for example, require certain props)
6. Make the page responsive, and mobile friendly
7. Add placeholder content while data is loading, and resize/center the loading icon
8. User test and address identified usability issues

## Misc notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project is also hosted here: https://github.com/brresnic/crypto-homepage
