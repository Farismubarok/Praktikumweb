import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Data Karyawan", path: "/karyawan" },
  { icon: Building2, label: "Divisi", path: "/divisi" },
  { icon: CalendarDays, label: "Cuti", path: "/cuti" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout berhasil");
    navigate("/auth");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar-header">
        <div className={`sidebar-logo ${collapsed ? "center" : ""}`}>
          <div className="sidebar-logo-icon">
            <span>H</span>
          </div>

          {!collapsed && (
            <div className="sidebar-logo-text">
              <h1>HRIS</h1>
              <p>Management System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${collapsed ? "collapsed" : ""} ${
                isActive ? "active" : ""
              }`
            }
          >
            <item.icon className="sidebar-icon" />
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button
          onClick={handleLogout}
          className={`sidebar-item logout ${collapsed ? "collapsed" : ""}`}
        >
          <LogOut className="sidebar-icon" />
          {!collapsed && <span className="sidebar-label">Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`sidebar-item ${collapsed ? "collapsed" : ""}`}
        >
          {collapsed ? (
            <ChevronRight className="sidebar-icon" />
          ) : (
            <>
              <ChevronLeft className="sidebar-icon" />
              <span className="sidebar-label">Tutup Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
