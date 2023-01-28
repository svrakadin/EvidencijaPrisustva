window.onload = function () {

    var dugme = document.getElementById("dugme_za_prijavu")
    dugme.onclick = function () {

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var mjestoZaPozitivnuPoruku = document.getElementById("pozitivnaPoruka");
        var mjestoZaNegativnuPoruku = document.getElementById("negativnaPoruka");

        function odgovor(status) {
            if (status)
                pozitivniOdgovor();
            else
                negativniOdgovor();
        }

        function pozitivniOdgovor() {
            mjestoZaPozitivnuPoruku.innerHTML = "Uspješna prijava";
            setTimeout(() => { window.location.replace("predmeti.html"); }, 1000)
        }

        function negativniOdgovor() {
            mjestoZaNegativnuPoruku.innerHTML = "Neuspješna prijava";
            setTimeout(() => { window.location.replace("prijava.html"); }, 1500)
        }

        PoziviAjax.postLogin(username, password, odgovor);
    }
}
