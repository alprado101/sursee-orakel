// Erweiterte Restaurant Daten für Sursee
const restaurants = [
  // 🥗 HEALTHY / VEGI
  {
    name: "Mensa BBZ",
    auswahl: "Healthy Food & Menüs",
    budget: 20,
    distanz: "1min Fussweg",
    mood: "healthy",
    mapQuery: "BBZW Sursee",
  },
  {
    name: "Migros Daily Take Away",
    auswahl: "Frische Salate & Bowls",
    budget: 15,
    distanz: "5min Fussweg",
    mood: "healthy",
    mapQuery: "Migros Daily Sursee",
  },
  {
    name: "Thai-Restaurant Malou",
    auswahl: "Thai Curries & Vegi",
    budget: 25,
    distanz: "10min Fussweg",
    mood: "healthy",
    mapQuery: "Restaurant Malou Sursee",
  },
  {
    name: "Kochtopf Sursee",
    auswahl: "Health Food & Vegan",
    budget: 15,
    distanz: "8min Fussweg",
    mood: "healthy",
    mapQuery: "Kochtopf Sursee",
  },

  // ☕ GEMÜTLICH / SITZEN
  {
    name: "Pizzeria Da Gino",
    auswahl: "Pizza & Pasta",
    budget: 35,
    distanz: "5min Fussweg",
    mood: "gemuetlich",
    mapQuery: "Pizzeria Da Gino Sursee",
  },
  {
    name: "Wirtshaus Wilder Mann",
    auswahl: "Schweizer Küche",
    budget: 40,
    distanz: "8min Fussweg",
    mood: "gemuetlich",
    mapQuery: "Wilder Mann Sursee",
  },
  {
    name: "Theo's Gastropub",
    auswahl: "Burger & Steaks",
    budget: 45,
    distanz: "8min Fussweg",
    mood: "gemuetlich",
    mapQuery: "Theos Gastropub Sursee",
  },
  {
    name: "Baragge",
    auswahl: "Amerikanisch & BBQ",
    budget: 30,
    distanz: "12min Fussweg",
    mood: "gemuetlich",
    mapQuery: "Baragge Sursee",
  },
  {
    name: "Café Confiserie Surchat",
    auswahl: "Kaffee & Sandwiches",
    budget: 20,
    distanz: "5min Fussweg",
    mood: "gemuetlich",
    mapQuery: "Confiserie Surchat Sursee",
  },

  // 🍕 FAST FOOD / TAKE-AWAY
  {
    name: "Bistro Mara",
    auswahl: "Kebap, Pizza, Burger",
    budget: 15,
    distanz: "4min Fussweg",
    mood: "fastfood",
    mapQuery: "Bistro Mara Sursee",
  },
  {
    name: "McDonald's",
    auswahl: "Burger & Pommes",
    budget: 15,
    distanz: "6min Fussweg",
    mood: "fastfood",
    mapQuery: "McDonald's Sursee",
  },
  {
    name: "Bahnhof Kebab",
    auswahl: "Döner & Dürüm",
    budget: 12,
    distanz: "3min Fussweg",
    mood: "fastfood",
    mapQuery: "Bahnhof Sursee",
  },
  {
    name: "Mercato Pizza Kurier",
    auswahl: "Take-Away Pizza",
    budget: 20,
    distanz: "7min Fussweg",
    mood: "fastfood",
    mapQuery: "Mercato Sursee",
  },
  {
    name: "Sushi Kaiser",
    auswahl: "Sushi Takeaway",
    budget: 25,
    distanz: "6min Fussweg",
    mood: "fastfood",
    mapQuery: "Sushi Kaiser Sursee",
  },
];

let selectedMood = null;

// Mood Auswahl Logik
document.querySelectorAll(".mood-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".mood-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMood = btn.dataset.mood;
  });
});

// Slider Update
const slider = document.getElementById("budget-slider");
slider.addEventListener("input", () => {
  document.getElementById("current-budget").innerText = `CHF ${slider.value}`;
});

// Seiten-Navigation
function switchPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

// Orakel Starten mit Spannungs-Effekt
document.getElementById("btn-start").addEventListener("click", function () {
  if (!selectedMood) {
    alert("Bitte wähle zuerst einen Mood!");
    return;
  }

  const budget = parseInt(slider.value);
  const results = restaurants.filter(
    (r) => r.mood === selectedMood && r.budget <= budget,
  );

  if (results.length > 0) {
    const choice = results[Math.floor(Math.random() * results.length)];

    // Button visuell verändern für die Spannung
    const originalText = this.innerText;
    this.innerText = "Orakel denkt nach... 🎲";
    this.style.backgroundColor = "#c62828";

    // Nach 800ms das Ergebnis anzeigen
    setTimeout(() => {
      document.getElementById("res-name").innerText = choice.name;
      document.getElementById("res-auswahl").innerText = choice.auswahl;
      document.getElementById("res-budget").innerText =
        `ab CHF ${choice.budget}.`;
      document.getElementById("res-distanz").innerText = choice.distanz;

      // HIER SIND DIE KORRIGIERTEN $ FÜR DIE MAPS LINKS
      const mapUrl = `https://maps.google.com/maps?q=$${encodeURIComponent(choice.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      document.getElementById("res-map-iframe").src = mapUrl;

      document.getElementById("res-map-link").href =
        `https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(choice.mapQuery)}`;

      switchPage("ergebnisseite");

      // Button für das nächste Mal zurücksetzen
      this.innerText = originalText;
      this.style.backgroundColor = "";
    }, 800);
  } else {
    alert(
      `Leider nichts gefunden für Mood '${selectedMood}' unter CHF ${budget}. Versuch ein höheres Budget!`,
    );
  }
});

// Navigation Events
document.querySelectorAll(".back-to-start").forEach((btn) => {
  btn.addEventListener("click", () => switchPage("startseite"));
});

document
  .getElementById("nav-kontakt")
  .addEventListener("click", () => switchPage("infoseite"));
