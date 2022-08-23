# usernode

Demonstration user profile service in NodeJS

# Architecture

- NodeJS REST API server using [ExpressJS](https://expressjs.com/)
- Persistance layer backed by [MongodDB](https://www.mongodb.com/)
- Live API fetch from api.weather.gov

<img width="1133" alt="Screen Shot 2022-08-23 at 12 43 08 PM" src="https://user-images.githubusercontent.com/6528229/186215088-976b9371-06b9-44b7-8769-66fac4f5cbe5.png">

# Usage

Service is assembled using docker compose to run a local mongodb instance alongside the application.

## Build and run server

docker compose up --build

## Interact with the server

```
curl 'localhost:8085/api/v1.0/user' -X GET

[
    {
        "id": 9c80cfc4-3a1b-49d7-abca-1c1ecb765eed",
        "name": {
            "first": "Pat",
            "last": "Person",
        },
        "interests": [],
        "geolocation": {
            "latitude": 39.7456,
            "longitude": -97.0892
        },
        "weather":
            "city": "Linn",
            "state": "KS",
            "temperature": 72.1
        }
    }
]


curl 'localhost:8085/api/v1.0/user' -X POST -d '{"name":{"first": "Jane", "last": "Doe"}, "geolocation": {"latitude":42.436113,"longitude":-82.729413}}'

```

## exec to mongodb server

docker exec -it usernode-mongo-1 mongo
