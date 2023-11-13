class Country {
  constructor(listid, title, subtitle, images) {
    this.id = listid
    this.chart = { title: title, artist: subtitle, images: images }
    // on crée la propriété element qui fait le lien entre JS et le Document Object Model HTML
    this.element = document.getElementById(this.id);
    this.element.position = this.element.getBoundingClientRect()
    this.toggleClass()
  }
  toggleClass() {
    this.element.classList.toggle('land');
    this.element.classList.toggle('pays-actifs');
  }
}

export default Country