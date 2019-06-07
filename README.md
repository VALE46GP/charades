# Charades

This app allows a group of people to play charades together.

## Features

- Register new users
- Password authentication
- Login provides user object from database (currently MongoDB)

## Getting Started

While in development, run (in order):

### `npm install`

Installs dependencies needed for app

### `npm start-db`

Starts the database

### `npm run watch`

Builds the app and watches for changes to update

### `npm start`

Serves the app on port 3000

### `npm start-dev`

Serves the app through a proxy server
> Go to localhost:8080 in any browser.

## Usage

- Login or register a new user
- Submit "answers" for opponents to act out

## Main Features

##### Phase 0 (Alpha)

- User registration, login, password authentication
- Users can submit answers
- Users can request answers to act out (will never get their own answers)

##### Phase 1 (Connectivity)

- Actor selects who guessed correctly and that user's screen automatically switches to Act mode
- Ability to play in teams
- Chat capabilities

##### Phase 2 (History)

- Create different games and continue past games
- History: Users can view their past submissions and resubmit them to current game

##### Phase 3 (Stats)

- Users can rate answers
- Users can see how long it took them to act out different clues
- Users can view the average time it takes their clues to be guessed
- Superlatives: Users are rated on various criteria (ex: most difficult clues, best actor)

##### Phase 4 (Suggestions)

- Users can select answer to submit from a variety of categories (including past favorites)
- Currently selected answers are temporarily hidden from the list*

## Thoughts for Future Improvements

- Use cookies to login past users
- Use web-sockets to connect all current users

## Additional Information

- This app was created by Eric Callari as a personal project in 2019.
- Please reduce, reuse, and recycle.
