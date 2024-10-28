'use client'
import { useEffect, useState } from 'react'
import { setDefaults, fromAddress } from 'react-geocode'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import Spinner from './Spinner'

const PropertyMap = ({ property }) => {
  const [latitude, setLatitude] = useState(null)
  const [longtitude, setLongtitude] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longtitude: 0,
    zoom: 9,
    width: '100%',
    height: '500px',
  })
  const [loading, setLoading] = useState(true)
  const [geocodeError, setGeocodeError] = useState(false)

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  })

  // request fromAddress to get lat/long; run when component mounts;
  // this is asynchronous so create an async function
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        )

        // check Geocode results
        if (res.results.length === 0) {
          setGeocodeError(true)
          return
        }

        // if res.results then destructure lat,lng results
        const { lat, lng } = res.results[0].geometry.location
        console.log(lat, lng)
        setLatitude(lat)
        setLongtitude(lng)
        setViewport({
          ...viewport,
          latitude: latitude,
          longtitude: longtitude,
        })
      } catch (error) {
        console.log(error)
        setGeocodeError(true)
      } finally {
        // need to setLoading to false even if its an error
        setLoading(false)
      }
    }

    // lets call the function to run
    fetchCoords()
  }, [])

  if (loading) return <Spinner />
  if (geocodeError)
    return <div className='text-3xl'>No Location Data Found</div>

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: longtitude,
          latitude: latitude,
          zoom: 10,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={longtitude} latitude={latitude} anchor='bottom'>
          <Image src={pin} alt='location' width={40} height={40} />
        </Marker>
      </Map>
    )
  )
}

export default PropertyMap
