## :eyeglasses: Project Introduction

**Best Movies** is my defense project build with Express and Angular 14 for the **Front-End** course at [SoftUni](https://softuni.bg/ "SoftUni") (September-December 2022).

------------

## :pencil2: Overview

This application has been created solely for educational purposes.

**Best Movies** is an online platform where everyone can find the favourite movie, because it is filled with the best rating movies all over the world. Anyone who is registered can upload a movie to the app if the movie rating is over 8.0 on IMDB. Every movie before being uploaded goes through the approval of the admin. The initial dataset is taken from JSON file with the top 100 movies in IMDB.

## :hammer: ## **Technologies Used**

This application is designed and runs using the **main** technologies and libraries below:

Back-End:
- **[Node.js](https://nodejs.org/en/)**
- **[JavaScript](https://en.wikipedia.org/wiki/JavaScript)**
- **[Express](https://expressjs.com/)**
- **[MongoDB](https://www.mongodb.com/home)**
- **[Mongoose](https://mongoosejs.com/)**
- **[JWT](https://jwt.io/)**

Front-End:
- **[Angular](https://angular.io/)**
- **[TypeScript](https://en.wikipedia.org/wiki/TypeScript)**
- **[RxJS](https://rxjs.dev/)**
- **[Angular animations](https://angular.io/guide/animations)**
- **[Angular Material](https://material.angular.io/)**
- **[Azur blob storage](https://azure.microsoft.com/en-us/products/storage/blobs/)**
- **[Ng Bootstrap](https://ng-bootstrap.github.io/#/home)**

------------

## :wrench: How to setup and run the project localy
- Back-End (open the rest-api directory):
1. npm install (to install the dependencies)
2. npm run admin:import (to seed the admin profile)
3. npm run movies:import (to seed the movies)
4. npm run genres:import (to seed the genres)
5. npm start
- Front-End (open the app directory)
1. npm install (to install the dependencies)
2. ng s (to run the project)
3. go to http://localhost:4200/

------------

## Login as admin:
- email    - admin@admin.com
- password - admin123