import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { CreateProduct, CreateWarehouse } from '@/http/api'
import { toast } from '@/hooks/use-toast'
import CreateWarehouseForm, { WarehouseFormvalues } from './Create-warehouse-form'
import { useNewWarehouseState } from '@/store/warehouse/warehouse-store'

const WareHouseSheet = () => {

    const { isOpen, onClose } = useNewWarehouseState();
    const queryClient = new QueryClient();

    const { mutate, isLoading } = useMutation({
        mutationKey: ['create-warehouse'],
        mutationFn: (data: FormData) => CreateWarehouse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            toast({
                title: "Warehouse created Successfully",
            })
            onClose();
        }
    })

    const onSubmit = (Values: WarehouseFormvalues) => {
        console.log('values : ', Values);
        const formData = new FormData();
        formData.append("name", Values.name);
        formData.append("pincode", Values.pincode);

        console.log('formdata : ', formData);

        mutate(formData);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            {/* <SheetTrigger>Open</SheetTrigger> */}
            <SheetContent className='min-w-[28rem] space-y-4'>
                <SheetHeader>
                    <SheetTitle>Create Warehouses</SheetTitle>
                    <SheetDescription>
                        You can create New WareHouse.
                    </SheetDescription>
                </SheetHeader>

                <CreateWarehouseForm onSubmit={onSubmit} disabled={isLoading} />
            </SheetContent>
        </Sheet>

    )
}

export default WareHouseSheet