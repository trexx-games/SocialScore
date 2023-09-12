# How to run backend locally

1. Install dependencies with `yarn`
2. Start docker daemon on your local machine
3. Spin up the backend environment with docker

   ```bash
    # to spin up database for development
    # (Intel Chip)
    $ yarn docker:dev

    # (silicon chip)
    $ yarn docker:dev:arm
   ```

4. Start backend server

   ```bash
   # for development
   $ yarn backend:dev

   # for prod
   $ yarn backend:build
   $ yarn backend:start
   ```

5. Seeding to database

   ```bash
    yarn backend:seed:run
   ```

6. Great! The backend should be accessible with below endpoint on browser

   ```
   http://localhost:3434/graphql
   ```

7. Start frontend application to interact with the backend API. How?
   Do checkout the documentation [here](../README.md#user-onboarding)
