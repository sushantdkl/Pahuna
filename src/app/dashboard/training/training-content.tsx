"use client";

import { FilterableTable } from "@/components/dashboard/filterable-table";
import { StatusSelect } from "@/components/dashboard/status-select";
import { updateEnrollmentStatus } from "@/actions/admin";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

interface EnrollmentRow {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  status: string;
  date: string;
}

export function TrainingContent({
  enrollments,
  totalCount,
}: {
  enrollments: EnrollmentRow[];
  totalCount: number;
}) {
  return (
    <FilterableTable
      title="Enrollments"
      description="Student enrollment applications"
      data={enrollments}
      totalCount={totalCount}
      filterKey="status"
      filterLabel="Status"
      filterOptions={STATUS_OPTIONS}
      emptyMessage="No enrollments yet"
      columns={[
        { header: "Student", accessorKey: "fullName" },
        { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
        { header: "Phone", accessorKey: "phone", className: "hidden lg:table-cell" },
        { header: "Course", accessorKey: "course" },
        {
          header: "Status",
          accessorKey: "status",
          cell: (val, row) => (
            <StatusSelect
              value={String(val)}
              options={STATUS_OPTIONS}
              onUpdate={updateEnrollmentStatus}
              itemId={(row as EnrollmentRow).id}
            />
          ),
        },
        { header: "Date", accessorKey: "date", className: "hidden sm:table-cell" },
      ]}
    />
  );
}
