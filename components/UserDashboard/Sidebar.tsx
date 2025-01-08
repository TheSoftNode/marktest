import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Book, FileText, Gift, GitGraphIcon, Home, LogOut, Menu, Settings, User, X } from "lucide-react";
import { ChevronDown, ChevronRight, Shield, Users, CreditCard, BarChart2, PieChart } from "lucide-react";
import { useGetMeQuery, useLogoutMutation } from '@/src/redux/features/auth/authApi';
import { UserDisplay } from './UserDisplay';
import { useRouter } from 'next/navigation';

interface SidebarLinkProps
{
  icon: React.ReactNode;
  label: string;
  value: string;
  isOpen: boolean;
  isActive: boolean;
  isMobile?: boolean;
  hasChildren?: boolean;
  isExpanded?: boolean;
  onClick: (value: string) => void;
  onExpand?: () => void;
}

interface SidebarProps
{
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

interface NavItem
{
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ExpandableNavItem extends NavItem
{
  children?: NavItem[];
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  value,
  isOpen,
  isActive,
  isMobile = false,
  hasChildren = false,
  isExpanded = false,
  onClick,
  onExpand
}) => (
  <button
    onClick={() => hasChildren ? onExpand?.() : onClick(value)}
    className={`w-full flex items-center px-4 py-3 transition-colors duration-200
      ${isActive
        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
        : 'text-gray-700 hover:bg-gray-100'
      }`}
  >
    <span className="h-5 w-5 flex items-center justify-center">
      {icon}
    </span>
    {(isOpen || isMobile) && (
      <>
        <span className="ml-3 text-sm font-medium truncate flex-1 text-left">
          {label}
        </span>

        {hasChildren && (
          <span className="ml-auto">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </>
    )}
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  activeTab,
  onTabChange
}) =>
{
  const [isMobile, setIsMobile] = useState(false);
  const [isManagementExpanded, setIsManagementExpanded] = useState(false);
  const [Logout] = useLogoutMutation();
  const { data: userData } = useGetMeQuery();
  const router = useRouter();

  const isAdmin = userData?.user?.role === 'admin';

  const handleLogout = () =>
  {
    Logout();
    router.push('/login');
  }

  useEffect(() =>
  {
    const checkMobile = () =>
    {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Management section items
  const managementItems: NavItem[] = [
    { icon: <Users className="h-5 w-5" />, label: "Users", value: "manage-users" },
    { icon: <Gift className="h-5 w-5" />, label: "Coupons", value: "manage-coupons" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Credits", value: "manage-credits" },
    { icon: <BarChart2 className="h-5 w-5" />, label: "Analysis", value: "manage-analysis" },
    { icon: <PieChart className="h-5 w-5" />, label: "Usage", value: "manage-usage" },
  ];

  const navigationItems: ExpandableNavItem[] = [
    { icon: <Home className="h-5 w-5" />, label: "Overview", value: "overview" },
    { icon: <GitGraphIcon className="h-5 w-5" />, label: "Analyse", value: "analyse" },
    { icon: <FileText className="h-5 w-5" />, label: "Activity", value: "activity" },
    { icon: <Gift className="h-5 w-5" />, label: "Credits", value: "credits" },
    { icon: <User className="h-5 w-5" />, label: "Usage", value: "usage" },
    { icon: <Book className="h-5 w-5" />, label: "Documentation", value: "docs" },
    { icon: <Gift className="h-5 w-5" />, label: "Coupons", value: "coupons" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", value: "settings" }
  ];

  if (isAdmin)
  {
    navigationItems.splice(1, 0, {
      icon: <Shield className="h-5 w-5" />,
      label: "Management",
      value: "management",
      children: managementItems
    });
  }

  const handleTabChange = (value: string) =>
  {
    onTabChange(value);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 
        transition-all duration-300 z-40 ${isMobile ? 'w-64' : (isOpen ? 'w-64' : 'w-20')}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-100">
        <div
          className={`font-bold text-xl text-gray-800 transition-opacity duration-200
            ${(isOpen || isMobile) ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
        >
          <UserDisplay name={userData?.user?.name} />

        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-gray-100"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ?
              <X className="h-4 w-4 text-gray-600" /> :
              <Menu className="h-4 w-4 text-gray-600" />
            }
          </Button>
        )}
      </div>

      <nav className="flex flex-col h-[calc(100%-5rem)] py-4">
        <div className="flex-1">
          {navigationItems.map((item) => (
            <React.Fragment key={item.value}>
              <SidebarLink
                icon={item.icon}
                label={item.label}
                value={item.value}
                isOpen={isOpen}
                isActive={activeTab === item.value ||
                  (item.children?.some(child => activeTab === child.value) ?? false)}
                isMobile={isMobile}
                hasChildren={!!item.children}
                isExpanded={isManagementExpanded}
                onClick={handleTabChange}
                onExpand={() => setIsManagementExpanded(!isManagementExpanded)}
              />
              {item.children && isManagementExpanded && (isOpen || isMobile) && (
                <div className="pl-4 bg-gray-50">
                  {item.children.map((child) => (
                    <SidebarLink
                      key={child.value}
                      icon={child.icon}
                      label={child.label}
                      value={child.value}
                      isOpen={isOpen}
                      isActive={activeTab === child.value}
                      isMobile={isMobile}
                      onClick={handleTabChange}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="h-5 w-5 flex items-center justify-center">
              <LogOut className="h-5 w-5" />
            </span>
            {(isOpen || isMobile) && (
              <span className="ml-3 text-sm font-medium truncate">
                Logout
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};