
"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './DataTable'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';

const Productpage = () => {

  console.log("backend URL : ", process.env.NEXT_PUBLIC_API_BASE_URL);

  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })


  return (
    <>
      <div className='flex align-middle justify-between'>
        <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
        <Button size={'sm'}>Add product</Button>
      </div>

      <DataTable columns={columns} data={products || []} />
    </>
  )
}

export default Productpage