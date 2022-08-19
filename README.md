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



## docker-compose mongodb

docker exec -it usernode-mongo-1 bash
mongo -u setup -p allyourbasearebelongtous --authenticationDatabase profiles


## standalone monogdb

brew tap mongodb/brew
brew update
brew install mongodb-community@6.0

mongod --config /opt/homebrew/etc/mongod.conf --fork
