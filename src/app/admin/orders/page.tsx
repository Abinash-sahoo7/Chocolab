
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


const OrdersPage = () => {

    const { onOpen } = useNewProductState();
    const { data: Order, isLoading, isError, error } = useQuery<Order[]>({
        queryKey: ['AllOrders'],
        queryFn: getAllOrders,
    })
    console.log('data : ', Order);

    return (
        <>
            <div className='flex align-middle justify-between'>
                <h3 className='text-2xl font-bold tracking-tight'>Orders</h3>
                {/* <Button size={'sm'} onClick={onOpen} >Add Order</Button> */}
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