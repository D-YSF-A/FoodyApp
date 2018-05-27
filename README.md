# Repository of the CS308 Spring 2018 project



## Database initial Setup

```
CREATE USER postgres WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';
```

To create database from the comand line (CLI) enter the following command:

```
createdb foody


psql foody


CREATE TABLE "User"
(
    id serial,
    name character varying,
    email character varying,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "User"
    OWNER to postgres;


INSERT INTO "User" (name,email) VALUES ('john','john@gmail.com');

SELECT * FROM "User";

\q


# FoodyApp
