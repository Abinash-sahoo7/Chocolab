
"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';
import ProductSheet from './Product-sheet';
import { useNewProductState } from '@/store/product/product-store';
import { Loader2 } from 'lucide-react';
import { DataTable } from '../_components/DataTable';


const Productpage = () => {

  const { onOpen } = useNewProductState();
  const { data: products, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })


  return (
    <>
      <div className='flex align-middle justify-between'>
        <h3 className='text-2xl font-bold tracking-tight'>Products</h3>
        <Button size={'sm'} onClick={onOpen} >Add product</Button>
      </div>

      {
        isError && (<div className='font-bold'>
          <h3 className='text-red-500'>Something Went Wrong!</h3>
        </div>)
      }

      {
        isLoading ? (<div className='flex items-center justify-center'>
          <Loader2 className='size-10 animate-spin' />
        </div>) :
          (<DataTable columns={columns} data={products || []} />)
      }

      <ProductSheet />
    </>
  )
}

export default Productpage