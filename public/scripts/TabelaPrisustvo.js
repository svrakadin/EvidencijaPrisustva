let TabelaPrisustvo = function (divRef, podaci) {
    divRef.innerHTML = "";

    //Provjera da li je br. prisustva na predavanjima/vjezbama > od sedmicnog predvidjenog broja predavanja/vjezbi
    //Provjera da li je unseni broj ispisa manji od nule
    for (let i = 0; i < podaci.prisustva.length; i++) {
        if (podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno || podaci.prisustva[i].predavanja < 0) {
            divRef.innerHTML = "<div class='greska'>Podaci o prisustvu nisu validni!</div>";
            return 0;
        }
        if (podaci.prisustva[i].vjezbe > podaci.brojVjezbiSedmicno || podaci.prisustva[i].vjezbe < 0) {
            divRef.innerHTML = "<div class='greska'>Podaci o prisustvu nisu validni!</div>";
            return 0;
        }
    }

    //Provjera da li student ima dva ili više unosa prisustva za istu sedmicu
    for (let i = 0; i < podaci.studenti.length; i++) {
        const brojanjePogresnihUnosa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let brIndeksa = podaci.studenti[i].index;
        for (let j = 0; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].index == brIndeksa)
                brojanjePogresnihUnosa[podaci.prisustva[j].sedmica - 1]++;
        }
        for (let k = 0; k < brojanjePogresnihUnosa.length; k++)
            if (brojanjePogresnihUnosa[k] > 1) {
                divRef.innerHTML = "<div class='greska'>Podaci o prisustvu nisu validni!</div>";
                return 0;
            }
    }

    //Provjera da li postoje dva ili više studenata sa istim indeksom u listi studenata
    for (let i = 0; i < podaci.studenti.length; i++) {
        let brIndeksa = podaci.studenti[i].index;
        let brojacIstihIndexa = 0;
        for (let j = 0; j < podaci.studenti.length; j++) {
            if (brIndeksa == podaci.studenti[j].index)
                brojacIstihIndexa++;
            if (brojacIstihIndexa > 1) {
                divRef.innerHTML = "<div class='greska'>Podaci o prisustvu nisu validni!</div>";
                return 0;
            }
        }
    }

    //Provjera da li postoji prisustvo za studenta koji nije u listi studenata
    for (let i = 0; i < podaci.prisustva.length; i++) {
        let brIndeksa = podaci.prisustva[i].index;
        let brojacIstihIndexa = 0;
        for (let j = 0; j < podaci.studenti.length; j++) {
            if (brIndeksa == podaci.studenti[j].index)
                brojacIstihIndexa++;
        }
        if (brojacIstihIndexa == 0) {
            divRef.innerHTML = "<div class='greska'>Podaci o prisustvu nisu validni!</div>";
            return 0;
        }
    }

    const popunjenostSedmica1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < podaci.prisustva.length; i++) {
        popunjenostSedmica1[podaci.prisustva[i].sedmica - 1] = 1;
    }
    let brojZadnjeUneseneSedmice = 0;
    for (let i = 0; i < popunjenostSedmica1.length; i++) {
        if (popunjenostSedmica1[i] == 1) brojZadnjeUneseneSedmice = i + 1;
    }

    //modifikacija liste prisustva potrebne za crtanje tabele
    for (let i = 0; i < podaci.studenti.length; i++) {
        const uneseneSedmice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let brojac = 0;
        for (let j = 0; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].index == podaci.studenti[i].index && podaci.prisustva[j].sedmica <= brojZadnjeUneseneSedmice) {
                brojac++;
                uneseneSedmice[podaci.prisustva[j].sedmica - 1] = 1;
            }
        }
        if (brojac < brojZadnjeUneseneSedmice) {
            for (let k = 0; k < brojZadnjeUneseneSedmice; k++) {
                if (uneseneSedmice[k] == 0) {
                    podaci.prisustva.push({ "sedmica": k + 1, "index": podaci.studenti[i].index });
                }
            }
        }
    }

    //sortirana prisustva po sedmicama i indexima
    let temp;
    for (let i = 0; i < podaci.prisustva.length - 1; i++) {
        for (let j = i + 1; j < podaci.prisustva.length; j++) {
            if (podaci.prisustva[j].sedmica < podaci.prisustva[i].sedmica) {
                temp = podaci.prisustva[j];
                podaci.prisustva[j] = podaci.prisustva[i];
                podaci.prisustva[i] = temp;
            }
            else if (podaci.prisustva[j].sedmica == podaci.prisustva[i].sedmica) {
                if (podaci.prisustva[j].index < podaci.prisustva[i].index) {
                    temp = podaci.prisustva[j];
                    podaci.prisustva[j] = podaci.prisustva[i];
                    podaci.prisustva[i] = temp;
                }
            }
        }
    }

    //Provjera da li je sedmica prazna izmedju dvije sedmice
    const popunjenostSedmica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < podaci.prisustva.length; i++) {
        if (podaci.prisustva[i].predavanja == null && podaci.prisustva[i].vjezbe == null) continue;
        else popunjenostSedmica[podaci.prisustva[i].sedmica - 1] = 1;
    }
    for (let j = 0; j < popunjenostSedmica.length; j++) {
        if (popunjenostSedmica[j] == 0) {
            for (let k = 0; k < j; k++) {
                if (popunjenostSedmica[k] == 1) {
                    for (let p = j + 1; p < popunjenostSedmica.length; p++) {
                        if (popunjenostSedmica[p] == 1) {
                            divRef.innerHTML = "<div class='greska'>Podaci o prisustvu nisu validni!</div>";
                            return 0;
                        }
                    }
                }
            }
        }
    }

    function nacrtajTabelu(trenutnaSedmica1) {
        divRef.innerHTML = "";
        var tabela = "<div class='response_table'>" + "<h1>" + podaci.predmet + "</h1><h2>BSc 1</h2><h3>Računarstvo i informatika</h3>" + "<table><tr><th class='prva_kolona'>Ime i prezime</th><th>Index</th>";
        for (let i = 0; i < brojZadnjeUneseneSedmice; i++) {
            let brojNastaveSedmicno = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
            if (i == trenutnaSedmica1 - 1) tabela = tabela + "<th colspan='" + brojNastaveSedmicno + "'>";
            else tabela = tabela + "<th>";
            if (i == 0) tabela = tabela + "I</th>";
            else if (i == 1) tabela = tabela + "II</th>";
            else if (i == 2) tabela = tabela + "III</th>";
            else if (i == 3) tabela = tabela + "IV</th>";
            else if (i == 4) tabela = tabela + "V</th>";
            else if (i == 5) tabela = tabela + "VI</th>";
            else if (i == 6) tabela = tabela + "VII</th>";
            else if (i == 7) tabela = tabela + "VIII</th>";
            else if (i == 8) tabela = tabela + "IX</th>";
            else if (i == 9) tabela = tabela + "X</th>";
            else if (i == 10) tabela = tabela + "XI</th>";
            else if (i == 11) tabela = tabela + "XII</th>";
            else if (i == 12) tabela = tabela + "XIII</th>";
            else if (i == 13) tabela = tabela + "XIV</th>";
            else if (i == 14) tabela = tabela + "XV</th>";
        }
        if (brojZadnjeUneseneSedmice - 1 == 0) tabela = tabela + "<th colspan='14'>II-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 1) tabela = tabela + "<th colspan='13'>III-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 2) tabela = tabela + "<th colspan='12'>IV-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 3) tabela = tabela + "<th colspan='11'>V-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 4) tabela = tabela + "<th colspan='10'>VI-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 5) tabela = tabela + "<th colspan='9'>VII-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 6) tabela = tabela + "<th colspan='8'>VIII-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 7) tabela = tabela + "<th colspan='7'>IX-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 8) tabela = tabela + "<th colspan='6'>X-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 9) tabela = tabela + "<th colspan='5'>XI-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 10) tabela = tabela + "<th colspan='4'>XII-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 11) tabela = tabela + "<th colspan='3'>XIII-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 12) tabela = tabela + "<th colspan='2'>XIV-XV</th>";
        else if (brojZadnjeUneseneSedmice - 1 == 13) tabela = tabela + "<th colspan='1'>XV</th>";
        tabela = tabela + "</tr>";
        for (let i = 0; i < podaci.studenti.length; i++) {
            let ocitano = false;
            tabela = tabela + "<tr>";
            tabela = tabela + "<td rowspan='2' class='rubrike'>" + podaci.studenti[i].ime + "</td>";
            tabela = tabela + "<td rowspan='2' class='rubrike'>" + podaci.studenti[i].index + "</td>";
            let brIndeksa = podaci.studenti[i].index;
            const nizSedmica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < podaci.prisustva.length; j++) {
                if (brIndeksa == podaci.prisustva[j].index) {
                    if (podaci.prisustva[j].sedmica != trenutnaSedmica1) {
                        nizSedmica[podaci.prisustva[j].sedmica - 1]++;
                        for (let d = 0; d < podaci.prisustva[j].sedmica; d++) {
                            if (nizSedmica[d] == 0) {
                                tabela = tabela + "<td rowspan='2' class='velicina_rubrike'></td>";
                            }
                            else {
                                if (podaci.prisustva[j].predavanja != null && podaci.prisustva[j].vjezbe != null) {
                                    let postotak = (((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe) * 100) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno));
                                    tabela = tabela + "<td rowspan='2' class='velicina_rubrike'>" + Math.round(postotak) + "%</td>";
                                    break;
                                }
                                else {
                                    tabela = tabela + "<td rowspan='2' class='velicina_rubrike'></td>";
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        nizSedmica[podaci.prisustva[j].sedmica - 1]++;
                        for (let d = 0; d < podaci.prisustva[j].sedmica; d++) {
                            if (nizSedmica[d] == 0) {
                                tabela = tabela + "<td rowspan='2' class='velicina_rubrike'></td>";
                            }
                        }
                        for (let k = 1; k <= podaci.brojPredavanjaSedmicno; k++) {
                            tabela = tabela + "<td class='rubrike'>P<br>" + k + "</td>";
                        }
                        for (let p = 1; p <= podaci.brojVjezbiSedmicno; p++) {
                            tabela = tabela + "<td class='rubrike'>V<br>" + p + "</td>";
                        }
                        ocitano = true;
                    }
                }
                if (ocitano == false && j + 1 == podaci.prisustva.length) {
                    nizSedmica[podaci.prisustva[j].sedmica - 1]++;
                    for (let d = 0; d < podaci.prisustva[j].sedmica; d++) {
                        if (nizSedmica[d] == 0) {
                            tabela = tabela + "<td rowspan='2' class='velicina_rubrike'></td>";
                        }
                    }
                    for (let k = 1; k <= podaci.brojPredavanjaSedmicno; k++) {
                        tabela = tabela + "<td class='rubrike'>P<br>" + k + "</td>";
                    }
                    for (let p = 1; p <= podaci.brojVjezbiSedmicno; p++) {
                        tabela = tabela + "<td class='rubrike'>V<br>" + p + "</td>";
                    }
                }
            }
            if (trenutnaSedmica1 - 1 == 0) tabela = tabela + "<td rowspan='2' colspan='14'></td>";
            else if (trenutnaSedmica1 - 1 == 1) tabela = tabela + "<td rowspan='2' colspan='13'></td>";
            else if (trenutnaSedmica1 - 1 == 2) tabela = tabela + "<td rowspan='2' colspan='12'></td>";
            else if (trenutnaSedmica1 - 1 == 3) tabela = tabela + "<td rowspan='2' colspan='11'></td>";
            else if (trenutnaSedmica1 - 1 == 4) tabela = tabela + "<td rowspan='2' colspan='10'></td>";
            else if (trenutnaSedmica1 - 1 == 5) tabela = tabela + "<td rowspan='2' colspan='9'></td>";
            else if (trenutnaSedmica1 - 1 == 6) tabela = tabela + "<td rowspan='2' colspan='8'></td>";
            else if (trenutnaSedmica1 - 1 == 7) tabela = tabela + "<td rowspan='2' colspan='7'></td>";
            else if (trenutnaSedmica1 - 1 == 8) tabela = tabela + "<td rowspan='2' colspan='6'></td>";
            else if (trenutnaSedmica1 - 1 == 9) tabela = tabela + "<td rowspan='2' colspan='5'></td>";
            else if (trenutnaSedmica1 - 1 == 10) tabela = tabela + "<td rowspan='2' colspan='4'></td>";
            else if (trenutnaSedmica1 - 1 == 11) tabela = tabela + "<td rowspan='2' colspan='3'></td>";
            else if (trenutnaSedmica1 - 1 == 12) tabela = tabela + "<td rowspan='2' colspan='2'></td>";
            else if (trenutnaSedmica1 - 1 == 13) tabela = tabela + "<td rowspan='2' colspan='1'></td>";
            tabela = tabela + "</tr>";
            tabela = tabela + "<tr class='rubrike'>";
            for (let q = 0; q < podaci.prisustva.length; q++) {
                if (brIndeksa == podaci.prisustva[q].index) {
                    if (podaci.prisustva[q].sedmica == trenutnaSedmica1 || ocitano == false) {
                        if (podaci.prisustva[q].predavanja == null || ocitano == false || podaci.prisustva == null)
                            for (let r = 1; r <= podaci.brojPredavanjaSedmicno; r++)
                                tabela = tabela + `<td class='nije_uneseno' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": 1, "vjezbe": podaci.prisustva[q].vjezbe })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                        else {
                            for (let m = 1; m <= podaci.prisustva[q].predavanja; m++) {
                                if (podaci.prisustva[q].vjezbe != null)
                                tabela = tabela + `<td class='prisutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": +podaci.prisustva[q].predavanja - 1, "vjezbe": podaci.prisustva[q].vjezbe })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                                else
                                tabela = tabela + `<td class='prisutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": +podaci.prisustva[q].predavanja - 1, "vjezbe": 'null' })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                            }
                            for (let n = 1; n <= podaci.brojPredavanjaSedmicno - podaci.prisustva[q].predavanja; n++) {
                                if (podaci.prisustva[q].vjezbe != null)
                                tabela = tabela + `<td class='odsutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": +podaci.prisustva[q].predavanja + 1, "vjezbe": podaci.prisustva[q].vjezbe })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                                else
                                tabela = tabela + `<td class='odsutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": +podaci.prisustva[q].predavanja + 1, "vjezbe": 'null' })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                            }
                        }
                        if (podaci.prisustva[q].vjezbe == null || ocitano == false || podaci.prisustva == null)
                            for (let r = 1; r <= podaci.brojVjezbiSedmicno; r++)
                                tabela = tabela + `<td class='nije_uneseno' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": podaci.prisustva[q].predavanja, "vjezbe": 1 })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                        else {
                            for (let r = 1; r <= podaci.prisustva[q].vjezbe; r++) {
                                if (podaci.prisustva[q].predavanja != null)
                                tabela = tabela + `<td class='prisutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": podaci.prisustva[q].predavanja, "vjezbe": +podaci.prisustva[q].vjezbe - 1 })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                                else
                                tabela = tabela + `<td class='prisutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": 'null', "vjezbe": +podaci.prisustva[q].vjezbe - 1 })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                            }
                            for (let s = 1; s <= podaci.brojVjezbiSedmicno - podaci.prisustva[q].vjezbe; s++) {
                                if (podaci.prisustva[q].predavanja != null)
                                tabela = tabela + `<td class='odsutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": podaci.prisustva[q].predavanja, "vjezbe": +podaci.prisustva[q].vjezbe + 1 })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                                else
                                tabela = tabela + `<td class='odsutan' onclick='(()=>{PoziviAjax.postPrisustvo("${podaci.predmet}",${brIndeksa}, ${JSON.stringify({ "sedmica": trenutnaSedmica1, "predavanja": 'null', "vjezbe": +podaci.prisustva[q].vjezbe + 1 })}, (err, data)=>{IscrtajTabeluPonovo(err, data, ${trenutnaSedmica});})})();'></td>`;
                            }
                        }
                        ocitano = true;
                    }
                    else continue;
                }
            }
            tabela = tabela + "</tr>";
        }
        tabela = tabela + "<tr class='klasa'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>";
        tabela = tabela + "<div><table class='dugme'><th class='dugme'><button onclick='prethodnaSedmica()'><i class='fa-solid fa-arrow-left fa-4x'></i></button></th>";
        tabela = tabela + "<th class='dugme'><button onclick='sljedecaSedmica()'><i class='fa-solid fa-arrow-right fa-4x'></i></button></th></table></div>";
        tabela = tabela + "</div>";
        divRef.innerHTML = tabela;
    }

    if (!window.trenutnaSedmica)
        window.trenutnaSedmica = brojZadnjeUneseneSedmice;

    nacrtajTabelu(trenutnaSedmica);

    let sljedecaSedmica = function () {
        if (trenutnaSedmica == brojZadnjeUneseneSedmice) return;
        nacrtajTabelu(++trenutnaSedmica);
    }

    let prethodnaSedmica = function () {
        if (trenutnaSedmica == 1) return;
        nacrtajTabelu(--trenutnaSedmica);
    }

    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};