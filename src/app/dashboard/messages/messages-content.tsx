"use client";

import { FilterableTable } from "@/components/dashboard/filterable-table";
import { markMessageRead } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const READ_OPTIONS = [
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
];

interface MessageRow {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  date: string;
}

function ReadToggle({ row }: { row: MessageRow }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      className={isPending ? "opacity-50" : ""}
      onClick={() => {
        startTransition(async () => {
          await markMessageRead(row.id, !row.isRead);
          router.refresh();
        });
      }}
    >
      {row.isRead ? (
        <EyeOff className="mr-1 h-3.5 w-3.5" />
      ) : (
        <Eye className="mr-1 h-3.5 w-3.5" />
      )}
      {row.isRead ? "Mark unread" : "Mark read"}
    </Button>
  );
}

export function MessagesContent({
  messages,
  totalCount,
}: {
  messages: MessageRow[];
  totalCount: number;
}) {
  // Map isRead boolean to a filterable string key
  const data = messages.map((m) => ({
    ...m,
    readStatus: m.isRead ? "read" : "unread",
  }));

  return (
    <FilterableTable
      title="Contact Messages"
      description="Messages from the contact form"
      data={data}
      totalCount={totalCount}
      filterKey="readStatus"
      filterLabel="Status"
      filterOptions={READ_OPTIONS}
      emptyMessage="No messages yet"
      columns={[
        {
          header: "From",
          accessorKey: "fullName",
          cell: (val, row) => (
            <span
              className={
                !(row as MessageRow).isRead ? "font-semibold" : undefined
              }
            >
              {String(val)}
            </span>
          ),
        },
        { header: "Email", accessorKey: "email", className: "hidden md:table-cell" },
        { header: "Subject", accessorKey: "subject" },
        {
          header: "Preview",
          accessorKey: "message",
          className: "hidden lg:table-cell max-w-[200px] truncate",
        },
        {
          header: "",
          accessorKey: "isRead",
          cell: (_val, row) => <ReadToggle row={row as MessageRow} />,
        },
        { header: "Date", accessorKey: "date", className: "hidden sm:table-cell" },
      ]}
    />
  );
}
