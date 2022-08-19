# usernode

Demonstration user profile service in NodeJS

# TODO

- auth?
- rm mysql
- rm autogen stuff?
- add mongodb
- dockerize with mongodb

# Commands used:

npm install -d
npm install mongodb

## standalone monogdb

brew tap mongodb/brew
brew update
brew install mongodb-community@6.0

mongod --config /opt/homebrew/etc/mongod.conf --fork
