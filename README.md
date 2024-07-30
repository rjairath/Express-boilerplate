
# Express Boilerplate

This is the Express and mysql starter code on top of which I build other stuff

## How to run
make sure you have access to a remote mysql server or a local instance running.
Create a local .env file where you will store the db credentials
Can replace mysql with any other RDBMS, just need to replace the driver for that database and update sequelize config. 

Overview:
```
server.js -> sequelize(ORM) -> mysql db
```
