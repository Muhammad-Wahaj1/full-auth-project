# AuthMaster

**AuthMaster** is a full-stack authentication system built with **React** (frontend) and **AdonisJS v6** (backend). It supports **registration, login, logout, forgot password, and reset password** flows with email verification using SMTP (Ethereal/Mailtrap). The project also demonstrates protected routes, pre-auth routes, and modern Material UI-based forms.

---

## Features

- **User Authentication**
  - Register with username, email, and password
  - Login with email and password
  - Logout

- **Password Management**
  - Forgot Password — request a reset link via email
  - Reset Password — set a new password using a tokenized link

- **Email Sending**
  - Uses Nodemailer with Ethereal (for testing) or Mailtrap (SMTP)

- **Frontend Features**
  - Material UI components with modern forms
  - Input validation with `react-hook-form`
  - Loading states on buttons during async requests
  - Error and success handling with `react-hot-toast`
  - Password match validation

- **Routing**
  - Protected routes (dashboard, user-profiles, etc.)
  - Pre-auth routes (login/register pages cannot be accessed when logged in)

- **Token Handling**
  - Secure password reset tokens with expiration and “isUsed” flags

---

## Tech Stack

- **Frontend:** React, React Router, Material UI, react-hook-form, react-hot-toast  
- **Backend:** AdonisJS v6, Lucid ORM  
- **Database:** SQLite / PostgreSQL (configurable)  
- **Email:** Nodemailer (Ethereal / Mailtrap for SMTP)  
- **State Management:** Zustand (user token & user info)



