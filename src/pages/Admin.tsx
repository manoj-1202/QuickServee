import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  customer_name: string;
  phone_number: string;
  service: string;
  location: string;
  preferred_date: string | null;
  preferred_time: string | null;
  problem_description: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/");
      return;
    }

    const { data: roleData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (error || !roleData) {
      toast({
        title: "Access denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      await supabase.auth.signOut();
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchBookings();
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings.",
        variant: "destructive",
      });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status updated",
        description: `Booking marked as ${newStatus}.`,
      });
      fetchBookings();
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Bookings ({bookings.length})</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No bookings found.
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{booking.customer_name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        booking.status === "new" ? "bg-blue-100 text-blue-700" :
                        booking.status === "in_progress" ? "bg-yellow-100 text-yellow-700" :
                        booking.status === "completed" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Phone:</strong> <a href={`tel:${booking.phone_number}`} className="text-primary hover:underline">{booking.phone_number}</a></p>
                      <p><strong>Service:</strong> {booking.service}</p>
                      <p><strong>Location:</strong> {booking.location}</p>
                      {booking.preferred_date && <p><strong>Date:</strong> {booking.preferred_date} {booking.preferred_time && `at ${booking.preferred_time}`}</p>}
                      {booking.problem_description && <p><strong>Issue:</strong> {booking.problem_description}</p>}
                      <p className="text-xs text-muted-foreground">Created: {new Date(booking.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => updateStatus(booking.id, "in_progress")}>
                      In Progress
                    </Button>
                    <Button size="sm" variant="default" onClick={() => updateStatus(booking.id, "completed")}>
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
