import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 ml-64 transition-all duration-300">
        {/* Header */}
        <Header title={title} subtitle={subtitle} />

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
