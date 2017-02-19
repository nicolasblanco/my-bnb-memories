MyBnbMemories
=============

What's the idea/pitch?
----------------------

MyBnbMemories is an experimental project.

Airbnb prefers that his customers look towards their next trips: next trips = business and money.

As a frequent Airbnb user, you get very few information and statistics about your past trips.

The goal is to create a simple application which will automatically compile and display useful data and statistics about your personal past trips.

Currently, MyBnbMemories is developed as a stand-alone application using Electron, Vue.js and Vue Material for the Graphical User Interface and of course a bunch of cool librairies around...

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
