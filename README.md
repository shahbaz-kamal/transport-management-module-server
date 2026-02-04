<!-- <div align="center">
  <img height="400" src="https://github.com/shahbaz-kamal/book-nest-with-mongoose/blob/main/src/assets/git_banner/git_banner_2.JPG"  />
</div> -->

###

## 🚌 Transport Management Module

The **Transport Management Module** handles student transportation by managing **routes, vehicles, pickup points, and monthly transport fees**. Admins can assign students to specific routes, which automatically links the assigned **vehicle**, **pickup point**, and **current month’s transport fee**.

Students have access to a dedicated dashboard where they can view their **current month fee status** along with assigned **route details**, **vehicle information**, and **pickup point data**. If no transport is assigned, only relevant fee information is shown.

The module follows a **role-based access system**, ensures accurate billing using the **current month and year**, and is designed to be scalable and maintainable for real-world transport management workflows.



## 🔧 Installation Guidline:

###

1. First clone the project by running

```bash
  git clone https://github.com/shahbaz-kamal/transport-management-module-server.git
```

2. Change your directory to the cloned folder by

```bash
  cd folder_name
```

3. Run the following to install dependencies:

```bash
npm install
```

4. Run the following to migrate and generate prisma schemas:

```bash
npx prisma migrate dev
npx prisma generate
```



5. Rename the a .env.example  file to .env and update the variables if needed :

```bash
DATABASE_URL="postgresql://postgres:12345@localhost:5432/transport-management-db?schema=public"
# postgress = my db name (change according to your db name)
# 12345 = my db password (change according to your db password)
# 5432 = my db port (change according to your db port)

NODE_ENV="development" # no need to update
PORT=5000 # no need to update , just make sure port 5000 is not used by any other services

# bcryptjs
BCRYPT_SALT_ROUND=10 #dont need to change

SUPER_ADMIN_EMAIL=super.transport@gmail.com #you can change if you want , But super admin having this email will be automatically created .
SUPER_ADMIN_PASSWORD=123456Aa #you can change if you want , But super admin having this password will be automatically created .

# if you change SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD , then those credentials should be used to login as admin ?super admin. 
# And if these are kept as it is , super.vaultpay@gmail.com & 123456Aa can be used to login with admin


# JWT

JWT_ACCESS_TOKEN_SECRET="secret"  #changing is optional
JWT_REFRESH_TOKEN_SECRET="secret" #changing is optional

JWT_ACCESS_TOKEN_EXPIRES_IN="24h" #changing is optional
JWT_REFRESH_TOKEN_EXPIRES_IN="90d" #changing is optional

```

6. Run the following command to run the project:

```bash
npm run dev
```
Then the backend should run on localhost 5000. 
6. Use Postman named postman.json in the root folder to send request as per above instructions

### Thank you:



<!-- ## 🔗 Live deployment link

###

