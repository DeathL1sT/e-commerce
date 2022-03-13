import app from "./app";

const port = process.env.Port || 3001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
