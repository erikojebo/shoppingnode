- Måste installera node separat, installer inkluderar npm
- Procfile måste ha stort P
- Om man döper om appen i webbgränssnittet måste man ändra sin heroku remote i git repositoriet
- För att sätta upp schemat på databasen, gå till websidan och klicka på postgres-addonnen i din apps configsektion

  - då kommer du till postgressidan där du kan se dina databaser. databasen
  - där heter någon färg, typ "red" för att ansluta till databasen kör "heroku
    pg:psql red" från din konsoll, detta kräver dock att postgresql är
    installerat

    - heroku pg:info
    - heroku pg:psql
    - heroku pg:credentials red
    - foreman start -e my_env
      - där my_env är en vil med miljövariabler
    


- För att kunna använda post-parametrar på ett enkelt sätt i express.js
  måste man lägga till app.use(express.bodyParser()), och detta måste
  göras innan första anropet till app.get/post.

- Om man klonar sitt github-repo igen på ny maskin måste man lägga till
  heroku-remoten för att allt ska funka.

  - git remote add heroku git@heroku.com:appnamn.git



- För att komma igång med postgres:

  - sudo apt-get install postgresql-9.1
  - change the line:

    local   all             all                                     peer

    to 

    local   all             all                                     md5

    in the file /etc/postgresql/9.1/main/pg_hba.conf

  - Create a database user (-P for password prompt):
    sudo -u postgres createuser -P someusername

  - Create a database (-O to set owner):
    sudo -u postgres createdb -O someusername somedatabasename 

  - Restart postgres:
    sudo service postgresql restart

  - Connect to the new database using the new user:
    psql -U someusername -d somedatabasename

  - When in the psql console, \i /path/to/file executes sql commands from a file
    \q exits psql


  - För att ansluta till databasen från koden används en url med följande format
    postgres://username:password@server/databasename