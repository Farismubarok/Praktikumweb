import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { z } from "zod"; // Zod tetap dipertahankan untuk validasi runtime

// --- Skema Validasi ---
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function Auth() {
  const navigate = useNavigate();
  // Asumsi useAuth mengembalikan object dengan user, signIn, dan signUp
  const { user, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  // State error menggunakan object JavaScript biasa
  const [errors, setErrors] = useState({}); 

  // Redirect jika pengguna sudah login
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle submit formulir
  const handleSubmit = async (e) => { // Tipe e: React.FormEvent dihapus
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (isLogin) {
        // Logika Login
        const validated = loginSchema.parse({ email: formData.email, password: formData.password });
        const { error } = await signIn(validated.email, validated.password);

        if (error) {
          if (error.message && error.message.includes("Invalid login credentials")) {
            toast.error("Email atau password salah");
          } else {
            toast.error(error.message || "Login gagal.");
          }
        } else {
          toast.success("Login berhasil!");
          navigate("/");
        }
      } else {
        // Logika Daftar (Sign Up)
        const validated = signupSchema.parse(formData);
        const { error } = await signUp(validated.email, validated.password, validated.fullName);

        if (error) {
          if (error.message && error.message.includes("already registered")) {
            toast.error("Email sudah terdaftar");
          } else {
            toast.error(error.message || "Registrasi gagal.");
          }
        } else {
          toast.success("Registrasi berhasil! Silakan login.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      // Penanganan error Zod
      if (err instanceof z.ZodError) {
        const fieldErrors = {}; // Tipe Record<string, string> dihapus
        err.errors.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0]] = e.message; // e.path[0] as string dihapus
          }
        });
        setErrors(fieldErrors);
      } else {
        // Penanganan error non-Zod yang tidak tertangkap di blok atas
        toast.error("Terjadi kesalahan yang tidak terduga.");
        console.error("Kesalahan: ", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-card animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary-foreground">H</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">HRIS Dashboard</h1>
            <p className="text-muted-foreground mt-1">Sistem Manajemen Karyawan</p>
          </div>

          {/* Toggle */}
          <div className="flex bg-muted rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                !isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Daftar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  placeholder="Masukkan nama lengkap"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-background"
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@perusahaan.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-background pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                "Memproses..."
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Daftar
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}