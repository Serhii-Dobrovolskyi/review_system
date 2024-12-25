const cors = require('cors')

const express = require("express");

const app = express();

const reviews = {};
app.use(cors())
app.use(express.json());

const auth = {
   id: 1,
   name: "Serhii"
}


app.get("/", (req, res) => {
   res.json(reviews);
});

app.get("/:id", (req, res) => {
   res.json({ review: reviews[req.params.id] });
});

app.post("/", (req, res) => {
   const id = Date.now();
   console.log(req.body)
   const newReview = {
      id,
      ...req.body,
      user: auth.name,
      date: new Date().toISOString(),
   };

   reviews[id] = newReview;

   res.json(newReview);
});

app.delete("/:id", (req, res) => {
   const id = req.params.id;

   delete reviews[id];

   res.json({ ok: true });
});

app.patch("/:id", (req, res) => {
   const id = req.params.id;

   reviews[id] = {
      ...reviews[id],
      ...res.body,
   };

   return reviews[id];
});

app.listen(3000, () => {
   console.log("server stated");
});