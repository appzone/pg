# PG 


PG is a simple banking system.

# Tech stack use
  - Node and Express
  - RxJS
  - RabbitMQ
  - MongoDB for logging and Postgre for main data
  - ES6
  - Docker (on progress)

# Features!

  - Register User
  - Login User
  - Aktivasi Rekening
  - Update Rekening
  - Blokir Rekening
  - Deposit
  - Transfer
  - Withdraw
  - Transaction history



### Installation

PG requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd pg
$ npm install -d
$ npm run start
```

For running the rabbitmq consumer ...

```sh
$ npm run consumer
```

### Docker
PG is very easy to install and deploy in a Docker container.

By default, PG running in the docker swarm, so you will need to init the swarm

```sh
docker swarm init
```

and also PG is having dependent to MongoDB, Postgre, Traefik, so first we need to run the docker for it.



```sh
cd docker/local
docker build -f bank.yml build
docker build -f traefik.yml build
docker stack deploy traefik -c traefik.yml
docker stack deploy db -c db.yml
docker stack deploy bank -c bank.yml
```
This will create the PG image and pull in the necessary dependencies.





### Todos

 - Fix docker rabbitmq
 - Add more cool feature

License
----

MIT


**Free Software, Hell Yeah!**
