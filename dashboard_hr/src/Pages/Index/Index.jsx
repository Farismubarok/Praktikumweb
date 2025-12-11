// src/Pages/Index/Index.jsx

import React from 'react';
import './Index.css'; 

// --- ICON PLACEHOLDERS ---
// Mengganti ikon dari lucide-react dengan representasi visual sederhana
// Users, UserPlus, CalendarOff, Clock

const Users = () => <span className="icon-placeholder icon-users">&#128101;</span>;
const UserPlus = () => <span className="icon-placeholder icon-user-plus">&#128105;</span>;
const CalendarOff = () => <span className="icon-placeholder icon-calendar-off">&#9201;</span>;
const Clock = () => <span className="icon-placeholder icon-clock">&#128337;</span>;

// --- MOCK HOOKS & DATA ---
// Mengganti useAuth dan useDashboardStats dengan data statis

const useAuth = () => ({
  user: {
    user_metadata: { full_name: 'Faris Mubarok' },
    email: 'faris.mubarok@example.com'
  }
});

const useDashboardStats = () => ({
  data: {
    totalEmployees: 450,
    newThisMonth: 12,
    onLeave: 5,
    pendingApprovals: 8
  },
  isLoading: false
});

// --- PLACEHOLDER COMPONENTS ---

// Page uses a simple container without global Sidebar/Navbar

// 2. StatCard Placeholder
const StatCard = ({ title, value, icon: Icon, variant }) => {
  const variantClass = `stat-card stat-card--${variant}`;
  return (
    <div className={variantClass}>
      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <h2 className="stat-card__value">{value}</h2>
      </div>
      <div className="stat-card__icon-container">
        <Icon className="stat-card__icon" />
      </div>
    </div>
  );
};

// 3. EmployeeChart Placeholder (Menggantikan EmployeeChart dari UI)
const EmployeeChart = () => (
    <div className="chart-container dashboard-card">
        <h3>Jumlah Karyawan Per Divisi</h3>
        <p className="subtitle">Total karyawan di setiap departemen</p>
        <div className="placeholder-content placeholder-chart">
            <p>Belum ada data karyawan (Chart)</p>
        </div>
    </div>
);

// 4. RecentActivity Placeholder
const RecentActivity = () => {
    // Mock data untuk aktivitas terbaru (sesuai UI referensi)
    const activities = [
        { description: 'Karyawan baru bergabung - Ahmad Fauzi - Divisi IT', time: '5 menit lalu' },
        { description: 'Pengajuan cuti disetujui - Siti Rahayu - 3 hari cuti', time: '1 jam lalu' },
        { description: 'Dokumen kontrak diperbaharui - Budi Santoso - Perpanjangan kontrak', time: '2 jam lalu' },
        { description: 'Evaluasi kinerja selesai - Divisi Marketing - Q4 2024', time: '3 jam lalu' },
    ];

    return (
        <div className="activity-card dashboard-card">
            <h3>Aktivitas Terbaru</h3>
            <p className="subtitle">Update terkini dari sistem</p>
            <div className="activity-list">
                {activities.map((activity, index) => (
                    <div key={index} className="activity-list-item">
                        <div className="activity-description">
                            {activity.description}
                        </div>
                        <span className="activity-time">{activity.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 5. UpcomingLeave Placeholder
const UpcomingLeave = () => (
    <div className="schedule-card dashboard-card">
        <h3>Jadwal Cuti Mendatang</h3>
        <p className="subtitle">Rencana cuti minggu ini</p>
        
        <table className="table-cuti">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan="3" className="empty-state">Tidak ada jadwal cuti mendatang</td>
                </tr>
            </tbody>
        </table>
    </div>
);


// --- KOMPONEN UTAMA INDEX ---
const Index = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Admin";

  const mockStats = {
    totalEmployees: 0,
    newThisMonth: 0,
    onLeave: 0,
    pendingApprovals: 0
  };

  const currentStats = isLoading ? mockStats : stats;

  return (
    <div className="page-container">
      <header className="page-top">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">{`Selamat datang kembali, ${userName}`}</p>
        </div>
      </header>

      <div className="page-content">
        {/* Konversi: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 */}
        <div className="stats-grid">
        <StatCard
          title="Total Karyawan"
          value={isLoading ? "..." : currentStats.totalEmployees}
          icon={Users}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Karyawan Baru Bulan Ini"
          value={isLoading ? "..." : currentStats.newThisMonth}
          icon={UserPlus}
          variant="success"
          delay={50}
        />
        <StatCard
          title="Sedang Cuti"
          value={isLoading ? "..." : currentStats.onLeave}
          icon={CalendarOff}
          variant="info"
          delay={100}
        />
        <StatCard
          title="Menunggu Persetujuan"
          value={isLoading ? "..." : currentStats.pendingApprovals}
          icon={Clock}
          variant="warning"
          delay={150}
        />
      </div>

        {/* Konversi: grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 */}
        <div className="charts-row">
        {/* Konten 2/3 lebar (lg:col-span-2) */}
        <div className="employee-chart-area">
          <EmployeeChart />
        </div>
        {/* Konten 1/3 lebar */}
        <RecentActivity />
      </div>

      {/* Tabel Jadwal Cuti Mendatang */}
      <UpcomingLeave />
      </div>
    </div>
  );
};

export default Index;