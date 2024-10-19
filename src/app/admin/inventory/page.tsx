
"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from '../_components/DataTable'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query';
import { getAllInventories } from '@/http/api';
import { Inventory } from '@/types';
import { Loader2 } from 'lucide-react';
import { useNewInventoryState } from '@/store/inventory/inventory-store';
import InventorySheet from './_components/inventory-sheet';


const InventoryPage = () => {

  const { onOpen } = useNewInventoryState();
  const { data: inventories, isLoading, isError, error } = useQuery<Inventory[]>({
    queryKey: ['inventories'],
    queryFn: getAllInventories,
  })

  console.log("inventories : ", inventories);

  return (
    <>
      <div className='flex align-middle justify-between'>
        <h3 className='text-2xl font-bold tracking-tight'>Inventory</h3>
        <Button size={'sm'} onClick={onOpen}>Add Inventory</Button>
      </div>

      {
        isError && (<div className='font-bold'>
          <h3 className='text-red-500'>Something Went Wrong!</h3>
        </div>)
      }

      {
        isLoading ? (<div className='flex items-center justify-center'>
          <Loader2 className='size-10 animate-spin' />
        </div>) : (<DataTable columns={columns} data={inventories || []} />)
      }


      <InventorySheet />
    </>
  )
}

export default InventoryPage