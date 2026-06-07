import { useSelector } from "react-redux";
import { IconUser, IconUsers, IconTrendingUp, IconCrown } from "@tabler/icons-react";

const GRADIENTS = [
  "from-teal-500/20 via-teal-500/5 to-transparent",
  "from-orange-400/20 via-orange-400/5 to-transparent",
  "from-violet-500/20 via-violet-500/5 to-transparent",
  "from-rose-500/20 via-rose-500/5 to-transparent",
];

const ICON_COLORS = [
  "bg-teal-500 text-white",
  "bg-orange-400 text-white",
  "bg-violet-500 text-white",
  "bg-rose-500 text-white",
];

export default function DashboardCards({ customers = [] }) {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const totalCustomers = customers.length;
  const totalLeads = customers.reduce((sum, c) => sum + (c.leadsCount || 0), 0);
  const avgLeads = totalCustomers > 0 ? (totalLeads / totalCustomers).toFixed(1) : 0;

  const ownerStats = customers.reduce((map, c) => {
    if (!c.ownerId) return map;
    let ownerId, name, email;
    if (typeof c.ownerId === "object") {
      ownerId = c.ownerId._id;
      name = c.ownerId.name;
      email = c.ownerId.email;
    } else {
      ownerId = c.ownerId;
      name = ownerId;
      email = "";
    }
    if (!map[ownerId]) map[ownerId] = { name, email, leads: 0 };
    map[ownerId].leads += c.leadsCount || 0;
    return map;
  }, {});

  const topOwner = Object.values(ownerStats).sort((a, b) => b.leads - a.leads)[0] || null;

  const myCustomers = customers.filter((c) => {
    if (!c.ownerId) return false;
    if (typeof c.ownerId === "object") return c.ownerId._id === user?._id;
    return c.ownerId === user?._id;
  });

  const myLeads = myCustomers.reduce((sum, c) => sum + (c.leadsCount || 0), 0);

  const cards = [
    { title: "Customers", value: totalCustomers, sub: "Total accounts", icon: IconUsers },
    { title: "Leads", value: totalLeads, sub: "Pipeline total", icon: IconUser },
    { title: "Avg / Customer", value: avgLeads, sub: "Engagement rate", icon: IconTrendingUp },
    isAdmin
      ? { title: "Top Performer", value: topOwner?.name || "—", sub: topOwner ? `${topOwner.leads} leads` : "No data", icon: IconCrown }
      : { title: "My Portfolio", value: myCustomers.length, sub: `${myLeads} leads total`, icon: IconTrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className={`bento-card bg-gradient-to-br ${GRADIENTS[i]}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {card.title}
                </p>
                <p className="font-display mt-2 text-4xl font-bold tabular-nums tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
              </div>
              <div className={`flex size-11 items-center justify-center rounded-2xl shadow-lg ${ICON_COLORS[i]}`}>
                <Icon className="size-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
