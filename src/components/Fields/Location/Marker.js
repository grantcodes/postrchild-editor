import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Overlay from 'pigeon-overlay'

const MarkerIcon = styled.div`
  display: block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: -${props => props.size / 2}px 0 0 -${props => props.size / 2}px;
  border-radius: ${props => props.size / 2}px;
  border: 2px solid ${props => props.theme.palette.background};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  color: ${props => props.theme.palette.background};
  background-color: ${props => props.color || props.theme.palette.main};
`

const Marker = ({ size, children, ...props }) => (
  <Overlay {...props}>
    <MarkerIcon size={size}>{children}</MarkerIcon>
  </Overlay>
)

export default Marker

Marker.defaultProps = {
  size: 16,
}

Marker.propTypes = {
  anchor: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
}
