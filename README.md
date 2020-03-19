# Stocky
A fun app to go and get stocks

By [Ayo Amadi](mailto:ayodeleamadi@gmail.com)

[ayo.works](https://ayo.works)
[stocky-two.herokuapp.com](http://stocky-two.herkuapp.com/)

## Instructions

1. Navigate to [repo](https://github.com/ayoa77/stocky)
2. Clone locally using
   `git clone git@github.com:ayoa77/stocky.git`
3. Install dependencies using `npm install`
4. Run tests using `npm test`
5. Start your development server using `npm run dev`
6, It is also production ready via heroku.
7. Navigate to app in [browser](http://localhost:3000)
8. Or take a look at the app here at [browser](http://localhost:3000)
8. Enjoy!


## Discussion

I used the following technologies: Node, Express, MongoDB/Mongoose, Mocha, JQuery, PUG/HTML, Bootstrap, and CSS.

## Requirements

#### Build and deploy an application with a user sign up, log in,
#### log out, and permissions to look up stock after authentication.

I was able to ajax all of the posts for a more fluid experience, with popup
errors and several user input edge cases, such as no blanks in passwords, and
lots more. The only time there is a page reload is when the user visits a 
different view. I also wrote a middleware that gives users permissions based 
on whether or not they have logged in ie. you have to be logged in to 
look up the stocks. 

#### Use an api to fetch data given a users choice of stock symbols
#### return the opening price for the matching stock.

This has also been ajaxed, and although I could have handled this all on
the front end, I decided to handle it on the server, so that I could keep
my api-key from the public.

#### TDD style! 

I took this opportunity to do about 50% in a TDD manner. This a long with
the beautifying is likely where I spent most of my time. The tests are a
lot like small puzzles and finally seeing it all go green was quite satisfying.

## Bonuses!

#### Make it look pretty!

I'd have to say that I somewhat succeded in this. I actually used this
project to learn a bit more about design and css. Apparently, linear
gradient backgrounds are in right now. In all honsety though, it could
be more responsive. If I had more free-time, I would definitely tackle
this challenge too :)
