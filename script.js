// Restaurant Daten mit spezifischen Adressen für das Map Iframe
const restaurants = [
  {
    name: "Mensa BBZ",
    auswahl: "Healthy Food",
    budget: 20,
    distanz: "1min Fussweg",
    mood: "healthy",
    mapQuery: "BBZW Sursee",
  },
  {
    name: "Pizzeria Da Gino",
    auswahl: "Pizza & Pasta",
    budget: 35,
    distanz: "5min Fussweg",
    mood: "gemuetlich",
    mapQuery: "Pizzeria Da Gino Sursee",
  },
  {
    name: "McDonald's",
    auswahl: "Fast Food",
    budget: 15,
    distanz: "6min Fussweg",
    mood: "fastfood",
    mapQuery: "McDonald's Sursee",
  },
  {
    name: "Migros Restaurant",
    auswahl: "Healthy Food",
    budget: 25,
    distanz: "5min Fussweg",
    mood: "healthy",
    mapQuery: "Migros Restaurant Surseepark",
  },
  {
    name: "Kebab Point",
    auswahl: "Döner & Dürüm",
    budget: 12,
    distanz: "3min Fussweg",
    mood: "fastfood",
    mapQuery: "Bahnhof Sursee",
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

// Slider Update (jetzt ab 0)
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
  window.scrollTo(0, 0); // Scrollt beim Wechseln nach ganz oben
}

// Orakel Starten
document.getElementById("btn-start").addEventListener("click", () => {
  if (!selectedMood) {
    alert("Bitte wähle zuerst einen Mood!");
    return;
  }

  const budget = parseInt(slider.value);

  // Finde Restaurants die zum Mood passen UND ins Budget passen (Budget ab 0 CHF)
  const results = restaurants.filter(
    (r) => r.mood === selectedMood && r.budget <= budget,
  );

  if (results.length > 0) {
    const choice = results[Math.floor(Math.random() * results.length)];

    document.getElementById("res-name").innerText = choice.name;
    document.getElementById("res-auswahl").innerText = choice.auswahl;
    document.getElementById("res-budget").innerText =
      `CHF ${choice.budget} max.`;
    document.getElementById("res-distanz").innerText = choice.distanz;

    // Echte Google Maps iFrame URL generieren
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(choice.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    document.getElementById("res-map-iframe").src = mapUrl;

    // Link für den Button unten (öffnet echtes Google Maps)
    document.getElementById("res-map-link").href =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(choice.mapQuery)}`;

    switchPage("ergebnisseite");
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
