# <span style="color: green;"> Rise Upp App</span>

#### An application that allows users to search for a collection of pictures.

### <span style="color: orange;"> Usage</span>

```
git clone <github repository link>  //to clone the github repository
npm install                         //to install all the dependencies required to run application
npm start                           //to start the application
```
### Configure your own auth on [auth0.com](https://auth0.com/)

> when running on your machine:
  - set Allowed Callback Urls: `http://localhost:yourport`
  - set Allowed Logout Urls: `http://localhost:yourport`
  - set Allowed Web Origins: `http://localhost:yourport`

## <span style="color: Orange;"> Development</span>

### <span style="color: red;"> Tech Stack</span>

> <span style="color: violet;">Frontend - ReactJS (Redux store & Redux-thunk)</span>

### <span style="color: red;"> Features and Functionality</span>

- `Login`, `authentication` using `auth0`.
- App consist of `Input section`, `picture category bar` & `list of pictures` with `pagination`. 
- `Home page` consists of `input Section` where user can `enter picture category` to get a list of pictures.
- State management using `react-redux`, `redux-thunk` and `@reduxjs/toolkit`. (minimalist approach to handling asynchronous logic).
- On clicking on the `categories tab` will display the `respective category images`.
- `Active category` tab on the tab.
- On `hover` over the picture `pop` ups the `image info`.
- `Lazy-loading` of images.
- `No Results view` in case of `no results` for user input.
- `Failure view` on failure.
- `Responsive`

## <span style="color: Green;"> Guidelines</span>

- Followed Github Guidelines
  - Made the commits often and made sure the commit messages are concise and specific.
  - Included a README file for explaining the project setup, usage instructions.
- Followed Clean Code Guidelines
- The repo is well-organized and easy to navigate
  - Followed the `create-react-app` folder structure
- The Application handled all the errors

## <span style="color: Green;"> Resources </span>

### API Details

- You are required to register yourself as a developer and get the API keys at https://unsplash.com/developers

- For making the search request and fetching the results use this API https://unsplash.com/documentation#search-photos

### <span style="color: Green;"> Design Files </span>

- Reference: https://wireframe.cc/2AETjp

## <span style="color: Red;">Previews</span>

### <span style="color: Orange;"> Mobile View</span>

###### [Home View](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704536303/riseup/Screenshot_421_vfx9hz.png)

###### [No Results View](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704536302/riseup/Screenshot_422_e6msln.png)

###### [Failure View](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704536302/riseup/Screenshot_423_j0dqh3.png)

### <span style="color: Orange;"> Desktop View</span>

###### [Home Page](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704528606/riseup/home-page.png)

###### [No Results View](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704528603/riseup/no-results-view.png)

###### [Failure view](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704528604/riseup/failure-view.png)

### <span style="color: violet;">Demo</span>

### [Link](https://rise-upp-search-app.vercel.app/)
