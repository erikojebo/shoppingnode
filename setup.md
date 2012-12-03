* Install postgres, create a user and database (see http://erikojebo.se/Code/Details/449)
* Create a file called dev.env in the root folder (shoppingnode)
* Add the following lines to the file (dev.env)
  DATABASE_URL=postgres://username:password@localhost/databasename
  ENVIRONMENT=development
* Set up the schema and test data by running
  psql -U username -d databasename
  and then executing the sql scripts in the sql directory:
  \i /path/to/shoppingnode/sql/schema.sql
  \i /path/to/shoppingnode/sql/create_test_data.sql
* Run the server using ./run in the root shoppingnode directory
