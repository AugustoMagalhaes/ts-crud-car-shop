export const carMockBody = {
  "model": "Golzao",
  "year": 2000,
  "color": "white",
  "buyValue": 3000,
  "seatsQty": 5,
  "doorsQty": 2
}

export const createdMockedCar = {
  "model": "Golzao",
  "year": 2000,
  "color": "white",
  "buyValue": 3000,
  "doorsQty": 2,
  "seatsQty": 5,
  "_id": "6328895d52e43c5297a0f709",
  "__v": 0
}

export const wrongCarMockBody = {
  "year": 2000,
  "color": "white",
  "buyValue": 3000,
  "seatsQty": 5,
  "doorsQty": 2
}

export const zodIssues = [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "model"
      ],
      "message": "Model is required"
    }
  ]

  export const successRead = {
    "_id": "63289ba352e43c5297a0f70e",
    "model": "Golzao",
    "year": 2000,
    "color": "white",
    "buyValue": 3000,
    "doorsQty": 2,
    "seatsQty": 5,
    "__v": 0
}

  export const successDelete = {
    "_id": "63289ba352e43c5297a0f70e",
    "model": "Golzao",
    "year": 2000,
    "color": "white",
    "buyValue": 3000,
    "doorsQty": 2,
    "seatsQty": 5,
    "__v": 0
}

export const updatedMockedCar = {
  "_id": "6328895d52e43c5297a0f709",
  "model": "Golzao",
  "year": 2000,
  "color": "white",
  "buyValue": 5000,
  "doorsQty": 2,
  "seatsQty": 5,
  "__v": 0
}

export const allIssues = [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "model"
      ],
      "message": "Model is required"
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "undefined",
      "path": [
        "year"
      ],
      "message": "Year is required"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": [
        "color"
      ],
      "message": "Color is required"
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "undefined",
      "path": [
        "buyValue"
      ],
      "message": "BuyValue is required"
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "undefined",
      "path": [
        "doorsQty"
      ],
      "message": "DoorsQty is required"
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "undefined",
      "path": [
        "seatsQty"
      ],
      "message": "SeatsQty is required"
    },
]