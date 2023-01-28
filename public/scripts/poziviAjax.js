const PoziviAjax = (() => {

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.overrideMimeType("application/json");
        ajax.open("GET", `/predmet/${naziv}`, true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(true, ajax.responseText);
            } else if (ajax.readyState == 4) {
                fnCallback(false);
            }
        }
        ajax.send(null);
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.overrideMimeType("application/json");
        ajax.open("GET", "predmeti", true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(true, ajax.responseText);
            else if (ajax.readyState == 4)
                fnCallback(false);
        }
        ajax.send(null);
    }
    function impl_postLogin(username, password, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.open('POST', '/login');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(true);
            else if (ajax.readyState == 4)
                fnCallback(false);
        }

        ajax.send(JSON.stringify({ username: username, password: password }));
    }

    function impl_postLogout(fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.open('POST', '/logout');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(true);
            else if (ajax.readyState == 4)
                fnCallback(false);
        }
        ajax.send(JSON.stringify({}));
    }

    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv, index, prisustvo, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.open("POST", `/prisustvo/predmet/${naziv}/student/${index}`, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(true, ajax.responseText);
            else if (ajax.readyState == 4)
                fnCallback(false);
        }
        ajax.send(JSON.stringify(prisustvo));
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();
