const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generate-bill', (req, res) => {
  const data = req.body;
  let treatments = [];

  if (Array.isArray(data.treatment)) {
    data.treatment.forEach((t, i) => {
      treatments.push({
        name: t,
        cost: parseFloat(data.cost[i])
      });
    });
  } else {
    treatments.push({
      name: data.treatment,
      cost: parseFloat(data.cost)
    });
  }

  const total = treatments.reduce((sum, t) => sum + t.cost, 0);

  res.render('bill', {
    patient: data.patient,
    age: data.age,
    date: data.date,
    treatments,
    total
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
