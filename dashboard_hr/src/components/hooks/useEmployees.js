import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useEmployees(filters) {
  return useQuery({
    queryKey: ["employees", filters],
    queryFn: async () => {
      let query = supabase
        .from("employees")
        .select("*, divisions(name)")
        .order("created_at", { ascending: false });

      if (filters?.division && filters.division !== "all") {
        query = query.eq("division_id", filters.division);
      }

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters?.search) {
        query = query.ilike("full_name", `%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useEmployee(id) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*, divisions(name)")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from("employees")
        .insert(input)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Karyawan berhasil ditambahkan!");
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan karyawan: ${error.message}`);
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }) => {
      const { data, error } = await supabase
        .from("employees")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Data karyawan berhasil diupdate!");
    },
    onError: (error) => {
      toast.error(`Gagal mengupdate karyawan: ${error.message}`);
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Karyawan berhasil dihapus!");
    },
    onError: (error) => {
      toast.error(`Gagal menghapus karyawan: ${error.message}`);
    },
  });
}
