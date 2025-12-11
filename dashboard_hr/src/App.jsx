import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Layouts dan Rute Pelindung
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// 2. Import Komponen Halaman (dari folder dashboard)
// Asumsi: Semua komponen ini adalah halaman utama, meskipun namanya agak spesifik.
// Dalam praktik nyata, Anda mungkin memiliki folder 'pages' terpisah.

import UpcomingLeave from "./components/dashboard/UpcomingLeave"; // Sudah ada
import RecentActivity from "./components/dashboard/RecentActivity"; // Ditambahkan
import EmployeeChart from "./components/dashboard/EmployeeChart"; // Ditambahkan
import StatCard from "./components/dashboard/StatCard"; // Ditambahkan

export default function App() {
  // Fungsi pembantu untuk membungkus halaman dengan ProtectedRoute dan DashboardLayout
  const wrapProtectedPage = (Component, title, subtitle) => (
    <ProtectedRoute>
      <DashboardLayout title={title} subtitle={subtitle}>
        <Component />
      </DashboardLayout>
    </ProtectedRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- RUTE DASHBOARD DENGAN PROTECTED LAYOUT --- */}
        
        {/* Rute Utama (Landing Page/Dashboard Default) */}
        <Route 
          path="/" 
          element={wrapProtectedPage(UpcomingLeave, "Dashboard Utama", "Informasi ringkasan dan cuti mendatang")} 
        />

        {/* Contoh Rute Lain (sesuaikan path dan komponen): */}
        
        <Route 
          path="/activities" 
          element={wrapProtectedPage(RecentActivity, "Aktivitas Terkini", "Lihat semua riwayat aktivitas karyawan")} 
        />
        
        <Route 
          path="/analytics" 
          element={wrapProtectedPage(EmployeeChart, "Analisis Karyawan", "Visualisasi data demografi dan performa")} 
        />

        {/* Anda dapat menambahkan rute lain di sini (misalnya untuk Login, Settings, dll.) */}
        
        {/* Contoh Rute Tanpa Proteksi (misalnya halaman Login, nanti perlu ditambahkan)
        <Route path="/login" element={<LoginPage />} />
        */}

      </Routes>
    </BrowserRouter>
  );
}