"use client";

import type { ReactNode } from "react";

import { Filter, Search, Upload, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  value: string;
  label: string;
  count?: number;
  badgeColor?: string;
  icon?: ReactNode;
}

interface DataTabsProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  tabs: TabItem[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  activeTab: string;
  children: ReactNode;
  searchPlaceholder?: string;
  onAdd?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  showAddButton?: boolean;
  showExportButton?: boolean;
  showFilterButton?: boolean;
  extraActions?: ReactNode;
  showSearch?: boolean;
  showTabCount?: boolean;
}

export function DataTabs({
  defaultValue,
  onValueChange,
  tabs,
  searchQuery,
  setSearchQuery,
  activeTab,
  children,
  searchPlaceholder,
  onAdd,
  onExport,
  onFilter,
  showAddButton = true,
  showExportButton = true,
  showFilterButton = true,
  extraActions,
  showSearch = true,
  showTabCount = true,
}: DataTabsProps) {
  return (
    <div className="mt-8 space-y-6">
      <Tabs
        defaultValue={defaultValue}
        className="w-full"
        onValueChange={onValueChange}
      >
        <div className="overflow-x-auto">
          <TabsList className="flex w-max min-w-full flex-nowrap gap-3 bg-transparent px-1 sm:w-full sm:justify-start">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`group data-[state=active]:border-primary/20 data-[state=active]:from-primary/5 hover:bg-accent/50 text-muted-foreground data-[state=active]:text-primary relative flex items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:to-blue-100/20 data-[state=active]:shadow-sm`}
              >
                {tab.icon && (
                  <span className="text-muted-foreground group-data-[state=active]:text-primary">
                    {tab.icon}
                  </span>
                )}
                <span className="truncate">{tab.label}</span>

                {showTabCount && tab.count !== undefined && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full text-xs transition-colors ${
                      tab.badgeColor || "bg-primary/20 text-primary"
                    } group-data-[state=active]:bg-primary group-data-[state=active]:text-white`}
                  >
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="my-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {showSearch && (
            <div className="max-w-md flex-1">
              <div className="relative">
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder || `Cari ${activeTab}...`}
                  className="border-border/40 focus:border-border focus:ring-border bg-muted/30 hover:bg-muted/40 focus:bg-muted/50 h-10 w-full rounded-md pl-10 text-sm transition-all duration-200 placeholder:ml-2 focus:ring-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              {showFilterButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFilter}
                  className="border-border/50 hover:border-primary/30 hover:bg-primary/5 gap-2 rounded-md border px-3.5"
                >
                  <Filter className="text-muted-foreground h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              )}

              {showExportButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExport}
                  className="border-border/50 hover:border-primary/30 hover:bg-primary/5 gap-2 rounded-md border px-3.5"
                >
                  <Upload className="text-muted-foreground h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              )}

              {showAddButton && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onAdd}
                  className="gap-2 rounded-md px-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Tambah</span>
                </Button>
              )}
              {extraActions}
            </div>
          </div>
        </div>
        {children}
      </Tabs>
    </div>
  );
}
