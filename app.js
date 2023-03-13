const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
app.use(express.json());
const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/players/", async (request, response) => {
  const getPlayers = `
    SELECT
      *
    FROM
       cricket_team`;
  const booksArray = await db.all(getPlayers);
  response.send(booksArray);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playername, jerseynumber, role } = bookDetails;
  const addplayerQuery = `
    INSERT INTO
      cricket_team ( player_name, jersey_number, role)
    VALUES
      (
        '${playername}',
         ${jerseynumber},
         ${role},
      );`;

  const dbResponse = await db.run(addplayerQuery);
  response.send(`Player Added to Team`);
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getplayersQuery = `
    SELECT
      *
    FROM
       cricket_team
       where player_id=${playerId}`;
  const finalresult = await db.get(getplayersQuery);
  response.send(fnalresult);
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playersDetails = request.body;
  const { playername, jerseynumber, role } = playersDetails;
  const updateplayerQuery = `
    UPDATE
      cricket_team
    SET
      player_name='${playername}',
      jersey_number=${jeraseynumber},
      role=${role},
    WHERE
      player_id = ${playerId};`;
  await db.run(updateplayerQuery);
  response.send("Book Updated Successfully");
});
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteplayerQuery = `
    DELETE FROM
      cricket_team
    WHERE
      player_id = ${playerID};`;
  await db.run(deleteplayerQuery);
  response.send("Player Removed");
});
module.exports = app;
