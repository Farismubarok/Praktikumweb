import React from "react";
import "./UpcomingLeave.css";
import { useLeaveRequests } from "../hooks/useLeaveRequests"; 
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

export default function UpcomingLeave() {
  const { data: leaveRequests, isLoading } = useLeaveRequests("upcoming");

  return (
    <div
      className="ul-card"
      style={{ animationDelay: "400ms" }}
    >
      <div className="ul-header">
        <h3 className="ul-title">Jadwal Cuti Mendatang</h3>
        <p className="ul-subtitle">Rencana cuti minggu ini</p>
      </div>

      <div className="ul-table-wrapper">
        <table className="ul-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="ul-empty">Memuat data...</td>
              </tr>
            ) : leaveRequests?.length === 0 ? (
              <tr>
                <td colSpan="3" className="ul-empty">Tidak ada jadwal cuti mendatang</td>
              </tr>
            ) : (
              leaveRequests.map((item) => (
                <tr key={item.id} className="ul-row">
                  <td>
                    <span className="ul-name">
                      {item.employees?.full_name || "-"}
                    </span>
                  </td>

                  <td>
                    <span className="ul-date">
                      {format(new Date(item.start_date), "dd MMM", { locale: idLocale })} -{" "}
                      {format(new Date(item.end_date), "dd MMM yyyy", { locale: idLocale })}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`ul-badge ${
                        item.status === "approved" ? "ul-badge-approved" : "ul-badge-pending"
                      }`}
                    >
                      {item.status === "approved" ? "Disetujui" : "Menunggu"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
