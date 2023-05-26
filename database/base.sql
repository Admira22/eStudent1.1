CREATE TABLE users(
    id serial primary key ,
    user_type varchar(250) not null ,
    name varchar(250) not null ,
    lastname varchar(250) not null ,
    email varchar(500) not null ,
    password varchar(500) not null ,
    study_program varchar(300) not null
);

INSERT INTO users
VALUES ('1','student','Admira','Bakal','admira.bakal@gmail.com','123','IT');

SELECT * FROM users;
DELETE FROM users WHERE id=1;

CREATE TABLE news(
    id serial primary key ,
    title varchar(250) not null,
    subtitle varchar(250) not null ,
    text varchar(500) not null
);

SELECT * FROM news ORDER BY id DESC LIMIT 2;


CREATE TABLE questions(
    id serial primary key ,
    question varchar(250) not null ,
    subject varchar(250) not null
);
ALTER TABLE questions
ADD COLUMN isAnswered boolean;

CREATE TABLE answers(
    id serial primary key,
    name varchar(250) not null,
    text varchar(250) not null,
    questions_id int not null,
    FOREIGN KEY (questions_id)
        REFERENCES questions (id)
);

SELECT text,q.question FROM answers
INNER JOIN questions q on answers.questions_id = q.id;

SELECT * FROM questions;
SELECT * FROM answers;

UPDATE questions SET isanswered = false WHERE id = 10;

ALTER TABLE questions
    ALTER COLUMN isanswered SET DEFAULT false;

CREATE TABLE studentImages
(
    id           serial,
    user_id      int,
    image_name   varchar(200),
    image_url    varchar(200),
    image_number int,
    PRIMARY KEY (id, user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

SELECT * FROM studentImages;

CREATE TABLE answersImages
(
    id           serial,
    answers_id      int,
    image_name   varchar(200),
    image_url    varchar(200),
    image_number int,
    PRIMARY KEY (id, answers_id),
    FOREIGN KEY (answers_id) REFERENCES answers (id)
);