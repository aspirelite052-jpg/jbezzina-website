// src/app/admin/page.tsx
// Admin dashboard — overview of orders, revenue, and quick actions
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import {
  ShoppingBag, DollarSign, Clock, CheckCircle,
  Package, Users, ArrowRight, Loader2, LogOut
} from "lucide-react";

type Stats = {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalProducts: number;
  totalCustomers: number;
};

type RecentOrder = {
  id: string;
  created_at: string;
  total: number;
  status: string;
  payment_status: string;
  profiles: { full_name: string; email: string } | null;
};

const STATUS_COLOURS: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-800",
  paid:       "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped:    "bg-indigo-100 text-indigo-800",
  delivered:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      // Auth check
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }

      const { data: profile } = await supabase
        .from("profiles").select("is_admin, full_name").eq("id", user.id).single();
      if (!profile?.is_admin) { router.push("/"); return; }
      setAdminName(profile.full_name || user.email || "Admin");

      // Fetch stats
      const [orders, products, customers] = await Promise.all([
        supabase.from("orders").select("id, total, status, payment_status"),
        supabase.from("products").select("id", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" }).eq("is_admin", false),
      ]);

      const allOrders = orders.data ?? [];
      setStats({
        totalOrders:    allOrders.length,
        totalRevenue:   allOrders.filter(o => o.payment_status === "paid").reduce((s, o) => s + Number(o.total), 0),
        pendingOrders:  allOrders.filter(o => o.status === "pending").length,
        deliveredOrders: allOrders.filter(o => o.status === "delivered").length,
        totalProducts:  products.count ?? 0,
        totalCustomers: customers.count ?? 0,
      });

      // Recent orders
      const { data: recent } = await supabase
        .from("orders")
        .select("id, created_at, total, status, payment_status, profiles(full_name, email)")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentOrders((recent as unknown as RecentOrder[]) ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="border-b border-border bg-primary px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-heading text-lg font-bold text-white">Admin Dashboard</h1>
            <p className="text-xs text-white/60">J. Bezzina & Co — {adminName}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-white/60 hover:text-white">View site →</Link>
            <button onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
          {[
            { label: "Total Orders",    value: stats?.totalOrders,    icon: ShoppingBag, color: "text-blue-600",   bg: "bg-blue-50" },
            { label: "Revenue (€)",     value: `€${(stats?.totalRevenue ?? 0).toFixed(2)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
            { label: "Pending",         value: stats?.pendingOrders,  icon: Clock,       color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Delivered",       value: stats?.deliveredOrders,icon: CheckCircle, color: "text-green-600",  bg: "bg-green-50" },
            { label: "Products",        value: stats?.totalProducts,  icon: Package,     color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Customers",       value: stats?.totalCustomers, icon: Users,       color: "text-indigo-600", bg: "bg-indigo-50" },
          ].map((s) => (
            <div key={s.label} className="rounded-sm border border-border bg-surface p-4 shadow-card">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-sm ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-primary">{s.value ?? 0}</p>
              <p className="text-xs text-secondary">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Link href="/admin/products" className="flex items-center justify-between rounded-sm border border-border bg-surface p-5 shadow-card hover:border-accent transition-colors">
            <div>
              <p className="font-heading font-bold text-primary">Manage Products</p>
              <p className="text-xs text-secondary mt-1">Add, edit, or remove products</p>
            </div>
            <ArrowRight className="h-5 w-5 text-accent" />
          </Link>
          <Link href="/admin/orders" className="flex items-center justify-between rounded-sm border border-border bg-surface p-5 shadow-card hover:border-accent transition-colors">
            <div>
              <p className="font-heading font-bold text-primary">View Orders</p>
              <p className="text-xs text-secondary mt-1">Update order & delivery status</p>
            </div>
            <ArrowRight className="h-5 w-5 text-accent" />
          </Link>
          <Link href="/admin/customers" className="flex items-center justify-between rounded-sm border border-border bg-surface p-5 shadow-card hover:border-accent transition-colors">
            <div>
              <p className="font-heading font-bold text-primary">Customers</p>
              <p className="text-xs text-secondary mt-1">View registered customers</p>
            </div>
            <ArrowRight className="h-5 w-5 text-accent" />
          </Link>
        </div>

        {/* Recent orders */}
        <div className="rounded-sm border border-border bg-surface shadow-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-heading font-bold text-primary">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-medium text-accent hover:underline">
              View all →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-secondary">
              No orders yet. Orders will appear here once customers start buying.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary">Date</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-background transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-secondary">{order.id.slice(0, 8)}…</td>
                      <td className="px-6 py-3">
                        <p className="font-medium text-primary">{order.profiles?.full_name ?? "—"}</p>
                        <p className="text-xs text-secondary">{order.profiles?.email ?? "—"}</p>
                      </td>
                      <td className="px-6 py-3 font-semibold text-primary">€{Number(order.total).toFixed(2)}</td>
                      <td className="px-6 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLOURS[order.status] ?? "bg-gray-100 text-gray-800"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-xs text-secondary">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="text-xs font-medium text-accent hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
