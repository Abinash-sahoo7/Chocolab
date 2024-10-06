import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import CreateProductForm, { Formvalues } from './Create-product-form'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { CreateProduct } from '@/http/api'
import { useNewProductState } from '@/store/product/product-store'
import { toast } from '@/hooks/use-toast'

const ProductSheet = () => {

    const { isOpen, onClose } = useNewProductState();
    const queryClient = new QueryClient();

    const { mutate, isLoading } = useMutation({
        mutationKey: ['create-product'],
        mutationFn: (data: FormData) => CreateProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({
                title: "Product created Successfully"
            })
            onClose();
        }
    })

    const onSubmit = (Values: Formvalues) => {
        console.log('values : ', Values);
        const formData = new FormData();
        formData.append("name", Values.name);
        formData.append("description", Values.description);
        formData.append("price", String(Values.price));
        formData.append("image", (Values.image as FileList)[0]);

        console.log('formdata : ', formData);

        mutate(formData);
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            {/* <SheetTrigger>Open</SheetTrigger> */}
            <SheetContent className='min-w-[28rem] space-y-4'>
                <SheetHeader>
                    <SheetTitle>Create product</SheetTitle>
                    <SheetDescription>
                        You can create New Products Now.
                    </SheetDescription>
                </SheetHeader>

                <CreateProductForm onSubmit={onSubmit} disabled={isLoading} />
            </SheetContent>
        </Sheet>

    )
}

export default ProductSheet