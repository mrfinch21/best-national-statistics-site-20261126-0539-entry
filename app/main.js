// NusaStat — perute hash sederhana: #/ , #/ekonomi, #/penduduk, #/daerah.
// Tidak ada pengambilan data dari jaringan; semua tampilan dirender dari NUSA_DATA.
(function () {
  var routes = {
    "": { view: window.NUSA_VIEWS.overview, title: "NusaStat — Statistik Indonesia" },
    "ekonomi": { view: window.NUSA_VIEWS.ekonomi, title: "Ekonomi — NusaStat" },
    "penduduk": { view: window.NUSA_VIEWS.penduduk, title: "Penduduk — NusaStat" },
    "daerah": { view: window.NUSA_VIEWS.daerah, title: "Daerah — NusaStat" }
  };

  function currentRoute() {
    var hash = window.location.hash || "#/";
    var name = hash.replace(/^#\//, "").replace(/\/$/, "");
    return routes[name] ? name : "";
  }

  function render() {
    var name = currentRoute();
    var target = document.getElementById("view");
    target.innerHTML = routes[name].view();
    document.title = routes[name].title;
    var links = document.querySelectorAll("#nav a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.getAttribute("data-route") === name) link.classList.add("active");
      else link.classList.remove("active");
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  render();
})();
