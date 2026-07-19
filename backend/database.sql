CREATE DATABASE CaptainsCrabDatabase

CREATE TABLE Menu (

    FoodItemID SERIAL PRIMARY KEY,
    ItemName varchar(255),
    HasDesc boolean,
    ItemDescription text,
    FoodImage VARCHAR(500)

)