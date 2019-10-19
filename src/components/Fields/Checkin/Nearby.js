import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import placeToHCard from '../Location/lib/place-to-hcard'
import { Cancel as CloseIcon, Menu as OpenIcon } from 'styled-icons/material'
import { darken } from 'polished'

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  max-height: 90%;
  max-height: calc(100% - 30px);
  overflow: auto;
  width: 20em;
  max-width: 100%;
  max-width: calc(100% - ${props => (props.open ? 20 : 60)}px);
  font-size: 0.9em;
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.palette.text};
  background: ${props => props.theme.palette.background};
  border: 1px solid ${props => props.theme.palette.border};
  line-height: ${props => props.theme.inputLineHeight};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: ${props => props.theme.inputPadding};
  background-color: ${props => darken(0.06, props.theme.palette.background)};
  border-top: 1px solid ${props => props.theme.palette.border};

  svg {
    display: block;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`

const Title = styled.h5`
  font-size: 1em;
  font-weight: bold;
  margin: 0;
`

const List = styled.ol`
  display: block;
  list-style: none;
  padding: 0;
  margin: 0;
`

const Item = styled.li`
  display: block;
  margin: 0;
  padding: ${props => props.theme.inputPadding};
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;

  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${props =>
    props.selected &&
    `
    color: ${props.theme.palette.background};
    background-color: ${props.theme.palette.main};
  `}
`

const Nearby = ({ location, onSelect, selected }) => {
  const [open, setOpen] = useState(true)
  const [hCards, setHCards] = useState([])

  useEffect(() => {
    if (!location) {
      console.error('Missing location')
    } else {
      const map = document.createElement('div')
      const service = new google.maps.places.PlacesService(map)

      const request = {
        location: new google.maps.LatLng(...location),
        radius: '200',
        openNow: true,
      }

      service.nearbySearch(request, (places, status) => {
        setHCards(places.map(placeToHCard))
      })
    }
  }, [location])

  if (!location || !hCards.length) {
    return null
  }

  return (
    <Container open={open}>
      <Header onClick={e => (open ? null : setOpen(true))}>
        <Title>Nearby</Title>
        {open ? (
          <CloseIcon
            size="1.2em"
            title="Hide Nearby Places"
            onClick={e => setOpen(false)}
          />
        ) : (
          <OpenIcon
            size="1.2em"
            title="Show Nearby Places"
            onClick={e => setOpen(true)}
          />
        )}
      </Header>
      {!!open && (
        <List>
          {hCards.map((hCard, i) => (
            <Item
              selected={
                selected &&
                selected.properties.name[0] === hCard.properties.name[0] &&
                selected.properties.latitude[0] ===
                  hCard.properties.latitude[0] &&
                selected.properties.longitude[0] ===
                  hCard.properties.longitude[0]
              }
              onClick={e => {
                onSelect(hCard)
                setOpen(false)
              }}
              key={`checkin-hcard-${hCard.properties.name}-${i}`}
            >
              {hCard.properties.name}
            </Item>
          ))}
        </List>
      )}
    </Container>
  )
}

Nearby.defaultProps = {}

Nearby.propTypes = {
  location: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default Nearby
