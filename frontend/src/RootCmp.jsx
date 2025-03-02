import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useState } from 'react'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserNotification } from './cmps/UserNotification'

import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { StayPayment } from './pages/StayPayment'
import { UserTrips } from './pages/UserTrips'
import { UserDashboard } from './pages/UserDashboard'
import { UserWishlist } from './pages/UserWishlist'
import { UserMessages } from './pages/UserMessages'
import { StayEdit } from './pages/StayEdit'

import './style/main.css'

export function RootCmp() {

  const [scrolledPage, setScrolledPage] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      setScrolledPage(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)

    return () => { window.removeEventListener('scroll', handleScroll) }
  }, [scrolledPage])

    // First console visit check and console log
    useEffect(() => {
      if (!sessionStorage.getItem('messageShown')) {
        console.log(
          '%cWelcome to StayBnB! \n\n%cLooking for great web developers? \nWe\'re looking for jobs. Contact us! \n\n%cJenny Lottner-Tover: \n%chttps://www.linkedin.com/in/jenny-lottner-tover-7b1357261 \n\n%cShoval Sabag: \n%chttps://www.linkedin.com/in/shoval-sabag-2b2305308\n',
          'color: #fc2f65; font-size: 20px; font-weight: bold;',  // Title style
          'color: #fd7a7a; font-size: 14px;', // Subtitle style
          'color: #ffa8a8; font-size: 14px;',  // Name style
          'font-size: 12px; font-weight: normal;', // Link style
          'color: #ffa8a8; font-size: 14px;', // Name style
          'font-size: 12px; font-weight: normal;' // Link style
        )
        sessionStorage.setItem('messageShown', 'true')
      }
    }, [])

  return (
    <Provider store={store}>
      <Router>
        <AppHeader scrolledPage={scrolledPage} />
        <main>
          <Routes>
            <Route path='/' element={<StayIndex scrolledPage={scrolledPage} />} />
            <Route path='/:stayId' element={<StayDetails />} />
            <Route path='/:stayId/payment' element={<StayPayment />} />
            <Route path='/trips' element={<UserTrips />} />
            <Route path='/dashboard' element={<UserDashboard />}></Route>
            <Route path='/wishlist' element={<UserWishlist />} />
            <Route path='/messages' element={<UserMessages />} />
            <Route path='/edit' element={<StayEdit />} />
            <Route path='/edit/:stayId' element={<StayEdit />} />
          </Routes>
        </main>
        <UserNotification />
        <AppFooter />
      </Router>
    </Provider>
  )
}
