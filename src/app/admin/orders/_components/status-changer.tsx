import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ChangeOrderStatus } from '@/http/api';
import { orderStatusValue } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'

const StatusChanger = ({ orderId, currentStatus }: { orderId: number; currentStatus: string }) => {

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ['order-status'],
        mutationFn: (data: orderStatusValue) => ChangeOrderStatus(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["AllOrders"] });
            toast({
                title: "Order Status change Successfully",
            })
        },
        onError: (err) => {
            console.log('Error occure while changing status : ', err);
            toast({
                title: "Something went wrong! ",
            })
        }
    })

    return (
        <Select defaultValue={currentStatus} onValueChange={(value) => {
            mutate({ status: value, orderId })
        }}>
            <SelectTrigger >
                <SelectValue placeholder={currentStatus} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default StatusChanger