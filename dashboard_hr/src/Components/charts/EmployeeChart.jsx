// Bagian: Komponen EmployeeChart
import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import { getDashboardStats } from '../../utils/api';

const EmployeeChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bagian: Chart Warna
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await getDashboardStats();
        // Bagian: Stats Format
        setData(stats);
      } catch (error) {
        console.error("Gagal load chart data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9ca3af'}}>Memuat Grafik...</div>;
  }

  if (data.length === 0) {
    return <div style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9ca3af'}}>Belum ada data karyawan</div>;
  }

  return (
    <div className="chart-container dashboard-card" style={{ height: '400px', padding: '20px' }}>
        
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                    dataKey="nama_divisi" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6b7280', fontSize: 12}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6b7280', fontSize: 12}} 
                    allowDecimals={false} // Bagian: Y Axis Format
                />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={50}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default EmployeeChart;