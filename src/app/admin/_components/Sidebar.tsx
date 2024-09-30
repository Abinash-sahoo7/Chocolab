import React from 'react'
import Link from "next/link"
import {
    Bell,
    Blocks,
    HomeIcon,
    Layers,
    Package2,
    ShoppingBag,
    User,
    Warehouse,
} from "lucide-react"


import { Button } from "@/components/ui/button"

export const navitems = [
    { label: "Dashboard", href: "/admin", icon: HomeIcon },
    { label: "products", href: "/admin/products", icon: Layers },
    { label: "warehouses", href: "/admin/warehouses", icon: Warehouse },
    { label: "Delivery Persons", href: "/admin/delivery_persons", icon: User },
    { label: "orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Inventory", href: "/admin/inventory", icon: Blocks },
]

const SideBar = () => {



    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Choco Lab</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

                        {navitems.map((Item) => {
                            return (
                                <Link href={Item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                >
                                    <Item.icon className='h-4 w-4' />
                                    {Item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SideBar