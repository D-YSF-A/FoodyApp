CREATE TABLE public."items"
(
    id serial,
    name character varying,
    price integer,
    imgUrl character varying,
    category character varying,
    location point,
    restorantId serial,
    description character varying,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."items"
    OWNER to postgres;


ALTER TABLE "public"."items"
     ADD COLUMN "description" character varying;

ALTER TABLE "public"."items"
     ADD FOREIGN KEY ("restorantId") REFERENCES "public"."items"("id") ON DELETE CASCADE;
