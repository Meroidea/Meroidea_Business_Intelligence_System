"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { Poppins } from "next/font/google"; // <-- Imported Poppins
import { BorderBeam } from "./border-beam";
import { Button } from "./button";
import { Input } from "./input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { 
  Search, Bell, Users, LayoutDashboard, 
  Activity, XCircle, Settings, 
  Key, Webhook, FileText, ChevronRight, BarChart, LineChart, PieChart, Database, Cpu
} from "lucide-react";

// Initialize Poppins Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Cinematic Animation Variants
const dashboardVariants: Variants = {
  hidden: { filter: "blur(12px)", opacity: 0.9 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export function TabletDashboard() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-[#0A0A0A]" />;

  const isDark = resolvedTheme === "dark";

  return (
    // Base wrapper applies Poppins font and scales down text to a smaller baseline (13px)
    <div className={`relative flex h-full w-full bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-white overflow-hidden rounded-2xl transition-colors duration-500 border border-gray-200 dark:border-white/10 ${poppins.className} text-[13px]`}>
      <BorderBeam size={400} duration={12} delay={9} colorFrom={isDark ? "#818cf8" : "#6366f1"} colorTo={isDark ? "#2dd4bf" : "#0ea5e9"} />

      {/* This motion.div acts as the cinematic orchestrator. 
        It stays blurred until it scrolls 30% into the viewport, then cascades the animations.
      */}
      <motion.div 
        variants={dashboardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} 
        className="flex h-full w-full"
      >
        
        {/* SIDEBAR */}
        <motion.div variants={itemVariants} className="hidden md:flex flex-col w-56 lg:w-64 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] z-10 transition-colors">
          <div className="h-14 flex items-center px-5 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-slate-900 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-sm">M</span>
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Meroidea Technology</p>
                <p className="text-[9px] text-gray-500">Intelligent Automation</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-5">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">General</p>
              <div className="space-y-1">
                <SidebarItem icon={<LayoutDashboard size={14} />} label="Dashboard" active />
                <SidebarItem icon={<Activity size={14} />} label="Tasks" />
                <SidebarItem icon={<Users size={14} />} label="Users" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">Pages</p>
              <div className="space-y-1">
                <SidebarItem icon={<Key size={14} />} label="Auth" hasChildren />
                <SidebarItem icon={<XCircle size={14} />} label="Errors" hasChildren />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">Other</p>
              <div className="space-y-1">
                <SidebarItem icon={<Settings size={14} />} label="Settings" hasChildren />
                <SidebarItem icon={<Webhook size={14} />} label="Developers" hasChildren />
                <SidebarItem icon={<FileText size={14} />} label="Events/Logs" />
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-white/10 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium truncate">Sujan Darji</p>
              <p className="text-[10px] text-gray-500 truncate">sujan@meroidea.com</p>
            </div>
          </div>
        </motion.div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full max-w-full">
          
          {/* Top Header */}
          <motion.div variants={itemVariants} className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#111]/50 backdrop-blur-md">
            <div className="flex items-center gap-3 w-full max-w-sm">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <Input placeholder="Search..." className="h-7 border-none bg-transparent shadow-none focus-visible:ring-0 px-0 text-xs w-full" />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="ghost" size="icon" className="rounded-full w-7 h-7"><Bell className="w-3.5 h-3.5" /></Button>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          </motion.div>

          <Tabs defaultValue="insights" className="flex-1 flex flex-col overflow-hidden w-full max-w-full">
            {/* TABS LIST */}
            <motion.div variants={itemVariants} className="flex justify-start md:justify-center pt-3 pb-2 z-20 px-4 w-full overflow-x-auto no-scrollbar">
              <TabsList className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm p-1 h-auto rounded-lg inline-flex flex-nowrap w-max min-w-min">
                <TabsTrigger value="insights" className="flex gap-2 py-1.5 px-3 md:px-4 text-xs whitespace-nowrap data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222]"><BarChart size={14} /> <span className="hidden sm:inline">Insights</span></TabsTrigger>
                <TabsTrigger value="metrics" className="flex gap-2 py-1.5 px-3 md:px-4 text-xs whitespace-nowrap data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222]"><LineChart size={14} /> <span className="hidden sm:inline">Metrics</span></TabsTrigger>
                <TabsTrigger value="trends" className="flex gap-2 py-1.5 px-3 md:px-4 text-xs whitespace-nowrap data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222]"><PieChart size={14} /> <span className="hidden sm:inline">Trends</span></TabsTrigger>
                <TabsTrigger value="sources" className="flex gap-2 py-1.5 px-3 md:px-4 text-xs whitespace-nowrap data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222]"><Database size={14} /> <span className="hidden sm:inline">Sources</span></TabsTrigger>
                <TabsTrigger value="models" className="flex gap-2 py-1.5 px-3 md:px-4 text-xs whitespace-nowrap data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-[#222]"><Cpu size={14} /> <span className="hidden sm:inline">Models</span></TabsTrigger>
              </TabsList>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 md:p-6 pt-2 pb-20 w-full">
              
              {/* 1. INSIGHTS TAB */}
              <TabsContent value="insights" className="m-0 space-y-5 animate-in fade-in duration-500 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <p className="text-xs text-gray-500">Overview of your activity</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Ask AI</Button>
                    <Button size="sm" className="h-7 text-xs bg-slate-900 dark:bg-white text-white dark:text-black">Download</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <MiniCard title="New Subscriptions" value="4,682" trend="+15.54%" isUp chartType="line" />
                  <MiniCard title="New Orders" value="1,226" trend="-40.2%" isUp={false} chartType="line" />
                  <MiniCard title="Avg Order Revenue" value="1,080" trend="+10.8%" isUp chartType="line" />
                  <Card className="bg-white dark:bg-[#111] shadow-sm">
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-500">Total Revenue</p>
                      <p className="text-lg font-bold">$15,231.89</p>
                      <div className="h-6 mt-2 w-full"><Sparkline color="#818cf8" /></div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                  <Card className="lg:col-span-2 bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                    <CardHeader className="py-3"><CardTitle className="text-sm">Sale Activity - Monthly</CardTitle></CardHeader>
                    <CardContent className="py-2"><div className="h-40 w-full"><AreaChart /></div></CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                    <CardHeader className="py-3"><CardTitle className="text-sm">Subscriptions</CardTitle></CardHeader>
                    <CardContent className="py-2"><div className="h-40 w-full"><BarGroup /></div></CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                  <Card className="lg:col-span-2 bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                    <CardHeader className="py-3"><CardTitle className="text-sm">Payments</CardTitle></CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-3">
                        <TableRow status="Success" email="ken99@yahoo.com" amount="$316.00" />
                        <TableRow status="Success" email="abe45@gmail.com" amount="$242.00" />
                        <TableRow status="Processing" email="monserrat44@gmail.com" amount="$837.00" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-[#111] shadow-sm w-full">
                    <CardHeader className="py-3"><CardTitle className="text-sm">Team Members</CardTitle></CardHeader>
                    <CardContent className="py-2">
                      <div className="space-y-3">
                        <TeamRow name="Anthony Allan" role="Editor" />
                        <TeamRow name="Saurav K." role="Manager" />
                        <TeamRow name="Tony Stark" role="Developer" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 2. METRICS TAB */}
              <TabsContent value="metrics" className="m-0 space-y-5 animate-in fade-in duration-500 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <p className="text-xs text-gray-500">Here're the details of your analysis.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Filter By</Button>
                    <Button size="sm" className="h-7 text-xs">Export</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StatCard title="Total Sales" value="$4,523,189" trend="+10.2%" subText="+1,454.89 today" color="text-indigo-500" />
                    <StatCard title="Total Orders" value="12,545" trend="+20.2%" subText="+1,589 today" color="text-emerald-500" />
                    <StatCard title="Total Visitors" value="8,344" trend="-14.2%" subText="-89 today" isUp={false} color="text-indigo-500" />
                    <StatCard title="Refunded" value="3,148" trend="+12.6%" subText="+48 today" color="text-rose-500" />
                  </div>
                  <Card className="bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                    <CardHeader className="py-3"><CardTitle className="text-sm">Revenue</CardTitle><p className="text-lg font-bold">$14,324</p></CardHeader>
                    <CardContent className="py-2"><div className="h-32"><DoubleBarChart /></div></CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                  <Card className="lg:col-span-2 bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                    <CardHeader className="py-3"><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
                    <CardContent className="overflow-x-auto py-2">
                      <table className="w-full text-xs min-w-[500px]">
                        <thead><tr className="text-left text-gray-500 border-b dark:border-white/10"><th className="pb-2">User</th><th className="pb-2">Status</th><th className="pb-2">ID</th><th className="pb-2 text-right">Amount</th></tr></thead>
                        <tbody>
                          <ActivityRow user="Ruben" status="Suspended" id="#329341" amount="$345.35" />
                          <ActivityRow user="Anais" status="New" id="#329342" amount="$21.91" />
                          <ActivityRow user="Greta" status="Suspended" id="#329343" amount="$6.63" />
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-[#111] shadow-sm flex flex-col items-center justify-center py-5 w-full">
                    <CardTitle className="text-xs mb-3">Total Visitor - Chart</CardTitle>
                    <DonutChart value="1,125" label="Visitors" />
                  </Card>
                </div>
              </TabsContent>

              {/* 3. TRENDS TAB */}
              <TabsContent value="trends" className="m-0 space-y-5 animate-in fade-in duration-500 w-full">
                 <div>
                    <h2 className="text-xl font-bold">Overview Dashboard</h2>
                    <p className="text-xs text-gray-500">Here, take a look at your sales.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <Card className="lg:col-span-2 bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3">
                        <div><CardTitle className="text-sm">Budgets - Consolidated</CardTitle><p className="text-[10px] text-gray-500">Showing total budgets</p></div>
                        <div className="flex gap-3 text-right">
                          <div><p className="text-[10px] text-gray-500">Desktop</p><p className="font-bold text-sm">24,828</p></div>
                          <div><p className="text-[10px] text-gray-500">Mobile</p><p className="font-bold text-sm">25,010</p></div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2"><div className="h-40 flex items-end gap-[2px] w-full"><DenseBarChart /></div></CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-[#111] shadow-sm flex flex-col items-center justify-center py-5 w-full">
                      <CardTitle className="text-xs mb-3">Total Visitors Chart</CardTitle>
                      <DonutChart value="1,260" label="Visitors" />
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className="space-y-4">
                      <DataCard title="Session" value="6,132" change="%80" />
                      <DataCard title="Average" value="46" change="%22" />
                    </div>
                    <div className="space-y-4">
                      <DataCard title="Page Views" value="11,236" change="%40" isDown />
                      <DataCard title="Bounce Rate" value="6,132" change="%30" isDown />
                    </div>
                    <Card className="bg-white dark:bg-[#111] shadow-sm flex items-center justify-center p-4 w-full overflow-hidden"><RadarPlaceholder /></Card>
                    <Card className="bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden"><CardHeader className="py-3"><CardTitle className="text-xs">Overview</CardTitle></CardHeader><CardContent className="py-2"><StackedBarChart /></CardContent></Card>
                  </div>
              </TabsContent>

              {/* 4. SOURCES TAB */}
              <TabsContent value="sources" className="m-0 space-y-5 animate-in fade-in duration-500 w-full">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-bold">User List</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">Invite User</Button>
                      <Button size="sm" className="h-7 text-xs">Add User</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                    <Card className="bg-white dark:bg-[#111] shadow-sm p-3"><p className="text-xs font-medium">Total Users</p><p className="text-lg font-bold mt-1">12,000</p></Card>
                    <Card className="bg-white dark:bg-[#111] shadow-sm p-3"><p className="text-xs font-medium">New Users</p><p className="text-lg font-bold mt-1">+350</p></Card>
                    <Card className="bg-white dark:bg-[#111] shadow-sm p-3"><p className="text-xs font-medium">Pending</p><p className="text-lg font-bold mt-1">42</p></Card>
                    <Card className="bg-white dark:bg-[#111] shadow-sm p-3"><p className="text-xs font-medium">Active Users</p><p className="text-lg font-bold mt-1">7800</p></Card>
                  </div>

                  <Card className="bg-white dark:bg-[#111] shadow-sm w-full overflow-hidden">
                    <CardContent className="p-0 overflow-x-auto w-full">
                      <table className="w-full text-xs min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                          <tr className="text-left text-gray-500"><th className="p-3 font-medium">Name</th><th className="p-3 font-medium">Email</th><th className="p-3 font-medium">Date</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Role</th></tr>
                        </thead>
                        <tbody>
                          <UserRow name="Jarrett Huels" email="jarrett@gmail.com" date="16 Sep, 2024" status="Invited" role="Cashier" />
                          <UserRow name="Baylee Ward" email="baylee.w@hotmail.com" date="08 Feb, 2025" status="Suspended" role="Manager" />
                          <UserRow name="Anibal Rempel" email="anibal@hotmail.com" date="29 Aug, 2024" status="Active" role="Admin" />
                          <UserRow name="Afton Zemlak" email="afton@hotmail.com" date="16 Jul, 2024" status="Invited" role="Manager" />
                          <UserRow name="Makayla Krajcik" email="makayla@yahoo.com" date="01 May, 2024" status="Inactive" role="Manager" />
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
              </TabsContent>

              {/* 5. MODELS TAB */}
              <TabsContent value="models" className="m-0 space-y-5 animate-in fade-in duration-500 w-full">
                  <div>
                    <h2 className="text-xl font-bold">Web Overview</h2>
                    <p className="text-xs text-gray-500">Build, manage, and optimize developer workflows.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <div className="space-y-1 w-full">
                        <h3 className="text-sm font-semibold">API requests</h3>
                        <div className="h-32 w-full"><Sparkline color="#2dd4bf" strokeWidth={2} /></div>
                      </div>
                      <div className="space-y-1 w-full">
                        <h3 className="text-sm font-semibold">API response time</h3>
                        <div className="h-32 w-full"><CurveChart /></div>
                      </div>
                    </div>
                    <div className="w-full">
                      <h3 className="text-sm font-semibold mb-3">Recent activities</h3>
                      <div className="space-y-3">
                        <TimelineRow title="Update user auth" time="2 hours ago" badge="open" />
                        <TimelineRow title="Fix responsive layout" time="5 hours ago" badge="closed" color="bg-emerald-500" />
                        <TimelineRow title="Refactor API endpoints" time="1 day ago" badge="merged" color="bg-purple-500" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold">Total visitors</h3>
                      <div className="flex gap-3 text-right"><div className="text-lg font-bold">24,828</div><div className="text-lg font-bold text-gray-500 hidden sm:block">25,010</div></div>
                    </div>
                    <div className="h-40 w-full"><AreaChart dual /></div>
                  </div>
              </TabsContent>

            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

// --- MICRO COMPONENTS FOR REUSABILITY & CHARTS ---

function SidebarItem({ icon, label, active, hasChildren }: any) {
  return (
    <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${active ? "bg-gray-100 dark:bg-white/10 text-slate-900 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}`}>
      <div className="flex items-center gap-2.5">{icon}<span className="text-[11px] font-medium">{label}</span></div>
      {hasChildren && <ChevronRight size={12} className="text-gray-400" />}
    </div>
  );
}

function MiniCard({ title, value, trend, isUp = true }: any) {
  return (
    <Card className="bg-white dark:bg-[#111] shadow-sm p-3 w-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] text-gray-500">{title}</p>
          <p className="text-lg font-bold mt-0.5">{value}</p>
        </div>
        <div className={`text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</div>
      </div>
    </Card>
  );
}

function StatCard({ title, value, trend, subText, isUp = true, color }: any) {
  return (
    <Card className="bg-white dark:bg-[#111] shadow-sm p-3 w-full">
      <div className="flex items-center gap-1.5 mb-1.5"><div className={`w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center ${color}`}><Activity size={10} /></div><p className="text-[11px] font-medium">{title}</p></div>
      <p className="text-lg font-bold">{value}</p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className={`text-[10px] font-medium ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
        <span className="text-[10px] text-gray-500">{subText}</span>
      </div>
    </Card>
  );
}

function DataCard({ title, value, change, isDown }: any) {
  return (
    <Card className="bg-white dark:bg-[#111] shadow-sm p-3 flex flex-col justify-between h-full w-full">
      <p className="text-[11px] text-gray-500">{title}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
      <p className={`text-[10px] mt-0.5 ${isDown ? 'text-rose-500' : 'text-emerald-500'}`}>{change}</p>
    </Card>
  );
}

// --- CSS/SVG SIMULATED CHARTS ---

function Sparkline({ color = "#10b981", strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M0,25 Q10,5 20,20 T40,15 T60,25 T80,10 T100,20" fill="none" stroke={color} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function CurveChart() {
  return (
    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M0,25 Q20,45 40,25 T80,20 T100,30" fill="none" stroke="#f43f5e" strokeWidth={2} vectorEffect="non-scaling-stroke" />
      <circle cx="0" cy="25" r="2" fill="#f43f5e" />
      <circle cx="40" cy="25" r="2" fill="#f43f5e" />
      <circle cx="80" cy="20" r="2" fill="#f43f5e" />
    </svg>
  );
}

function AreaChart({ dual = false }) {
  return (
    <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.5" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" /><stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" /></linearGradient>
      </defs>
      <motion.path initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        d="M0,40 Q10,20 20,35 T40,15 T60,30 T80,10 T100,25 L100,50 L0,50 Z" fill="url(#grad1)" />
      <path d="M0,40 Q10,20 20,35 T40,15 T60,30 T80,10 T100,25" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      
      {dual && (
        <>
          <motion.path initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            d="M0,45 Q15,35 30,40 T60,25 T90,35 T100,20 L100,50 L0,50 Z" fill="url(#grad2)" />
          <path d="M0,45 Q15,35 30,40 T60,25 T90,35 T100,20" fill="none" stroke="#0ea5e9" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </>
      )}
    </svg>
  );
}

function BarGroup() {
  const bars = [40, 70, 45, 90, 65, 80, 50, 100, 55, 75, 60, 85];
  return (
    <div className="w-full h-full flex items-end justify-between gap-[2px] sm:gap-1 pt-3">
      {bars.map((h, i) => (
        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: i * 0.05 }}
          className={`w-full rounded-t-sm ${i % 2 === 0 ? 'bg-rose-400' : 'bg-emerald-400'}`} />
      ))}
    </div>
  );
}

function DenseBarChart() {
  const bars = Array.from({ length: 40 }, () => Math.floor(Math.random() * 60) + 20);
  return (
    <>
      {bars.map((h, i) => (
        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: i * 0.02 }}
          className="w-full bg-rose-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity min-w-[2px]" />
      ))}
    </>
  );
}

function DoubleBarChart() {
  const pairs = [[60, 40], [80, 50], [40, 70], [90, 60], [50, 80], [70, 50]];
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 sm:gap-4 pt-3">
      {pairs.map((pair, i) => (
        <div key={i} className="flex gap-[2px] sm:gap-1 h-full items-end w-full">
          <motion.div initial={{ height: 0 }} animate={{ height: `${pair[0]}%` }} transition={{ duration: 0.5, delay: i * 0.1 }} className="w-full bg-rose-400 rounded-t-sm" />
          <motion.div initial={{ height: 0 }} animate={{ height: `${pair[1]}%` }} transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }} className="w-full bg-emerald-400 rounded-t-sm" />
        </div>
      ))}
    </div>
  );
}

function StackedBarChart() {
  const stacks = [[40, 30], [60, 20], [30, 50], [70, 10], [50, 40]];
  return (
    <div className="h-28 w-full flex items-end justify-between gap-1.5">
      {stacks.map((stack, i) => (
        <div key={i} className="w-full h-full flex flex-col justify-end gap-0.5">
          <motion.div initial={{ height: 0 }} animate={{ height: `${stack[1]}%` }} transition={{ duration: 0.5, delay: i * 0.1 }} className="w-full bg-emerald-400 rounded-sm" />
          <motion.div initial={{ height: 0 }} animate={{ height: `${stack[0]}%` }} transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }} className="w-full bg-rose-400 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

function DonutChart({ value, label }: any) {
  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="15" className="text-gray-100 dark:text-white/5" />
        <motion.circle initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: "180 251" }} transition={{ duration: 1.5, ease: "easeOut" }}
          cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="15" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-[9px] text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function RadarPlaceholder() {
  return (
    <div className="relative w-28 h-28 flex-shrink-0 border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center">
      <div className="w-20 h-20 border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center">
         <div className="w-12 h-12 border border-gray-200 dark:border-white/10 rounded-full" />
      </div>
      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-emerald-500/20 stroke-emerald-500 stroke-2">
        <polygon points="50,10 90,40 70,90 30,90 10,40" />
      </motion.svg>
    </div>
  );
}

// --- TABLE & LIST ROWS ---

function TableRow({ status, email, amount }: any) {
  const isSuccess = status === "Success";
  return (
    <div className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 dark:border-white/5 last:border-0 w-full">
      <div className="flex items-center gap-1.5 w-1/4 min-w-[90px]">
        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isSuccess ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        <span>{status}</span>
      </div>
      <div className="w-1/2 text-gray-500 truncate px-2">{email}</div>
      <div className="w-1/4 text-right font-medium">{amount}</div>
    </div>
  );
}

function TeamRow({ name, role }: any) {
  return (
    <div className="flex items-center justify-between text-xs w-full">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full flex-shrink-0 bg-gradient-to-br from-indigo-400 to-purple-400" />
        <span className="font-medium truncate">{name}</span>
      </div>
      <span className="text-gray-500 whitespace-nowrap ml-2">{role}</span>
    </div>
  );
}

function ActivityRow({ user, status, id, amount }: any) {
  const color = status === "Suspended" ? "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400" : "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400";
  return (
    <tr className="border-b dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
      <td className="py-2 font-medium flex items-center gap-2"><div className="w-5 h-5 rounded-full flex-shrink-0 bg-gray-200 dark:bg-white/10 flex items-center justify-center text-[10px]">{user.charAt(0)}</div>{user}</td>
      <td className="py-2"><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase whitespace-nowrap ${color}`}>{status}</span></td>
      <td className="py-2 text-gray-500 whitespace-nowrap">{id}</td>
      <td className="py-2 text-right font-medium">{amount}</td>
    </tr>
  );
}

function UserRow({ name, email, date, status, role }: any) {
  let badgeColor = "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400";
  if (status === "Active") badgeColor = "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
  if (status === "Suspended") badgeColor = "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400";
  if (status === "Invited") badgeColor = "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";

  return (
    <tr className="border-b dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
      <td className="p-3 font-medium whitespace-nowrap">{name}</td>
      <td className="p-3 text-gray-500 whitespace-nowrap">{email}</td>
      <td className="p-3 text-gray-500 whitespace-nowrap">{date}</td>
      <td className="p-3"><span className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${badgeColor}`}>{status}</span></td>
      <td className="p-3 text-gray-500 whitespace-nowrap">{role}</td>
    </tr>
  );
}

function TimelineRow({ title, time, badge, color = "bg-blue-500" }: any) {
  return (
    <div className="flex gap-3 relative w-full">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full ${color} mt-1`} />
        <div className="w-[1px] h-full bg-gray-200 dark:bg-white/10 my-1" />
      </div>
      <div className="pb-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-start gap-2">
          <p className="font-medium text-xs truncate">{title}</p>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full text-white whitespace-nowrap flex-shrink-0 ${color}`}>{badge}</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
}