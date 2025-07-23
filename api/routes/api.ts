import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { env } from "hono/adapter";
import studentsRouter from "./students.js";

const homepageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Go Use Postman!</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f1f5f9;
    }
    .container {
      text-align: center;
      background: white;
      padding: 2rem 3rem;
      border-radius: 1rem;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 2rem;
      color: #1e293b;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Go Use Postman!</h1>
  </div>
</body>
</html>
`;


const apiRouter = new Hono();

apiRouter.get("/", (c) => {
  return c.html(homepageHtml);
});

apiRouter.use(
  "*",
  bearerAuth({
    verifyToken: async (token, c) => {
      const { API_SECRET } = env<{ API_SECRET: string }>(c);
      return token === API_SECRET;
    },
  })
);

apiRouter.route("/students", studentsRouter);

export default apiRouter;
