const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const configFile = fs.readFileSync('config.json', 'utf8');
const config = JSON.parse(configFile);
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(cookieParser());
app.use(cors({ origin: config.corsConf }));
app.use(express.json());

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

const userSchema = new mongoose.Schema(config.userSchema);

const User = mongoose.model('User', userSchema);

app.get('/backend/firstName', async (req, res) => {
  const userId = req.query.userId;
  console.log("ID de l'utilisateur dans la requête :", userId);

  if (!userId) {
    res.json({ firstName: 'World' });
    return;
  }

  try {
    const user = await User.findById(userId);
    console.log('Utilisateur récupéré depuis MongoDB:', user);
    if (!user) {
      res.json({ firstName: 'World' });
      return;
    }

    res.json({ firstName: user.firstName });
  } catch (error) {
    console.error('Erreur lors de la récupération du prénom depuis MongoDB:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du prénom.' });
  }
});

app.put('/backend/firstName', async (req, res) => {
  const newFirstName = req.body.firstName;
  if (!newFirstName) {
    res.status(400).json({ error: 'Le prénom doit être fourni dans le corps de la requête.' });
    return;
  }

  const userId = req.cookies.userId;

  try {
    if (userId) {
      const user = await User.findOne({ _id: userId });
      if (user) {
        user.firstName = newFirstName;
        user.date = new Date();
        await user.save();
        console.log('Utilisateur mis à jour dans la base de données:', user);
        res.json({ userId, firstName: newFirstName });
      } else {
        console.log('Utilisateur non trouvé dans la base de données.');
        res.status(404).json({ error: 'Utilisateur non trouvé dans la base de données.' });
      }
    } else {
      const newUser = new User({
        firstName: newFirstName,
        date: new Date(),
      });

      const savedUser = await newUser.save();
      console.log('Nouvel utilisateur ajouté à la base de données:', savedUser);

      res.cookie('userId', savedUser._id);
      console.log('Cookie "userId" défini avec succès:', savedUser._id);

      res.json({ userId: savedUser._id, firstName: newFirstName });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prénom dans MongoDB:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du prénom.' });
  }
});

const backEndPort = config.backEndPort;
app.listen(backEndPort, () => {
  console.log(`Serveur Node.js écoutant sur le port ${backEndPort} (Backend)`);
});
