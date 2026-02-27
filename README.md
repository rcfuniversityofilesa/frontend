# RCF Frontend - React Application

A comprehensive React-based web application for Real Church Fellowship (RCF) that provides both public-facing pages and an administrative portal with role-based access control.

## 📋 Project Overview

RCF Frontend is a full-featured web application built with React and Vite that serves two main purposes:
1. **Public Portal** - Information and service pages for general users
2. **Admin Portal** - Role-based administrative dashboard for content and worker management

### Key Features

- **Public Portal**: Browse hymns, news, programs, gallery, and apply for worker positions
- **Admin Portal**: Manage applicants, conduct exams, publish content, and handle inbox communications
- **Role-Based Access Control**: Different dashboards for Media and Workers in Training admin roles
- **Responsive Design**: Bootstrap-based responsive UI across all pages
- **Real-time Notifications**: Toast notifications for user feedback
- **Form Validation**: Formik + Yup for robust form handling
- **Animations**: Smooth animations using Framer Motion and AOS

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/
│   │   └── layout/          # Admin sidebar navigation and top navigation
│   ├── common/              # Reusable components (Button, Card, etc.)
│   ├── layout/              # Public layout components (Navbar, Footer)
│   └── ui/                  # UI utilities (Loader, etc.)
├── pages/
│   ├── admin/
│   │   ├── auth/            # Login and Registration pages
│   │   └── pages/           # Admin dashboard pages
│   │       ├── Applicant.jsx
│   │       ├── Inbox.jsx
│   │       ├── OverView.jsx
│   │       ├── PostHymn.jsx
│   │       ├── PostNews.jsx
│   │       ├── PostProgram.jsx
│   │       ├── Profile.jsx
│   │       ├── PublishedHymn.jsx
│   │       ├── PublishedNews.jsx
│   │       └── PublishedProgram.jsx
│   └── public/              # Public-facing pages
│       ├── Home.jsx
│       ├── AboutUs.jsx
│       ├── News.jsx
│       ├── Hymns.jsx
│       ├── Programs.jsx
│       ├── Gallery.jsx
│       ├── ContactUs.jsx
│       ├── ApplyAsWorker.jsx
│       └── PageNotFound.jsx
└── styles/                  # Global and component-specific styles
```

## 🎯 Admin Portal Features

### Role-Based Dashboards

**Media Admin Role:**
- Post News
- Post Hymns
- Post Programs
- View Published Content
- Inbox Management
- Profile Settings

**Workers in Training Admin Role:**
- View Applicants
- Review Interviewed Candidates
- Exam Settings and Control
- Exam Management (email, full name tracking)
- Profile Settings

### Shared Admin Features
- Overview Dashboard
- User Profile Management
- Navigation via SideNav and TopNav

## 🌐 Public Portal Pages

- **Home** - Landing page with featured content
- **News** - Browse and read news articles
- **Hymns** - View hymn collection
- **Programs** - Explore programs and events
- **Gallery** - Image gallery showcase
- **About Us** - Organization information
- **Contact Us** - Get in touch with RCF
- **Apply as Worker** - Application form for new workers
- **Page Not Found** - 404 error page

## 🛠️ Technology Stack

### Frontend Framework & Build
- **React 19.2** - Modern React with latest features
- **Vite 7.3** - Ultra-fast frontend build tool
- **React Router DOM 7.13** - Client-side routing

### UI & Styling
- **React Bootstrap 2.10** - Bootstrap component library
- **CSS Modules** - Component-scoped styling
- **Framer Motion 12.34** - Animation library
- **AOS 2.3** - Animate on scroll library
- **React Icons 5.5** - Icon library

### Form & Validation
- **Formik 2.4** - Form state management
- **Yup 1.7** - Schema validation
- **Axios 1.13** - HTTP client for API calls

### Utilities
- **React Hot Toast 2.6** - Toast notifications
- **Classnames 2.5** - Dynamic class name management


## 🔐 Authentication

The admin portal includes:
- **Login Page** - Secure authentication for admins
- **Register Page** - Admin registration (if enabled)
- **Role-Based Access** - Automatic redirection based on admin role



## 🎨 Styling Approach

- CSS Modules for component-specific styles (`.module.css`)
- Global styles for shared utilities
- Bootstrap for responsive grid and components
- Consistent color scheme and spacing throughout

**Last Updated:** February 2026