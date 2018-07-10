const {Video,Artist} = require('../models/index');
const moment  = require('moment');

console.log(Video);

const v = new Video();

v.videoId = "youtube#video:LEhiIr-dveE";
v.date = moment().toDate();
v.image = "https://i.ytimg.com/vi/LEhiIr-dveE/hqdefault.jpg";
v.source = "The Late Late Show with James Corden";
v.title = "Taylor Swift Bailed Dave Grohl Out at a Paul McCartney Party - #LateLateLondon";
v.url = "LEhiIr-dveE";
console.log(v);

v.save().then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

const a = new Artist();

a.name = "Taylor Swift";
a.lastFetchedAt = moment().toDate();
a.artistId = "06HL4z0CvFAxyc27GXpf02";
a.imageUrl = "https://i.scdn.co/image/bdaeccb035a8af87b7a70b62217ff5c633ba6c7c";
a.relatedArtists = [];
a.genres = ["dance pop", "pop", "post-teen pop"];
console.log(a);

a.save().then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})