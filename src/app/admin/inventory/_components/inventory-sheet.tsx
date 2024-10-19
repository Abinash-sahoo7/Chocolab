import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { CreateInventory } from '@/http/api'
import { toast } from '@/hooks/use-toast'
import { InventoryFormvalues } from './create-inventory-form'
import { useNewInventoryState } from '@/store/inventory/inventory-store'
import CreateinventoryForm from './create-inventory-form'

const InventorySheet = () => {

    const { isOpen, onClose } = useNewInventoryState();
    const queryClient = new QueryClient();

    const { mutate, isLoading } = useMutation({
        mutationKey: ['create-inventory'],
        mutationFn: (data: InventoryFormvalues) => CreateInventory(data),
        onSuccess: () => {
            // console.log("Error in client: ", data);
            queryClient.invalidateQueries({ queryKey: ['inventories'] });
            toast({
                title: "Inventory created Successfully",
            })
            onClose();
        },
        onError: (error: any) => {
            console.log("Error in client: ", error);
            if (error.response.data.message?.code == '23505') {
                toast({
                    title: error.response.data.message?.message,
                })
            } else {
                toast({
                    title: "something went wrong!",
                })
            }
        }
    })

    const onSubmit = (Values: InventoryFormvalues) => {
        console.log('values : ', Values);
        // const formData = new FormData();
        // formData.append("name", Values.name);
        // formData.append("phone", Values.phone);
        // formData.append("warehouseId", String(Values.warehouseId));

        // console.log('formdata : ', formData);

        mutate(Values as InventoryFormvalues);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='min-w-[28rem] space-y-4'>
                <SheetHeader>
                    <SheetTitle>Create Inventory</SheetTitle>
                    <SheetDescription>
                        You can create New Inventory.
                    </SheetDescription>
                </SheetHeader>

                <CreateinventoryForm onSubmit={onSubmit} disabled={isLoading} />
            </SheetContent>
        </Sheet>

    )
}

export default InventorySheet