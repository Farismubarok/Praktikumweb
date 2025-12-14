// Bagian: API Utils

const API_BASE = 'http://localhost:3000/api';

// Bagian: Helper Format ID

export const formatEmployeeId = (id) => `EMP${String(id).padStart(3, '0')}`;
export const formatDivisiId = (id) => `DIV${String(id).padStart(3, '0')}`;
export const formatGajiId = (id) => `SAL${String(id).padStart(3, '0')}`;
export const formatCutiId = (id) => `CUT${String(id).padStart(3, '0')}`;

// Bagian: API Karyawan

export const fetchKaryawan = async () => {
  try {
    const response = await fetch(`${API_BASE}/karyawan`);
    if (!response.ok) throw new Error('Gagal fetch data karyawan');
    return await response.json();
  } catch (error) {
    console.error('Error fetching karyawan:', error);
    return [];
  }
};

export const createKaryawan = async (data) => {
  const response = await fetch(`${API_BASE}/karyawan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateKaryawan = async (id, data) => {
  const response = await fetch(`${API_BASE}/karyawan/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteKaryawan = async (id) => {
  const response = await fetch(`${API_BASE}/karyawan/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Bagian: API Divisi

export const fetchDivisi = async () => {
  try {
    const response = await fetch(`${API_BASE}/divisi`);
    if (!response.ok) throw new Error('Gagal fetch data divisi');
    return await response.json();
  } catch (error) {
    console.error('Error fetching divisi:', error);
    return [];
  }
};

export const createDivisi = async (data) => {
  const response = await fetch(`${API_BASE}/divisi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateDivisi = async (id, data) => {
  const response = await fetch(`${API_BASE}/divisi/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteDivisi = async (id) => {
  const response = await fetch(`${API_BASE}/divisi/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Bagian: API Gaji

export const fetchGaji = async () => {
  try {
    const response = await fetch(`${API_BASE}/gaji`);
    if (!response.ok) throw new Error('Gagal fetch data gaji');
    return await response.json();
  } catch (error) {
    console.error('Error fetching gaji:', error);
    return [];
  }
};

export const createGaji = async (data) => {
  const response = await fetch(`${API_BASE}/gaji`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const fetchGajiByKaryawanId = async (id_karyawan) => {
  try {
    const response = await fetch(`${API_BASE}/gaji/karyawan/${id_karyawan}`);
    if (!response.ok) throw new Error('Gagal fetch data gaji karyawan');
    const data = await response.json();
    // Bagian: Return Gaji Terbaru
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching gaji by karyawan:', error);
    return null;
  }
};

export const updateGaji = async (id, data) => {
  const response = await fetch(`${API_BASE}/gaji/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteGaji = async (id) => {
  const response = await fetch(`${API_BASE}/gaji/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Bagian: API Cuti

export const fetchCuti = async () => {
  try {
    const response = await fetch(`${API_BASE}/cuti`);
    if (!response.ok) throw new Error('Gagal fetch data cuti');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cuti:', error);
    return [];
  }
};

export const createCuti = async (data) => {
  const response = await fetch(`${API_BASE}/cuti`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateStatusCuti = async (id, status) => {
  const response = await fetch(`${API_BASE}/cuti/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

export const deleteCuti = async (id) => {
  const response = await fetch(`${API_BASE}/cuti/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Bagian: API Admin

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const registerAdmin = async (data) => {
  const response = await fetch(`${API_BASE}/admin/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Bagian: Dashboard Stats

export const fetchDashboardStats = async () => {
  try {
    const [karyawan, cuti] = await Promise.all([
      fetchKaryawan(),
      fetchCuti()
    ]);

    const totalEmployees = karyawan.length;
    const activeEmployees = karyawan.filter(k => k.status === 'Aktif').length;
    const onLeave = karyawan.filter(k => k.status === 'Cuti').length;
    const inactiveEmployees = karyawan.filter(k => k.status === 'Tidak Aktif').length;
    const pendingApprovals = cuti.filter(c => c.status === 'Menunggu').length;
    
    // Bagian: Hitung Karyawan Baru
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const newThisMonth = karyawan.filter(k => {
      const joinDate = new Date(k.tanggal_masuk);
      return joinDate.getMonth() === thisMonth && joinDate.getFullYear() === thisYear;
    }).length;

    return {
      totalEmployees,
      activeEmployees,
      newThisMonth,
      onLeave,
      inactiveEmployees,
      pendingApprovals
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalEmployees: 0,
      activeEmployees: 0,
      newThisMonth: 0,
      onLeave: 0,
      inactiveEmployees: 0,
      pendingApprovals: 0
    };
  }
};

// Bagian: Helper Functions

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Bagian: Service Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE}/divisi/stats`);
    if (!response.ok) throw new Error('Gagal mengambil data statistik');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Bagian: Error Handling
  }
};