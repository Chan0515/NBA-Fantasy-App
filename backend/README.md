Welcome to my NBA Fantasy Basketball Statistics App backend repository.

The contents of this repository are what I am currently using to host my backend 
server on Heroku.
Here is one of the routes as an example:
https://chan0515.herokuapp.com/api/L30/

Key files:

Statistics Scrubbing Script:
\api\management\commands\scrub.py
This script is run everyday at 2AM automatically by Heroku. The command scrapes 
data from basketball-reference.com for all current players' stats and feeds the 
data to our Django model. Django will then make the necessary SQL queries to our 
PostGreSQL database also hosted on Heroku.

The script also does the statistical analysis for all categories before pushing 
the data through Django. We find the mean and standard deviation from the top 
200 players and find the respective z-scores for all players and categories. 
Separate tables for z-scores instead of decimal valuesare marked precedingly with 
a "z" in our models.

The code is admittingly very long, but because we are scraping data instead of 
getting it from an API, I believe the length is necessary still. Improvements may 
be made in the future.

Models:
\api\models.py
This file contains all of our models for our database tables.

Routes:
\api\urls.py
This file contains all of our routes for our respective views for our API.

Views:
\api\views.py
This file contains all of our views for our API. 