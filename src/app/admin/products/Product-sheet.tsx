import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import CreateProductForm, { Formvalues } from './Create-product-form'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { CreateProduct } from '@/http/api'

const ProductSheet = () => {

    const queryClient = new QueryClient();

    const { mutate } = useMutation({
        mutationKey: ['create-product'],
        mutationFn: (data: FormData) => CreateProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            alert("Product created successfully!")
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
        <Sheet open={true}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className='min-w-[28rem] space-y-4'>
                <SheetHeader>
                    <SheetTitle>Create product</SheetTitle>
                    <SheetDescription>
                        You can create New Products Now.
                    </SheetDescription>
                </SheetHeader>

                <CreateProductForm onSubmit={onSubmit} />
            </SheetContent>
        </Sheet>

    )
}

export default ProductSheet