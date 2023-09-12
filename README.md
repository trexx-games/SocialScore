# Social Chain Scorer

## Table of contents

- [Getting Started](#getting-started)
- [Guide](#guide)

---

## Used of Technologies

1.  Build System - `NX`
2.  Framework - `NestJs`, `NextJs`
3.  Coding styles - `TypeScript`
4.  Coding Practice - `Eslint` rules for `(.js, .jsx, .ts, .tsx)`

---

## Development Requirements

Do take note that development tools should met with below requirements:

| Tools           | Version            |
| --------------- | ------------------ |
| Package Manager | Yarn               |
| NodeJs          | > 14.17.3 - latest |

---

# Getting Started

> This part only for developer

1. Install dependencies `yarn`
2. Setup fundamental services with docker (optional)

   ```bash

     # to spin up database for development
     # (Intel Chip)
     $ yarn docker:dev

     # (silicon chip)
     $ yarn docker:dev:arm

     # to build image container
     $ yarn docker:build

   ```

3. Run development server
4. Start coding

```bash
# to install dependencies
$ yarn
# or
$ yarn install
```

## Available commands:

```bash
# to start development server
$ yarn <target>:dev

# to build production
$ yarn <target>:build

# to start production server
$ yarn <target>:run

# --------------------------
# Testing
# --------------------------
# to run test for cms project
$ yarn <target>:test
$ yarn <target>:e2e


# --------------------------
# Miscellaneous
# --------------------------
# to run prettier
$ yarn format

# to view dependency graph
$ yarn dep

# to commit
$ yarn cz

# to run eslint check
$ yarn lint # run for all projects & packages
```

If you wish to install/remove dependencies into projects, you can use command below

```bash
# to install dependencies
yarn add <DEPENDENCIES>

# to remove dependencies
yarn remove <DEPENDENCIES>
```

---

## Guide

1. How to run backend on your local machine [docs](./docs/guide-how-to-run-backend.md)
2. How to run the web application on your local machine [docs](./docs/guide-how-to-run-frontend.md)
