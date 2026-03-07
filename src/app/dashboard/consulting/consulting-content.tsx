"use client";

import { FilterableTable } from "@/components/dashboard/filterable-table";
import { StatusSelect } from "@/components/dashboard/status-select";
import { updateConsultingLeadStatus } from "@/actions/admin";

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "NEGOTIATION", label: "Negotiation" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

interface ConsultingRow {
  id: string;
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  businessType: string;
  stage: string;
  status: string;
  date: string;
}

export function ConsultingContent({
  leads,
  totalCount,
}: {
  leads: ConsultingRow[];
  totalCount: number;
}) {
  return (
    <FilterableTable
      title="Consulting Leads"
      description="B2B consulting pipeline"
      data={leads}
      totalCount={totalCount}
      filterKey="status"
      filterLabel="Status"
      filterOptions={STATUS_OPTIONS}
      emptyMessage="No consulting leads yet"
      columns={[
        { header: "Contact", accessorKey: "contactName" },
        {
          header: "Business",
          accessorKey: "businessName",
          className: "hidden sm:table-cell",
        },
        { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
        { header: "Phone", accessorKey: "phone", className: "hidden lg:table-cell" },
        { header: "Service", accessorKey: "service" },
        {
          header: "Type",
          accessorKey: "businessType",
          className: "hidden lg:table-cell",
        },
        {
          header: "Status",
          accessorKey: "status",
          cell: (val, row) => (
            <StatusSelect
              value={String(val)}
              options={STATUS_OPTIONS}
              onUpdate={updateConsultingLeadStatus}
              itemId={(row as ConsultingRow).id}
            />
          ),
        },
        { header: "Date", accessorKey: "date", className: "hidden md:table-cell" },
      ]}
    />
  );
}