[Click Here](https://vault-pay-server.vercel.app)
## 🔗 Frontend Link deployment link

###

[Click Here](https://vaultpay-by-shahbaz.netlify.app) -->

## 👨‍💼 Login Info(For testing)

- **Super Admin Email** — super.transport@gmail.com
- **Super Admin Password** — 123456Aa

- **Student Email** — student1@gmail.com
- **Student Password** — 123456Aa

- Or you can create your own credentials from login page

## ✨ Features

- **Role-Based Access** — Separate dashboards for **Admin** and **Student**
- **Route Management** — Create and manage routes with start/end points and monthly fees
- **Pickup Point Ordering** — Assign pickup points with ordered stops for each route
- **Vehicle Management** — Assign vehicles with driver and contact details
- **Student Transport Assignment** — Assign students to a route, vehicle, and pickup point in one flow
- **Automatic Monthly Fee Generation** — Transport fees are generated based on the **current month and year**
- **Student Dashboard** — Students can view:
  - Current month transport fee
  - Assigned route details
  - Vehicle and pickup point information
- **Conditional Display** — Transport details are shown only if a route is assigned
- **Secure Access Control** — Protected routes using authentication and role checks
- **Scalable Design** — Built to support real-world institutional transport workflows


## 🛠 Technology Used

###

 <div align="left">
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=express" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://cdn.simpleicons.org/postgresql/4169E1" height="40" alt="postgresql logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=prisma" height="40" alt="prisma logo"  />
</div>

## 💥 Dependencies:

```json
{
   "@prisma/adapter-pg": "^7.3.0",
    "@prisma/client": "^7.3.0",
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "http-status-codes": "^2.3.0",
    "jsonwebtoken": "^9.0.3",
    "pg": "^8.17.2",
    "zod": "^4.3.6"
}
```

## 💥Dev Dependencies:

```json
{
   "@types/cookie-parser": "^1.4.10",
    "@types/cors": "^2.8.19",
    "@types/dotenv": "^6.1.1",
    "@types/express": "^5.0.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^25.1.0",
    "@types/pg": "^8.16.0",
    "prisma": "^7.3.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.9.3"
}
```

## ✨ Routes with sample request

Need to copy the accessToken from the response of login and paste it in Authorization header in postman for all private route.

<h2 style="color: orange;" >User Routes: </h2>

### 1. Register User (public route)

**POST** `/api/v1/user/create-user`

#### Request:

```json
{
    "email":"student10@gmail.com",
    "password":"123456Aa",
    "name":"Student 10",
    "role":"STUDENT"
}
```

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "User Created successfully",
    "data": {
        "id": "8f2e82b6-bafd-40aa-bf84-00425003a789",
        "email": "student10@gmail.com",
        "password": "$2b$10$kToKslkKZBQmmZOXhSCLr.rVFS0iVx6NoNceQniiLMpSgenNBQDSS",
        "name": "Student 10",
        "role": "STUDENT",
        "address": null,
        "isRouteAssigned": false,
        "createdAt": "2026-02-04T14:06:26.590Z",
        "updatedAt": "2026-02-04T14:06:26.590Z"
    }
}
```

### 2. Get All Users (Accessible to admin and super admin- Private route)

**GET** `/api/v1/user/me`

#### Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "My Data Retrieved successfully",
    "data": {
        "id": "98772e41-5f68-41cc-9c06-d66db981185b",
        "email": "student9@gmail.com",
        "password": "$2b$10$4YEQxImqPjKgk2VH9I9AG.bE5jjEoLqD/N1xyivTfvNqpILLMUtmK",
        "name": "Student 9",
        "role": "STUDENT",
        "address": null,
        "isRouteAssigned": true,
        "createdAt": "2026-02-04T12:33:47.367Z",
        "updatedAt": "2026-02-04T12:34:04.408Z"
    }
}
```



### 3. Get All Students (accessible to logged in admin- Private route)

**GET** `/api/v1/user/student`

### 4. Get Logged in users info (Accessible to students- Private route)

**GET** `/api/v1/student/myData`


<h2 style="color: orange;" >Auth Routes: </h2>

### 1. Login

**POST** `/api/v1/auth/login`

#### Request:

```json
{
  "email": "student10@gmail.com",
  "password": "123456Aa"
}
```

#### Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Log In successfull",
    "data": {
        "id": "98772e41-5f68-41cc-9c06-d66db981185b",
        "email": "student9@gmail.com",
        "password": "$2b$10$4YEQxImqPjKgk2VH9I9AG.bE5jjEoLqD/N1xyivTfvNqpILLMUtmK",
        "name": "Student 9",
        "role": "STUDENT",
        "address": null,
        "isRouteAssigned": true,
        "createdAt": "2026-02-04T12:33:47.367Z",
        "updatedAt": "2026-02-04T12:34:04.408Z"
    }
}
```



### 2. Log out

**POST** `/api/v1/auth/logout`

#### Response:

```json
{
 {
    "statusCode": 200,
    "success": true,
    "message": "logged out"
}
}
```

<h2 style="color: orange;" >Route Management  Routes: </h2>

### 1. Create Route ( Private Route - ADMIN / SUPER ADMIN)

**POST** `/api/v1/route/create-route`

#### Request Sample:

```json
{
    "name":"JFP - School",
    "startPoint":"Jamuna Future Park",
    "endPoint":"Mirpur 12 (School)",
    "monthlyFee":1500,
    "pickupPoints": [
        {
            "name":"Jamuna Future Park",
            "address":"Basundhara Gate, Vatara",
            "stopOrder":1
        },
        {
            "name":"Kuril Bishwa Road",
            "address":"Kuril, Vatara",
            "stopOrder":2
        },
        {
            "name":"Cantonment",
            "address":"Cantonment Railway STation",
            "stopOrder":3
        },
        {
            "name":"ECB Chattar",
            "address":"ECB",
            "stopOrder":4
        },
        {
            "name":"Kalshi",
            "address":"Kalshi, Pallabi",
            "stopOrder":5
        },
        {
            "name":"Mirpur 12",
            "address":"Mirpur 12  (School)",
            "stopOrder":6
        }
    ]
  

    
}
```

#### Response:

```json
{
  "statusCode": 201,
  "success": true,
  "message": "Add Money Successfull",
  "data": {
    "paymeent": "https://sandbox.sslcommerz.com/gwprocess/v3/gw.php?Q=PAY&SESSIONKEY=1B388E2A9372EC9296E14CDE94CAF14B",
    "result": [
      {
        "transactionId": "trans_1759830526490_d49ff7436a7b",
        "type": "ADD_MONEY",
        "source": "SSLCOMMERZ",
        "senderEmail": null,
        "senderId": null,
        "receiverEmail": "test1@gmail.com",
        "receiverId": "68e4d5ae2c499b702d087409",
        "amount": 1000,
        "agentCommission": null,
        "status": "PENDING",
        "notes": "User added money from bank account",
        "_id": "68e4e1feac0f381d75d4e88e",
        "createdAt": "2025-10-07T09:48:46.507Z",
        "updatedAt": "2025-10-07T09:48:46.507Z"
      }
    ]
  }
}
```





### 2. GET all routes ( Private Route - only for Admins)

**GET** `/api/v1/route`




### 3. Get All Routes With pickup ( Private Route - only for Admins)

**GET** `/api/v1/route/route-with-pickup`





### 4. Update Route Monthly Fee (Accessible to logged in ADMIN- Private route)

**PATCH** `/api/v1/route/update-route`

#### Request Sample:

```json
{
    "routeId":"e4596c17-e9e4-4c65-bc62-1699db53aa00",
    "monthlyFee":2000
}
```

#### Response:

```json
{
    "statusCode": 200,
    "success": true,
    "message": "Route Updated successfully",
    "data": {
        "id": "e4596c17-e9e4-4c65-bc62-1699db53aa00",
        "name": "JFP - School",
        "startPoint": "Jamuna Future Park",
        "endPoint": "Mirpur 12 (School)",
        "createdAt": "2026-02-01T09:23:13.343Z",
        "updatedAt": "2026-02-04T14:45:29.574Z",
        "monthlyFee": 2000
    }
}
```

### 5. Assign Routes to students (Accessible to logged in ADMIN- Private route)

**POST** `/api/v1/route/assign-route`

#### Request Sample:

```json
{
    "feeAssign":{
        "userId":"c8b3df97-27f4-4c89-9035-e69c48439cb6",
        "amount":1500,
        "month":"February",
        "year":"2026",
        "status":"UNPAID"
      
    },
    "transportAssign":{
        "userId":"c8b3df97-27f4-4c89-9035-e69c48439cb6",
        "routeId":"e4596c17-e9e4-4c65-bc62-1699db53aa00",
        "vehicleId":"1398bfcf-27fc-43b9-854d-56353c6bfd3e",
        "pickupPointId":"31bbbb2f-a662-4cbd-9c63-3e0822cbdf04"
    
    }
}
```

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Route assigned Successfully",
    "data": {
        "feeData": {
            "id": "21113322-1e80-4a58-bb24-8ad86fd81c66",
            "userId": "c8fffac7-f1ac-4767-bedd-348d5af0b626",
            "amount": 1500,
            "month": "February",
            "year": "2026",
            "status": "UNPAID",
            "assignedBy": "34283ea4-6efd-40fa-b56d-723bef428b54",
            "createdAt": "2026-02-04T14:47:54.201Z",
            "updatedAt": "2026-02-04T14:47:54.201Z"
        },
        "transportData": {
            "id": "0c1c417c-7c55-49f9-9cab-839feb0bacf9",
            "userId": "c8fffac7-f1ac-4767-bedd-348d5af0b626",
            "routeId": "e4596c17-e9e4-4c65-bc62-1699db53aa00",
            "vehicleId": "1398bfcf-27fc-43b9-854d-56353c6bfd3e",
            "pickupPointId": "31bbbb2f-a662-4cbd-9c63-3e0822cbdf04",
            "assignedBy": "34283ea4-6efd-40fa-b56d-723bef428b54",
            "assignedAt": "2026-02-04T14:47:54.207Z",
            "updatedAt": "2026-02-04T14:47:54.207Z"
        }
    }
}
```



