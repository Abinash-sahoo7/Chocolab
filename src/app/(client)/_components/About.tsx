import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const About = () => {
    return (
        <section className='mx-auto max-w-6xl px-5 py-14 md:py-20'>
            <div className='px-10 py-14 rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent max-w-4xl mx-auto flex justify-center items-center flex-col'>

                <div className='flex justify-center items-center gap-6'>
                    <Separator className='w-20 bg-brown-900 h-0.5' />
                    <h2 className='text-3xl font-bold tracking-tight text-brown-900'>About</h2>
                    <Separator className='w-20 bg-brown-900 h-0.5' />
                </div>

                <p className='text-center mt-10 w-10/12'>
                    Increase heart health: The antioxdiants in dark chocolate have been shown to lower blood pressure, reduce the risk of clotting and increase blood circulation to the heart disease. increase heart health: The antioxidants in dark chocolates have been shown to lower blood.
                </p>

                <Button className='mt-10 bg-brown-900 hover:bg-brown-800 active:bg-brown-700 px-8'>
                    Shop Now
                </Button>
            </div>

        </section>
    )
}

export default About