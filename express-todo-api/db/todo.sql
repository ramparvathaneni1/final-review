DROP TABLE todos;
DROP TABLE users;

CREATE TABLE todos
(
    ID    SERIAL PRIMARY KEY,
    title VARCHAR(50),
    done  BOOLEAN
);

INSERT INTO todos (title, done)
VALUES ('Finish Homework', false),
       ('Plan Vacation', false),
       ('Go to the Gym', true),
       ('Prepare Presentation', false),
       ('Clean the House', true),
       ('Organize Office', false),
       ('Repair Bike', true),
       ('Study for Exams', false),
       ('Renew Passport', false);