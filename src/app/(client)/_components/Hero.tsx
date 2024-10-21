import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className='relative custom-height'>
            <div className='container z-50 text-white mx-auto my-auto flex h-full flex-col justify-center px-5 md:px-10 xl:px-28 3xl:text-px-5'>
                <h1 className='text-8xl font-bold capitalize leading-[1.2] tracking-tight 3xl:text-8xl 3xl:leading-[1.2]'>10 Minute Delivery <br /> At your Doorstep</h1>

                <p className='mt-8 max-w-[600px] text-xl 3xl:text-2xl'>
                    Why wait? Our 10-minute delivery service brings your favorite chocolates right
                    to your door, swiftly and reliably. Convenience and indulgence, all in one
                    package.
                </p>

                <Button variant='secondary' className='mt-8 w-fit px-8'>
                    Shop Now
                </Button>
            </div>

            <Image
                src='/chocolate.jpg'
                alt='Hero Chocolate'
                fill
                className='-z-10 object-cover'
            />

        </section>
    )
}

export default Hero