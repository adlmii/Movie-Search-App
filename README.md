# 🎬 Movie Search App

Movie Search App adalah aplikasi pencarian film yang dibangun dengan React dan menggunakan API dari [The Movie Database (TMDb)](https://www.themoviedb.org/) untuk mendapatkan informasi film terbaru, sinopsis, rating, dan lainnya.

## 🚀 Fitur
- 🔍 Pencarian film berdasarkan judul.
- 📃 Menampilkan daftar film populer.
- 📄 Detail film termasuk sinopsis, rating, dan tanggal rilis.
- 🎥 Tampilan poster film yang menarik.

## 🛠️ Teknologi yang Digunakan
- **React (Vite)** - Untuk antarmuka pengguna yang interaktif.
- **TMDb API** - Sumber data film.
- **Axios** - Untuk permintaan HTTP ke API.
- **React Router** - Untuk navigasi antar halaman.

## 🔧 Instalasi
Pastikan sudah menginstal **Node.js** dan **pnpm** di sistem Anda.

1. Clone repositori ini:
    ```bash
    git clone https://github.com/username/movie-search-app.git
    cd movie-search-app
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Buat file `.env` di root proyek dan tambahkan API Key dari TMDb:
    ```
    VITE_TMDB_API_KEY=YOUR_API_KEY_HERE
    ```

4. Jalankan aplikasi:
    ```bash
    pnpm run dev
    ```

Aplikasi akan berjalan di `http://localhost:5173`.

## 🔑 Mendapatkan API Key dari TMDb
1. Daftar atau masuk ke akun [TMDb](https://www.themoviedb.org/).
2. Pergi ke **Settings** -> **API**.
3. Dapatkan API Key (v3 auth) dan tambahkan ke file `.env`.
