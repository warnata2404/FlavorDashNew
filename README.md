# FlavorDash

## Deskripsi

FlavorDash adalah aplikasi katalog makanan berbasis React Native (Expo) yang dikembangkan sebagai tugas mata kuliah Aplikasi Mobile.

Aplikasi ini menampilkan katalog makanan, mendukung autentikasi pengguna menggunakan konsep Stateless Authentication (JWT Mock), melindungi halaman Detail Pesanan menggunakan Route Protection, serta menyediakan fitur Camera dan Maps.

---

## Fitur

- Login Authentication (JWT Mock)
- Route Protection menggunakan Expo Router
- Katalog Makanan
- Detail Pesanan
- Mock API
- Camera
- Maps
- Marker Lokasi
- Responsive Layout menggunakan Flexbox

---

## Teknologi

- React Native
- Expo SDK 54
- Expo Router
- Expo Secure Store
- Expo Camera
- Expo Location
- React Native Maps

---

## Struktur Folder

```text
app/
components/
config/
constants/
context/
hooks/
mock/
navigation/
services/
styles/
utils/
assets/
```

---

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone <repository-url>
```

---

### 2. Masuk ke Folder Project

```bash
cd FlavorDash
```

---

### 3. Install Dependency

```bash
npm install
```

---

### 4. Jalankan Project

```bash
npx expo start
```

Kemudian jalankan menggunakan:

- Android Emulator
- Expo Go
- Physical Android Device

---

## Akun Login

Username

```text
admin
```

Password

```text
admin123
```

---

## Struktur Fitur

### Home

Menampilkan daftar makanan.

### Login

Melakukan autentikasi pengguna menggunakan JWT Mock.

### Detail Pesanan

Menampilkan detail makanan dan melakukan proses pemesanan.

Halaman ini hanya dapat diakses oleh pengguna yang telah login.

### Camera

Mengambil foto sebagai bukti penerimaan pesanan.

### Maps

Menampilkan lokasi restoran menggunakan peta beserta marker.

---

## API

Project menggunakan Mock API berupa data lokal.

---

## Repository

Source code dikelola menggunakan Git dan GitHub sesuai ketentuan tugas.

---

## Author

Nama : Warnata

NIM : 411231103

Mata Kuliah : Aplikasi Mobile
