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
            "longitude": -97.0892,
            "city": "Linn",
            "state": "KS",
        },
        "weather":  {
            "@context": [
                "https://geojson.org/geojson-ld/geojson-context.jsonld",
                {
                    "@version": "1.1",
                    "wx": "https://api.weather.gov/ontology#",
                    "s": "https://schema.org/",
                    "geo": "http://www.opengis.net/ont/geosparql#",
                    "unit": "http://codes.wmo.int/common/unit/",
                    "@vocab": "https://api.weather.gov/ontology#",
                    "geometry": {
                        "@id": "s:GeoCoordinates",
                        "@type": "geo:wktLiteral"
                    },
                    "city": "s:addressLocality",
                    "state": "s:addressRegion",
                    "distance": {
                        "@id": "s:Distance",
                        "@type": "s:QuantitativeValue"
                    },
                    "bearing": {
                        "@type": "s:QuantitativeValue"
                    },
                    "value": {
                        "@id": "s:value"
                    },
                    "unitCode": {
                        "@id": "s:unitCode",
                        "@type": "@id"
                    },
                    "forecastOffice": {
                        "@type": "@id"
                    },
                    "forecastGridData": {
                        "@type": "@id"
                    },
                    "publicZone": {
                        "@type": "@id"
                    },
                    "county": {
                        "@type": "@id"
                    }
                }
            ],
            "id": "https://api.weather.gov/points/39.7456,-97.0892",
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -97.089200000000005,
                    39.745600000000003
                ]
            },
            "properties": {
                "@id": "https://api.weather.gov/points/39.7456,-97.0892",
                "@type": "wx:Point",
                "cwa": "TOP",
                "forecastOffice": "https://api.weather.gov/offices/TOP",
                "gridId": "TOP",
                "gridX": 31,
                "gridY": 80,
                "forecast": "https://api.weather.gov/gridpoints/TOP/31,80/forecast",
                "forecastHourly": "https://api.weather.gov/gridpoints/TOP/31,80/forecast/hourly",
                "forecastGridData": "https://api.weather.gov/gridpoints/TOP/31,80",
                "observationStations": "https://api.weather.gov/gridpoints/TOP/31,80/stations",
                "relativeLocation": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -97.086661000000007,
                            39.679375999999998
                        ]
                    },
                    "properties": {
                        "city": "Linn",
                        "state": "KS",
                        "distance": {
                            "unitCode": "wmoUnit:m",
                            "value": 7366.9851976443997
                        },
                        "bearing": {
                            "unitCode": "wmoUnit:degree_(angle)",
                            "value": 358
                        }
                    }
                },
                "forecastZone": "https://api.weather.gov/zones/forecast/KSZ009",
                "county": "https://api.weather.gov/zones/county/KSC201",
                "fireWeatherZone": "https://api.weather.gov/zones/fire/KSZ009",
                "timeZone": "America/Chicago",
                "radarStation": "KTWX"
            }
        }
    }
]


curl 'localhost:8085/api/v1.0/user' -X POST -d '{"name":{"first": "Jane", "last": "Doe"}, "geolocation": {"latitude":42.436113,"longitude":-82.729413}}'

```

## exec to mongodb server

docker exec -it usernode-mongo-1 mongo
