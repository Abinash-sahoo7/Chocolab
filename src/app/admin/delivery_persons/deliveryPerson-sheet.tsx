import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { CreateDeliveryPerson } from '@/http/api'
import { toast } from '@/hooks/use-toast'
import { useNewWarehouseState } from '@/store/warehouse/warehouse-store'
import CreateDeliveryPersonForm, { DeliveryPersonFormvalues } from './create-deliveryPerson-form'

const DeliveryPersonSheet = () => {

    const { isOpen, onClose } = useNewWarehouseState();
    const queryClient = new QueryClient();

    const { mutate, isLoading } = useMutation({
        mutationKey: ['create-deliveryperson'],
        mutationFn: (data: DeliveryPersonFormvalues) => CreateDeliveryPerson(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['deliverypersons'] });
            toast({
                title: "Delivery Person created Successfully",
            })
            onClose();
        },
    })

    const onSubmit = (Values: DeliveryPersonFormvalues) => {
        console.log('values : ', Values);
        // const formData = new FormData();
        // formData.append("name", Values.name);
        // formData.append("phone", Values.phone);
        // formData.append("warehouseId", String(Values.warehouseId));

        // console.log('formdata : ', formData);

        mutate(Values as DeliveryPersonFormvalues);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='min-w-[28rem] space-y-4'>
                <SheetHeader>
                    <SheetTitle>Create Deliver Person</SheetTitle>
                    <SheetDescription>
                        You can create New Delivery Person.
                    </SheetDescription>
                </SheetHeader>

                <CreateDeliveryPersonForm onSubmit={onSubmit} disabled={isLoading} />
            </SheetContent>
        </Sheet>

    )
}

export default DeliveryPersonSheet