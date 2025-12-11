import { Bell, Search, ChevronDown } from "lucide-react";
import { Input } from "../ui/input"; 
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "./Header.css"; // 👉 Import CSS terpisah

export function Header({ title, subtitle }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout berhasil");
    navigate("/auth");
  };

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <header className="header-container">
      {/* Left - Page Title */}
      <div>
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>

      {/* Right - Search, Notifications, Profile */}
      <div className="header-actions">
        {/* Search */}
        <div className="header-search">
          <Search className="header-search-icon" />
          <Input
            placeholder="Cari karyawan, divisi..."
            className="header-search-input"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="header-bell-btn">
          <Bell className="header-bell-icon" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="header-profile-btn">
              <Avatar className="header-avatar">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="header-avatar-fallback">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div className="header-profile-info">
                <p className="header-profile-name">
                  {user?.user_metadata?.full_name || user?.email}
                </p>
                <p className="header-profile-role">Admin</p>
              </div>

              <ChevronDown className="header-chevron" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
