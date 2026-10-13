const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const LikedSong = require('../models/LikedSong');

dotenv.config();

const realSongs = [
  {
    title: 'Kesariya (From "Brahmastra")',
    artist: 'Pritam, Arijit Singh & Amitabh Bhattacharya',
    album: 'Kesariya (From "Brahmastra") - Single',
    duration: '04:28',
    durationSeconds: 268,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg',
    category: 'recent',
    plays: 959821,
  },
  {
    title: 'Tum Hi Ho',
    artist: 'Mithoon & Arijit Singh',
    album: 'Aashiqui 2 (Original Motion Picture Soundtrack)',
    duration: '04:21',
    durationSeconds: 262,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/8c/9b/3a8c9b0b-2def-750a-f615-1555bf941edf/mzaf_17229496441442805917.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg',
    category: 'recent',
    plays: 960218,
  },
  {
    title: 'Apna Bana Le (From "Bhediya")',
    artist: 'Arijit Singh, Sachin-Jigar & Amitabh Bhattacharya',
    album: 'Apna Bana Le (From "Bhediya") - Single',
    duration: '04:21',
    durationSeconds: 262,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/eb/27/61/eb2761c7-d606-0912-dff0-2dc6b69974bd/mzaf_2023722930851223219.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2e/0b/c0/2e0bc070-112f-a827-6ad8-6bc64f7caaff/840214460180.png/600x600bb.jpg',
    category: 'recent',
    plays: 771243,
  },
  {
    title: 'Chaleya',
    artist: 'Anirudh Ravichander, Arijit Singh, Shilpa Rao & Kumaar',
    album: 'Jawan (Original Motion Picture Soundtrack)',
    duration: '03:20',
    durationSeconds: 200,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/76/05/d9/7605d905-f631-517d-df7f-e162affcd414/mzaf_9976541859961700749.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bb/f4/f5/bbf4f511-3c12-c25e-a475-b6d06faa8c13/8902894362047_cover.jpg/600x600bb.jpg',
    category: 'recent',
    plays: 1747185,
  },
  {
    title: 'Mahiye Jinna Sohna',
    artist: 'Darshan Raval',
    album: 'Mahiye Jinna Sohna - Single',
    duration: '03:01',
    durationSeconds: 181,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9e/f2/21/9ef2212a-31fe-d3ad-37bd-85e84856e1fb/mzaf_12378474497365442060.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/4b/73/1e/4b731eb5-13ab-825a-d164-fc665b2f02e5/5054197730122.jpg/600x600bb.jpg',
    category: 'trending',
    plays: 1310138,
  },
  {
    title: 'Tauba Tauba (From "Bad Newz")',
    artist: 'Karan Aujla',
    album: 'Tauba Tauba (From "Bad Newz") - Single',
    duration: '03:27',
    durationSeconds: 207,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/34/8d/63/348d6342-2c35-bf31-8131-2c8b3cfe3c09/mzaf_15374551219149804677.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/79/d2/01/79d201d2-e54d-5604-81fb-313f30db7219/198588533581.jpg/600x600bb.jpg',
    category: 'trending',
    plays: 533134,
  },
  {
    title: 'Lover',
    artist: 'Diljit Dosanjh',
    album: 'MoonChild Era',
    duration: '03:10',
    durationSeconds: 190,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/d5/7a/38d57a99-39fc-e901-7c45-fa6260ec83c1/mzaf_8083696285926392389.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/600x600bb.jpg',
    category: 'trending',
    plays: 1818000,
  },
  {
    title: 'Born to Shine',
    artist: 'Diljit Dosanjh',
    album: 'G.O.A.T.',
    duration: '03:33',
    durationSeconds: 213,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/38/12/41/38124195-4bd9-1fc7-fe40-f793ee38d163/mzaf_14837378210736189248.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/89/ac/d289ac98-749e-3822-6b6e-b06aa4815715/859740651597_cover.jpg/600x600bb.jpg',
    category: 'trending',
    plays: 1873126,
  },
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Deluxe)',
    duration: '03:53',
    durationSeconds: 234,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/c7/4f/44c74f0d-72dc-6143-d4d0-ba14d661ca0d/mzaf_9566898362556366703.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/15/e6/e8/15e6e8a4-4190-6a8b-86c3-ab4a51b88288/190295851286.jpg/600x600bb.jpg',
    category: 'featured',
    plays: 511273,
  },
  {
    title: 'Believer',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    duration: '03:24',
    durationSeconds: 204,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c0/3f/36/c03f367a-b66b-fd0a-a54c-30f8250c4410/mzaf_12768434238801682952.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/11/7a/b8/117ab805-6811-8929-18b9-0fad7baf0c25/17UMGIM98210.rgb.jpg/600x600bb.jpg',
    category: 'featured',
    plays: 2028317,
  },
  {
    title: 'Starboy (feat. Daft Punk)',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: '03:50',
    durationSeconds: 230,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/71/d6/1171d6ad-3c96-e027-2af6-58028426588c/mzaf_15137631797407745471.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg',
    category: 'featured',
    plays: 1982802,
  },
  {
    title: 'Night Changes',
    artist: 'One Direction',
    album: 'FOUR (The Ultimate Edition)',
    duration: '03:46',
    durationSeconds: 227,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f6/ae/38/f6ae3840-e2c4-ff25-2546-cebe08431326/mzaf_15724118202843096992.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/14/e4/98/14e49846-57a9-dc8d-6fa3-5e03ccf3606c/dj.ljogvxod.jpg/600x600bb.jpg',
    category: 'featured',
    plays: 532548,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/spotify_clone';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing data...');
    await Song.deleteMany();
    await Playlist.deleteMany();
    await LikedSong.deleteMany();

    console.log('Seeding real songs...');
    const createdSongs = await Song.insertMany(realSongs);
    console.log(`Seeded ${createdSongs.length} real songs.`);

    console.log('Seeding playlists...');
    const defaultPlaylists = [
      {
        name: "Today's Top Hits",
        description: 'Kesariya, Chaleya, Lover & the biggest hits right now.',
        coverUrl: createdSongs[0].coverUrl,
        songs: [createdSongs[0]._id, createdSongs[3]._id, createdSongs[6]._id, createdSongs[8]._id],
        isCustom: false,
      },
      {
        name: 'Arijit Singh Essentials',
        description: 'Soulful blockbusters: Tum Hi Ho, Kesariya, Apna Bana Le.',
        coverUrl: createdSongs[1].coverUrl,
        songs: [createdSongs[0]._id, createdSongs[1]._id, createdSongs[2]._id, createdSongs[3]._id],
        isCustom: false,
      },
      {
        name: 'Punjabi Fire 🔥',
        description: 'Karan Aujla, Diljit Dosanjh & high energy beats.',
        coverUrl: createdSongs[5].coverUrl,
        songs: [createdSongs[5]._id, createdSongs[6]._id, createdSongs[7]._id],
        isCustom: false,
      },
      {
        name: 'Global Chartbusters',
        description: 'Imagine Dragons, The Weeknd, Ed Sheeran, One Direction.',
        coverUrl: createdSongs[9].coverUrl,
        songs: [createdSongs[8]._id, createdSongs[9]._id, createdSongs[10]._id, createdSongs[11]._id],
        isCustom: false,
      },
    ];

    await Playlist.insertMany(defaultPlaylists);
    console.log(`Seeded ${defaultPlaylists.length} playlists.`);

    // Pre-like top 2 songs
    await LikedSong.create([
      { song: createdSongs[0]._id },
      { song: createdSongs[1]._id },
      { song: createdSongs[6]._id },
    ]);
    console.log('Seeded sample liked songs.');

    console.log('Database seeding with REAL SONGS completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
