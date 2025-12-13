# portofolio
Project aplikasi React berbasis CRUD sebagai portfolio dan tugas Ujian. Menggunakan React dan Firebase/MySQL

--LANGKAH 1
Pastikan sudah terinstall:

Node.js (versi terbaru)

pnpm
Jika belum install pnpm: npm install -g pnpm


--LANGKAH 2 Buat Project React Baru (Vite + PNPM)
1. Buat folder project BARU (opsional)
Contoh:

mkdir my-react-app
cd my-react-app

2. Generate project React

Jalankan:
pnpm create vite

Lalu pilih:
Project name: my-react-app (atau nama bebas)
Framework: React
Variant: JavaScript atau TypeScript

3. Masuk ke folder project
cd my-react-app

4. Install dependency dengan pnpm
pnpm install

5. Jalankan project
pnpm dev

Kalau berhasil, React sudah jalan.


--LANGKAH 3 Hubungkan Project React ke GitHub
1. Inisialisasi Git di folder project

Pastikan kamu di dalam folder project (my-react-app):

git init

2. Tambahkan semua file ke Git
git add .

3. Commit pertama
git commit -m "Initial React project with Vite and pnpm"

--LANGKAH 4 Buat Repository di GitHub

Pergi ke GitHub → New Repository
Masukkan nama repo (misal: my-react-app)
Buat tanpa README agar tidak konflik
Buat repo

GitHub akan memberikan URL, contoh:

https://github.com/username/my-react-app.git


--LANGKAH 5 Hubungkan Git Lokal ke GitHub
Jalankan:

git branch -M main
git remote add origin https://github.com/username/my-react-app.git
git push -u origin main


Setelah push berhasil, project kamu sudah terhubung 100% ke GitHub.


--LANGKAH 5 Cara Push Update Berikutnya

Jika ada perubahan:

git add .
git commit -m "update"
git push

# Backend

masuk ke folder backend
cd dashboard_hr\Backend
1. pnpm init

2. pnpm add express dotenv cors mongoose

3. pnpm add -D nodemon

# Run Backend
cd dashboard_hr\Backend\pnpm run dev
