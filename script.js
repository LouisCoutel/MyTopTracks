
// on récupère le body du HTML dans le DOM
const body = document.body;

// superpose un écran d'animation sur la page pendant 100 secondes
// eslint-disable-next-line no-unused-vars
function loadSequence() {


  // on crée l'élément
  let loadOverlay = document.createElement('div')
  // on lui donne un identifiant
  loadOverlay.id = 'load-overlay';
  // et on l'ajoute dans le HTML
  body.appendChild(loadOverlay);

  // animation de chargement
  let promise = new Promise(function loadAnime(myResolve) {

    // s'execute quand même si on change d'onglet
    // eslint-disable-next-line no-undef
    anime.suspendWhenDocumentHidden = false;
    // new Promise((resolve, reject) => {
    //   loadAnime();
    // })
    // eslint-disable-next-line no-undef
    anime({
      targets: loadOverlay,
      duration: 5000,
      loop: false,
      easing: 'linear',
      opacity: ['90%', '1%'],

      // on affiche la progression en % en temps réel dans un élement paragraphe
      update: function (anim) {
        loadOverlay.innerHTML = '<p style="display: block; margin: auto">loading... <br>' + Math.round(anim.progress) + '%</p>';
        if (Math.round(anim.progress) == 100) {
          myResolve('done')
        }
      }
    })
  })
  promise.then(() => { body.removeChild(loadOverlay) })

}


// en chantier je tente une promesse pour détruire l'élément quand l'animation est finie mais ça marche po







