MyBnbMemories
=============

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

What's the idea/pitch?
----------------------

MyBnbMemories is an experimental project. It should be currently used only by experimented developers.

Airbnb prefers that his customers look towards their next trips: next trips = business and money.

As a frequent Airbnb user, you get very few information and statistics about your past trips.

The goal is to create a simple application which will automatically compile and display useful data and statistics about your personal past trips.

Currently, MyBnbMemories is developed as a stand-alone application using [Electron](http://electron.atom.io).
It uses librairies like Request Promise Native to make calls to the private Airbnb API.
The client-side web application of the Electron app is inside the `vue` folder and is a [Vue.js](https://vuejs.org) Single Page Application.

It uses Vue Material, Google Maps API, Charts.js and other cool librairies around...

How does it look like?
----------------------

There's not a lot of feature currently. You can login by entering your Airbnb email and password. If everything goes well, you get a single page board with a Google Maps and markers of your previous travels. Bellow you get some cards with information of your past travels and total price you paid for each.

![Screenshot](https://raw.githubusercontent.com/nicolasblanco/my-bnb-memories/master/bnb_memories.gif)

How to run?
-----------

Make sure you have at least Node LTS. Run `npm install` in both the current directory and the `vue` directory.

```
node -v # => should be at least v6.9.5 or up.
npm install
cd vue ; npm install ; cd ..
```

Set the `AIRBNB_CLIENT_ID` token in the `.env` file in the root project directory.
You may use the one used by the Airbnb official Android application.

```
echo "AIRBNB_CLIENT_ID=3092nxybyb0otqw18e8nh5nty" >> .env
```

To build the full GUI and run the Electron app at the end:

```
npm run build_run
```

To just run the Electron app without rebuilding anything:

```
./electron
```


Questions/Answers
-----------------

* This doesn't work!

Yep, there's a very high probability it does not work for you or your account data.
Please help me by trying to fix the bugs and contribute by opening pull requests.
Your help is appreciated!

* Why is this a stand-alone app and not a web app?

To be able to make native calls to the Airbnb private API and not being blocked by limitations of an external web app (CORS, etc.)

* Do you look at my username/password? Do you store any of my data?

The application is doing direct calls to the Airbnb API, exactly like the mobile application would do for instance. There is no proxying or storing of your data. The application is open source, you can have a look at the source code...

* Is there a probability of being banned/blocked by Airbnb for using this application?

There shouldn't but you guarantee nothing. We're just doing simple calls to the mobile API. Of course this software is totally experimental and non-official so we guarantee nothing and cannot be held responsible of any problems.
