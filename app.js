const express = require("express");
const user = require("./controllers/usercontroller");
const game = require("./controllers/gamecontroller");

const app = express();
app.use(require("body-parser").json());

app.use("/api/auth", user);
app.use(require("./middleware/validate-session"));

app.use("/api/game", game);
app.listen(4000, () => {
    console.log("Your app is listening on port 4000");
});
