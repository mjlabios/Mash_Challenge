# Web and Mobile Challenge

The Challenge:
Build a cross-platform solution for a global audience, integrating both mobile and web technologies.

## Description

Repository contains the source code for a web and mobile app designed to answer the challenge. The code was developed with these points in mind - React, TypeScript, native development, API integration, security practices, localization, global features, and overall system scalability.

## Tech Stack

- React Native
- React
- My SQL
- NextJS

## Notable Specifications

- Encrypted Login using AES encryption.
- Change password feature available for web version.
- Automatic language and validation change when a country is selected eg. Spain - spanish, India - hindi and UAE - english
- Responsive mobile and web UI for different window sizes.
- Mobile global feature of sharing is implemented.

# Challenge Requirements

## Mobile App (React Native)

### Functionality:

- ##### Does the mobile app validate usernames according to country-specific rules? - Yes

  - For the default country UAE and other various countries the Username must be alphanumeric and must have a minimum of 5 characters
  - For India the Username must only be alphabetic and must have a mininum of 6 characters
  - For Spain the Username can be alphanumeric and must have a minimum of 7 characters

- ##### Does the app work base on different locale selection?

  Yes, supported languages include En-english, Es-spanish and Hi-hindi. The language automatically changes when a particular country is selected as well:

  - India - Hi
  - Spain - Es
  - UAE and others - En

- ##### Does the app display stored user data as intended?

Yes, the data is stored in a remote db which is fetched by the local server.

- ##### Is the native module integrated and functioning properly as expected?

  Yes, The NativeModule system exposes instances of Java/Objective-C/C++ (native) classes to JavaScript (JS) as JS objects, thereby allowing you to execute arbitrary native code from within JS.

- ##### Is the theme based on country applied on successful login.
  Depending on the chosen country the language will change.

### Code Quality:

- ##### Is the React Native codebase clean, well-organized, and following best practices?
  Yes, IDE used to developed has prettifier to structure the code and the folders are structured to follow standard react and react native folder structuring.
- ##### Are there proper comments and error handling mechanisms?
  Yes
- ##### Are all the test cases passing and covers the requirements?
  Yes
- ##### Is the code written in a modular manner for reusability?
  Yes, the modules are loosely coupled for reusability and scalability.

### Security:

- ##### Is user data stored securely on the device?
  Data is persisted using asyncstorage and redux context.
- ##### Are there measures in place to prevent unauthorized access to stored data?
  There is an AES encryption in place using react-native-crypto-js.

## Web App (Next JS - React)

### Functionality:

- ##### Does the web app authenticate users based on the credentials stored via the mobile app?
  Yes, after registration the user may choose to login using his/her username or email address.
- ##### Does the web app apply the same country-specific username validation rules?

  - Yes
  - For the default country UAE and other various countries the Username must be alphanumeric and must have a minimum of 5 characters
  - For India the Username must only be alphabetic and must have a mininum of 6 characters
  - For Spain the Username can be alphanumeric and must have a minimum of 7 characters

- ##### Is the theme applied based on the country and user type.
  Depending on the chosen country the language will change.
- ##### Is the locale selection working as per the requirement.
  Yes, selecting a country changes the language as well.

### Code Quality:

- ##### Is the React web codebase clean, well-organized, and following best practices?
  Yes, IDE used to developed has prettifier to structure the code and the folders are structured to follow standard react and react native folder structuring.
- ##### Are there proper comments and error handling mechanisms?

  Yes

- ##### Are all the test cases passing and covers the requirements?
  Yes
- ##### Is the code written in a modular manner for reusability?
  Yes, the modules are loosely coupled for reusability and scalability.

### Security:

- ##### Does the web app communicate securely with the server or API?
  Yes, the web app connect to the remote db using axios API.
- ##### Are there measures in place to secure the authentication process?
  There is an AES encryption in place using crypto-js.

### Responsiveness:

- ##### Is the web app responsive, adapting to different screen sizes?
  Yes, using MUI and applying a combination of box, container and grid the app would support windows of every size.

### Additional Features:

- ##### Does the web app provide a dashboard after successful login?
  Yes, there is a profile page where the user may view his/her credentials.
- ##### Is there a secure mechanism for users to change their password?
  Yes, in the profile page there is a textfield for changing password.

# Instructions

- Run the web app first, go to the web app folder and 'yarn install' then 'yarn dev' to run the app. Go to localhost:3000 to see web app.
- To run the mobile app, go to the mobile app folder and 'yarn install'. if running ios go to the ios folder and 'pod install' after that go back to the mobile folder and 'yarn start' - select which device to run in the console
