# wefox-backend

## Run
```
npm install
npm start
```

## Run in DEBUG mode
```
npm run debug
```

## Test
```
npm test
```

## Requirements
- NodeJS v16.2.0
- npm 7.13.0

### Notes
- I only implemented integration tests and skipped all unit tests because I didn't have enough time for both and for me testing the system is worth more than testing individual units

### If I had more time I would ...
  - Finish the challenge XD
  - Implement /login by providing a JWT and using that for authenticating the /weather API
  - Cache the /address request.  this would be super useful because 1 + n requests are all the same and the /weather request depends on it!
  - Test for fault tolerance (i.e: what happens is Nomanatim API returns 5xx?)
  - Test for completion (i.e: unit tests, e2e, etc.)
  - Dockerize :)
 
