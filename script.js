// récuperer le module axios qui servira à gérer les requêtes
const axios = require('axios');

// "options" défini ce qu'on veut récuperer via l'API
const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/charts/list',
    headers: {
        'X-RapidAPI-Key': '8bd7bea49fmsh2b744dd0c4b202bp175bb5jsna5c214a753cd',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
};

// fonction async pour récupérer la liste de tous les charts dans le monde
async function getCharts() {
    try {
        //retourner les données en asynchrone 
        return await axios.request(options);
    } catch (error) {
        // si erreur, afficher un message d'erreur
        console.error(error);
    }
}

// crée une variable charts qui contiendra toutes les données récupérées
const charts = getCharts;

console.log(charts)