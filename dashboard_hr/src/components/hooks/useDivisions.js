import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useDivisions() {
  return useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("divisions")
        .select("*")
        .order("name");

      if (error) throw error;
      return data || [];
    },
  });
}

export function useDivisionEmployeeCount() {
  return useQuery({
    queryKey: ["division-employee-count"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("division_id, divisions(name)")
        .not("division_id", "is", null);

      if (error) throw error;

      const counts = {};

      data.forEach((emp) => {
        if (emp.division_id && emp.divisions) {
          if (!counts[emp.division_id]) {
            counts[emp.division_id] = {
              name: emp.divisions.name,
              count: 0,
            };
          }
          counts[emp.division_id].count++;
        }
      });

      return Object.values(counts);
    },
  });
}

export function useCreateDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from("divisions")
        .insert(input)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["divisions"] });
      toast.success("Divisi berhasil ditambahkan!");
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan divisi: ${error.message}`);
    },
  });
}

export function useDeleteDivision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("divisions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["divisions"] });
      toast.success("Divisi berhasil dihapus!");
    },
    onError: (error) => {
      toast.error(`Gagal menghapus divisi: ${error.message}`);
    },
  });
}
