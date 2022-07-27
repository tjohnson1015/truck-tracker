import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
import '../App.css'

function SearchBar() {
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
  }

  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
            <input {...getInputProps({ placeholder: 'Type your City here', className: 'location-search-input' })} />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#C6C6C6' : '#fff',
                  outerWidth: '50%',
                }
                return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default SearchBar
