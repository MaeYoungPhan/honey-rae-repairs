import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleCustomer } from "../ApiManager"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const  [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            let aCustomer = getSingleCustomer(customerId, updateCustomer)
                    updateCustomer(aCustomer[0])
        },
        [customerId]
    )

    return <section className="customer" >
    <header className="customer_header">{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Address: {customer?.address}</div>
    <div>Phone: {customer?.phoneNumber}</div>
    <footer className="customer_footer">A valued customer.</footer>
</section>
}
