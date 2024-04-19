# Getting Started with BCT-Boggle

This project was bootstrapped with [BCT-Boggle].

## Available Scripts

In the project directory, you can run:

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

To learn React, check out the [React documentation](https://reactjs.org/).

### `Note: Please read the below points before running the application`

1. '3' Minutes Timer is on place for both the options(Play, Play with Friens)
2. 'Single Player':-Here Single player is playing the game, Scores are calculated as expected by the assignment documentation. Validations also in place(refer the validtors.js file).
3. 'Mutiple Player':- Assuming that we have only 2/3/4 friends, room is created for individual player, respective card will be displayed in the ui (Just want to showcase the working scenario of mutiple players game). Scores are calculated as expected by the assignment documentation. Once Timer is timedout scores are calculated. and I am not displaying the players entered words in ui, it will be displayed at the end(timer ends). Validations also in place(refer the validtors.js file).
4. As of now suporting only English(I am using the 'wordlist-english.txt' as dictiory)
5. Reset the game by clicking the 'restart'
6. Given comments for each components, methods for better readability.
7. First part solutions are in 'game.js' file(model/game/game.js file). FYI, Methods are 'wordListScore' & 'multiPlayerScore'.
