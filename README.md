# Parking Management Frontend
This is the frontend of Parking Management Website which is written in React.js. As name explains it helps in management of Car parking through which Booking Counter Agent or Parking Zone Assistant can manage/look into the vacant parking space or occupied space with the car registration number.

## Requirements
1) React v17.0.1

## Installation
1. Open the CMD from the folder where you project is saved
2. Write `npm install` and press the Enter.

## Operating Instructions
1. Open the CMD from the folder where you project is saved
2. Write `npm start` and press the Enter.

## Usage
### 1. SignUp
   This will be used to signUp to the website by providing the Email-id, Password and type of user.
      
### 2. SignIn 
   This will be used to signin to the website by providing the Valid Email-id and Password.
   
### 3. Dashboard
   Dashboard will show the Parking space in the ascending order filtered by to the Parking Zone.
   For each parking space it will show the vehicle registration number for occupied space with Grey colour.
   also will give an option to release the car if the user is of type Booking Counter Agent.
   Parking space will be Green if it is vacant.
   Parking Zone Assistant will not have any rights to manipulate the data he/she will be having Read Only rights.
   
### 4. Reset All
   Reset All button will release all the cars by assigning the release_date_time as current time.But the car record will be present in our database with all the details to get a better Reports.
   
### 5. Report
  This will generate a Report based on the Date selected and the Data presented in the data base for that particular day.
   


## Maintainer
Rohit: https://github.com/imrohit7604/
