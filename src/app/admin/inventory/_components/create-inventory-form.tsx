"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { Product, Warehouse } from '@/types'
import { getAllProducts, getAllWarehouses } from '@/http/api'
import { inventorySchema } from '@/lib/validators/inventorySchema'

export type InventoryFormvalues = z.input<typeof inventorySchema>;

const CreateinventoryForm = ({ onSubmit, disabled }: { onSubmit: (formValues: InventoryFormvalues) => void, disabled: boolean }) => {

    const queryClient = useQueryClient();

    // Check if 'warehouses' data is already in cache
    const cachedWarehouses = queryClient.getQueryData<Warehouse[]>(['warehouses']);
    // console.log("cachedWarehouses : ", cachedWarehouses);
    //Use `useQuery` to fetch if the data doesn't exist in the cache
    const { data: warehouses, isLoading: warehouseIsLoading, isError, error } = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: getAllWarehouses,
        enabled: !cachedWarehouses, // Skip fetching if data exists
        initialData: cachedWarehouses, // If data is in cache, use it as initial data
    });

    const cachedProducts = queryClient.getQueryData<Product[]>(['products']);
    // console.log("cachedProducts : ", cachedProducts);
    const { data: products, isLoading: productsIsLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAllProducts,
        enabled: !cachedProducts,
        initialData: cachedProducts,
    });

    const form = useForm<z.infer<typeof inventorySchema>>({
        resolver: zodResolver(inventorySchema),
        defaultValues: {
            sku: "",
        }
    })

    function handleSubmit(values: InventoryFormvalues) {
        //console.log("values : ", values);
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. As123456" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="warehouseId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Warehouse</FormLabel>
                            <FormControl className='w-full'>
                                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value?.toString() || '')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Warehouse" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {warehouseIsLoading ? (<div>Loading...</div>) :
                                            (warehouses && warehouses.map((item) => (
                                                <SelectItem key={item.id} value={item.id?.toString() || ''}>
                                                    <p className='cursor-pointer font-medium'>{item.name}</p>
                                                </SelectItem>)
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="productId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product</FormLabel>
                            <FormControl className='w-full'>
                                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value?.toString() || '')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {productsIsLoading ? (<div>Loading...</div>) :
                                            (products && products.map((item) => (
                                                <SelectItem key={item.id} value={item.id?.toString() || ''}>
                                                    <p className='cursor-pointer font-medium'>{item.name}</p>
                                                </SelectItem>)
                                            ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' disabled={disabled}>
                    {disabled ? <Loader2 className='size-4 animate-spin' /> : 'Create'}
                </Button>
            </form>
        </Form>
    )
}

export default CreateinventoryForm