// Bagian: Komponen Index

import React, { useState, useEffect } from 'react';
import './Index.css';
import StatCard, { Users, UserPlus, CalendarOff, Clock } from '../../Components/Card/Card'; 
import { fetchDashboardStats, fetchCuti, formatDate } from '../../utils/api';
// Bagian: Import Komponen
import EmployeeChart from '../../Components/charts/EmployeeChart'; 

const Index = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    newThisMonth: 0,
    onLeave: 0,
    inactiveEmployees: 0,
    pendingApprovals: 0
  });
  const [upcomingLeave, setUpcomingLeave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userName = "Admin"; 

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const dashboardStats = await fetchDashboardStats();
        const cutiData = await fetchCuti();
        
        const today = new Date();
        const upcoming = cutiData
          .filter(c => c.status === 'Disetujui' && new Date(c.tanggal_mulai) >= today)
          .slice(0, 5);
        
        setStats(dashboardStats);
        setUpcomingLeave(upcoming);
      } catch (error) {
        console.error("Gagal memuat dashboard:", error);
      } finally {
        setIsLoading(false);
      }
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
        {/* --- STATISTIC CARDS --- */}
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

        {/* --- CHARTS & ACTIVITY ROW --- */}
        <div className="charts-row">
          
          {/* 2. GANTI PLACEHOLDER DENGAN CHART ASLI */}
          <div className="chart-container dashboard-card">
            <h3>Jumlah Karyawan Per Divisi</h3>
            <p className="subtitle">Total karyawan di setiap departemen</p>
            
            {/* Render Komponen Chart Disini */}
            <EmployeeChart />
            
          </div>

          <div className="activity-card dashboard-card">
            <h3>Ringkasan</h3>
            <p className="subtitle">Statistik sistem HR</p>
            <div className="activity-list">
              <div className="activity-list-item">
                <div className="activity-description">Total Karyawan Aktif</div>
                <span className="activity-time">{stats.activeEmployees} orang</span>
              </div>
              <div className="activity-list-item">
                <div className="activity-description">Pengajuan Cuti Pending</div>
                <span className="activity-time">{stats.pendingApprovals} pengajuan</span>
              </div>
              <div className="activity-list-item">
                <div className="activity-description">Karyawan Sedang Cuti</div>
                <span className="activity-time">{stats.onLeave} orang</span>
              </div>
              <div className="activity-list-item">
                <div className="activity-description">Karyawan Tidak Aktif</div>
                <span className="activity-time">{stats.inactiveEmployees} orang</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- UPCOMING LEAVE --- */}
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