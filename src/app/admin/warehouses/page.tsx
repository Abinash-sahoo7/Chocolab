
"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAllWarehouses } from '@/http/api';
import { Warehouse } from '@/types';
import { Loader2 } from 'lucide-react';
import WareHouseSheet from './_components/Warehouse-sheet';
import { useNewWarehouseState } from '@/store/warehouse/warehouse-store';
import { DataTable } from '../_components/DataTable';
import { columns } from './_components/columns';


const WareHousePage = () => {

  const { onOpen } = useNewWarehouseState();
  const { data: warehouses, isLoading, isError, error } = useQuery<Warehouse[]>({
    queryKey: ['warehouses'],
    queryFn: getAllWarehouses,
  })
  console.log("warehouses : ", warehouses);

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