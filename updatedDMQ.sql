-- get all players for a team
SELECT firstName,lastName,height,weight,position FROM player p INNER JOIN team t
	ON p.teamID = t.teamID
	WHERE t.name = :name of team to displayInput;
​
-- get all coaches for a team
SELECT firstName,lastName, role, tenure FROM coach c INNER JOIN team t
	ON c.teamID = t.teamID
	WHERE t.name = :name of team to displayInput;
​
-- get all rivalries
SELECT t1.teamID as team1ID, t2.teamID AS team2ID, t1.name, t2.name FROM team t1 INNER JOIN team_team tt
	ON t1.teamID = tt.team1ID INNER JOIN team t2
	ON t2.teamID = tt.team2ID;
​
-- get all team names for drop down 
SELECT name, teamID FROM team;

-- get all team names for head coach drop down (can only have 1 head coach per team)
SELECT teamID, name FROM team WHERE teamID 
	NOT IN (SELECT t.teamID FROM team t INNER JOIN coach c
	ON t.teamID = c.teamID AND c.role = 'Head');

--get all division names

SELECT name FROM division;
​
-- add new player
INSERT INTO coach (firstName,lastName, height, weight, position, teamID) VALUES (:firstNameInput,:lastNameInput,:heightInput,:weightInput, :positionInput, :teamID:);
​
-- add new coach
INSERT INTO coach (firstName,lastName, role, tenure, teamID) VALUES (:firstNameInput,:lastNameInput,:roleInput,:tenureInput, :teamID:);
​
-- add new rivalry
INSERT INTO team_team (team1ID,team2ID) VALUES (:team1IDInput,:team2ID:);

-- add new division
INSERT INTO division (name) VALUES(:nameInput);

-- add new team
INSERT INTO team (name, location, mascot, jerseyColor, divisionID) VALUES (:nameInput, :locationInput, :mascotInput, :jerseyColorInput, :divisionID)
​
-- update player info
UPDATE player SET firstName = :firstNameInput, lastName = :lastNameInput, height = :heightInput, weight = :weightInput, position = :positionInput, teamID = :teamID: WHERE playerID = :playerIDInput;
​
-- update coach info
UPDATE coach SET firstName = :firstNameInput, lastName = :lastNameInput, role = :roleInput, tenure = :tenureInput, teamID = :teamID: WHERE coachID = :coachIDInput;
​
--update division
UPDATE division SET name = :nameInput WHERE divisionID = :divisionIDInput;

--update team
UPDATE team SET name = :nameInput, location = :locationInput, mascot = :mascotInput, jerseyColor = :jerseyColorInput, divisionID = :divisionIDInput;

-- delete player
DELETE FROM player WHERE playerID = :playerIDInput;
​
-- delete coach
DELETE FROM coach WHERE coachID = :coachIDInput;
​
-- delete rivalry
DELETE FROM team_team WHERE team1ID = :team1ID: AND team2ID = :team2IDInput;

-- delete division
DELETE FROM division WHERE divisionID = :divisionIDInput;

-- delete team
DELETE FROM team WHERE teamID = :teamIDInput;










