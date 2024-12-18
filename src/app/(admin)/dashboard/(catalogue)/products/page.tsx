"use client";
import {DataTable} from "@/components/admin/DataTable";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {mockProducts} from "@/mocks/mocks";
import {Product} from "@/types/types";
import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import Image from "next/image";
import React from "react";
import {useCreateProductMutation, useFindAllProductsQuery} from "@/app/generated/graphql-types";
import Spinner from "@/components/util/spinner";

const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),

        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "NAME",
    },
    {
        accessorKey: "description",
        header: "DESCRIPTION",
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        accessorKey: "barcode",
        header: "BARCODE",
    },
    {
        accessorKey: "price",
        header: "PRICE",
    },
    {
        accessorKey: "discount",
        header: "DISCONT",
    },
    {
        accessorKey: "imageUrl",
        header: "IMAGE",
        cell: ({row}) => {
            return (
                <div>
                    <Image
                        src={row.getValue("imageUrl")}
                        alt="product Image"
                        width={30}
                        height={30}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "isActive",
        header: "AVAILABLE",
        cell: ({row}) => {
            return (
                <div
                    className={cn("font-medium w-fit px-4 py-2 rounded-sm", {
                        "text-green-500": row.getValue("isActive") === true,
                        "text-red-600": row.getValue("isActive") === false,
                    })}
                >
                    {row.getValue("isActive") ? "Yes" : "No"}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "STATUS",
        cell: ({row}) => {

            return (
                <div
                    className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                        "text-red-400": row.getValue("status") === "pending",
                        "text-orange-500": row.getValue("status") === "review",
                        "text-green-500": row.getValue("status") === "approved",
                        "text-red-600": row.getValue("status") === "declined",
                    })}
                >
                    {row.getValue("status")}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(product.id as string)
                            }
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View Product</DropdownMenuItem>
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Page = () => {
    const { data, loading, error } = useFindAllProductsQuery({
        variables: {},
    });

    if (loading) {
        return <Spinner style=""/>;
    }

    if (error) {
        return <p className="text-red-600">Error: {error.message}</p>;
    }

    return (
        <div className="h-full">
            <DataTable
                columns={columns}
                data={data?.findAllProducts || mockProducts} // use data from query or fallback to mockProducts
                newDataHref="/dashboard/products/new"
            />
        </div>
    );
};

export default Page;
