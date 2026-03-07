"use client";

import { FilterableTable } from "@/components/dashboard/filterable-table";
import { StatusSelect } from "@/components/dashboard/status-select";
import { updatePartnerStatus } from "@/actions/admin";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

interface PartnerRow {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  date: string;
}

export function PartnersContent({
  applications,
  totalCount,
}: {
  applications: PartnerRow[];
  totalCount: number;
}) {
  return (
    <FilterableTable
      title="Partner Applications"
      description="All partnership requests"
      data={applications}
      totalCount={totalCount}
      filterKey="status"
      filterLabel="Status"
      filterOptions={STATUS_OPTIONS}
      emptyMessage="No applications yet"
      columns={[
        { header: "Business", accessorKey: "businessName" },
        {
          header: "Owner",
          accessorKey: "ownerName",
          className: "hidden sm:table-cell",
        },
        { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
        { header: "Phone", accessorKey: "phone", className: "hidden lg:table-cell" },
        { header: "Type", accessorKey: "type" },
        {
          header: "Status",
          accessorKey: "status",
          cell: (val, row) => (
            <StatusSelect
              value={String(val)}
              options={STATUS_OPTIONS}
              onUpdate={updatePartnerStatus}
              itemId={(row as PartnerRow).id}
            />
          ),
        },
        { header: "Date", accessorKey: "date", className: "hidden md:table-cell" },
      ]}
    />
  );
}
