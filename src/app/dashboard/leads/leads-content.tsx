"use client";

import { FilterableTable } from "@/components/dashboard/filterable-table";
import { StatusSelect } from "@/components/dashboard/status-select";
import {
  updateInquiryStatus,
  updateConsultingLeadStatus,
} from "@/actions/admin";

const INQUIRY_STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CONVERTED", label: "Converted" },
  { value: "CLOSED", label: "Closed" },
];

const INQUIRY_TYPE_OPTIONS = [
  { value: "HOTEL_BOOKING", label: "Hotel Booking" },
  { value: "GENERAL", label: "General" },
  { value: "CALLBACK_REQUEST", label: "Callback" },
  { value: "CUSTOM_TRIP", label: "Custom Trip" },
];

const CONSULTING_STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "NEGOTIATION", label: "Negotiation" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
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

interface LeadRow {
  id: string;
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  date: string;
}

export function LeadsContent({
  inquiries,
  consultingLeads,
  totalInquiries,
  totalLeads,
}: {
  inquiries: InquiryRow[];
  consultingLeads: LeadRow[];
  totalInquiries: number;
  totalLeads: number;
}) {
  return (
    <div className="space-y-6">
      <FilterableTable<InquiryRow>
        title="Hotel Inquiries & Callbacks"
        description="All booking inquiries, general questions, and callback requests"
        data={inquiries}
        totalCount={totalInquiries}
        filterKey="type"
        filterLabel="Type"
        filterOptions={INQUIRY_TYPE_OPTIONS}
        emptyMessage="No inquiries yet"
        columns={[
          { header: "Guest", accessorKey: "fullName" },
          {
            header: "Email",
            accessorKey: "email",
            className: "hidden lg:table-cell",
          },
          {
            header: "Phone",
            accessorKey: "phone",
            className: "hidden xl:table-cell",
          },
          { header: "Hotel", accessorKey: "hotel" },
          {
            header: "Type",
            accessorKey: "type",
            className: "hidden sm:table-cell",
            cell: (val) => {
              const label =
                INQUIRY_TYPE_OPTIONS.find((o) => o.value === val)?.label ??
                String(val);
              return (
                <span className="text-xs text-muted-foreground">{label}</span>
              );
            },
          },
          {
            header: "Status",
            accessorKey: "status",
            cell: (_val, row) => (
              <StatusSelect
                value={row.status}
                options={INQUIRY_STATUS_OPTIONS}
                onUpdate={updateInquiryStatus}
                itemId={row.id}
              />
            ),
          },
          {
            header: "Date",
            accessorKey: "date",
            className: "hidden md:table-cell",
          },
        ]}
      />

      <FilterableTable<LeadRow>
        title="Consulting Leads"
        description="B2B consulting inquiries and pipeline"
        data={consultingLeads}
        totalCount={totalLeads}
        filterKey="status"
        filterLabel="Status"
        filterOptions={CONSULTING_STATUS_OPTIONS}
        emptyMessage="No consulting leads yet"
        columns={[
          { header: "Contact", accessorKey: "contactName" },
          {
            header: "Business",
            accessorKey: "businessName",
            className: "hidden sm:table-cell",
          },
          {
            header: "Email",
            accessorKey: "email",
            className: "hidden lg:table-cell",
          },
          { header: "Service", accessorKey: "service" },
          {
            header: "Status",
            accessorKey: "status",
            cell: (_val, row) => (
              <StatusSelect
                value={row.status}
                options={CONSULTING_STATUS_OPTIONS}
                onUpdate={updateConsultingLeadStatus}
                itemId={row.id}
              />
            ),
          },
          {
            header: "Date",
            accessorKey: "date",
            className: "hidden md:table-cell",
          },
        ]}
      />
    </div>
  );
}
