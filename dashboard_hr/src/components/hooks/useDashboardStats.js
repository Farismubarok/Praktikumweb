import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { count: totalEmployees } = await supabase
        .from("employees")
        .select("*", { count: "exact", head: true });

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: newThisMonth } = await supabase
        .from("employees")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString());

      const { count: onLeave } = await supabase
        .from("employees")
        .select("*", { count: "exact", head: true })
        .eq("status", "cuti");

      const { count: pendingApprovals } = await supabase
        .from("leave_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      return {
        totalEmployees: totalEmployees || 0,
        newThisMonth: newThisMonth || 0,
        onLeave: onLeave || 0,
        pendingApprovals: pendingApprovals || 0,
      };
    },
  });
}
