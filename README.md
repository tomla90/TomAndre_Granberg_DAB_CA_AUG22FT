# DAB - Course Assignment 1
# Application Installation and Usage Instructions


# Environment Variables


# Additional Libraries/Packages


# NodeJS Version Used


# DATABASE


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


# DATABASEQUERIES