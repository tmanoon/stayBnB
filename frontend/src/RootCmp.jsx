import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useState } from 'react'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { StayPayment } from './pages/StayPayment'
import { UserTrips } from './pages/UserTrips'
import { UserDashboard } from './pages/UserDashboard'
import { UserWishlist } from './pages/UserWishlist'
import { UserMessages } from './pages/UserMessages'
import { StayEdit } from './pages/StayEdit'

import './style/main.css'
import { UserNotification } from './cmps/UserNotification'

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
