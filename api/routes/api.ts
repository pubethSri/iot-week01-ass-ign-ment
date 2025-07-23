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
      margin-bottom: 1rem;
    }
    .copy-box {
      background: #f8fafc;
      padding: 0.8rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid #cbd5e1;
      cursor: pointer;
      user-select: all;
      transition: background 0.2s;
    }
    .copy-box:hover {
      background: #e2e8f0;
    }
    .copied {
      margin-top: 0.75rem;
      color: green;
      font-size: 0.9rem;
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Go Use Postman!</h1>
    <div class="copy-box" onclick="copyURL()">https://iot-week01-ass-ign-ment-production.up.railway.app/api</div>
    <div class="copied" id="copiedText">Copied to clipboard!</div>
  </div>
  <script>
    function copyURL() {
      const url = "https://iot-week01-ass-ign-ment-production.up.railway.app/api";
      navigator.clipboard.writeText(url).then(() => {
        const copied = document.getElementById("copiedText");
        copied.style.display = "block";
        setTimeout(() => {
          copied.style.display = "none";
        }, 1500);
      });
    }
  </script>
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
