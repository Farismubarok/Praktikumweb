// src/Pages/Index/Index.jsx

import React, { useState, useEffect } from 'react';
import './Index.css';
import StatCard, { Users, UserPlus, CalendarOff, Clock } from '../../Components/Card/Card'; 
import { fetchDashboardStats, fetchCuti, formatDate } from '../../utils/api';

// --- KOMPONEN UTAMA INDEX ---

const Index = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    newThisMonth: 0,
    onLeave: 0,
    pendingApprovals: 0
  });
  const [upcomingLeave, setUpcomingLeave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userName = "Admin"; // Bisa diganti dengan data dari localStorage/session

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const dashboardStats = await fetchDashboardStats();
      const cutiData = await fetchCuti();
      
      // Filter cuti yang akan datang (status disetujui dan tanggal >= hari ini)
      const today = new Date();
      const upcoming = cutiData
        .filter(c => c.status === 'Disetujui' && new Date(c.tanggal_mulai) >= today)
        .slice(0, 5);
      
      setStats(dashboardStats);
      setUpcomingLeave(upcoming);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="page-container">
      <header className="page-top">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle-1">{`Selamat datang kembali, ${userName}`}</p>
        </div>
      </header>

      <div className="page-content">
        <div className="stats-grid">
          <StatCard
            title="Total Karyawan"
            value={isLoading ? "..." : stats.totalEmployees}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Karyawan Baru Bulan Ini"
            value={isLoading ? "..." : stats.newThisMonth}
            icon={UserPlus}
            variant="success"
          />
          <StatCard
            title="Sedang Cuti"
            value={isLoading ? "..." : stats.onLeave}
            icon={CalendarOff}
            variant="info"
          />
          <StatCard
            title="Menunggu Persetujuan"
            value={isLoading ? "..." : stats.pendingApprovals}
            icon={Clock}
            variant="warning"
          />
        </div>

        <div className="charts-row">
          <div className="chart-container dashboard-card">
            <h3>Jumlah Karyawan Per Divisi</h3>
            <p className="subtitle">Total karyawan di setiap departemen</p>
            <div className="placeholder-content placeholder-chart">
              <p>Belum ada data karyawan (Chart)</p>
            </div>
          </div>
          <div className="activity-card dashboard-card">
            <h3>Ringkasan</h3>
            <p className="subtitle">Statistik sistem HR</p>
            <div className="activity-list">
              <div className="activity-list-item">
                <div className="activity-description">Total Karyawan Aktif</div>
                <span className="activity-time">{stats.totalEmployees} orang</span>
              </div>
              <div className="activity-list-item">
                <div className="activity-description">Pengajuan Cuti Pending</div>
                <span className="activity-time">{stats.pendingApprovals} pengajuan</span>
              </div>
              <div className="activity-list-item">
                <div className="activity-description">Karyawan Sedang Cuti</div>
                <span className="activity-time">{stats.onLeave} orang</span>
              </div>
            </div>
          </div>
        </div>

        <div className="schedule-card dashboard-card">
          <h3>Jadwal Cuti Mendatang</h3>
          <p className="subtitle">Rencana cuti yang sudah disetujui</p>
          
          <table className="table-cuti">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Tanggal Mulai</th>
                <th>Tanggal Selesai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="empty-state">Loading...</td>
                </tr>
              ) : upcomingLeave.length > 0 ? (
                upcomingLeave.map((cuti) => (
                  <tr key={cuti.id}>
                    <td>{cuti.nama_lengkap}</td>
                    <td>{formatDate(cuti.tanggal_mulai)}</td>
                    <td>{formatDate(cuti.tanggal_selesai)}</td>
                    <td>
                      <span className="status-badge status-disetujui">{cuti.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">Tidak ada jadwal cuti mendatang</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;