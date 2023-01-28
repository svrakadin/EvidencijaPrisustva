let div = document.getElementById("divSadrzaj");

//instanciranje
let prisustvo = TabelaPrisustvo(div, {
    "studenti": [{
        "ime": "Din Švraka",
        "index": 18857
    },
    {
        "ime": "Huso Husić",
        "index": 10005
    },
    {
        "ime": "Tomislav Tomić",
        "index": 12345
    },
    {
        "ime": "Milan Milić",
        "index": 19854
    }
    ],
    "prisustva": [{
        "sedmica": 7,
        "index": 18857
    },
    {
        "sedmica": 6,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 1,
        "index": 18857
    },
    {
        "sedmica": 2,
        "vjezbe": 1,
        "index": 18857
    },
    {
        "sedmica": 3,
        "predavanja": 0,
        "index": 18857
    },
    {
        "sedmica": 4,
        "predavanja": 2,
        "vjezbe": 0,
        "index": 18857
    },
    {
        "sedmica": 5,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 18857
    },
    {
        "sedmica": 6,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 18857
    },
    {
        "sedmica": 7,
        "index": 12345
    },
    {
        "sedmica": 2,
        "index": 12345
    },
    {
        "sedmica": 3,
        "index": 12345
    },
    {
        "sedmica": 4,
        "index": 12345
    },
    {
        "sedmica": 5,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 12345
    },
    {
        "sedmica": 7,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 10005
    },
    {
        "sedmica": 6,
        "predavanja": 1,
        "vjezbe": 1,
        "index": 10005
    },
    {
        "sedmica": 5,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 10005
    },
    {
        "sedmica": 4,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 10005
    },
    {
        "sedmica": 3,
        "predavanja": 1,
        "vjezbe": 0,
        "index": 10005
    },
    {
        "sedmica": 2,
        "predavanja": 0,
        "index": 10005
    },
    {
        "sedmica": 1,
        "predavanja": 0,
        "index": 10005
    },
    {
        "sedmica": 1,
        "vjezbe": 1,
        "index": 19854
    },
    {
        "sedmica": 5,
        "vjezbe": 1,
        "index": 19854
    },
    {
        "sedmica": 4,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 19854
    },
    {
        "sedmica": 6,
        "predavanja": 0,
        "vjezbe": 0,
        "index": 19854
    },
    {
        "sedmica": 2,
        "predavanja": 2,
        "vjezbe": 1,
        "index": 19854
    },
    {
        "sedmica": 3,
        "predavanja": 2,
        "vjezbe": 2,
        "index": 19854
    }
    ],
    "predmet": "Razvoj mobilnih aplikacija",
    "brojPredavanjaSedmicno": 2,
    "brojVjezbiSedmicno": 2
}
);

//pozivanje metoda
window.sljedecaSedmica = prisustvo.sljedecaSedmica;
window.prethodnaSedmica = prisustvo.prethodnaSedmica;
