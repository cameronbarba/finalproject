/*TABLE FOR DIVISIONS*/

CREATE TABLE division (
divisionID INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
PRIMARY KEY (divisionID)
);



/*TABLE FOR TEAMS*/

CREATE TABLE team (
teamID INT NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL UNIQUE,
location varchar(255) NOT NULL,
mascot varchar(255),
jerseycolor varchar(255) NOT NULL,
divisionID INT,
PRIMARY KEY (teamID),
FOREIGN KEY (divisionID) REFERENCES division(divisionID)
ON DELETE CASCADE
);

INSERT INTO division (name) VALUES ('Pacific');
INSERT INTO division (name) VALUES ('Northwest');
INSERT INTO division (name) VALUES ('Southwest');


INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Lakers', 'Los Angeles', NULL, 'Purple, Gold', 4);
INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Golden State Warriors', 'San Francisco', NULL, 'Royal Blue, Yellow', 4); 
INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Mavericks', 'Dallas', 'Champ, Mavs Man', 'Blue, Silver, Black', 3);
INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Trailblazers', 'Portland', 'Blaze The Trail Cat', 'Red, Black, White', 2);



-- CREATE TABLE queries
​
CREATE TABLE player (
    playerID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    height INT NOT NULL,
    weight INT NOT NULL,
    position VARCHAR(2) NOT NULL,
    teamID INT NOT NULL,
    PRIMARY KEY (playerID),
    FOREIGN KEY (teamID) REFERENCES team(teamID)
    ON DELETE CASCADE
   );
​
CREATE TABLE coach (
	coachID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    tenure INT NOT NULL,
    teamID INT NOT NULL,
    PRIMARY KEY (coachID),
    FOREIGN KEY (teamID) REFERENCES team(teamID)
    ON DELETE CASCADE
   );
​
CREATE TABLE team_team (
	ttID INT NOT NULL AUTO_INCREMENT,
	team1ID INT NOT NULL,
	team2ID INT NOT NULL,
	PRIMARY KEY (ttID),
	FOREIGN KEY (team1ID) REFERENCES team(teamID),
	FOREIGN KEY (team2ID) REFERENCES team(teamID)
        ON DELETE CASCADE
   );
​
​
​
--Sample Data queries

INSERT INTO division (name) VALUES ('Pacific');
INSERT INTO division (name) VALUES ('Northwest');
INSERT INTO division (name) VALUES ('Southwest');


INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Lakers', 'Los Angeles', NULL, 'Purple, Gold', **divisionID for Pacific**);
INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Golden State Warriors', 'San Francisco', NULL, 'Royal Blue, Yellow', **divisionID for Pacific**); 
INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Mavericks', 'Dallas', 'Champ, Mavs Man', 'Blue, Silver, Black', **divisionID for Southwest**);
INSERT INTO team (name, location, mascot, jerseycolor, divisionID) VALUES ('Trailblazers', 'Portland', 'Blaze The Trail Cat', 'Red, Black, White', **divisionID for Northwest**);

​
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Steph','Curry',75,190,'PG', **teamID for Warriors**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('D''Angelo','Russell',77,196,'PG', **teamID for Warriors**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Jordan','Poole',77,194,'SG', **teamID for Warriors**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Glenn','Robinson III',77,220,'SF', **teamID for Warriors**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Draymond','Green',79,229,'PF', **teamID for Warriors**);
​
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Patrick','Beverly',72,182,'SG', **teamID for Clippers**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Landry','Shamet',77,188,'SG', **teamID for Clippers**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Kawhi','Leonard',79,229,'SF', **teamID for Clippers**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Glenn','Robinson III',79,220,'SF', **teamID for Clippers**);
INSERT INTO player (firstName,lastName,height,weight,position, teamID) VALUES ('Patrick','Patterson',81,229,'PF', **teamID for Clippers**);
​
INSERT INTO coach (firstName,lastName, role, tenure, teamID) VALUES ('Steve','Kerr','Head',5, **teamID for Warriors**);
INSERT INTO coach (firstName,lastName, role, tenure, teamID) VALUES ('Ron','Adams','Assistant',5, **teamID for Warriors**);
​
INSERT INTO coach (firstName,lastName, role, tenure, teamID) VALUES ('Doc','Rivers','Head',6, **teamID for Clippers**);
INSERT INTO coach (firstName,lastName, role, tenure, teamID) VALUES ('Tyronn','Lue','Assistant',0, **teamID for Clippers**);
​
INSERT INTO team_team (team1ID,team2ID) VALUES (**teamID for Lakers**,**teamID for Clippers**);
INSERT INTO team_team (team1ID,team2ID) VALUES (**teamID for Mavericks**,**teamID for Rockets**);


INSERT INTO team_team (team1ID,team2ID) VALUES (**teamID for Spurs**,**teamID for Rockets**);
INSERT INTO team_team (team1ID,team2ID) VALUES (**teamID for Spurs**,**teamID for Suns**);

