const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const LikedSong = require('../models/LikedSong');

dotenv.config();

const allSongs = [

  {
    title: 'Kesariya (From "Brahmastra")',
    artist: 'Pritam, Arijit Singh & Amitabh Bhattacharya',
    album: 'Kesariya (From "Brahmastra") - Single',
    duration: '04:28',
    durationSeconds: 268,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg',
    category: 'recent',
    plays: 2959821,
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
    plays: 3960218,
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
    plays: 1771243,
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
    plays: 2747185,
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
    plays: 3533134,
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
    plays: 2818000,
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
    plays: 4511273,
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
    plays: 3028317,
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
    plays: 2982802,
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
    plays: 1532548,
  },

  {
    title: 'Ilahi',
    artist: 'Pritam & Arijit Singh',
    album: 'Yeh Jawaani Hai Deewani (Original Motion Picture Soundtrack)',
    duration: '03:48',
    durationSeconds: 229,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/27/64/75276455-6751-e9d7-1187-b863a2ffefbc/mzaf_4313837125483855343.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/62/d6/74/62d67432-0670-631f-db6a-d4bac3adae4b/8902894353328_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2955245,
  },
  {
    title: 'Safarnama',
    artist: 'Lucky Ali',
    album: 'Tamasha (Original Motion Picture Soundtrack)',
    duration: '04:11',
    durationSeconds: 251,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/43/b0/33/43b0337b-7b7b-ac22-f480-efd488b1b729/mzaf_15425196939955671164.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cb/ac/67/cbac673a-9213-7118-bb4e-2440273afb03/8902894357470_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2224029,
  },
  {
    title: 'Sooraj Dooba Hain',
    artist: 'Arijit Singh & Aditi Singh Sharma',
    album: 'Roy (Original Motion Picture Soundtrack)',
    duration: '04:24',
    durationSeconds: 265,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f3/be/66/f3be66d2-7d04-a46a-5461-fca00fec1eac/mzaf_14629173701620458221.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e7/fb/65/e7fb6545-17e3-bb5f-ae1a-02895f26a0c5/8902894356688_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2021007,
  },
  {
    title: 'Matargashti',
    artist: 'Mohit Chauhan',
    album: 'Tamasha (Original Motion Picture Soundtrack)',
    duration: '05:28',
    durationSeconds: 328,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0a/7c/ec/0a7cecfe-be6e-d602-b9f1-b61525c34c9a/mzaf_2446319335603350763.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cb/ac/67/cbac673a-9213-7118-bb4e-2440273afb03/8902894357470_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2388641,
  },
  {
    title: 'Dil Chahta Hai',
    artist: 'Shankar Mahadevan',
    album: 'Dil Chahta Hai (Original Motion Picture Soundtrack)',
    duration: '05:10',
    durationSeconds: 310,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/b7/81/fab78119-a64d-011b-7b12-86cec93956ff/mzaf_6150515912782371702.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2b/df/62/2bdf6213-3d11-5f01-cc5e-ddfcc15923b4/8902894114844_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1250702,
  },
  {
    title: 'Khaabon Ke Parinday',
    artist: 'Alyssa Mendonsa & Mohit Chauhan',
    album: 'Zindagi Na Milegi Dobara (Original Motion Picture Soundtrack)',
    duration: '04:11',
    durationSeconds: 252,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a6/04/41/a604411e-ee76-44a2-2573-4a88e2766920/mzaf_5818575573709889759.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b0/3f/4c/b03f4cca-8a6a-f506-4490-3263b4fb620c/8902894696296_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2421051,
  },
  {
    title: 'Tu Aake Dekhle',
    artist: 'King',
    album: 'The Carnival',
    duration: '04:30',
    durationSeconds: 270,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1a/67/58/1a6758bc-4a21-66f0-53eb-251a8fe02823/mzaf_7835817333695150569.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f1/3b/99/f13b99e6-84f7-a5d8-1be7-e82ebcc6354f/3616408758275.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1710368,
  },
  {
    title: 'Maan Meri Jaan',
    artist: 'King',
    album: 'Champagne Talk',
    duration: '03:14',
    durationSeconds: 195,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/49/c8/c0/49c8c0eb-6a72-d639-02d2-d55fa0034b89/mzaf_6556689839136809010.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/90/9d/aa/909daa9a-3a47-9314-2855-39f5a157f1e3/5054197407734.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1543631,
  },
  {
    title: 'Cheques',
    artist: 'Shubh',
    album: 'Still Rollin',
    duration: '03:03',
    durationSeconds: 184,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/e9/8a/5fe98aa5-660a-2f91-b53d-558fdb9ef50b/mzaf_5845186979219129320.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dc/46/a9/dc46a9c9-794e-2d7a-1afb-97eb4ae0fff6/197188915704.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1512293,
  },
  {
    title: 'No Love',
    artist: 'Shubh',
    album: 'No Love - Single',
    duration: '02:50',
    durationSeconds: 170,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f5/44/60/f54460ff-fd9a-8ba5-9b96-c125671653d0/mzaf_10095891320979401013.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a7/b3/80/a7b380b9-9e29-1642-566e-d1ca4b920886/196776912972.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2117398,
  },
  {
    title: 'Kina Chir',
    artist: 'The PropheC',
    album: 'The Lifestyle',
    duration: '03:36',
    durationSeconds: 216,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/16/47/f8/1647f845-d302-d996-7ec9-3ee7ac416c64/mzaf_181033671979389280.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fe/80/83/fe808396-feb8-c790-35b0-3b2f814b6681/cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1290454,
  },
  {
    title: 'Hairat',
    artist: 'Lucky Ali & Vishal & Shekhar',
    album: 'Anjaana Anjaani (Original Motion Picture Soundtrack)',
    duration: '04:07',
    durationSeconds: 247,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/23/0e/f4/230ef406-ca16-e858-0020-45755f6d4fcc/mzaf_11115204371357015768.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music18/v4/8b/d8/a1/8bd8a190-8b8c-35f8-8573-614428dd6e42/8902894689113_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1661237,
  },
  {
    title: 'Subah Subah (From "Sonu Ke Titu Ki Sweety")',
    artist: 'Arijit Singh, Prakriti Kakar & Amaal Mallik',
    album: 'Subah Subah (From "Sonu Ke Titu Ki Sweety") - Single',
    duration: '04:37',
    durationSeconds: 277,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f9/60/27/f96027bd-431b-1040-20b0-9835c61bd03d/mzaf_777399037183736887.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/e3/66/54/e366548e-6beb-87f2-ae5c-bdba25104b1c/8903431665317_cover.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 1450132,
  },
  {
    title: 'Hawayein',
    artist: 'Pritam & Arijit Singh',
    album: 'Jab Harry Met Sejal (Original Motion Picture Soundtrack)',
    duration: '04:50',
    durationSeconds: 290,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/15/d1/a8/15d1a862-edcd-6a92-624a-2bbf0f7eff26/mzaf_7165241817401822857.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/41/aa/e3/41aae321-0a81-2762-e0eb-c60844109fe7/886446683584.jpg/600x600bb.jpg',
    category: 'long drive',
    plays: 2693375,
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

    console.log('Seeding all 26 real songs...');
    const createdSongs = await Song.insertMany(allSongs);
    console.log(`Seeded ${createdSongs.length} songs.`);

    const driveSongIds = createdSongs.slice(12).map((s) => s._id);

    console.log('Seeding playlists...');
    const defaultPlaylists = [
      {
        name: 'Ultimate Long Drive Vibes 🚗💨',
        description: 'Windows down, volume up! Ilahi, Safarnama, Khaabon Ke Parinday, Cheques, Hawayein.',
        coverUrl: createdSongs[12].coverUrl,
        songs: driveSongIds,
        isCustom: false,
      },
      {
        name: "Today's Top Hits",
        description: 'Kesariya, Chaleya, Lover & the biggest hits right now.',
        coverUrl: createdSongs[0].coverUrl,
        songs: [createdSongs[0]._id, createdSongs[3]._id, createdSongs[6]._id, createdSongs[8]._id, createdSongs[12]._id],
        isCustom: false,
      },
      {
        name: 'Arijit Singh Essentials ❤️',
        description: 'Soulful blockbusters: Tum Hi Ho, Kesariya, Hawayein, Ilahi.',
        coverUrl: createdSongs[1].coverUrl,
        songs: [createdSongs[0]._id, createdSongs[1]._id, createdSongs[2]._id, createdSongs[12]._id, createdSongs[25]._id],
        isCustom: false,
      },
      {
        name: 'Punjabi Drive & Beats 🔥',
        description: 'Shubh, Karan Aujla, Diljit Dosanjh & The PropheC.',
        coverUrl: createdSongs[20].coverUrl,
        songs: [createdSongs[5]._id, createdSongs[6]._id, createdSongs[20]._id, createdSongs[21]._id, createdSongs[22]._id],
        isCustom: false,
      },
      {
        name: 'Global Chartbusters 🌍',
        description: 'Imagine Dragons, The Weeknd, Ed Sheeran, One Direction.',
        coverUrl: createdSongs[9].coverUrl,
        songs: [createdSongs[8]._id, createdSongs[9]._id, createdSongs[10]._id, createdSongs[11]._id],
        isCustom: false,
      },
    ];

    await Playlist.insertMany(defaultPlaylists);
    console.log(`Seeded ${defaultPlaylists.length} playlists.`);

    await LikedSong.create([
      { song: createdSongs[12]._id },
      { song: createdSongs[17]._id },
      { song: createdSongs[0]._id },
      { song: createdSongs[20]._id },
    ]);
    console.log('Seeded sample liked songs.');

    console.log('Database seeding with LONG DRIVE songs completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();

