"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { DeliverpersonSchema } from '@/lib/validators/deliveryPersonSchema'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { Warehouse } from '@/types'
import { getAllWarehouses } from '@/http/api'

export type DeliveryPersonFormvalues = z.input<typeof DeliverpersonSchema>;

const CreateDeliveryPersonForm = ({ onSubmit, disabled }: { onSubmit: (formValues: DeliveryPersonFormvalues) => void, disabled: boolean }) => {

    const queryClient = useQueryClient();

    // Check if 'warehouses' data is already in cache
    const cachedWarehouses = queryClient.getQueryData<Warehouse[]>(['warehouses']);

    console.log("cachedWarehouses : ", cachedWarehouses);

    //Use `useQuery` to fetch if the data doesn't exist in the cache
    const { data: warehouses, isLoading, isError, error } = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: getAllWarehouses,
        enabled: !cachedWarehouses, // Skip fetching if data exists
        initialData: cachedWarehouses, // If data is in cache, use it as initial data
    });

    const form = useForm<z.infer<typeof DeliverpersonSchema>>({
        resolver: zodResolver(DeliverpersonSchema),
        defaultValues: {
            name: "",
            phone: "",
            warehouseId: 0
        }
    })

    function handleSubmit(values: DeliveryPersonFormvalues) {
        console.log("values : ", values);
        onSubmit(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Delivery Person name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Zachary pianta" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone no</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. +919847598664" {...field} />
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
                                        {warehouses && warehouses.map((item) => (
                                            <SelectItem key={item.id} value={item.id?.toString() || ''}>
                                                <p className='cursor-pointer font-medium'>{item.name}</p>
                                            </SelectItem>
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

export default CreateDeliveryPersonForm