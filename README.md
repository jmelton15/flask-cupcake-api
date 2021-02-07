<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

# Flask-Cupcake-API
* Simple postgreSQL backend API that allows users to create,edit,and delete cupcakes
* Full-Stack Application with both frontend and backend integration
* Includes a landing page that uses the API to show what it can do
* Minimal CSS styling for the landing page, however


### Built With - Credits To The Following:

* [Python](https://www.python.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [postgreSQL](https://www.postgresql.org/)
* [SQL-Alchemy](https://www.sqlalchemy.org/)
* [flask-sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [Flask-WTForms](https://flask-wtf.readthedocs.io/en/stable/)
* [JavaScript & jQuery]
* [AXIOS and Ajax] 
* [HTML & CSS]
* [Bootstrap 5](https://getbootstrap.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps follow the Prerequisites and Installation steps
Then follow these next three:
*First, read the requirments.txt file to see what is needed for pip installs
*Second, you will have to create your own virtual python environment for this 
*Third, you will need to create a postgreSQL database called cupcakes_db

### Prerequisites

* You will need Python 3.7 or later
  ```sh
  https://www.python.org/downloads/
  ```
* You will need Flask and Flask-sqlalchemy, which you can get in one pip install
* You will need this version of werkzeug=0.16.0, see below for install
* I have provided a seed.py file if you want to load up your database with test cupcakes to use
* You will need to create a postgreSQL database called cupcakes_db in order to use this application


### Installation

1. FYI - I used GIT BASH as my shell and terminal

2. If you don't already have Python 3.7 or later
   ```sh
   https://www.python.org/downloads/
   ```
3. Clone the Repo 
   ```sh
   git clone git@github.com:jmelton15/flask-cupcake-api.git
   ```
4. Install pre-req for flask-sqlalchemy
   ```sh
   pip install psycopg2-binary
   ```
5. Install Flask and Flask-sqlalchemy using pip.. this will get both in one install
   ```
   pip install flask-sqlalchemy
   ```
6. Install werkzeug=0.16.0
   ```sh
   pip install werkzeug=0.16.0
   ```
7. Install flask WTForms
   ```sh
   pip install flask-wtf
   ```
8. Install python requests
   ```sh
   pip install requests
   ```
9. Create a postgreSQL database called cupcakes_db
   While in the psql: terminal input the following code
   ```sh
   CREATE DATABASE cupcakes_db;
   ```
10. To run the server with flask - the following should do the trick
   ```
   flask run
   ```

<!-- CONTACT -->
## Contact

Your Name - [John Melton]

Project Link: [https://github.com/jmelton15/flask-cupcake-api](https://github.com/jmelton15/flask-cupcake-api)

