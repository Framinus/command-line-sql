### Known issues:

1) my test database data is not loading from my helpers.js file. clearDatabase and resetTaskIDs work.

2) my mocha tests are not reading the data passed into them from the returned promise; however, my test database is responding to the functions called in the test.

## What I have tried:

a) adding in then(done, done) to my promises. mocha docs seems to say this is unnecessary; however, many developers disagree with the mocha docs.

b) i have also tried modifying my query functions to return data so that mocha has something to work with.
