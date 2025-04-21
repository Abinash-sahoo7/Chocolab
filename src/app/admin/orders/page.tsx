"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@/http/api';
import { Order } from '@/types';
import { useNewProductState } from '@/store/product/product-store';
import { Loader2 } from 'lucide-react';
import { DataTable } from '../_components/DataTable';
import { columns } from './_components/columns';
import * as XLSX from "xlsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Define the extended jsPDF type with autoTable
interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => void;
}

const OrdersPage = () => {

    const { onOpen } = useNewProductState();
    const { data: Order, isLoading, isError, error } = useQuery<Order[]>({
        queryKey: ['AllOrders'],
        queryFn: getAllOrders,
    })
    console.log('data : ', Order);

    const onGetExporProduct = async (value: string, title?: string, worksheetname?: string) => {
        if (value === "excel") {
            try {
                if (Order && Array.isArray(Order)) {
                    const dataToExport = Order.map((pro: any) => ({
                        Id: pro.id,
                        productName: pro.productName,
                        qty: pro.quantity,
                        UserName: pro.userName,
                        address: pro.address,
                        status: pro.status,
                        type: pro.type,
                        price: pro.totalPrice,
                    }),);

                    console.log('dataToExport : ', dataToExport);

                    // Create Excel workbook and worksheet
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
                    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
                    // Save the workbook as an Excel file
                    XLSX.writeFile(workbook, `${title}.xlsx`);
                    console.log(`Exported data to ${title}.xlsx`);
                }
            } catch (error) {
                console.log("Error occure while Exporting to Excel :", error);
            }
        } else if (value === "pdf") {
            try {
                if (Order && Array.isArray(Order)) {
                    // Create a new PDF document
                    const doc = new jsPDF();

                    // Add title to the PDF
                    doc.setFontSize(16);
                    doc.text("Orders Report", 14, 15);

                    // Add date
                    doc.setFontSize(10);
                    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

                    // Prepare data for the table
                    const tableData = Order.map((order: any) => [
                        order.id,
                        order.productName,
                        order.quantity,
                        order.userName,
                        order.address,
                        order.status,
                        order.type,
                        `$${order.totalPrice}`
                    ]);

                    // Define table columns
                    const tableColumns = [
                        "ID",
                        "Product",
                        "Quantity",
                        "Customer",
                        "Address",
                        "Status",
                        "Type",
                        "Price"
                    ];

                    // Use the autoTable function directly
                    autoTable(doc, {
                        head: [tableColumns],
                        body: tableData,
                        startY: 30,
                        theme: 'grid',
                        headStyles: { fillColor: [139, 69, 19] }, // Brown color for header
                        styles: { fontSize: 8 },
                        columnStyles: {
                            0: { cellWidth: 10 }, // ID column
                            1: { cellWidth: 30 }, // Product column
                            2: { cellWidth: 15 }, // Quantity column
                            3: { cellWidth: 30 }, // Customer column
                            4: { cellWidth: 40 }, // Address column
                            5: { cellWidth: 20 }, // Status column
                            6: { cellWidth: 15 }, // Type column
                            7: { cellWidth: 15 }  // Price column
                        }
                    });

                    // Save the PDF
                    doc.save(`${title}.pdf`);
                    console.log(`Exported data to ${title}.pdf`);
                }
            } catch (error) {
                console.log("Error occurred while Exporting to PDF:", error);
            }
        }
    }

    return (
        <>
            <div className='flex align-middle justify-between'>
                <h3 className='text-2xl font-bold tracking-tight'>Orders</h3>
                {/* <Button size={'sm'} onClick={() => onGetExporProduct(`${Math.floor(100000 + Math.random() * 900000)}_Order`, "OrderExport")}
                >Export To Excel</Button> */}
                <Select onValueChange={(value) => onGetExporProduct(value, `${Math.floor(100000 + Math.random() * 900000)}_Order`, "OrderExport")}>
                    <SelectTrigger className="w-[180px] font-bold">
                        <SelectValue placeholder="Export To" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="pdf">Pdf</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {
                isError && (<div className='font-bold'>
                    <h3 className='text-red-500'>Something Went Wrong!</h3>
                </div>)
            }

            {
                isLoading ? (<div className='flex items-center justify-center'>
                    <Loader2 className='size-10 animate-spin' />
                </div>) :
                    (<DataTable columns={columns} data={Order || []} />)
            }

            {/* <ProductSheet /> */}
        </>
    )
}

export default OrdersPage