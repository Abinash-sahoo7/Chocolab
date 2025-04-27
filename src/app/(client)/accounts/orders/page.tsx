"use client";

import React from 'react'
import { myOrder, Order } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '@/http/api';
import Header from '../../_components/Header';
import { CircleCheck, Loader2, ShoppingBag } from 'lucide-react';
import { Item } from '@radix-ui/react-select';
import { Card } from '@/components/ui/card';
import { capitalizeFirstLetter, formatDate, getStatusColor } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const MyOrderPage = () => {

    const { data: myOrders, isLoading, isError, error } = useQuery<myOrder[]>({
        queryKey: ['myOrder'],
        queryFn: getMyOrders,
    });

    console.log('data : ', myOrders);
    console.log('data : ', myOrders && myOrders.length > 0 ? String(myOrders[0].created_at) : 'No orders found');

    return (
        <>
            <Header />
            <section className='relative border-t'>
                <div className='mx-auto h-full max-w-5xl px-5 py-14'>
                    <h1 className='mb-2 text-3xl font-bold'>Order History</h1>
                    <p className='mb-5'>Check the status of recent orders.</p>
                    <div className='space-y-5'>
                        {isLoading && <Loader2 className='size-10 animate-spin' />}
                        {isError && <span className=''>Something Went wrong </span>}
                        {
                            myOrders && myOrders.length > 0 ? (
                                myOrders?.slice(0, 7).map((item) => (
                                    <Card key={item.id}>
                                        <div className='flex gap-x-5'>
                                            <div className='flex flex-col p-5 text-sm'>
                                                <span className='font-medium'>Date placed</span>
                                                <span>{formatDate(String(item.created_at))}</span>
                                            </div>
                                            <div className='flex flex-col p-5 text-sm'>
                                                <span className='font-medium'>total Amount</span>
                                                <span>${item.price}</span>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div className='flex gap-x-10 p-5'>
                                            <Image
                                                src={`/assets/${item.image}`}
                                                alt='Product-image'
                                                width={120}
                                                height={120}
                                                className='aspect-square rounded-md object-cover'
                                            />
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between">
                                                    <h3 className="text-2xl font-semibold">
                                                        {item.productName}
                                                    </h3>
                                                    <span className="text-2xl font-semibold">
                                                        ${item.price}
                                                    </span>
                                                </div>
                                                <p>{item.productDescription}</p>
                                                <div className="flex justify-end">
                                                    <div className="flex gap-2">
                                                        <span className={`inline-block rounded-full size-5 ${getStatusColor(item.status)}`}>
                                                            <CircleCheck
                                                                className="size-5 text-white"
                                                            />
                                                        </span>
                                                        <span className="text-sm">
                                                            {capitalizeFirstLetter(item.status)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className='flex flex-col justify-center items-center h-full gap-2'>
                                    {
                                        isLoading ? (
                                            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
                                        ) : (
                                            <>
                                                <ShoppingBag className="h-32 w-32 text-gray-400" />
                                                <span className='text-gray-500 text-2xl font-semibold'>No orders found</span>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyOrderPage