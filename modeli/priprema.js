const database = require('./database.js')
database.sequelize.sync({ force: true }).then(function () {
    inicializacija().then(function () {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija() {
    var nastavniciListaPromisea = [];
    var studentiListaPromisea = [];
    var prisustvaListaPromisea = [];
    var predmetiListaPromisea = [];
    return new Promise(function (resolve, reject) {
        nastavniciListaPromisea.push(database.nastavnik.create({ username: 'dinsvraka', password_hash: '$2b$10$0UsGQoixf/JqMMy2Kq1a6.YGFtMWAL4RjuSOWOy.KTL6TjPz6/UGm' }));
        nastavniciListaPromisea.push(database.nastavnik.create({ username: 'husohusic', password_hash: '$2b$10$LdFpkp2haP0zm5ETjfksbOADm6XdatsDfY5/HsU4eW9lXEvkDoF16' }));
        nastavniciListaPromisea.push(database.nastavnik.create({ username: 'matematic', password_hash: '$2b$10$SyUhFwIuGcznM4ek7S4zweSGDAOrqo3twneviLWf.OEkU7895hSIG' }));

        Promise.all(nastavniciListaPromisea).then(function (nastavnici) {
            var dinsvraka = nastavnici.filter(function (a) { return a.username === 'dinsvraka' })[0];
            var husohusic = nastavnici.filter(function (a) { return a.username === 'husohusic' })[0];
            var matematic = nastavnici.filter(function (a) { return a.username === 'matematic' })[0];
            studentiListaPromisea.push(
                database.student.create({ ime: 'Saša Matić', index: '12345' }));
            studentiListaPromisea.push(
                database.student.create({ ime: 'Dejan Matić', index: '12346' }));
            studentiListaPromisea.push(
                database.student.create({ ime: 'Dino Merlin', index: '12347' }));
            studentiListaPromisea.push(
                database.student.create({ ime: 'Nataša Bekvalac', index: '12348' }));
            studentiListaPromisea.push(
                database.student.create({ ime: 'Željko Joksimović', index: '12349' }));

            Promise.all(studentiListaPromisea).then(function (studenti) {
                var sasa = studenti.filter(function (s) { return s.ime === 'Saša Matić' })[0];
                var dejan = studenti.filter(function (s) { return s.ime === 'Dejan Matić' })[0];
                var dino = studenti.filter(function (s) { return s.ime === 'Dino Merlin' })[0];
                var natasa = studenti.filter(function (s) { return s.ime === 'Nataša Bekvalac' })[0];
                var zeljko = studenti.filter(function (s) { return s.ime === 'Željko Joksimović' })[0];

                predmetiListaPromisea.push(
                    database.predmet.create({ predmet: 'Web tehnologije', brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 4 }).then(function (pr) {
                        return pr.setNastavnici([dinsvraka, husohusic]).then(function () {
                            return new Promise(function (resolve, reject) { resolve(pr); });
                        });
                    })
                );
                predmetiListaPromisea.push(
                    database.predmet.create({ predmet: 'Razvoj mobilnih aplikacija', brojPredavanjaSedmicno: 3, brojVjezbiSedmicno: 2 }).then(function (pr) {
                        return pr.setNastavnici([dinsvraka, matematic]).then(function () {
                            return new Promise(function (resolve, reject) { resolve(pr); });
                        });
                    })
                );
                predmetiListaPromisea.push(
                    database.predmet.create({ predmet: 'Tehnike programiranja', brojPredavanjaSedmicno: 3, brojVjezbiSedmicno: 3 }).then(function (pr) {
                        return pr.setNastavnici([dinsvraka]).then(function () {
                            return new Promise(function (resolve, reject) { resolve(pr); });
                        });
                    })
                );
                //ostali predmetiListaPromisea.push()

                Promise.all(predmetiListaPromisea).then(function (predmeti) {
                    var wt = predmeti.filter(function (p) { return p.predmet === 'Web tehnologije' })[0];
                    var rma = predmeti.filter(function (p) { return p.predmet === 'Razvoj mobilnih aplikacija' })[0];
                    var tp = predmeti.filter(function (p) { return p.predmet === 'Tehnike programiranja' })[0];
                    //ostali predmeti.filter()
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbe: 4 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 1, vjezbe: 4 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: null, vjezbe: 3 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 4, predavanja: 2, vjezbe: 4 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 5, predavanja: 2, vjezbe: 4 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 6, predavanja: null, vjezbe: null }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 7, predavanja: 2, vjezbe: 2 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbe: 4 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 2, vjezbe: 4 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: 1, vjezbe: 4 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 4, predavanja: null, vjezbe: null }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 5, predavanja: 2, vjezbe: null }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 6, predavanja: 1, vjezbe: 1 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 7, predavanja: 0, vjezbe: 0 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            wt.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: null, vjezbe: 1 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbe: 2 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: null, vjezbe: null }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: null, vjezbe: 2 }).then(function (p) {
                            dino.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbe: 0 }).then(function (p) {
                            dino.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 0, vjezbe: 2 }).then(function (p) {
                            natasa.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 0, vjezbe: 0 }).then(function (p) {
                            natasa.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: null, vjezbe: null }).then(function (p) {
                            zeljko.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            zeljko.setPrisustvaStudenta(p)
                            rma.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: null, vjezbe: 1 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            sasa.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbe: 2 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: null, vjezbe: null }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            dejan.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: null, vjezbe: 2 }).then(function (p) {
                            dino.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbe: 0 }).then(function (p) {
                            dino.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            dino.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: 0, vjezbe: 2 }).then(function (p) {
                            natasa.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 0, vjezbe: 0 }).then(function (p) {
                            natasa.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            natasa.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 1, predavanja: null, vjezbe: null }).then(function (p) {
                            zeljko.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            zeljko.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    prisustvaListaPromisea.push(
                        database.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbe: 2 }).then(function (p) {
                            zeljko.setPrisustvaStudenta(p)
                            tp.setPrisustvaPredmeta(p)
                            return new Promise(function (resolve, reject) { resolve(p); });
                        })
                    );
                    //ostali prisustvaListaPromisea.push()

                    //Promise.all(prisustvaListaPromisea).then(function (prisustva) {
                       // resolve(prisustva);
                   // }).catch(function (err) { console.log("Prisustva greska " + err); });
                }).catch(function (err) { console.log("Predmeti greska " + err); });
            }).catch(function (err) {
                console.log("Studenti greska " + err
                );
            });
        }).catch(function (err) { console.log("Nastavnici greska " + err); });
    });
}
