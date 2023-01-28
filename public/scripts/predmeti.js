window.onload = function () {

  var dugme = document.getElementById("dugme_za_odjavu")
  dugme.onclick = function () {
    PoziviAjax.postLogout();
    window.location.replace("prijava.html");
  }

  const lista_predmeta = document.getElementById('lista_predmeta');
  PoziviAjax.getPredmeti(odgovor);

  function odgovor(status, data) {
    if (status)
      pozitivniOdgovor(data);
    else
      negativniOdgovor();
  }

  function pozitivniOdgovor(data) {
    predmeti = JSON.parse(data);
    let lista_elemenata = [];
    predmeti.forEach(predmet => {
      const element = document.createElement("a");
      element.href = "#";
      element.id = predmet;
      element.innerText = predmet;
      element.addEventListener('click', () => {
        window.trenutnaSedmica = null;
        PoziviAjax.getPredmet(predmet, odgovor1);
      });
      lista_elemenata.push(element);
    });
    lista_elemenata.forEach(element => {
      lista_predmeta.appendChild(element);
    });
    let div = document.getElementById("tabela");
    window.div = div;
    function odgovor1(status, data) {
      if (status) {
        pozitivniOdgovor1(data);
      } else {
        negativniOdgovor1();
      }
    }

    function pozitivniOdgovor1(data) {
      prisustva = JSON.parse(data);
      ({sljedecaSedmica, prethodnaSedmica} = TabelaPrisustvo(div, prisustva))
    }

    function negativniOdgovor1() {
      alert("Greska u dobijanju predmeta");
    }
  }

  function negativniOdgovor() {
    alert("Greska u dobijanju predmeta");
  }

  function IscrtajTabeluPonovo(err, data, sedmica){
    ({sljedecaSedmica, prethodnaSedmica} = TabelaPrisustvo(div, JSON.parse(data)));
  }

  window.IscrtajTabeluPonovo = IscrtajTabeluPonovo
}
