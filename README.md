# URL Shortener

## Overview

This project is a URL shortener built using Node.js and MongoDB. It allows users to generate short, shareable links from longer URLs, making it easier to share links on social media, emails, and other platforms.

## Features

- Generate short URLs from long URLs.
- Redirect users from short URLs to the original long URLs.
- Store and manage URLs in a MongoDB database.
- Validate URLs to ensure they are properly formatted.

## Table of Contents

- [Prerequisites](#prerequisites)
- [MongoDB Setup](#mongodb-setup)
- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## MongoDB Setup

You can choose to set up MongoDB locally or use MongoDB Atlas:

1. **Local Setup**: Download and install MongoDB from the official website.
2. **MongoDB Atlas**: Create a free account and set up a new cluster. Make sure to whitelist your IP address in the network access settings.

## Project Setup

1. **Create a new directory for your project**:
   ```bash
   mkdir url-shortener
   cd url-shortener
   ```
