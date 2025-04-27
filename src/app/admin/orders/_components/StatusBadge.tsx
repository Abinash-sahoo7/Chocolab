import { capitalizeFirstLetter, getStatusColor } from '@/lib/utils';
import React from 'react'

const StatusBadge = ({ status }: { status: string }) => {

    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusColor(status)}`}>
            {capitalizeFirstLetter(status)}
        </span>
    )
}

export default StatusBadge