"use client";

import { format } from "date-fns";
import {
  DataTableCard,
  StatusBadge,
} from "@/components/dashboard/data-table-card";

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  type: string;
  status: string;
  createdAt: Date;
}

interface ConsultingLead {
  id: string;
  contactName: string;
  businessName: string;
  email: string;
  serviceType: string;
  status: string;
  createdAt: Date;
}

export function RecentLeadsTable({
  inquiries,
  consultingLeads,
}: {
  inquiries: Inquiry[];
  consultingLeads: ConsultingLead[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DataTableCard
        title="Recent Hotel Inquiries"
        description="Latest booking & general inquiries"
        data={inquiries}
        emptyMessage="No inquiries yet"
        columns={[
          { header: "Name", accessorKey: "fullName" },
          { header: "Email", accessorKey: "email", className: "hidden sm:table-cell" },
          { header: "Type", accessorKey: "type" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (val) => <StatusBadge status={String(val)} />,
          },
          {
            header: "Date",
            accessorKey: "createdAt",
            cell: (val) => format(new Date(String(val)), "MMM d"),
            className: "hidden md:table-cell",
          },
        ]}
      />

      <DataTableCard
        title="Recent Consulting Leads"
        description="Latest B2B consulting inquiries"
        data={consultingLeads}
        emptyMessage="No consulting leads yet"
        columns={[
          { header: "Contact", accessorKey: "contactName" },
          { header: "Business", accessorKey: "businessName", className: "hidden sm:table-cell" },
          { header: "Service", accessorKey: "serviceType" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (val) => <StatusBadge status={String(val)} />,
          },
          {
            header: "Date",
            accessorKey: "createdAt",
            cell: (val) => format(new Date(String(val)), "MMM d"),
            className: "hidden md:table-cell",
          },
        ]}
      />
    </div>
  );
}
