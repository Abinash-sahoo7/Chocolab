import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import product4 from '../../../../public/chocolateWhiteDark-454384771-770x533-1_jpg.webp'

const SpecialProduct = () => {

    const products = [
        { src: "/product1.jpg", alt: "product1", name: "Cadbury Dairy Milk" },
        { src: "/product2.jpg", alt: "product2", name: "Mars Bars" },
        { src: "/product3.jpg", alt: "product3", name: "Lindt Excellence Bar" },
        { src: product4, alt: "product4", name: "Venu Bars" },
    ]

    return (
        <section className='mx-auto max-w-6xl px-5 py-14 md:py-20'>
            <div className='flex justify-center items-center gap-6'>
                <Separator className='w-20 bg-brown-900 h-0.5' />
                <h2 className='text-3xl font-bold tracking-tight text-brown-900'>Special Product</h2>
                <Separator className='w-20 bg-brown-900 h-0.5' />
            </div>

            <div className='mt-20 grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {products.map((item, index) => (
                    <div key={index} className='flex justify-center items-center flex-col gap-3'>
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "220px", height: "220px" }}
                            className='rounded-full border-8'
                        />

                        <p className='font-semibold text-brown-600'>{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SpecialProduct