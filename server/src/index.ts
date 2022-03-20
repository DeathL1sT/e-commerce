import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
