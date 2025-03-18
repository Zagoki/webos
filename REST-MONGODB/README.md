# REST-MONGODB Project
projet cours mattheo


## Project Structure

```
REST-MONGODB
├── src
│   ├── app.js                
│   ├── controllers           
│   │   └── productController.
│   ├── models                
│   │   └── productModel.js
│   ├── routes                
│   │   └── productRoutes.js
│   └── config                
│       └── db.js
├── package.json              
├── Dockerfile                
├── .dockerignore             
└── README.md                 
```

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Docker](https://www.docker.com/)

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/rest-mongodb.git
cd rest-mongodb
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start MongoDB using Docker

```sh
docker run --name mongodb -d -p 27017:27017 mongo
```

### 4. Configure the Database

 `src/config/db.js` 

### 5. Run the Application

```sh
npm start
```

`http://localhost:8000`.

## API Endpoints

### Products

- **Create a Product**
  - **Method:** POST
  - **URL:** `/products`
  - **Body:**
    ```json
    {
      "name": "Product 1",
      "about": "Description of Product 1",
      "price": 100,
      "categoryIds": ["categoryId1", "categoryId2"]
    }
    ```

- **Get All Products**
  - **Method:** GET
  - **URL:** `/products`

- **Get Products with Categories**
  - **Method:** GET
  - **URL:** `/products-with-categories`

### Categories

- **Create a Category**
  - **Method:** POST
  - **URL:** `/categories`
  - **Body:**
    ```json
    {
      "name": "Category 1"
    }
    ```

## Docker Instructions

### 1. Build the Docker Image

```sh
docker build -t rest-mongodb .
```

### 2. Run the Docker Container

```sh
docker run -p 3000:3000 rest-mongodb
```

`http://localhost:3000`.

## WebSockets


### 1. Navigate to the WEBSOCKETS Directory

```sh
cd WEBSOCKETS
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the WebSocket Server

```sh
node server.js
```