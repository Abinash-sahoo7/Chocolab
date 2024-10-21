
import React from 'react'

import Image from 'next/image';
import { Button } from '@/components/ui/button';

const AdditionalCompo = () => {
    return (
        // public\amirali-mirhashemian-RCVIlSXhYI0-unsplash.jpg
        <section className='w-full bg-brown-50'>
            <div className='mx-auto max-w-5xl px-5 py-14 md:py-20 grid grid-cols-1 gap-5 lg:grid-cols-2'>
                <Image
                    src='/amirali-mirhashemian-RCVIlSXhYI0-unsplash.jpg'
                    alt="All chocolate"
                    width={400}
                    height={100}
                    className='h-60 rounded-md ml-12'
                />
                <div className='flex flex-col ml-2'>
                    <h3 className='text-brown-900 text-xl font-semibold mt-4'>Forget love, I'd Rather fall in Chocolate</h3>
                    <p className='mt-6 text-brown-700'>Increase heart health: Antioxidatents in dark chocolates have been shown to lower blood pressure, reduce the risk and clotting and increases.</p>
                    <Button className='mt-8 bg-brown-900 hover:bg-brown-800 active:bg-brown-700 px-8 w-fit'>
                        Shop Now
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default AdditionalCompo