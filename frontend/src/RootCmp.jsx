import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useState } from 'react'
import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/HeaderCmps/AppHeader'
import { StayPayment } from './pages/StayPayment'
import { UserTrips } from './pages/UserTrips'
import { AppFooter } from './cmps/AppFooter'
import { StayEdit } from './pages/StayEdit'
import { UserDashboard } from './pages/UserDashboard'
import './style/main.css'
import { UserWishlist } from './pages/UserWishlist'

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
        <body>
          <main>
            <Routes>
              <Route path='/' element={<StayIndex scrolledPage={scrolledPage} />} />
              <Route path='/:stayId' element={<StayDetails />} />
              <Route path='/:stayId/payment' element={<StayPayment />} />
              <Route path='/trips' element={<UserTrips />} />
              <Route path='/dashboard' element={<UserDashboard />}></Route>
              <Route path='/edit' element={<StayEdit />} />
              <Route path='/edit/:stayId' element={<StayEdit />} />
              <Route path='/wishlist' element={<UserWishlist />} />
            </Routes>
          </main>
        </body>
        <AppFooter />
      </Router>
    </Provider>
  )
}
