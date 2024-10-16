
"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from '../_components/DataTable'
import { columns } from './columns'
import { useQuery } from '@tanstack/react-query';
import { getAllDeliveryPersons, getAllWarehouses } from '@/http/api';
import { DeliveryPerson } from '@/types';
import { Loader2 } from 'lucide-react';
import { useNewWarehouseState } from '@/store/warehouse/warehouse-store';
import DeliveryPersonSheet from './deliveryPerson-sheet';


const DeliveryPersonPage = () => {

  const { onOpen } = useNewWarehouseState();
  const { data: deliveryPersons, isLoading, isError, error } = useQuery<DeliveryPerson[]>({
    queryKey: ['deliverypersons'],
    queryFn: getAllDeliveryPersons,
  })
  console.log("deliveryPersons : ", deliveryPersons);


  return (
    <>
      <div className='flex align-middle justify-between'>
        <h3 className='text-2xl font-bold tracking-tight'>Delivery Persons</h3>
        <Button size={'sm'} onClick={onOpen}  >Add DeliveryPerson</Button>
      </div>

      {
        isError && (<div className='font-bold'>
          <h3 className='text-red-500'>Something Went Wrong!</h3>
        </div>)
      }

      {
        isLoading ? (<div className='flex items-center justify-center'>
          <Loader2 className='size-10 animate-spin' />
        </div>) : (<DataTable columns={columns} data={deliveryPersons || []} />)
      }


      <DeliveryPersonSheet />
    </>
  )
}

export default DeliveryPersonPage