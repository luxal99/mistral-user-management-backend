# How to start backend server


1. Install Node 16
2. Install nest cli https://docs.nestjs.com/
3. Install MariaDB server version **Ver 15.1 Distrib 10.6.7-MariaDB**
4.First run ddl script from folder ./src/config/database/ddl/ddl.sql
5. Then run dump script ./src/config/database/dump/dump.sql
6. Open .dev.env file from ./src/environment/.dev.env and set credentials of your local database server
7. Run script nest build (npm run build) and then nest start (npm run start) or node ./dist/main.js


