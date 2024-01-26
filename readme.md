# Hotel Sign In / Login Project



### Description

This project is designed to provide a secure and efficient sign-in and login system for hotels. It leverages modern web technologies to create a seamless experience for both guests and hotel staff.

### Installation

To get started with the Hotel Sign In / Login Project, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a PostgreSQL database as'hotel' and run the following SQL code:

    ```sql
    -- Table: public.hotel_info

    -- DROP TABLE IF EXISTS public.hotel_info;

    CREATE TABLE IF NOT EXISTS public.hotel_info
    (
        id serial NOT NULL,
        first_name character varying(30) COLLATE pg_catalog."default",
        last_name character varying(30) COLLATE pg_catalog."default",
        email character varying(50) COLLATE pg_catalog."default",
        password text COLLATE pg_catalog."default" NOT NULL,
        address character varying(250) COLLATE pg_catalog."default",
        state character varying(30) COLLATE pg_catalog."default",
        zip character varying(6) COLLATE pg_catalog."default",
        city character varying(30) COLLATE pg_catalog."default",
        CONSTRAINT hotel_info_pkey PRIMARY KEY (id)
    )
    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.hotel_info
        OWNER to postgres;
    ```




### Project Structure

- `index.js`: Main entry point for the application.
- `src/`: Directory containing the source code.
  - `routes/`: Contains route handlers for different parts of the application.
  - `views/`: Includes EJS templates for rendering HTML views.

### Dependencies

- **bcrypt**: ^5.1.1
- **body-parser**: ^1.20.2
- **ejs**: ^3.1.9
- **express**: ^4.18.2
- **pg**: ^8.11.3

### Scripts

- **test**: Run tests for the project.

### Author

Rushabh Shrishrimal

### License

This project is licensed under the ISC License.
# Project-2
