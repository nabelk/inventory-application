# Inventory Application

## Overview

-   Part of The Odin Project's Node Section
-   This project is an inventory management system that allows add, update, view, and delete products.
-   Includes search functionality to find products based on brand, category & product name.
-   Allows filtering products by category.
-   Data is stored in a PostgreSQL database and can be retrieved and modified via the application.

## Tech Stack

-   Node.js
-   Express.js
-   EJS
-   PostgreSQL
-   Tailwind
-   Flowbite

## Packages

-   Express validator
-   Method Override

## Routes

-   `GET /`: View all inventory items
-   `GET /page=:pagenum`: View paginated inventory items
-   `POST /filteritems`: Filter items by category
-   `GET /search`: Search for items
-   `GET /newProduct`: Form to add a new product
-   `POST /newProduct`: Submit a new product
-   `PUT /updateproduct/:id`: Edit a product
-   `DELETE /deleteproduct/:id`: Delete a product

## File structure

-   `controllers/`: Handles different parts of the inventory management system.
-   `db/`: Database connection configuration, populate and query logic.
-   `routes/`: Manages all routes.
-   `views/`: EJS templates for rendering pages.
-   `app.js`: Main server file.

## Deployment

-   Hosted on Railway (db & server)

## Contact

Created by [@nabelk](https://www.linkedin.com/in/nabil-khalid-36791a241/) - feel free to contact me!
