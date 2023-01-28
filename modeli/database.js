const path = require('path');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt22", "root", "password", { 
    host: "127.0.0.1", 
    dialect: "mysql", 
    logging: false 
});
const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

//import modela
database.nastavnik = require(path.join(__dirname, "./nastavnik.js"))(sequelize, Sequelize.DataTypes)
database.student = require(path.join(__dirname, "./student.js"))(sequelize, Sequelize.DataTypes)
database.prisustvo = require(path.join(__dirname, "./prisustvo.js"))(sequelize, Sequelize.DataTypes)
database.predmet = require(path.join(__dirname, "./predmet.js"))(sequelize, Sequelize.DataTypes)

// Veza n-m nastavnik moze imati vise predmeta, a predmet vise nastavnika
database.nastavnikPredmet = database.predmet.belongsToMany(database.nastavnik, { as: 'nastavnici', through: 'nastavnik_predmet', foreignKey: 'predmetId' });
database.nastavnik.belongsToMany(database.predmet, { as: 'predmeti', through: 'nastavnik_predmet', foreignKey: 'nastavnikId' });

// Veza 1-n 1 student na vise prisustava
database.student.hasMany(database.prisustvo, { as: 'prisustvaStudenta' });

// Veza 1-n 1 predmet na vise prisustava
database.predmet.hasMany(database.prisustvo, { as: 'prisustvaPredmeta' });

module.exports = database;