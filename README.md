# A Thing for Surfline!

## Installing:

1. ```npm install```
1. ```mkdir data;```
1. ```sudo mongod --dbpath=./data;```


## Running:

```npm start```

Runs on [http://localhost:5000](http://localhost:5000)



## Errors?

If you get any errors, try the following:

1. make sure your data directory exists (should be in the root directory of this project)
1. make sure mongod was started/is running with 'sudo'
1. If the page loads but you're not getting any data or there's a 500 error, clear your localStorage
  ```localStorage.clear()```
