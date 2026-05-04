const restaurants = [
  // 🥗 HEALTHY / VEGI
  {
    name: "Mensa BBZ",
    auswahl: "Healthy Food & Menüs",
    budget: 20,
    distanzMin: 1,
    mood: "healthy",
    mapQuery: "BBZW Sursee",
  },
  {
    name: "Migros Daily",
    auswahl: "Frische Salate & Bowls",
    budget: 15,
    distanzMin: 5,
    mood: "healthy",
    mapQuery: "Migros Daily Sursee",
  },

  // 🍜 ASIATISCH
  {
    name: "Thai-Restaurant Malou",
    auswahl: "Thai Curries",
    budget: 25,
    distanzMin: 10,
    mood: "asiatisch",
    mapQuery: "Restaurant Malou Sursee",
  },
  {
    name: "Sushi Kaiser",
    auswahl: "Sushi Takeaway",
    budget: 25,
    distanzMin: 6,
    mood: "asiatisch",
    mapQuery: "Sushi Kaiser Sursee",
  },

  // ☕ GEMÜTLICH
  {
    name: "Pizzeria Da Gino",
    auswahl: "Pizza & Pasta",
    budget: 35,
    distanzMin: 5,
    mood: "gemuetlich",
    mapQuery: "Pizzeria Da Gino Sursee",
  },
  {
    name: "Wilder Mann",
    auswahl: "Schweizer Küche",
    budget: 40,
    distanzMin: 8,
    mood: "gemuetlich",
    mapQuery: "Wilder Mann Sursee",
  },

  // 🍟 FAST FOOD
  {
    name: "Bistro Mara",
    auswahl: "Kebap, Pizza, Burger",
    budget: 15,
    distanzMin: 4,
    mood: "fastfood",
    mapQuery: "Bistro Mara Sursee",
  },
  {
    name: "McDonald's",
    auswahl: "Burger & Pommes",
    budget: 15,
    distanzMin: 6,
    mood: "fastfood",
    mapQuery: "McDonald's Sursee",
  },
  {
    name: "Bahnhof Kebab",
    auswahl: "Döner & Dürüm",
    budget: 12,
    distanzMin: 3,
    mood: "fastfood",
    mapQuery: "Bahnhof Sursee",
  },

  // 🥐 BÄCKER & CAFÉ
  {
    name: "Confiserie Surchat",
    auswahl: "Kaffee & Sandwiches",
    budget: 20,
    distanzMin: 5,
    mood: "cafe",
    mapQuery: "Confiserie Surchat Sursee",
  },
  {
    name: "Bäckerei Kreyenbühl",
    auswahl: "Snacks & Gebäck",
    budget: 10,
    distanzMin: 2,
    mood: "cafe",
    mapQuery: "Bäckerei Kreyenbühl Sursee",
  },
];

let selectedMood = null;

// 1. Mood Auswahl
document.querySelectorAll(".mood-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".mood-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMood = btn.dataset.mood;
  });
});

// 2. Slider Updates
const budgetSlider = document.getElementById("budget-slider");
budgetSlider.addEventListener("input", () => {
  document.getElementById("current-budget").innerText =
    `CHF ${budgetSlider.value}`;
});

const timeSlider = document.getElementById("time-slider");
timeSlider.addEventListener("input", () => {
  document.getElementById("current-time").innerText = `${timeSlider.value} Min`;
});

// Navigation
function switchPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// 3. Orakel Starten
document.getElementById("btn-start").addEventListener("click", function () {
  if (!selectedMood) {
    alert("Bitte wähle zuerst eine Stimmung in Schritt 1 aus!");
    return;
  }

  const budget = parseInt(budgetSlider.value);
  const maxTime = parseInt(timeSlider.value);

  // Filter
  const results = restaurants.filter(
    (r) =>
      r.mood === selectedMood && r.budget <= budget && r.distanzMin <= maxTime,
  );

  if (results.length > 0) {
    const choice = results[Math.floor(Math.random() * results.length)];
    const originalText = this.innerText;

    this.innerText = "Orakel sucht... 🎲";
    this.style.backgroundColor = "#c62828";

    setTimeout(() => {
      document.getElementById("res-name").innerText = choice.name;
      document.getElementById("res-auswahl").innerText = choice.auswahl;

      document.getElementById("res-budget").innerText =
        `ab CHF ${choice.budget}`;
      document.getElementById("res-distanz").innerText =
        `${choice.distanzMin} Min. Fussweg`;

      const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(choice.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      document.getElementById("res-map-iframe").src = embedUrl;
      document.getElementById("res-map-link").href =
        `https://maps.google.com/?q=Bahnhofstrasse+26+Sursee4{encodeURIComponent(choice.mapQuery)}`;

      switchPage("ergebnisseite");

      this.innerText = originalText;
      this.style.backgroundColor = "";
    }, 800);
  } else {
    alert(
      `Nichts gefunden für max. CHF ${budget} und max. ${maxTime} Min. Gehweg. Versuch die Limits anzupassen!`,
    );
  }
});

// Zurück-Buttons
document.querySelectorAll(".back-to-start").forEach((btn) => {
  btn.addEventListener("click", () => switchPage("startseite"));
});
document
  .getElementById("nav-kontakt")
  .addEventListener("click", () => switchPage("infoseite"));
