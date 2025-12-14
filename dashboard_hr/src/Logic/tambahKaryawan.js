import { useState } from 'react';
import { toast } from 'sonner';

export const useAddEmployee = (onClose, onSuccess) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Bagian: State Form
  const [formData, setFormData] = useState({
    // Bagian: Step 1
    nama_lengkap: '', email: '', no_telepon: '', tanggal_masuk: '',
    // Bagian: Step 2
    id_divisi: '', jabatan: '', status: '',
    // Bagian: Step 3
    gaji_pokok: '', tunjangan: '', bonus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/karyawan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Karyawan berhasil ditambahkan!");
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        toast.error(result.message || "Gagal menyimpan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return { step, formData, loading, handleChange, nextStep, prevStep, submitForm };
};