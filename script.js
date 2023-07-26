
// fonction d'animation lors du survol des éléments
const hoverAnim = function (country, color1, color2) {
  // on enlève les précédentes targets 
  // pour éviter un comportement bizarre de répétition de l'animation
  anime.remove(country);
  // animejs + paramètres
  anime({
    // éléments cibles
    targets: `#${country.id}`,

    // équivalent de "background-color" pour les SVG
    fill: [color1, color2],

    // équivalent de "border"
    stroke: [color1, color2],

    // durée de l'animation
    duration: 1000,
  })
}
// fonction pour tous les pays


//déclaration de fonction pour chopper la liste avec les listId
async function getChartList() {
  const url = 'https://shazam.p.rapidapi.com/charts/list';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7e40b53c7amsh62515ff28adca5fp199097jsn2c30ddb1adca',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.countries;
  }
  catch (error) {
    console.error(error);
  }
}

// déclaration de fonction pour chopper le chart d'un pays en particulier
async function getCountryChart(listid, chartRange) {
  const url = `https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=${listid}&pageSize=${chartRange}&startFrom=0`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7e40b53c7amsh62515ff28adca5fp199097jsn2c30ddb1adca',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.tracks;
  } catch (error) {
    console.error(error);
  }
}



// fonction qui sert juste à englober la séquence d'éxécution 
// chartList -> countryCharts -> ?
async function mainFunction() {
  let countries = await getChartList();

  // // test avec un seul pays
   let tracks = await getCountryChart(countries[0].listid, 1);
   countries[0].title = tracks[0].title
   countries[0].artist = tracks[0].subtitle
   countries[0].images = tracks[0].images
   console.log(countries[0])
  // // fin du test

  // for await (let country of countries) {
  //   let tracks = await getCountryChart(country.listid, 1);
  //   country.title = tracks[0].title
  //   country.artist = tracks[0].subtitle
  //   country.images = tracks[0].images
  //   console.log("pays : " + country.id + ", chanson : " + country.title + ", artiste : " + country.artist + ", liste d'images : " + country.images)
  // }
  function setCountryElement() {
    countries.forEach(country => {
      // on crée la propriété HTMLelement qui fait le lien entre JS et le Document Object Model HTML
      country.HTMLelement = document.getElementById(country.id);
      country.HTMLelement.classList.toggle('pays-actifs');
      // dire que c'est un pays actif en ajoutant une classe
      //  country.HTMLelement.classList.
      console.log(country.HTMLelement);

      // lorsqu'on rentre dans la zone du pays avec le curseur
      country.HTMLelement.onmouseenter = function () {
        // animation de blanc cassé à jaune
        hoverAnim(country, '#fefefa', '#ffe500').play;

        // cree un élement popup
        let popUp = document.createElement("div");
        popUp.classList.add('popup-div');

        let popUpDivImg = document.createElement("div")
        popUpDivImg.classList.add('popup-div-img');

        let popUpDivText = document.createElement("div")
        popUpDivText.classList.add('popup-div-text');

        let popUpHeader = document.createElement('h3');
        popUpHeader.classList.add('popup-header');

        let popUpTitle = document.createElement('p');
        popUpTitle.classList.add('popup-title');


        let popUpArtist = document.createElement('p');
        popUpArtist.classList.add('popup-artist');

        let popUpImg = document.createElement('img')
        popUpImg.classList.add('popup-img')


        // injection des données du tableau Countries
        popUpHeader.innerText = '#1 in ' + country.name;

        popUpTitle.innerText = country.title;

        popUpArtist.innerText = country.artist;

        // on insère dans le html
        document.body.appendChild(popUp)
        popUp.appendChild(popUpDivImg)
        popUp.appendChild(popUpDivText)
        popUpDivImg.appendChild(popUpImg);
        popUpDivText.appendChild(popUpHeader)
        popUpDivText.appendChild(popUpTitle)
        popUpDivText.appendChild(popUpArtist);
      };

      // et l'inverse quand on quitte le pays pour revenir à l'état de base
      country.HTMLelement.onmouseleave = function () {
        console.log('exit')
        hoverAnim(country, '#ffe500', '#fefefa').play;
      }
    })
  }
  setCountryElement(countries);
  console.log(countries[0])
}

mainFunction();