<h2 style="color: orange;" >Vehicles Routes: </h2>

### 1. CREATE Vehicles (Accessible to admin and super admin- Private route)

**POST** `/api/v1/vehicle/create-vehicle`

#### Request:

```json
{
    "routeId":"e4596c17-e9e4-4c65-bc62-1699db53aa00",
    "vehicleNo":"VH-04",
    "driverName":"Salam",
    "contactNo":"01799839985"
}
```

#### Response:

```json
{
    "statusCode": 201,
    "success": true,
    "message": "Vehicle created successfully",
    "data": {
        "id": "09631f2d-a0eb-46ff-9beb-70725564ac03",
        "routeId": "e4596c17-e9e4-4c65-bc62-1699db53aa00",
        "vehicleNo": "VH-04",
        "driverName": "Salam",
        "contactNo": "01799839985",
        "createdAt": "2026-02-04T14:49:29.498Z",
        "updatedAt": "2026-02-04T14:49:29.498Z"
    }
}
```

### 2. Get All Vehicles (accessible to logged in ADMIN / SUPER ADMIN- Private route)

**GET** `/api/v1/vehicle`

<h2 style="color: orange;" >Pick up point Routes: </h2>

### 1. Get All Pickup poiunt

- When a new users register with email and password, an OTP having 6 digits is send to the that registered email. Then user later verify this OTP
- Used for verifying the users

**GET** `/api/v1/pickup-point/`







