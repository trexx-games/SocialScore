# Social Chain Scorer

## Table of contents

- [Technical Stack](#technical-stack)
- [Development Requirements](#development-requirements)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Guide](#guide)

---

## Technical Stack

| Technology     | Description                                                                                                   | Reference                       |
| -------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| PostgreSQL     | Powerful, open source object-relational database system                                                       | https://www.postgresql.org/     |
| Redis          | Caching & background Process purpose                                                                          | https://redis.com/              |
| Docker         | Build, share, and run container applications                                                                  | https://www.docker.com/         |
| NodeJs         | Cross-platform JavaScript runtime environment                                                                 | https://nodejs.org/en           |
| TypeScript     | Strongly typed programming language that builds on JavaScript                                                 | https://www.typescriptlang.org/ |
| NX             | Advanced build system with mono-repo support                                                                  | https://nx.dev/                 |
| NestJs         | NodeJs framework for building efficient, reliable and scalable server-side applications.                      | https://nestjs.com/             |
| NextJs         | The React framework                                                                                           | https://nextjs.org/             |
| Apollo GraphQL | API communication between server & client                                                                     | https://www.apollographql.com/  |
| Material UI    | Library of react components                                                                                   | https://mui.com/                |
| EthersJs       | Library for interacting with the Ethereum Blockchain and its ecosystem                                        | https://docs.ethers.org/v5/     |
| Solidity       | Smart Contract Language                                                                                       |                                 |
| Thirdweb       | SDKs for interacting with Blockchain                                                                          |                                 |
| Airstack       | SDKs for interacting with Blockchain                                                                          | https://www.airstack.xyz/       |
| Hardhat        | Development environment for Ethereum software                                                                 | https://hardhat.org/            |
| JWT            | JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties | https://jwt.io/                 |

---

## Development Requirements

Do take note that development tools should met with below requirements:

| Tools           | Version            |
| --------------- | ------------------ |
| Package Manager | Yarn               |
| NodeJs          | > 14.17.3 - latest |

---

# Folder Structure

```bash
├── apps
│    ├── backend # backend project
│    └── web # frontend project
└── libs
     ├── data-access # graphql codegen
     └── server # server environment configuration
```

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
$ yarn web:dev

# to build production
$ yarn web:build

# to start production server
$ yarn web:run

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

## Folder Structure

```
├── apps
│    ├── web
│    └── backend
└── libs
    ├── data-access # backend module
    ├── shared-assets
    │     ├── images # shared images
    │     └── locales # locales file
    ├── server # server modules
    ├── ui-components # shared components
    ├── utils-crypto # shared utils functions about crypto
    └── utils-helpers # shared utils functions
```

---

## User Onboarding

After starting the web app, which will be hosted on 'localhost:6767'. The user will be directed to a landing page, where users can click on the 'Sign In or Login' to get Started.

### Login / Sign Up

The Login and Sign up is the same action in our app, where it takes a certain username and password and then derives a smart wallet for it (ERC4337). If the user is using the platform for the first time, it will save the username to IPFS and a smart wallet is created. The user will then be using the smart wallet to interact with our social scoring systems.

### Linking wallets

One smart wallet entity can be connected to many personal wallets that will contribute to the final score. To link a wallet, Trexx will prompt the user to sign an auth message that will be decrypted by the backend to check for eligibility and then proceed to score calculation.

### Dashboard

The dashboard displays the smart wallet as the main entity and all connected personal wallets will be sub entities that can be viewed in more detail to breakdown how does that entity contribute towards the ending score.

