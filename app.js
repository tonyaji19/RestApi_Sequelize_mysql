import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import Router from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(cors());
app.use(Router);

app.listen(process.env.PORT || 3306, () =>
  console.log("Server running at http://localhost:3306")
);
