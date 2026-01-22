import {
  AudioWaveformIcon,
  BookOpenIcon,
  BotIcon,
  BriefcaseIcon,
  BuildingIcon,
  CommandIcon,
  FrameIcon,
  GalleryVerticalEndIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  MapIcon,
  MegaphoneIcon,
  PieChartIcon,
  RocketIcon,
  Settings2Icon,
  SquareTerminalIcon,
  Target,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/core/components/ui/sidebar";

import SidebarMain from "./sidebar-main";
import SidebarProjects from "./sidebar-projects";
import TeamSwitcher from "./sidebar-team-switcher";
import SidebarUser from "./sidebar-user";

import { useTranslation } from "react-i18next";

export default function DashboardSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
  };
}) {
  const { t } = useTranslation();
  
  const data = {
    teams: [
      {
        name: t("users.sidebar.teams.sales_forge"),
        logo: BuildingIcon,
        plan: "Enterprise",
      },
      {
        name: t("users.sidebar.teams.techco"),
        logo: BriefcaseIcon,
        plan: "Startup",
      },
      {
        name: t("users.sidebar.teams.growth_mate"),
        logo: RocketIcon,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: t("users.sidebar.nav.dashboard"),
        url: "#",
        icon: LayoutDashboardIcon,
        isActive: true,
        items: [
          {
            title: t("users.sidebar.nav.overview"),
            url: "/dashboard",
          },
          {
            title: t("users.sidebar.nav.health_checkup"),
            url: "/dashboard/health",
          },
          {
            title: t("users.sidebar.nav.analytics"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.reports"),
            url: "#",
          },
        ],
      },
      {
        title: t("users.sidebar.nav.customers"),
        url: "#",
        icon: UsersIcon,
        items: [
          {
            title: t("users.sidebar.nav.contacts"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.companies"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.deals"),
            url: "#",
          },
        ],
      },
      {
        title: t("users.sidebar.nav.sales"),
        url: "#",
        icon: LineChartIcon,
        items: [
          {
            title: t("users.sidebar.nav.pipeline"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.opportunities"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.quotes"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.invoices"),
            url: "#",
          },
        ],
      },
      {
        title: t("users.sidebar.nav.settings"),
        url: "#",
        icon: Settings2Icon,
        items: [
          {
            title: t("users.sidebar.nav.workspace"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.team"),
            url: "#",
          },
          {
            title: t("users.sidebar.nav.integrations"),
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: t("users.sidebar.projects.sales_team"),
        url: "#",
        icon: Target,
      },
      {
        name: t("users.sidebar.projects.customer_success"),
        url: "#",
        icon: HeartHandshakeIcon,
      },
      {
        name: t("users.sidebar.projects.marketing"),
        url: "#",
        icon: MegaphoneIcon,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={data.navMain} />
        <SidebarProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          user={{
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
