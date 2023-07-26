// on récupère le body du HTML dans le DOM
const body = document.body;





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
  // // fin du test

  // for await (let country of countries) {
  //   let tracks = await getCountryChart(country.listid, 1);
  //   country.title = tracks[0].title
  //   country.artist = tracks[0].subtitle
  //   country.images = tracks[0].images
  //   console.log("pays : " + country.id + ", chanson : " + country.title + ", artiste : " + country.artist + ", liste d'images : " + country.images)
  // }


  function setCountryElement(country) {
    // on crée la propriété HTMLelement qui fait le lien entre JS et le Document Object Model HTML
    country.HTMLelement = document.getElementById(country.id);
    country.HTMLelement.classList.toggle('land');
    country.HTMLelement.classList.toggle('pays-actifs');

    // cree un élement popup
    let popup = document.createElement("div");
    popup.classList.add('popup-div');

    let popupDivImg = document.createElement("div")
    popupDivImg.classList.add('popup-div-img');

    let popupDivText = document.createElement("div")
    popupDivText.classList.add('popup-div-text');

    let popupHeader = document.createElement('h3');
    popupHeader.classList.add('popup-header');

    let popupTitle = document.createElement('p');
    popupTitle.classList.add('popup-title');


    let popupArtist = document.createElement('p');
    popupArtist.classList.add('popup-artist');

    let popupImg = document.createElement('img')
    popupImg.classList.add('popup-img')




    // injection des données du tableau Countries
    popupHeader.innerText = '#1 in ' + country.name;

    popupTitle.innerText = country.title;

    popupArtist.innerText = country.artist;

    popup.appendChild(popupDivImg)
    popup.appendChild(popupDivText)
    popupDivImg.appendChild(popupImg);
    popupDivText.appendChild(popupHeader)
    popupDivText.appendChild(popupTitle)
    popupDivText.appendChild(popupArtist)

    country.position = country.HTMLelement.getBoundingClientRect()
    country.popup = popup;

    var timeline = anime.timeline({autoplay:false});

    // fonction d'animation lors du survol des éléments
    timeline.add({}
      // on enlève les précédentes targets 
      // pour éviter un comportement bizarre de répétition de l'animation
      anime.remove(country);

      // animejs + paramètres
      // eslint-disable-next-line no-undef
      anime({
        // éléments cibles
        targets: `#${country.id}`,

        // équivalent de "background-color" pour les SVG
        fill: [color1, color2],

        // équivalent de "border"
        stroke: [color1, color2],

        // durée de l'animation
        duration: 5000,

        // nombre d'itérations
        loop: false
      })


    }

    var popUpAppear = function (country) {
      console.log('up...')

      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-undef
      anime({
        targets: '.popup-div',
        opacity: [0, 100],
        translateY: -100,
        duration: 1000,
        loop: false,
      })
    }

    // var popUpDisappear = function (country) {
    //   console.log('... and awaaay')
    //   // eslint-disable-next-line no-undef
    //   // eslint-disable-next-line no-undef
    //   anime({
    //     targets: '.popup-div',
    //     opacity: [100, 0],
    //     translateY: 100,
    //     duration: 1000,
    //     loop: false,
    //     autoplay: false
    //   })

    // }

    // dire que c'est un pays actif en ajoutant une classe
    //  country.HTMLelement.classList.
    // lorsqu'on rentre dans la zone du pays avec le curseur
    country.HTMLelement.onmouseenter = function () {
      console.log(country.popup)
      body.appendChild(country.popup)
      country.popup.setAttribute('style', `top: ${parseInt(country.position.y)}px;left: ${parseInt(country.position.x)}px`)

      // animation de blanc cassé à jaune
      // hoverAnim(country, '#fefefa', '#ffe500').play;
      popUpAppear(country).play;


      // on insère dans le html
    };

    // et l'inverse quand on quitte le pays pour revenir à l'état de base
    country.HTMLelement.onmouseleave = function () {
      // hoverAnim(country, '#ffe500', '#fefefa').play;
      popUpAppear(country).reverse;
      setTimeout(function () {
        country.popup.remove();
      }, 1050)
    }
  }
  setCountryElement(countries[0]);
  console.log(countries[0])
}

mainFunction();





