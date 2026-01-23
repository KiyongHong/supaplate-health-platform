import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

import { cn } from "~/core/lib/utils";

export function AdminSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/posts",
      label: "Posts",
      icon: FileText,
      exact: false,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: Settings,
      exact: false,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-stone-200 bg-stone-50 text-stone-900">
      <div className="flex h-16 items-center border-b border-stone-200 px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-tight">
            Supaplate
          </span>
          <span className="rounded bg-stone-200 px-1.5 py-0.5 text-xs font-semibold text-stone-600">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const isActive = link.exact
            ? location.pathname === link.href
            : location.pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-stone-200 text-stone-900"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-200 p-4">
        <form action="/auth/logout" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
