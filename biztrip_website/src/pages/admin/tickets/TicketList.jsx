import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

const TicketList = () => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.ticket.status)
    useEffect(() => {
        
    }, [dispatch, status])
    return (
        <div>
            tickets
        </div>
    );
};

export default TicketList;