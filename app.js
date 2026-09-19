// ================================
// MEETING COUNT
// Gestion du compteur
// ================================

// Récupération des éléments HTML
const countDisplay = document.getElementById("count");
const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const resetButton = document.getElementById("reset-button");

// Récupération du nombre sauvegardé
let count = Number(localStorage.getItem("meetingCount")) || 0;

// Afficher le nombre
function updateDisplay() {
    countDisplay.textContent = count;
}

// Ajouter une personne
addButton.addEventListener("click", function () {
    count++;

    localStorage.setItem("meetingCount", count);

    updateDisplay();
});

// Retirer une personne
removeButton.addEventListener("click", function () {

    if (count > 0) {
        count--;

        localStorage.setItem("meetingCount", count);

        updateDisplay();
    }

});

// Remettre à zéro
resetButton.addEventListener("click", function () {

    const confirmation = confirm(
        "Voulez-vous vraiment remettre le compteur à zéro ?"
    );

    if (confirmation) {
        count = 0;

        localStorage.setItem("meetingCount", count);

        updateDisplay();
    }

});

// Affichage initial
updateDisplay();


// Afficher automatiquement le jour et la date
const meetingDate = document.getElementById("meeting-date");

const date = new Date();

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

meetingDate.textContent = date.toLocaleDateString("fr-FR", options);

// Enregistrer le Service Worker
if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("service-worker.js")
            .then(function () {
                console.log("Service Worker enregistré avec succès.");
            })
            .catch(function (error) {
                console.error("Erreur Service Worker :", error);
            });

    });

}