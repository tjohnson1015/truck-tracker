import './App.css'
import { Route, Routes } from 'react-router'
import { useLoadScript } from '@react-google-maps/api'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import PrimaryNav from './components/PrimaryNav'
import Protected from './components/Protected'
import Favorites from './routes/Favorites'
import ListView from './routes/ListView'
import Events from './routes/Events'
import VendorSchedule from './routes/VendorSchedule'
import VendorDash from './routes/VendorDash'
import VendorTruck from './routes/VendorTruck'

const libraries = ['places']

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDgSGJuh9RZqSHclpXXipMHaP95RsvtbZY',
    // @ts-ignore
    libraries,
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div className="App">
      <PrimaryNav />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/favorites"
          element={
            <Protected>
              <Favorites />
            </Protected>
          }
        />
        <Route
          path="/listview"
          element={
            <Protected>
              <ListView />
            </Protected>
          }
        />
        <Route
          path="/events"
          element={
            <Protected>
              <Events />
            </Protected>
          }
        />
        <Route
          path="/vendordash"
          element={
            <Protected>
              <VendorDash />
            </Protected>
          }
        />
        <Route
          path="/vendorschedule"
          element={
            <Protected>
              <VendorSchedule />
            </Protected>
          }
        />
        <Route
          path="/vendortruck"
          element={
            <Protected>
              <VendorTruck />
            </Protected>
          }
        />
      </Routes>
    </div>
  )
}

export default App
