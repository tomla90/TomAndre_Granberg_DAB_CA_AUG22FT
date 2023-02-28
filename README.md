# DAB - Course Assignment 1
# Application Installation and Usage Instructions
To use the application, follow these steps:

* Clone the repository from GitHub.
* Set up a MySQL database by following the instructions in the README file under the "DATABASEACCESS" section. You will also need to * create a database named "adoptiondb" and grant the appropriate privileges to the "dabcaowner" user.
* Populate the database with the necessary tables and data by running the SQL queries provided in the README file under the         "DATAINSERTS" section.
* Install the required dependencies by running the command npm install in the root directory of the project.
* Start the application by running the command npm start.
* Open a web browser and navigate to http://localhost:3000 to access the application.
* In order to access and manage the temperament and species tabs, administrator privileges are required. Only users who have been   - granted administrative access will be able to view and make changes to these tabs.
* You have the option to either use the existing user account with the following login credentials:
  Username: Admin
  Password: admin1234
  Or, alternatively, you can create a new member account.

# Environment Variables
ADMIN_USERNAME: The username for the admin account.
ADMIN_PASSWORD: The password for the admin account.
DATABASE_NAME: The name of the database to use.
DIALECT: The dialect to use with Sequelize.
DIALECTMODEL: The dialect module to use with Sequelize.
PORT: The port on which the server will run.
HOST: The hostname on which the server will run.

# Additional Libraries/Packages
The following additional libraries/packages are used in this application:

Express.js (web framework)
Sequelize (ORM)
EJS (templating engine)
Bootstrap (front-end framework)
dotenv (environment variable management)
cookie-parser (for parsing cookies)
connect-sqlite3 (for connecting to SQLite database)
debug (for debugging)
express-session (for managing user sessions)
http-errors (for handling HTTP errors)
mysql (for connecting to MySQL database)
mysql2 (for connecting to MySQL database)
passport (for authentication)
passport-local (for local authentication strategy)
sqlite3 (for connecting to SQLite database)

# NodeJS Version Used
This application was developed using Node.js version 18.14.0

# DATABASE
The database used in this application is MySQL.

# DATAINSERTS

INSERT INTO Species (Name) VALUES
  ('Dwarf Hamster'),
  ('Tedy bear hamster'),
  ('Jack-Russel'),
  ('Budgy'),
  ('Tortouse'),
  ('Gold Fish'),
  ('Lizzard'),
  ('Bearder Dragon'),
  ('Parrot'),
  ('Corn snake');
  
  
  INSERT INTO Sizes (Name) VALUES
  ('small'),
  ('medium'),
  ('large');
  
  
  INSERT INTO Temperaments (Name) VALUES
  ('calm'),
  ('scared'),
  ('energetic'),
  ('happy'),
  ('lazy');
  
  
  
  INSERT INTO Animals (Name, Birthday, Adopted, SpeciesId, SizeId)
VALUES 
  ('Coco', '2020-02-12', FALSE, 1, 1),
  ('Ted', '2021-02-12', FALSE, 2, 1),
  ('Coco', '2020-02-12', FALSE, 3, 2),
  ('Everrest', '2019-02-12', FALSE, 4, 1),
  ('Rocko', '2020-02-12', FALSE, 5, 2),
  ('Goldy', '2023-02-12', FALSE, 6, 1),
  ('Lizzy', '2020-02-12', FALSE, 7, 2),
  ('Goga', '2018-02-12', TRUE, 8, 3),
  ('Tweet Tweet', '2020-02-12', FALSE, 9, 3),
  ('Toothless', '2017-02-12', FALSE, 10, 2),
  ('Sophie', '2020-02-12', FALSE, 1, 1),
  ('Teddy', '2021-02-12', FALSE, 2, 1),
  ('Roger', '2020-02-18', FALSE, 9, 3);
  
  
  
  
  INSERT INTO AnimalTemperaments (AnimalId, TemperamentId) VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 2),
  (3, 3),
  (4, 1),
  (4, 4),
  (5, 1),
  (5, 5),
  (6, 1),
  (7, 1),
  (7, 5),
  (8, 1),
  (8, 5),
  (8, 2),
  (9, 1),
  (9, 4),
  (10, 2),
  (11, 1),
  (11, 2),
  (12, 1),
  (12, 2),
  (13, 1),
  (13, 4),
  (13, 5);



   INSERT INTO Users (FullName, Username, Password, Role) VALUES ('System admin', 'Admin', 'admin1234', 'admin');

