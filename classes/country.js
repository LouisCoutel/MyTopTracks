class Country {
  constructor(listid, title, subtitle, images) {
    this.id = listid
    this.chart = { title: title, artist: subtitle, images: images }
    // on crée la propriété HTMLelement qui fait le lien entre JS et le Document Object Model HTML
    this.HTMLelement = document.getElementById(this.id);
    this.HTMLelement.position = this.HTMLelement.getBoundingClientRect()
    this.toggleClass()
  }
  toggleClass() {
    this.HTMLelement.classList.toggle('land');
    this.HTMLelement.classList.toggle('pays-actifs');
  }
}

export default Country