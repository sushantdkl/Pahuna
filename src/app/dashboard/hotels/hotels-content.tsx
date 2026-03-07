"use client";

import { FilterableTable } from "@/components/dashboard/filterable-table";
import { StatusSelect } from "@/components/dashboard/status-select";
import { updateInquiryStatus } from "@/actions/admin";

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CONVERTED", label: "Converted" },
  { value: "CLOSED", label: "Closed" },
];

const TYPE_OPTIONS = [
  { value: "HOTEL_BOOKING", label: "Booking" },
  { value: "GENERAL", label: "General" },
  { value: "CALLBACK_REQUEST", label: "Callback" },
  { value: "CUSTOM_TRIP", label: "Custom Trip" },
];

interface InquiryRow {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  hotel: string;
  type: string;
  status: string;
  date: string;
}

export function HotelsContent({
  inquiries,
  totalCount,
}: {
  inquiries: InquiryRow[];
  totalCount: number;
}) {
  return (
    <FilterableTable
      title="Hotel Inquiries"
      description="All hotel booking and general inquiries"
      data={inquiries}
      totalCount={totalCount}
      filterKey="type"
      filterLabel="Type"
      filterOptions={TYPE_OPTIONS}
      emptyMessage="No inquiries yet"
      columns={[
        { header: "Guest", accessorKey: "fullName" },
        { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
        { header: "Phone", accessorKey: "phone", className: "hidden lg:table-cell" },
        { header: "Hotel", accessorKey: "hotel" },
        { header: "Type", accessorKey: "type", className: "hidden sm:table-cell" },
        {
          header: "Status",
          accessorKey: "status",
          cell: (val, row) => (
            <StatusSelect
              value={String(val)}
              options={STATUS_OPTIONS}
              onUpdate={updateInquiryStatus}
              itemId={(row as InquiryRow).id}
            />
          ),
        },
        { header: "Date", accessorKey: "date", className: "hidden md:table-cell" },
      ]}
    />
  );
}
