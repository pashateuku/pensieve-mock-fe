# 📍 GPS Data App (Pensieve Front-End Mock Test)

This app is developed in order to complete **Pensieve Front-End Mock Technical Test** .

  

## Description
This app is made for Company X who wants an application to store the GPS data of their devices and provide insights from their data

  

## How to Run



1. Access the directory

```

cd pensieve-mock-fe

```


2. Install required modules

```

npm install

```

3. Run the program

```

npm start

```

  

## Route

Here is all the routes you can access:

| No | Path | Explaination |
|--|--|--|
| 1 |`/register` | Register page (*not functioning yet*) |
| 2 |`/login` | Login page |
| 3 |`/` | GPS Summary Page |
| 4 |`/detail/:deviceID` | GPS Detail Page |

## Features
1. You can login into your account by accessing `/login`'s page and input the require data which are email and password in the input form.
3. You can see the list of GPS devices with the latest GPS entry on `/`'s page.
4. For the details of the selected GPS device you can click the arrow button on the right of the list, or accessing them by reaching `/detail/:deviceID`'s page, this page serve data in a pie chart with the % of time spent at each location.