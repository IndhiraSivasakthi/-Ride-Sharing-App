# 🚗 Ride-Sharing Application Using React and Hibernate

This is a full-stack **Ride-Sharing Web Application** built with **React (Frontend)** and **Spring Boot + Hibernate (Backend)**. It allows **users** to book rides, make payments, and rate drivers, while **drivers** can manage ride requests and view earnings.

---

## 🧰 Tech Stack

- **Frontend:** React.js
- **Backend:** Spring Boot + Hibernate (Java)
- **Database:** MySQL
- **Tools Used:** Eclipse, Postman, MySQL Workbench

---

## 🎯 Key Modules

### 1. 👤 User Module
- User Registration / Login
- Profile Management
- Book a Ride
- View Ride History
- Online Payment
- Feedback and Rating

### 2. 🚖 Driver Module
- Driver Registration / Login
- Profile and Vehicle Management
- Accept / Reject Ride Requests
- View Earnings
- Review Feedback

### 3. 🛣 Ride Module
- Match Riders with Nearby Drivers
- Track Ride Status (Pending, Accepted, Completed)
- View Ride History
- Fare Calculation

### 4. 💳 Payment Module
- Enter Payment Details
- Choose Method: UPI, Card, Net Banking
- View Grand Total
- Store Payment in Database

### 5. 🛠 Admin Module (Optional / Future)
- Manage Users and Drivers
- View All Rides
- Monitor Feedback
- Block/Remove Users or Drivers

---

## 🗃 Database Schema Overview

### 📄 User Table
- Stores user details

### 📄 Driver Table
- Driver info
- **One-to-One** with Vehicle Table

### 📄 Vehicle Table
- Driver vehicle details

### 📄 Ride Table
- Ride info
- **Many-to-One** with User and Driver

### 📄 Payment Table
- Linked to Ride Table
- Stores payment data

### 📄 Feedback Table
- Linked to User/Driver
- Stores ratings and reviews

---

## ✅ Features

- Responsive UI with **React**
- Secure authentication (User & Driver)
- REST APIs via **Spring Boot**
- ORM using **Hibernate**
- Online payments and fare calculation
- Rating and feedback system

---

## 🚀 Future Enhancements

- Google Maps integration for real-time location
- Push notifications for ride updates
- OTP verification during sign-up
- Wallet system for faster checkouts

---





