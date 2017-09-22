### Known issues:

1) my test database data is not loading from my helpers.js file. clearDatabase and resetTaskIDs work.

2) my mocha tests are not reading the data passed into them from the returned promise; however, my test database is responding to the functions called in the test.

~~ 3) there is a lag of about 7 seconds after i run query functions. The data has already been returned, so I am guessing that an open connection pool is the culprit. ~~
* chained process.exit to the end of my initializeCmd function and the lag stopped. *

## What I have tried:

a) adding in then(done, done) to my promises. mocha docs seems to say this is unnecessary; however, many developers disagree with the mocha docs.

b) i have also tried modifying my query functions to return data so that mocha has something to work with.

c) for the database lag, i have tried:
 - putting 'pgp.end()' in a finally block at the end of each query function. this throws a syntax error, even though i am copying the example from pg-promises almost verbatim.

 - i have tried exporting my pgp info as a variable into this main file, but that throws a reference error.
