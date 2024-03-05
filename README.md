![banner](https://github.com/LouisCoutel/MyTopTracks/blob/WriteReadme/MTTCover.png)

## About
This started as a collective project at Ada Tech School centered around API requests and data visualization.
It was then extensively reworked as a way to experiment with some stuff I was interested in.

The app showcases random tracks from my "favorite tracks" Deezer playlist on an interactive map.

### Uses
- Vanilla Javascript MVVM with Observer and State patterns for reactivity
- AmCharts5 for the interactive map
- Supabase for the relational database

### Get started
If a country is represented, it's colored off-white. Hover your cursor over the landmass to see a track's informations pop up.

Countries that have no matching tracks are colored in beige. I'm sure these countries have produced plenty of great songs, so you can click on them to suggest a track.
You can also do this for other countries, but I encourage you to help me fill the blanks first!

There's still some work to do on the back-end before suggestions are fully implemented, feel free to play around in the meantime.

## The data
The app uses no proper back-end and relies on a relational database populated with a simple Node.js script.
Tracks are fetched through Deezer's API and matched with a corresponding country thanks to artist data from MusicBrainz.

Disambiguating the results was complicated (there are 91 cities called "Washington" in the US) so I relied on a "most likely" approach: Washington is probably in the US, London in the UK, etc.

**W.I.P**
