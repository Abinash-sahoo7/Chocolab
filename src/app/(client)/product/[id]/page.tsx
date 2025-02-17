"use client"

import { getSingleProduct, PlaceOrder } from '@/http/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import Header from '../../_components/Header';
import Image from 'next/image';
import { Product } from '@/types';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { orderSchema } from '@/lib/validators/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast'
export type OrderFormValues = z.infer<typeof orderSchema>;
type CustomError = {
    message: string;
}

const SingleProduct = () => {

    const params = useParams();
    const pathname = usePathname();
    console.log('pathName: ', pathname);
    const id = params.id;

    const { data: session } = useSession();
    // console.log({ session });

    const form = useForm<z.infer<typeof orderSchema>>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: "",
            pincode: "",
            productId: Number(id),
            qty: 1
        }
    })

    const { data: product, isLoading } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => getSingleProduct(id as string)
    })

    const { mutate } = useMutation({
        mutationKey: ["Order"],
        mutationFn: (data: OrderFormValues) => PlaceOrder({ ...data, productId: Number(id) }),
        onSuccess: (data) => {
            if (data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            }
        },
        onError: (err: AxiosError) => {
            if (err.response?.data) {
                const customError = err.response?.data as CustomError;
                console.log('error: ', customError.message);
                toast({
                    title: customError.message,
                    color: "red",
                })
            } else {
                toast({
                    title: "Something went wrong",
                    color: "red",
                })
            }
        }
    })

    const onSubmit = async (values: OrderFormValues) => {
        console.log('values: ', values);
        mutate(values);
    };

    const qty = form.watch('qty');

    const price = React.useMemo(() => {
        if (product?.price) {
            return qty * product.price;
        }
        return 0;
    }, [qty, product]);

    return (
        <>
            <Header />
            <section className='relative custom-height bg-[#f5f5f5]'>
                <div className='max-w-6xl mx-auto z-50 gap-x-10 px-5 py-14 flex h-full md:py-20'>
                    <div>
                        {
                            isLoading ?
                                (<Skeleton className='aspect-square w-[28rem] rounded-md bg-brown-100' />)
                                :
                                (<Image
                                    src={`/assets/${product?.image}`}
                                    alt={product?.name ?? 'image'}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className='aspect-square w-[28rem] rounded-md object-cover shadow-2xl'
                                />)
                        }
                    </div>

                    <div className='flex flex-col flex-1 space-y-2'>
                        {
                            isLoading ?
                                (<>
                                    <Skeleton className='h-4 w-24 rounded-md bg-brown-100' />
                                    <Skeleton className='h-10 w-2/3 rounded-md bg-brown-100' />
                                    <div className='flex items-center gap-x-3'>
                                        <div className='flex gap-x-0.5'>
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' />
                                        </div>
                                        <span className='text-sm'>144 Reviews</span>
                                    </div>
                                    <Skeleton className='h-24 w-full rounded-md bg-brown-100' />

                                    <Separator className='my-6 bg-brown-900' />
                                    <div className='flex items-center justify-between'>
                                        <Skeleton className="h-10 w-28 bg-brown-100" />
                                        <Skeleton className="h-10 w-60 bg-brown-100" />
                                    </div>
                                </>)
                                :
                                (<>
                                    <h2 className='text-brown-500 text-sm tracking-widest'>Brand Name</h2>
                                    <h2 className='text-4xl text-brown-900 font-semibold'>
                                        {product?.name}
                                    </h2>
                                    <div className='flex items-center gap-x-3'>
                                        <div className='flex gap-x-0.5'>
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' fill='#facc15' />
                                            <Star className='size-4 text-yellow-400' />
                                        </div>
                                        <span className='text-sm'>144 Reviews</span>
                                    </div>

                                    <p className='mt-1'>{product?.description}</p>

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)}>
                                            <div className='flex gap-x-2 mt-2'>
                                                <FormField
                                                    control={form.control}
                                                    name="address"
                                                    render={({ field }) => (
                                                        <FormItem className='w-3/6'>
                                                            <FormLabel>Address</FormLabel>
                                                            <FormControl>
                                                                <Textarea className='border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0' placeholder='eg: open street 255' {...field} />
                                                            </FormControl>
                                                            <FormMessage className='text-xs' />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="pincode"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Pincode</FormLabel>
                                                            <FormControl>
                                                                <Input type='number'
                                                                    className='h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0' placeholder='eg: 752019'
                                                                    {...field} />
                                                            </FormControl>
                                                            <FormMessage className='text-xs' />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="qty"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Quantity</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type='number'
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                                    className='h-9 border-brown-200 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brown-400 focus-visible:ring-offset-0'
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Separator className='bg-brown-800 my-6' />
                                            <div className='flex items-center justify-between'>
                                                <span className='text-3xl font-semibold text-brown-700'>${price}</span>
                                                {
                                                    session ?
                                                        (<Button type='submit'>Buy Now</Button>)
                                                        :
                                                        (
                                                            <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                                                                <Button>Buy Now</Button>
                                                            </Link>
                                                        )
                                                }
                                            </div>
                                        </form>
                                    </Form>

                                </>)
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct