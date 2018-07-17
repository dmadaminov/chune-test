# Chune Music Feed (Web App)

Chune is a personalized music news feed featuring articles from a variety of music magazines as well as artist interviews from hundreds of curated YouTube channels. We're a one-stop-shop for music culture news.

Deployed at [chunemusicfeed.com](https://chunemusicfeed.com)

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Compiling Locally for Development and Testing

1. Clone the repo.

2. Place the following .env file in the project root, with relevant information inputted.
```
AUTH_PROVIDER_X509_CERT_URL=""
AUTH_URI=""
CLIENT_EMAIL=""
CLIENT_ID=""
CLIENT_X509_CERT_URL=""
PRIVATE_KEY=""
PRIVATE_KEY_ID=""
PROJECT_ID=""
TOKEN_URI=""
TYPE=""
YOUTUBE_API_KEY=
BANDS_IN_TOWN_API_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
LAST_FM_API_KEY=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DATABASE_URL=
NODE_ENV=
```

3. Install node modules
```
npm install
```

4. Compile locally
```
npm run start-dev
```

## Running tests

Insert explanation for how to run the automated tests

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment & Branching Strategy

Chune is deployed on Google Cloud with the following structure.

- TEST: [test.^.com](https://test.chunemusicfeed.com)
- DEV: [dev.^.com](https://dev.chunemusicfeed.com)
- PROD: [^.com](https://chunemusicfeed.com)

where ^ = domain name

- `master` is production code. No one will push to this branch.
- `dev-master` is the latest dev branch and can be pushed/merged/pulled by anyone (you).
- `test-master` is the branch where a developer does a pull request and it automatically deploys to the test environment.

### The Flow
- Development has a separate branch and things can break there, no issues. Once you feel confident, create a pull request to the test branch.
- The CI server automatically pulls the code from test -> runs through some quick checks -> pushes it to the test environment.
- Once we're fully confident in the new fixes/features we give the go-ahead to the Continuous Integration server, which
    1. Merges with master
    2. Deploys in the production environment
    3. Updates the test & dev refs to the HEAD of the repository

## Built With

* [React](https://github.com/reactjs/reactjs.org) - The web framework used
* [Material-UI](https://github.com/mui-org) - React components that implement Google's Material Design
* [Firebase](https://github.com/firebase/) - Cloud Firestore and Realtime Database
* [Postgresql](https://www.postgresql.org/) - Postgresql Database (Version 10).

## Authors

* **Kieran Derfus** - *Technical Co-Founder* - [kieran9176](https://github.com/kieran9176)
* **Ryan Margono** - *Initial work* - [ryanmargono ](https://github.com/ryanmargono )
* **Dusan Mitrovic** - *Increased functionality and architecture* - [DusanMitrovic](https://github.com/DusanMitrovic)
* **Chan Myae San Hlaing** - *Head developer* - [dreamingblackcat](https://github.com/dreamingblackcat)
* **Luka Zivkovic** - *Head UX designer* - [Luka's Portfolio](https://www.toptal.com/designers/resume/luka-zivkovic)
* **Isak Bosman** - *Machine learning, testing and deployment* - [geekonedge](https://github.com/geekonedge)
* **Tom Young** - *Testing and deployment*

See also the list of [contributors](https://github.com/ChuneMusic/ChuneWeb/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to all our media sources for putting out great content!
