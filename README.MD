[
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
](https://github.com/tgthuan2000)

## Table of Contents

-   [About the Project](#about-the-project)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Account Demo](#account-demo)
-   [Directory Structure](#directory-structure)

## About the Project

-   This is a compatible web application for both desktop and mobile devices
-   Allows the user to manage personal information such as spending management, loan management, time management, etc.
-   In addition, it also integrates management at the administrator side, allowing notification management, account management, role-control management...

## Prerequisites

-   [Node.js](https://nodejs.org/en/) 18.16.0
-   [npm](https://www.npmjs.com/) 9.6.4
-   [yarn](https://yarnpkg.com/) 1.22.19

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
# Remember to run the backend server
```

[Backend](https://github.com/tgthuan2000/STL-server)

## Account Demo

-   Admin:
    -   Email: admin@stl.app
    -   Password: 123
-   User:
    -   Email: demo-user.stl.app
    -   Password: 123

## Directory Structure

```bash
.
├── node_modules
├── public
│   ├── locales
│   │   ├── en.json
│   │   └── vi.json
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── ...
├── src
│   ├── @types
│   ├── assets
│   ├── components
│   ├── constants
│   ├── context
│   │   ├── CacheContext.tsx
│   │   ├── CheckingContext.tsx
│   │   ├── ConfigContext.tsx
│   │   ├── DetailDialogContext.tsx
│   │   ├── FilePreviewContext.tsx
│   │   ├── FlashScreenContext.tsx
│   │   ├── LoadingContext.tsx
│   │   ├── NotifyContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── index.ts
│   │   └── ...
│   ├── features # Screens
│   │   ├── account
│   │   │   ├── components
│   │   │   ├── hook
│   │   │   ├── pages
│   │   │   ├── services
│   │   │   └── index.tsx  
│   │   ├── announce-config
│   │   ├── auth
│   │   ├── feedback
│   │   ├── feedback-config
│   │   ├── loan
│   │   ├── notify
│   │   ├── profile
│   │   ├── role-control
│   │   ├── setting
│   │   ├── spending
│   │   └── time
│   ├── hook
│   │   ├── useQuery
│   │   ├── useMounted
│   │   └── ...
│   ├── i18n
│   ├── layout
│   ├── services
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── README.md
├── package.json
├── index.html
└── ...
```
