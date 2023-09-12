# Social Chain Scorer

## Table of contents

- [Technical Stack](#technical-stack)
- [Development Requirements](#development-requirements)
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
