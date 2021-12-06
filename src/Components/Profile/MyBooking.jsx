import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import PastBooking from './PastBooking';
import { Context } from '../../Data/context';
import axios from 'axios';
import API from '../../Config/api';
import CurrentBooking from './CurrentBooking';


const MyBooking = () => {

    const { userData } = useContext(Context)
    const [activeTab, setActiveTab] = useState('1');
    const [bookingList, setBookingList] = useState([])

    //TOGGLE FOR PAST BOOKING AND ONGOIN BOOKING
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    //API CALL FOR BOOKING HISTORY LIST
    const fetchBookingHistoryList = useCallback(() => {
        // car getAllBooking List
        let url = API + `getAllBooking`;
        const config = {
            headers: {
                Authorization: `${userData.token}`,
            }
        };
        const body = {
            "isUpcommingbookings": activeTab === '1' ? true : false,
            "isPastbookings": activeTab === '2' ? true : false,
            "isEventBooking": false,
            "skip": 0,
            "limti": 10
        }
        console.log(body, 'booking history');
        axios
            .post(url, body, config)
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response.data.data)
                    setBookingList(response.data.data)
                }
            })
            .catch((err) => {
                console.log("error here", err);
            });
    }, [activeTab]);

    useEffect(() => {
        fetchBookingHistoryList()
    }, [fetchBookingHistoryList])


    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Ongoing Booking
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Past Booking
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <CurrentBooking
                        bookingList={bookingList}
                    />
                </TabPane>
                <TabPane tabId="2">
                    <PastBooking
                        bookingList={bookingList}
                    />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default MyBooking
