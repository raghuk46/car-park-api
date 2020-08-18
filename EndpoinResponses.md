#Register User

```
http://localhost:5000/register - POST [Registration]

Content-Type: application/json;

[Body] params - {
    username: '',
    password: ''
}

[Response] - sample 1 error validation
{
    "status": "error",
    "message": "Unprocessible Entity",
    "data": [
        {
            "message": "username is required",
            "path": [
                "username"
            ],
            "type": "any.required",
            "context": {
                "label": "username",
                "key": "username"
            }
        },
        {
            "message": "password is required",
            "path": [
                "password"
            ],
            "type": "any.required",
            "context": {
                "label": "password",
                "key": "password"
            }
        }
    ],
    "level": "info"
}

[Body] - {
  username: 'raghuk46',
  password: 'test@123456
}

[Response] - {
    "statusCode": 200,
    "message": "User already Exists",
    "level": "info"
}
```

#Login User

```
[Body] - {
  username: 'raghuk46',
  password: 'test@123456
}

[Response] - {
    "statusCode": 200,
    "message": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNGlrb3dQVkJFT3FUWnlOa3Q2a3EiLCJpYXQiOjE1OTc3Mjg1NjQsImV4cCI6MTU5NzczMDM2NH0.SMHXZpFIHOKbkREPaXAtf-aWQarQ6vT0NdKQAZ7y-0I",
    "level": "info"
}

```

#Get userInfo

```
[Request Headers] - {
  Authorization: `Bearer +token`
}

[Response without Header] - {
    "statusCode": 401,
    "status": "failed",
    "message": "UnAuthorized. Token Not Specified"
}

[Response with Header] - {
    "status": "success",
    "userData": {
        "username": "raghuk46"
    }
}
```

# show freeslots

```
[Response] - {
    "status": "success",
    "freeSlots": 147
}
```

# Get Total Parking Slots

```
[Response] - {
    "status": "success",
    "totalSlots": 150
}
```

#Park Car

```
[Body] - {
  plateNo: 'wxx 5678',
  color: 'red',
  type: 'sedan'
}

[Request Headers] - {
  Authorization: `Bearer +token`
}

[Response] - {
    "statusCode": 200,
    "status": "success",
    "message": "Please park in alloted slot",
    "slot": 5,
    "level": "info"
}
```

#Unpark Car

```
[Request] - endpoint/{:slotId}


[Request Headers] - {
  Authorization: `Bearer +token`
}

if slot not valid
[Response] - {
    "status": "success",
    "message": "inValid Slot Provided",
    "level": "info"
}

if valid
[Response] - {
    "status": "success",
    "message": "unparking Successful",
    "carInfo": {
        "plateNo": "VBQ 7469",
        "color": "black",
        "type": "sedan"
    },
    "level": "info"
}

```

# Search by Car plateNo

```
[Request] - getCarByNo?plateNo=VCR 7061

[Request Headers] - {
  Authorization: `Bearer +token`
}

[Response] - {
    "status": "success",
    "total": 1,
    "data": [
        {
            "id": "x0UTWFgIdc7yQnggY39S",
            "enteredAt": {
                "_seconds": 1597634203,
                "_nanoseconds": 42000000
            },
            "color": "granite grey",
            "plateNo": "VCR 7061",
            "slot": 3,
            "active": true,
            "type": "hatchback"
        }
    ]
}
```

#Search by Car type Suv \ Sedaen

```
{{url}}/getCarsByType?type=sedan

[Request Headers] - {
  Authorization: `Bearer +token`
}

[Response] - {
    "status": "success",
    "total": 3,
    "data": [
        {
            "id": "F3QnTIyxLaobqGf7nniC",
            "plateNo": "VBQ 7162",
            "type": "sedan",
            "active": true,
            "color": "black",
            "enteredAt": {
                "_seconds": 1597636968,
                "_nanoseconds": 268000000
            },
            "slot": 2
        },
        {
            "id": "eRx7N0EklHe4PvSeRNgP",
            "slot": 1,
            "plateNo": "VBQ 7415",
            "active": true,
            "enteredAt": {
                "_seconds": 1597729051,
                "_nanoseconds": 585000000
            },
            "type": "sedan",
            "color": "black"
        },
        {
            "id": "sqVr964t1vOihuGOnAYP",
            "active": true,
            "slot": 4,
            "enteredAt": {
                "_seconds": 1597673444,
                "_nanoseconds": 207000000
            },
            "color": "black",
            "plateNo": "VBQ 7016",
            "type": "sedan"
        }
    ]
}

```
