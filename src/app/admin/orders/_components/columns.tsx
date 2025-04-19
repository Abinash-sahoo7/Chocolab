
import { Button } from "@/components/ui/button"
import { Order, Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import StatusBadge from "./StatusBadge"

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "productName",
        header: "Product Name",
    },
    {
        accessorKey: "quantity",
        header: "qty",
    },
    {
        accessorKey: "userName",
        header: "Full Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <StatusBadge status={row.original.status}></StatusBadge>
        }
    },
]