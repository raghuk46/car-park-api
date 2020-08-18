# car-park-api

```
docker-compose up
GOTO: http://localhost:5000

```

#List of endpoinst

```
http://localhost:5000/register - POST [Registration]
http://localhost:5000/login -POST [Login]
http://localhost:5000/getFreeSlots - GET [show available slots]
http://localhost:5000/userInfo - GET [Get username of loggedin user]
http://localhost:5000/parkCar - POST [To park car]
http://localhost:5000/unparkCar/:slotId - GET [TO unpark Car]
http://localhost:5000/getCarByNo?plateNo=wxx 5678 - GET [Retuns the car detals if avaialble]
http://localhost:5000/getCarsByType?type=seadn - GET [Search by carType]

# Additional endpoints
http://localhost:5000/slots - GET [Retuns total parking slots]
http://localhost:5000/updateSlots - POST [Set total parking slots]
```

[SampleResponse](./EndpoinResponses.md)
