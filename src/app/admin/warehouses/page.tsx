
"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from './DataTable'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query';
import { getAllWarehouses } from '@/http/api';
import { Product } from '@/types';
import { Loader2 } from 'lucide-react';
import WareHouseSheet from './Warehouse-sheet';
import { useNewWarehouseState } from '@/store/warehouse/warehouse-store';


const WareHousePage = () => {

  const { onOpen } = useNewWarehouseState();
  const { data: warehouses, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ['warehouses'],
    queryFn: getAllWarehouses,
  })


  return (
    <>
      <div className='flex align-middle justify-between'>
        <h3 className='text-2xl font-bold tracking-tight'>Warehouses</h3>
        <Button size={'sm'} onClick={onOpen} >Add Warehouse</Button>
      </div>

      {
        isError && (<div className='font-bold'>
          <h3 className='text-red-500'>Something Went Wrong!</h3>
        </div>)
      }

      {
        isLoading ? (<div className='flex items-center justify-center'>
          <Loader2 className='size-10 animate-spin' />
        </div>) : (<DataTable columns={columns} data={warehouses || []} />)
      }


      <WareHouseSheet />
    </>
  )
}

export default WareHousePage