//déclaration de fonction pour chopper la liste avec les listId
async function getChartList() {
  const url = 'https://shazam.p.rapidapi.com/charts/list';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bb7644f4camsh704f7d5613a7768p12b59bjsn15758ea5893b',
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
      'X-RapidAPI-Key': 'bb7644f4camsh704f7d5613a7768p12b59bjsn15758ea5893b',
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



// --------------------------------------------------------------


// fonction qui sert juste à englober la séquence d'éxécution 
// chartList -> countryCharts -> ?
async function mainFunction() {
  console.log('start')
  // on récupère la liste des charts
  let countries = await getChartList();
  console.log(countries)

  // // // test avec un seul pays
  let tracks = await getCountryChart(countries[3].listid, 1);
  countries[3].title = tracks[0].title
  countries[3].artist = tracks[0].subtitle
  countries[3].images = tracks[0].images
  // // // fin du test

  //  for await (let country of countries) {
  //    let tracks = await getCountryChart(country.listid, 1);
  //    country.title = tracks[0].title
  //    country.artist = tracks[0].subtitle
  //    country.images = tracks[0].images
  //    console.log("pays : " + country.id + ", chanson : " + country.title + ", artiste : " + country.artist + ", liste d'images : " + country.images)
  //  }

  // fonction qui associe élément HTML (path SVG) et pays de la liste
  function setCountryElement(country) {
    // on crée la propriété HTMLelement qui fait le lien entre JS et le Document Object Model HTML
    country.HTMLelement = document.getElementById(country.id);
    country.HTMLelement.classList.toggle('land');
    country.HTMLelement.classList.toggle('pays-actifs');

    // cree un élement popup
    let popup = document.createElement("div");
    // on lui ajoute une classe
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
    popupHeader.innerHTML = '#<b>1</b> in ' + country.name;

    popupTitle.innerText = country.title;

    popupArtist.innerText = country.artist;


    // SI y'a pas d'image, on charge une image 'placeholder', SINON on récupère l'image qui s'appelle 'coverart'
    if (country.images != undefined) {
      popupDivImg.setAttribute('style', `background-image: url(${country.images.coverart})`)
    } else {
      popupDivImg.setAttribute('style', `background-image: url(./Carte/retro-vinyl-record-icon-vector-illustration.jpg)`)
    }

    // on ajoute tout les sous éléments dans le pop up
    popup.appendChild(popupDivImg)
    popup.appendChild(popupDivText)
    popupDivImg.appendChild(popupImg);
    popupDivText.appendChild(popupHeader)
    popupDivText.appendChild(popupTitle)
    popupDivText.appendChild(popupArtist)

    // on crée une propriété qui associe le pays et sa pop up
    country.popup = popup;
  }







  function assignEvents(country) {
    let control = 'down'

    // quand la souris rentre dans un pays
    country.HTMLelement.onmouseenter = function () {
      // fonction d'animation lors du survol des éléments
      function hover(svgPath) {
        // eslint-disable-next-line no-undef
        anime.remove(svgPath)

        // eslint-disable-next-line no-undef
        anime({   // éléments cibles
          targets: svgPath,
          // équivalent de "background-color" pour les SVG
          fill: ['#fefefa', '#FFE500'],

          // équivalent de "border"
          stroke: ['#fefefa', '#FFE500'],

          // durée de l'animation
          duration: 1000,

          // nombre d'itérations
          loop: false,

        })
      }

      // animation d'apparition du popup
      function display(popupDiv) {
        let displayPromise = new Promise((resolve) => {

          // eslint-disable-next-line no-undef
          anime.remove(popupDiv)
          // eslint-disable-next-line no-undef
          anime({
            targets: popupDiv,
            opacity: ['0%', '100%'],
            translateY: -100,
            duration: 1000,
            loop: false,
            update: function (anim) {
              if (Math.round(anim.progress) == 100) {
                resolve('done')
              }
            }
          })
        })

        displayPromise.then(() => {
          control = 'up'
        })
      }

      if (control == 'down') {
        // on choppe la position X Y du pays grace au navigateur
        country.position = country.HTMLelement.getBoundingClientRect()

        // on balance le pop up
        body.appendChild(country.popup)

        // on donne une position au pop up grace à la position du pays
        country.popup.setAttribute('style', `top: ${parseInt(country.position.y)}px;left: ${parseInt(country.position.x)}px`)

        // on joue l'animation de survol
        hover(country.HTMLelement);

        // on joue l'animation d'appartion du pop up
        display(country.popup)
      }

    }
    // et l'inverse quand on quitte le pays pour revenir à l'état de base
    country.HTMLelement.onmouseleave = function () {
      // animation inversée pour quand sort
      function hoverReverse(svgPath) {
        // eslint-disable-next-line no-undef
        anime.remove(svgPath)

        // eslint-disable-next-line no-undef
        anime({   // éléments cibles
          targets: svgPath,
          // équivalent de "background-color" pour les SVG
          fill: ['#FFE500', '#fefefa'],

          // équivalent de "border"
          stroke: ['#FFE500', '#fefefa'],

          // durée de l'animation
          duration: 1000,

          // nombre d'itérations
          loop: false,
        })
      }

      function displayReverse(popupDiv) {
        let hidePromise = new Promise((resolve) => {
          // eslint-disable-next-line no-undef
          anime.remove(popupDiv)
          // eslint-disable-next-line no-undef
          anime({
            targets: popupDiv,
            opacity: ['100%', '0%'],
            translateY: 100,
            duration: 1000,
            loop: false,
            easing: 'easeInQuad',
            endDelay: 10000,
            update: function (anim) {
              if (Math.round(anim.progress) == 100) {
                resolve('done')
              }
            }
          })
        })

        hidePromise.then(() => {
          body.removeChild(popupDiv)
          control = 'down'
        })
      }

      hoverReverse(country.HTMLelement);
      // pour faire disparaitre
      if (control == 'up') {
        displayReverse(country.popup)
      }

      //  countries.forEach(country => {
      //    setCountryElement(country)
      //    assignEvents(country)
      //  });


    }
  }
  setCountryElement(countries[3])
  console.log('elements')

  assignEvents(countries[3])
  console.log(countries[3])
}
// séquence d'éxécution
loadSequence();
mainFunction();







