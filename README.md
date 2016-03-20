# Meta Community Site

This is the code for the homepage of Meta Community, a community of Dominican Software Development Communities and Usergroups which aims to help each usergroup to reach more people, improve their resource management and channel sponsorship efforts.

Feel free to open issues, participate in those, and offer to tackle any issue that is not currently being worked on.

The live site is located at http://metacommunity.herokuapp.com/ and is deployed once a week.

Bear in mind that this is a community driven effort, and answers to your issues or pull requests may take some time to process.

## Prerequisites

Before starting you will need to:

1. Install [node >= 5.2](https://nodejs.org/)

2. Install [mongodb >= 3.0](https://docs.mongodb.org/manual/installation/)

3. Install and update [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

Or, if you prefer using containers:

1. Install [Docker >=1.10.2](https://docker.com)

## Getting it running

Once the repo is cloned in your machine, make sure to install the npm and gulp-cli packages by running:
```
npm install
npm install -g gulp
```
After that run the mongodb server with the default port settings in another terminal window by typing:
```
mongod
```
Then, in order to populate the database do:
```sh
$ gulp migrate
```
Finally run `gulp` and the webpage will open on [localhost:3000](localhost:3000) if the page stays blank after a while just close the browser tab and open the page again.

### Running with Docker

From the repository directory, run:

```sh
# Download & build images
$ docker pull mongo:2.6
$ docker build -t meta .

# Create & start containers
$ docker run --name meta_db -d -P mongo:2.6
$ docker run --name meta_app --link meta_db --env MONGOLAB_URI='mongodb://meta_db:${META_DB_PORT_27017_TCP_PORT}' -p 3004:3004 -t meta gulp migrate && npm start
```

Hate writing commands by hand? `docker-compose` instructions are comming soon.

## Gulp Tasks

### `gulp build:scss`
> Transpiles and optimizes project's styles.

Additionally, it prefixes CSS properties with `vendor prefixes`.

*Heads-up*: This task notifies `BrowserSync` of changes to files.

### `gulp browser-sync`
> Enables automatic browser refreshes on asset changes.

### `gulp nodemon`
> Enables automatic server restart on server-side file changes.

### `gulp migrate`
> Applies all migrations up until now.

### `gulp migrate:down`
> Un-dos all migrations down until to the first one.

### `gulp watch`
> Listens for file changes and re-runs certain tasks.

### `gulp`
> Alias for `browser-sync, watch, nodemon, build:scss`

## Issues

If you see something wrong or something you simply don't like, make sure to submit [an issue](https://github.com/xpostudio4/metacommunity/issues/).

## PR's and code reviews

After submitting a PR at least two other people have to go through, review your code and call it ok before it being accepted. Take feedbacks with love and remember that we all want to make the best thing ever, so it's never personal when people point out the fact that what you did is not ok.
