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
    
