# Stocky
A fun app to go and get stocks

By [Ayo Amadi](mailto:ayodeleamadi@gmail.com)

[ayo.works](https://ayo.works)

[stocky-two.herokuapp.com](http://stocky-two.herkuapp.com/)

## Instructions

1. Navigate to [repo](https://github.com/ayoa77/stocky)
2. Clone locally using
   `git clone https://github.com/ayoa77/stocky.git`
3. Install dependencies using `npm install`
4. Create a .env and a .env.test file at the root
5. Set your environment variables to the following
6. FINNHUB_SECRET={from finnhub.io} SESSION_SECRET{whateverYOUDlike}
7. These should be the same for both except for the port key.
8. I recommend .env - port=3000 & .env.test - port=3002
9. Run tests using `npm test`
10. Start your development server using `npm run dev`
11. It is also production ready via heroku.
12. Navigate to app in [browser](http://localhost:3000)
13. Enjoy!


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
