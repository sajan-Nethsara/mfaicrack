import express from "express";
import puppeteer from "puppeteer";

const app = express();

function makeUrl(id) {
  const url = `https://murf.ai/share/${id}`;
  return url;
}

function defHtml(audSrc , fileId) {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>My Express HTML Response</title>
      <script>
        function downloadFile(fileUrl) {
          fetch(fileUrl)
            .then((response) => response.blob())
            .then((blob) => {
              // Create a link element
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = "murfAI-download-${fileId}.mp3"; // You can set the desired file name here
              // Hide the link
              link.style.display = "none";
              // Append the link to the body
              document.body.appendChild(link);
              // Programmatically trigger a click event on the link
              link.click();
              // Clean up
              window.URL.revokeObjectURL(link.href);
              document.body.removeChild(link);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      </script>
      <style>
        body{
          margin: 0%;
        }
        .wrapper{
          display: flex;
          height: 100vh;
          width: 100vw;
          background-color: #f1f1f1;
          justify-content: center;
          align-items: start;
        }
        .card{
          background-color: #dbdbdb;
          box-shadow: 10px 10px;
          border-radius: 10px;
          margin-top: 2rem;
          padding: 2rem 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
        }
        h1{
          margin: 0 0 0 0;
          font-family: monospace;
        }
        p{
          font-family: monospace;
  
        }
        button{
          font-family: monospace;
          padding: 1rem 1rem 1rem 1rem;
          font-weight: 700;
          color: #f0f8ff;
          font-size: medium;
          background-color: #6b00b3;
          border: 0;
          border-radius: 10px;
          cursor: pointer;
        }
        button:hover{
          box-shadow: -5px 5px black;
          background-color: #8a2be2;
          transition-duration: 300ms;
          transition-timing-function:ease;
        }
        .message{
          display: flex;
          justify-items: center;
          align-items: center;
        }
        a{
          margin-left: 1em;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <h1>I cracked Murf.AI Pro</h1>
          <p>This is only showcase to Murf.Ai company about there security issue </p>
          <button onclick="downloadFile('${audSrc}')"> ${fileId} Download MP3</button>
          <div class="message">
            <p>Hey Ankur Edkie, Please reply the message :] </p>
            <a href="https://www.linkedin.com/in/sajan-nethsara-%F0%9F%9A%80-5125b0267/" target="_blank">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
  </html>
  
  `;
  return html;
}

// const browser = await puppeteer.launch();

app.get("/api/murfai", async (req, res) => {
  console.log("req trigered")
  const browser = await puppeteer.launch();
  const id = req.query.share_id;
  const page = await browser.newPage();
  console.log(`going to ${makeUrl(id)}`)
  await page.goto(makeUrl(id));
  console.log("going done")
  const attr = await page.$$eval("audio", (el) =>
    el.map((x) => x.getAttribute("src"))
  );
  const html = defHtml(attr[0] , id );
  await browser.close();
  res.send(html)
  console.log("res sended")
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;