const restaurants = [
  // Fast Food
  {
    name: "Döner Point",
    mood: "fastfood",
    budget: "$",
    distanz: "4 Min",
    adresse: "Bahnhofstrasse 1, Sursee",
    maps: "https://maps.google.com/?q=Bahnhofstrasse+1+Sursee",
  },
  {
    name: "McDonald's",
    mood: "fastfood",
    budget: "$$",
    distanz: "6 Min",
    adresse: "Kyburgerstrasse 2, Sursee",
    maps: "https://maps.google.com/?q=McDonalds+Sursee",
  },
  {
    name: "Pizzeria Da Gina",
    mood: "fastfood",
    budget: "$$",
    distanz: "5 Min",
    adresse: "Bahnhofstrasse 26, Sursee",
    maps: "https://maps.google.com/?q=Bahnhofstrasse+26+Sursee",
  },

  // Healthy
  {
    name: "Salat-Bar BBZ",
    mood: "healthy",
    budget: "$",
    distanz: "1 Min",
    adresse: "Moosgasse 1, Sursee",
    maps: "https://maps.google.com/?q=Moosgasse+1+Sursee",
  },
  {
    name: "Migros Restaurant",
    mood: "healthy",
    budget: "$$",
    distanz: "5 Min",
    adresse: "Surseepark, Sursee",
    maps: "https://maps.google.com/?q=Migros+Restaurant+Surseepark",
  },
  {
    name: "Thai Garden",
    mood: "healthy",
    budget: "$$$",
    distanz: "8 Min",
    adresse: "Bahnhofstrasse 30, Sursee",
    maps: "https://maps.google.com/?q=Thai+Garden+Sursee",
  },

  // Gemütlich
  {
    name: "Bistro Piazza",
    mood: "gemuetlich",
    budget: "$$",
    distanz: "7 Min",
    adresse: "Altstadt 12, Sursee",
    maps: "https://maps.google.com/?q=Altstadt+12+Sursee",
  },
  {
    name: "Café Surch",
    mood: "gemuetlich",
    budget: "$$",
    distanz: "6 Min",
    adresse: "Zentralstrasse 4, Sursee",
    maps: "https://maps.google.com/?q=Zentralstrasse+4+Sursee",
  },
  {
    name: "Restaurant Wyhof",
    mood: "gemuetlich",
    budget: "$$$",
    distanz: "10 Min",
    adresse: "Bahnhofstrasse 11, Sursee",
    maps: "https://maps.google.com/?q=Restaurant+Wyhof+Sursee",
  },
  {
    name: "Wilden Mann",
    mood: "gemuetlich",
    budget: "$$$",
    distanz: "8 Min",
    adresse: "Bahnhofstrasse 20, Sursee",
    maps: "https://maps.google.com/?q=Wilden+Mann+Sursee",
  },
];

let selectedMood = null;

// Klick auf die Mood-Buttons
document.querySelectorAll(".mood-btn").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".mood-btn")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    selectedMood = this.id.replace("btn-", "");
    document.getElementById("result").innerHTML =
      `<p>Mood "${this.innerText}" ist bereit.</p>`;
  });
});

// Klick auf das Orakel
document.getElementById("spin-button").addEventListener("click", function () {
  const resultDiv = document.getElementById("result");

  if (!selectedMood) {
    resultDiv.innerHTML =
      "<p style='color: red;'>Bitte wähle zuerst oben einen Mood aus!</p>";
    return;
  }

  resultDiv.classList.add("shake");
  resultDiv.innerHTML = "<p>Orakel denkt nach... 🎲</p>";

  setTimeout(() => {
    resultDiv.classList.remove("shake");
    const filtered = restaurants.filter((r) => r.mood === selectedMood);

    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      resultDiv.innerHTML = `
                <h2 style="color: #e67e22; margin-top: 0;">${random.name}</h2>
                <p><strong>Budget:</strong> ${random.budget} | <strong>Gehweg:</strong> ${random.distanz}</p>
                <p style="font-size: 0.85rem; color: #7f8c8d;">${random.adresse}</p>
                <a href="${random.maps}" target="_blank" class="map-link">📍 Route in Maps öffnen</a>
            `;
    } else {
      resultDiv.innerHTML = "<p>Ups, kein Restaurant gefunden.</p>";
    }
  }, 800);
});
