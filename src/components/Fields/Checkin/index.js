import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Map from 'pigeon-maps'
import defaultComponents from '../../../default-components'
import { Warning } from '../../Util'
import Search from '../Location/Search'
import Marker from '../Location/Marker'
import Action from '../Location/Action'
import Nearby from './Nearby'
import placeToHCard from '../Location/lib/place-to-hcard'
import { fromLocation } from '../Location/lib/lat-lng-converter'
import {
  Delete as RemoveIcon,
  Place as CheckinIcon,
} from 'styled-icons/material'

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
  left: 10px;
`

const Checkin = ({
  value,
  onChange,
  // buttonComponent: Button,
  propertyComponent: Property,
  ...props
}) => {
  const [zoom, setZoom] = useState(value && value[0] ? 12 : 3)
  const [geo, setGeo] = useState(null)

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

  useEffect(() => {
    if (hasGeo) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        if (pos && pos.coords) {
          const location = [pos.coords.latitude, pos.coords.longitude]
          setGeo(location)
          setZoom(14)
        }
      })
    }
  }, [])

  const hasCheckin = !!(value && value[0])

  if (!hasGeo || !hasGooglePlaces) {
    return <Warning>Cannot obtain location data for the checkin</Warning>
  }

  return (
    <Property label="Checkin" {...props}>
      <Wrapper>
        <div className="postrchild-editor-map">
          <Map
            center={hasCheckin ? fromLocation(value[0]) : geo || [0, 0]}
            defaultZoom={hasCheckin ? 15 : 9}
            zoom={zoom}
            defaultWidth={600}
            height={400}
            metaWheelZoom
          >
            {!!geo && <Marker size={12} anchor={geo} />}
            {hasCheckin && (
              <Marker size={26} anchor={fromLocation(value[0])}>
                <CheckinIcon size={22} />
              </Marker>
            )}
          </Map>
        </div>

        <Search
          radius={100}
          location={geo ? new google.maps.LatLng(...geo) : null}
          onSuggestSelect={location => {
            onChange([location])
            setZoom(15)
          }}
        />

        {!!geo && (
          <Nearby
            location={geo}
            selected={value && value[0]}
            onSelect={place => {
              onChange([place])
              setZoom(15)
            }}
          />
        )}

        <Actions>
          {hasCheckin && (
            <Action
              onClick={e => {
                e.preventDefault()
                onChange([])
                setZoom(14)
              }}
              title="Remove Checkin"
            >
              Remove Checkin
              <RemoveIcon />
            </Action>
          )}
        </Actions>
      </Wrapper>
    </Property>
  )
}

Checkin.defaultProps = {
  property: 'checkin',
  ...defaultComponents,
}

Checkin.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
}

export default Checkin
