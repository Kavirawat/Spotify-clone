# 🎵 Spotify Full-Stack Web Application

A complete, responsive, full-stack **Spotify Web Player Clone** built with **React**, **Express.js**, **MongoDB (Mongoose)**, and HTML5 Web Audio API.

---

## 🌟 Features / Features Jo Kaam Krte Hain

- 🎧 **Real Working Audio Player**:
  - Play, Pause, Next, Previous songs.
  - Interactive clickable & draggable Seek / Progress Bar with accurate current time & duration.
  - Interactive Volume Control slider with Mute / Unmute toggle.
  - Shuffle and Repeat modes (Repeat All / Repeat One / Off).
  - Now Playing album art, title, and artist dynamically updated.
  - Queue management modal with real-time upcoming track list.
- 🔍 **Real-Time Live Search**:
  - Search songs by title, artist, or album.
  - Instant browse categories (Pop, Bollywood, Indie, Romance, Podcasts, etc.).
- 📂 **Playlist Management (CRUD)**:
  - Create new custom playlists with name & description.
  - Add any song to any playlist from home, search, or player.
  - View playlist tracks, play all tracks, and delete custom playlists.
- 💚 **Liked Songs (Favorites)**:
  - Like / Unlike any song with one click (Heart icon).
  - Dedicated "Liked Songs" library view with custom gradient banner.
- 📱 **100% Fully Responsive Design**:
  - **Desktop**: 2-column Spotify layout with sidebar, header, card grid, and sticky player bar.
  - **Mobile / Tablet**: Slide-out mobile drawer, bottom app navigation (Home, Search, Your Library), compact mobile player bar, and responsive card grid.
- 🗄️ **MongoDB & REST API**:
  - Clean separation: `backend/` and `frontend/` folders.
  - Mongoose models for `Song`, `Playlist`, and `LikedSong`.

---

## 📁 Project Structure / Folder Organization

```text
Spotify-clone/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── songController.js     # Songs fetching & search logic
│   │   ├── playlistController.js # Playlist CRUD operations
│   │   └── likeController.js     # Liked songs toggle & list
│   ├── models/
│   │   ├── Song.js               # Mongoose Song schema
│   │   ├── Playlist.js           # Mongoose Playlist schema
│   │   └── LikedSong.js          # Mongoose LikedSong schema
│   ├── routes/
│   │   ├── songRoutes.js         # /api/songs
│   │   ├── playlistRoutes.js     # /api/playlists
│   │   └── likeRoutes.js         # /api/likes
│   ├── seed/
│   │   └── seedData.js           # Database population script
│   ├── public/
│   │   ├── audio/                # High-quality audio tracks
│   │   └── images/               # Album arts and icons
│   ├── server.js                 # Express server entry point
│   ├── .env                      # Backend configuration
│   └── package.json
│
├── frontend/
│   ├── public/                   # Public assets & album covers
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Left sidebar & mobile drawer
│   │   │   ├── TopNav.jsx        # Navigation bar & search bar
│   │   │   ├── Player.jsx        # Music player bottom bar
│   │   │   ├── SongCard.jsx      # Song card with hover play
│   │   │   ├── PlaylistCard.jsx  # Playlist card
│   │   │   ├── PlaylistModal.jsx # Create playlist modal
│   │   │   ├── AddToPlaylistModal.jsx # Add track to playlist modal
│   │   │   └── QueueModal.jsx    # Upcoming queue popup
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Home feed & charts
│   │   │   ├── Search.jsx        # Live search & categories
│   │   │   ├── PlaylistDetail.jsx# Playlist view
│   │   │   └── LikedSongs.jsx    # Liked tracks view
│   │   ├── context/
│   │   │   ├── PlayerContext.jsx # Audio player state & audio logic
│   │   │   └── PlaylistContext.jsx # Playlists & favorites state
│   │   ├── services/
│   │   │   └── api.js            # Frontend backend API client
│   │   ├── App.jsx               # Main application container
│   │   ├── main.jsx              # React DOM render
│   │   └── index.css             # Spotify dark theme styles
│   ├── vite.config.js
│   └── package.json
│
├── package.json                  # Root scripts (runs both together)
└── README.md
```

---

## 🚀 How to Run the Project / Kaise Chalaye

### 1. Prerequisites
- **Node.js**: v18+ (v22 is installed)
- **MongoDB**: Running locally on `mongodb://127.0.0.1:27017`

### 2. Seed Database (Initial Songs & Playlists)
Pehle database me sample songs aur playlists load karne ke liye:
```bash
npm run seed
```

### 3. Run Both Frontend & Backend Together
Ek hi command se frontend aur backend dono start ho jayenge:
```bash
npm run dev
```

- **Frontend URL**: [http://localhost:3000](http://localhost:3000)
- **Backend API URL**: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Individual Commands / Alg-Alg Run Krna Ho Toh

### Backend Only:
```bash
cd backend
npm start
```

### Frontend Only:
```bash
cd frontend
npm run dev
```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/songs` | Sabhi songs fetch karega (optional `?category=...`) |
| `GET` | `/api/songs/search?q=...` | Song name, artist ya album se search karega |
| `GET` | `/api/songs/:id` | Single song details |
| `GET` | `/api/playlists` | Sabhi playlists fetch karega |
| `POST` | `/api/playlists` | Nayi playlist banayega |
| `GET` | `/api/playlists/:id` | Playlist ke saare songs fetch karega |
| `POST` | `/api/playlists/:id/songs` | Playlist me song add karega |
| `DELETE`| `/api/playlists/:id/songs/:songId` | Playlist se song remove karega |
| `DELETE`| `/api/playlists/:id` | Custom playlist delete karega |
| `GET` | `/api/likes` | Liked songs list fetch karega |
| `POST` | `/api/likes/toggle` | Song ko like ya unlike karega |
| `GET` | `/api/health` | Backend server health check |
