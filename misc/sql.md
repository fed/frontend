# SQL Essentials

```sql
SHOW databases;

CREATE DATABASE example;

USE example;

SHOW tables;

CREATE TABLE investigations(
	title varchar(100),
	detective varchar(30),
	daysToSolve integer
);

EXPLAIN investigations; // table definition

INSERT
	INTO investigations (title, detective)
	VALUES ('Who ate my donut', 'John Doe');
	
SELECT * FROM investigations;

ALTER TABLE investigations RENAME cases; // Rename table from `investigations` to `cases`

ALTER TABLE cases ADD criminal varchar(100);

ALTER TABLE cases DROP criminal;

ALTER TABLE cases CHANGE title caseName varchar(255);
// ALTER TABLE <table-name> CHANGE <current-field-name> <new-field-name> <new-field-type>;

UPDATE cases SET hoursToSolve = hoursToSolve * 24 // updates all rows based on current value

SELECT FROM cases WHERE hoursToSolve BETWEEN 24 AND 60;

SELECT FROM detectives WHERE firstName (NOT) LIKE "%C" // means zero or more of any character

SELECT FROM detectives WHERE phoneNumber LIKE "801%" // Detectives from Utah

SELECT * FROM cases LIMIT 2 OFFSET 2; // for pagination, offset is the number of records the user has already seen

SELECT DISTINCT detectiveId FROM cases; // filter out duplicates

SELECT
	detectiveId, AVG(hoursToSolve)
	FROM cases
	GROUP BY detectiveId;
	
SELECT * FROM cases WHERE detectiveId = (
	SELECT id FROM detectives WHERE name = "A" // Subquery
);

// IN = in Array, the result of the subquery is an array
SELECT * FROM cases WHERE detectiveId IN (
	SELECT id FROM detectives WHERE phoneNumber LIKE "801%"
);

SELECT firstName, lastName FROM detectives
	UNION SELECT firstName, lastName FROM criminals;

SELECT CONCAT(firstName, " ", lastName) FROM detectives;

SELECT title, DATE_ADD(startDate, INTERVAL hoursToSolve HOUR);
```

## SQL Modelling and Querying Exercise

This is the SQL code to set up a database for a problem I had on a database management exam. Here's the problem: **write an SQL query that will return a table of the names and salaries of the professors who teach 20 or more students**.

```
Professor
-name (PK)
-specialisation
-salary

Student
-name (PK)
-study_type

Course
-number (PK)
-stud_name (FK)
-prof_name (FK)
-grade
```

Query:

```
SELECT professors.name, professors.salary FROM professors
INNER JOIN courses ON courses.prof_name = professors.name
GROUP BY professors.name
HAVING COUNT(courses.prof_name) >= 20
```

Script:

```
CREATE DATABASE profs;
USE profs;

CREATE TABLE professors (
	name varchar(30) NOT NULL,
	specialization varchar(20),
	salary double(8,2),
	CONSTRAINT prof_pk PRIMARY KEY (name));

CREATE TABLE students (
	name varchar(30) NOT NULL,
        study_type varchar(20),
	CONSTRAINT stud_pk PRIMARY KEY (name));

CREATE TABLE courses (
	num int NOT NULL AUTO_INCREMENT,
	stud_name varchar(30),
	prof_name varchar(30),
        grade varchar(10),
	CONSTRAINT courses_pk PRIMARY KEY (num),
	CONSTRAINT stud_fk FOREIGN KEY (stud_name) REFERENCES students(name),
	CONSTRAINT prof_fk FOREIGN KEY (prof_name) REFERENCES professors(name));
	
INSERT INTO professors VALUES
	("Prof 1", "spec 1", 10000.00),
	("Prof 2", "spec 2", 10000.00),
	("Prof 3", "spec 3", 10000.00),
	("Prof 4", "spec 4", 10000.00),
	("Prof 5", "spec 5", 10000.00),
	("Prof 6", "spec 6", 10000.00),
	("Prof 7", "spec 7", 10000.00),
	("Prof 8", "spec 8", 10000.00),
	("Prof 9", "spec 9", 10000.00),
	("Prof 10", "spec 10", 10000.00);

INSERT INTO students(name) VALUES
	("Student 1"),
	("Student 2"),
	("Student 3"),
	("Student 4"),
	("Student 5"),
	("Student 6"),
	("Student 7"),
	("Student 8"),
	("Student 9"),
	("Student 10"),
	("Student 11"),
	("Student 12"),
	("Student 13"),
	("Student 14"),
	("Student 15"),
	("Student 16"),
	("Student 17"),
	("Student 18"),
	("Student 19"),
	("Student 20"),
	("Student 21"),
	("Student 22"),
	("Student 23"),
	("Student 24"),
	("Student 25"),
	("Student 26"),
	("Student 27"),
	("Student 28"),
	("Student 29"),
	("Student 30"),
	("Student 31"),
	("Student 32"),
	("Student 33"),
	("Student 34"),
	("Student 35"),
	("Student 36"),
	("Student 37"),
	("Student 38"),
	("Student 39"),
	("Student 40"),
	("Student 41"),
	("Student 42"),
	("Student 43"),
	("Student 44"),
	("Student 45"),
	("Student 46"),
	("Student 47"),
	("Student 48"),
	("Student 49"),
	("Student 50"),
	("Student 51"),
	("Student 52"),
	("Student 53");

INSERT INTO courses(stud_name, prof_name) VALUES
	("Student 1", "Prof 1"),
	("Student 2", "Prof 1"),
	("Student 3", "Prof 1"),
	("Student 4", "Prof 1"),
	("Student 5", "Prof 1"),
	("Student 6", "Prof 1"),
	("Student 7", "Prof 1"),
	("Student 8", "Prof 1"),
	("Student 9", "Prof 1"),
	("Student 10", "Prof 1"),
	("Student 11", "Prof 1"),
	("Student 12", "Prof 1"),
	("Student 13", "Prof 1"),
	("Student 14", "Prof 1"),
	("Student 15", "Prof 1"),
	("Student 16", "Prof 1"),
	("Student 17", "Prof 1"),
	("Student 18", "Prof 1"),
	("Student 19", "Prof 1"),
	("Student 20", "Prof 1"),
	("Student 21", "Prof 1"),
	("Student 22", "Prof 1"),
	("Student 23", "Prof 1"),
	("Student 24", "Prof 2"),
	("Student 25", "Prof 2"),
	("Student 26", "Prof 2"),
	("Student 27", "Prof 2"),
	("Student 28", "Prof 2"),
	("Student 29", "Prof 2"),
	("Student 30", "Prof 2"),
	("Student 31", "Prof 2"),
	("Student 32", "Prof 2"),
	("Student 33", "Prof 2"),
	("Student 34", "Prof 2"),
	("Student 35", "Prof 2"),
	("Student 36", "Prof 2"),
	("Student 37", "Prof 2"),
	("Student 38", "Prof 2"),
	("Student 39", "Prof 2"),
	("Student 40", "Prof 2"),
	("Student 41", "Prof 2"),
	("Student 42", "Prof 2"),
	("Student 43", "Prof 2"),
	("Student 44", "Prof 2"),
	("Student 45", "Prof 2"),
	("Student 46", "Prof 3"),
	("Student 46", "Prof 4"),
	("Student 47", "Prof 5"),
	("Student 48", "Prof 6"),
	("Student 49", "Prof 7"),
	("Student 50", "Prof 8"),
	("Student 51", "Prof 9"),
	("Student 52", "Prof 10"),
	("Student 53", "Prof 10");
```

From TutsPlus SQL Essentials video course