# DATABASEACCESS

CREATE USER 'dabcaowner'@'localhost' IDENTIFIED BY 'dabca1234';
GRANT ALL PRIVILEGES ON adoptiondb.* TO 'dabcaowner'@'localhost';


To access the database, you will need to have a MySQL server installed and running. The application is configured to connect to a MySQL database with the following credentials:

ADMIN_USERNAME = "dabcaowner"
ADMIN_PASSWORD = "dabca1234"
DATABASE_NAME = "adoptiondb"
DIALECT = "mysql"
DIALECTMODEL = "mysql2"
PORT = "3000"
HOST = "localhost"
These credentials can be changed by modifying the appropriate environment variables in the .env file.

Once the MySQL server is running and the appropriate credentials have been set up, you can run the database queries provided in the DATAINSERTS section of the README file to populate the database with data.

To interact with the database, you can use any MySQL client that you are comfortable with, such as MySQL Workbench, phpMyAdmin, or the command-line client. You can connect to the database using the same credentials that you set up earlier.

The application itself uses Sequelize, an ORM for Node.js, to interact with the database. You can find the database models in the models directory of the project. These models define the structure of the database and provide methods for querying and manipulating data.

If you need to modify the database schema, you can do so by modifying the appropriate model files and running the appropriate Sequelize migration commands. You can find more information about Sequelize migrations in the Sequelize documentation.

# DATABASEQUERIES


1. Return the most popular animal name.

SELECT Name, COUNT(*) AS Count
FROM Animals
GROUP BY Name
ORDER BY Count DESC
LIMIT 1;

2. Return a list of animals that have been adopted, and the name of the user that adopted them.

SELECT a.Name AS AnimalName, u.FullName AS AdopterName
FROM Animals a
INNER JOIN Adoptions ad ON a.Id = ad.AnimalId
INNER JOIN Users u ON ad.UserId = u.Id;

3. Return a list of all the animals, sorted by age from youngest to oldest.

SELECT Name, Birthday, TIMESTAMPDIFF(YEAR, Birthday, CURDATE()) AS Age
FROM Animals
ORDER BY Birthday DESC;

4. Return all the animals born between 31 December 2017 and 31 December 2020.

SELECT Name, Birthday
FROM Animals
WHERE Birthday BETWEEN '2017-12-31' AND '2020-12-31';

5. Return the number of animals per size (return each size and the number).

SELECT s.Name AS Size, COUNT(*) AS Count
FROM Animals a
INNER JOIN Sizes s ON a.SizeId = s.Id
GROUP BY s.Name;

6. CREATE a trigger to implement the following feature - Whenever a new animal of Species type “Lizard” is added to the database, the last created user will automatically adopt that animal.

DELIMITER //

CREATE TRIGGER auto_lizard_adoption
AFTER INSERT ON Animals
FOR EACH ROW
BEGIN
  DECLARE speciesName VARCHAR(255);
  DECLARE userId INT;
  SET speciesName = (SELECT Name FROM Species WHERE Id = NEW.SpeciesId);
  IF speciesName = 'Lizzard' THEN
    SET userId = (SELECT Id FROM Users ORDER BY Id DESC LIMIT 1);
    INSERT INTO Adoptions (AnimalId, UserId, AdoptionDate) VALUES (NEW.Id, userId, NOW());
  END IF;
END//

DELIMITER ;