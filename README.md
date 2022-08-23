# usernode

Demonstration user profile service in NodeJS

# Usage

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
            "latitude": -12.11234,
            "longitude": 44.34433,
            "city": "Anytown",
            "state": "PA",
        }
    }
]


curl 'localhost:8085/api/v1.0/user' -X POST -d '{"name":{"first": "Jane", "last": "Doe"}, "geolocation": {"latitude":42.436113,"longitude":-82.729413}}'

```

## exec to mongodb server

docker exec -it usernode-mongo-1 mongo
