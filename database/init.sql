\c SAEP;

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    UserName VARCHAR(50),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE Tasks (
    TaskID SERIAL PRIMARY KEY,
    TaskName VARCHAR(255),
    Description TEXT,
    DueDate DATE,
    UserID INT REFERENCES Users(UserID)
);