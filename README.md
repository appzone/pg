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

Install and Run the MongoDB, Postgres, RabbitMQ

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
docker swarm init
docker stack deploy traefik -c traefik.yml
docker stack deploy db -c db.yml
docker stack deploy bank -c bank.yml
```


Execute pg.sql in the postgre DB


## API
- /api/user => this for all user related api (register, login)
``` 
/api/user/register 
==> Registering a new user
{
	"username":"abc",
	"password":"def"
} 
```
```
/api/user/login
==> User login
{
	"username":"abc",
	"password":"def"
} 

```
- /api/rekening => this for all rekening related api
```
/api/rekening/aktivasi
==> Rekening activation
{
	"code": 9999,
	"accountNumber": 123
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

```
/api/rekening/update
==> Updating rekening
{
	"newAccountNumber": 1234,
	"accountNumber": 123
	
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

```
/api/rekening/blokir
==> To block rekening
{
	"isBlocked": true,
	"accountNumber": 1234
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

```
/api/rekening/deposit
==> To deposit
{
	"destinationAccount": 1305194,
	"balance": "0.00000005"
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

```
/api/rekening/withdraw
==> To withdraw
{
	"sourceAccount": 1234,
	"balance": "0.00000005"
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

```
/api/rekening/transfer
==> To transfer
{
	"sourceAccount": 1234,
	"balance": "0.00000005"
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

```
/api/rekening/history
==> To get transaction history
{
	"accountNumber": 1234
}
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlkIjo1MiwiaWF0IjoxNTQ1MTU5MDk0fQ.qJVajCM3rE2jL-JqBMDCKL5haaa_-W0uF-GMW3ZGSZ0
```

### Todos

 - Fix docker rabbitmq
 - Add more cool feature

License
----

MIT


**Free Software, Hell Yeah!**
