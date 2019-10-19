import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Map from 'pigeon-maps'
import Marker from './Marker'
import Action from './Action'
import Search from './Search'
import defaultComponents from '../../../default-components'
import * as latLngConverter from './lib/lat-lng-converter'
import placeToHCard from './lib/place-to-hcard'
import {
  Close as CancelIcon,
  Delete as RemoveIcon,
  MyLocation as LocationIcon,
  TouchApp as CustomLocationIcon,
} from 'styled-icons/material'

const Button = defaultComponents.buttonComponent
// const Input = defaultComponents.buttonComponent

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: ${props => props.theme.palette.background};
  border: 1px solid ${props => props.theme.palette.border};
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;

  & .postrchild-editor-map > div {
    display: block !important;
  }
`

const Actions = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
`

const Location = ({
  value,
  onChange,
  // buttonComponent: Button,
  propertyComponent: Property,
  ...props
}) => {
  const [zoom, setZoom] = useState(value && value[0] ? 12 : 3)
  const [selectingCustomLocation, setSelectingCustomLocation] = useState(false)

  const hasLocation = !!(value && value[0])

  const hasGeo = !(
    typeof window === 'undefined' ||
    !window.navigator ||
    !window.navigator.geolocation
  )

  const hasGooglePlaces =
    typeof window !== 'undefined' &&
    window.google &&
    window.google.maps &&
    window.google.maps.places

  const getLocation = e => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    window.navigator.geolocation.getCurrentPosition(pos => {
      if (pos && pos.coords) {
        const location = latLngConverter.toGeoUri([
          pos.coords.latitude,
          pos.coords.longitude,
        ])
        onChange([location])
        if (zoom < 12) {
          setZoom(12)
        }
      }
    })
  }

  const handleMapClick = ({ latLng }) => {
    const location = latLngConverter.toGeoUri(latLng)
    onChange([location])
    setSelectingCustomLocation(false)
    if (zoom < 12) {
      setZoom(12)
    }
  }

  return (
    <Property label="Location" {...props}>
      <Wrapper>
        <div className="postrchild-editor-map">
          <Map
            center={
              hasLocation ? latLngConverter.fromLocation(value[0]) : [0, 0]
            }
            defaultZoom={hasLocation ? 12 : 2}
            zoom={zoom}
            defaultWidth={600}
            height={400}
            metaWheelZoom
            onClick={selectingCustomLocation ? handleMapClick : null}
          >
            {hasLocation && (
              <Marker location={latLngConverter.fromLocation(value[0])} />
            )}
          </Map>
        </div>

        {hasGooglePlaces && (
          <Search
            onSuggestSelect={location => {
              onChange([location])
              setZoom(13)
            }}
          />
        )}

        <Actions>
          {hasGeo && (
            <Action
              onClick={getLocation}
              title={hasLocation ? 'Update Location' : 'Get Current Location'}
            >
              {hasLocation ? 'Update Location' : 'Get Current Location'}
              <LocationIcon />
            </Action>
          )}

          <Action
            onClick={e => setSelectingCustomLocation(!selectingCustomLocation)}
            title={
              selectingCustomLocation
                ? 'Cancel Selecting Custom Location'
                : 'Select Custom Location'
            }
          >
            {selectingCustomLocation
              ? 'Cancel Selecting Custom Location'
              : 'Select Custom Location'}
            {selectingCustomLocation ? <CancelIcon /> : <CustomLocationIcon />}
          </Action>

          {hasLocation && (
            <Action
              onClick={e => {
                e.preventDefault()
                onChange([])
                setZoom(3)
              }}
              title="Remove Location"
            >
              Remove Location
              <RemoveIcon />
            </Action>
          )}
        </Actions>
      </Wrapper>
    </Property>
  )
}

Location.defaultProps = {
  property: 'location',
  ...defaultComponents,
}

Location.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
}

export default Location
