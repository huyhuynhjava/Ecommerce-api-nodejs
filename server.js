import app from "./app/app.js";
const PORT = process.env.PORT || 3000;
//server
app.listen(PORT, () => console.log("server listening on port " + PORT));
