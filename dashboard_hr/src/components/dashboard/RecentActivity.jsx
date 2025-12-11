import React from "react";
import { UserPlus, Calendar, FileText, CheckCircle } from "lucide-react";
import "./RecentActivity.css";

const activities = [
  {
    id: 1,
    icon: UserPlus,
    title: "Karyawan baru bergabung",
    description: "Ahmad Fauzi - Divisi IT",
    time: "5 menit lalu",
    color: "success-color",
    bg: "success-bg",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Pengajuan cuti disetujui",
    description: "Siti Rahayu - 3 hari cuti",
    time: "1 jam lalu",
    color: "info-color",
    bg: "info-bg",
  },
  {
    id: 3,
    icon: FileText,
    title: "Dokumen kontrak diperbaharui",
    description: "Budi Santoso - Perpanjangan kontrak",
    time: "2 jam lalu",
    color: "warning-color",
    bg: "warning-bg",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Evaluasi kinerja selesai",
    description: "Divisi Marketing - Q4 2024",
    time: "3 jam lalu",
    color: "primary-color",
    bg: "primary-bg",
  },
];

export default function RecentActivity() {
  return (
    <div className="ra-container" style={{ animationDelay: "300ms" }}>
      <div className="ra-header">
        <h3 className="ra-title">Aktivitas Terbaru</h3>
        <p className="ra-subtitle">Update terkini dari sistem</p>
      </div>

      <div className="ra-list">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="ra-item"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <div className={`ra-icon-wrapper ${activity.bg}`}>
              <activity.icon className={`ra-icon ${activity.color}`} />
            </div>

            <div className="ra-content">
              <p className="ra-item-title">{activity.title}</p>
              <p className="ra-item-desc">{activity.description}</p>
            </div>

            <span className="ra-time">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
