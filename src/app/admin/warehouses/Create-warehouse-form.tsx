"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { warehouseSchema } from '@/lib/validators/warehouseSchema'

export type WarehouseFormvalues = z.input<typeof warehouseSchema>;

const CreateWarehouseForm = ({ onSubmit, disabled }: { onSubmit: (formValues: WarehouseFormvalues) => void, disabled: boolean }) => {

    const form = useForm<z.infer<typeof warehouseSchema>>({
        resolver: zodResolver(warehouseSchema),
        defaultValues: {
            name: "",
            pincode: ""
        }
    })

    function handleSubmit(values: WarehouseFormvalues) {
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
                            <FormLabel>Warehouse name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Warehouse 1" {...field} />
                            </FormControl>
                            <FormMessage />
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
                                <Input placeholder="e.g. 752014" {...field} />
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

export default CreateWarehouseForm