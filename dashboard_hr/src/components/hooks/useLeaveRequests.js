import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useLeaveRequests(status) {
  return useQuery({
    queryKey: ["leave-requests", status],
    queryFn: async () => {
      let query = supabase
        .from("leave_requests")
        .select("*, employees(full_name)")
        .order("created_at", { ascending: false });

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useUpcomingLeave() {
  return useQuery({
    queryKey: ["upcoming-leave"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("leave_requests")
        .select("*, employees(full_name)")
        .gte("start_date", today)
        .order("start_date", { ascending: true })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });
}

export function useCreateLeaveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from("leave_requests")
        .insert(input)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-leave"] });
      toast.success("Pengajuan cuti berhasil!");
    },
    onError: (error) => {
      toast.error(`Gagal mengajukan cuti: ${error.message}`);
    },
  });
}

export function useUpdateLeaveStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, approved_by }) => {
      const { data, error } = await supabase
        .from("leave_requests")
        .update({ status, approved_by })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-leave"] });
      toast.success("Status cuti berhasil diupdate!");
    },
    onError: (error) => {
      toast.error(`Gagal mengupdate status: ${error.message}`);
    },
  });
}
