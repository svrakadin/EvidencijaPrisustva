const express = require('express');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session')
const bodyParser = require('body-parser');

//sljedeci kod mi omogucava izmjenu json fajla ako se ne posalju svi predmeti (8 - 44 linija koda)
function popraviPrisustva() {
    const data = fs.readFileSync('data/prisustva.json');
    const prisustva = JSON.parse(data);

    for (let i = 0; i < prisustva.length; i++) {
        const maxSedmica = Math.max(...prisustva[i].prisustva.map(p => p.sedmica));

        prisustva[i].studenti.forEach(student => {
            for (let sedmica = 1; sedmica <= maxSedmica; sedmica++) {
                let nadjena = false;
                prisustva[i].prisustva.forEach(p => {
                    if (p.index == student.index && p.sedmica == sedmica) {
                        nadjena = true;
                        return;
                    }
                });
                if (!nadjena) {
                    prisustva[i].prisustva.push({ sedmica: sedmica, index: student.index });
                }
            }
        });
    }

    prisustva.forEach(predmet => {
        predmet.prisustva.sort((a, b) => {
            if (a.sedmica < b.sedmica) return -1;
            if (a.sedmica > b.sedmica) return 1;
            if (a.index < b.index) return -1;
            if (a.index > b.index) return 1;
            return 0;
        });
    });

    const json = JSON.stringify(prisustva);
    fs.writeFileSync('data/prisustva.json', json);
}

app.use((req, res, next) => { popraviPrisustva(); next(); })

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: '_tajna_',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());

app.get('/predmeti', (req, res) => {
    if (!req.session || !req.session.username)
        res.status(300).send('{greska:"Nastavnik nije loginovan"}');
    else {
        res.set('Cache-Control', 'no-store')
        res.send(JSON.stringify(req.session.predmeti));
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile('data/nastavnici.json', (err, data) => {
        if (err) {
            res.status(500);
            res.send(JSON.stringify({ "poruka": "Neuspješna prijava" }));
            return;
        }
        const nastavnici = JSON.parse(data);
        const user = nastavnici.find(u => u.nastavnik.username == username);
        if (!user) {
            res.status(300);
            res.send(JSON.stringify({ "poruka": "Neuspješna prijava" }));
            return;
        }
        bcrypt.compare(password, user.nastavnik.password_hash, (err, result) => {
            if (!result) {
                res.status(300).send(JSON.stringify({ "poruka": "Neuspješna prijava" }));
                return;
            }
            req.session.predmeti = user.predmeti
            req.session.username = user.nastavnik.username
            res.send(JSON.stringify({ "poruka": "Uspješna prijava" }));
        });
    });
});

app.post('/logout', function (req, res) {
    req.session.destroy()
    res.send();
});

function getPodatkePrisustva(naziv, res) {
    fs.readFile(`data/prisustva.json`, (err, data) => {
        const prisustva = JSON.parse(data);
        const predmet = prisustva.find(p => p.predmet == naziv);
        if (!predmet) {
            res.status(500).send(JSON.stringify({ error: 'Predmet nije nadjen' }));
            return;
        }
        res.send(JSON.stringify(predmet));
    });
}

app.get('/predmet/:NAZIV', (req, res) => {
    const naziv = req.params.NAZIV;
    getPodatkePrisustva(naziv, res);
});

function azurirajPodatkePrisustva(predmet, index, prisustvo) {
    var prisustva;
    fs.readFile(`data/prisustva.json`, (err, data) => {
        prisustva = JSON.parse(data);
        var i = prisustva.findIndex(p => p.predmet == predmet)
        var j = prisustva[i].prisustva.findIndex(p => p.index == index && p.sedmica == prisustvo.sedmica)
        prisustva[i].prisustva[j].predavanja = +prisustvo.predavanja
        prisustva[i].prisustva[j].vjezbe = +prisustvo.vjezbe
        fs.writeFile("data/prisustva.json", JSON.stringify(prisustva), () => { });
    });
}

app.post('/prisustvo/predmet/:NAZIV/student/:index', (req, res) => {
    const predmet = req.params.NAZIV;
    const index = req.params.index;
    const prisustvo = req.body;
    azurirajPodatkePrisustva(predmet, index, prisustvo);
    setTimeout(() => { getPodatkePrisustva(predmet, res) }, 50);
});

app.listen(3000);