import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Geosuggest from 'react-geosuggest'
import placeToHCard from './lib/place-to-hcard'

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  .geosuggest__input {
    display: block;
    width: 15em;
    max-width: 100%;
    font-size: 0.8em;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.palette.text};
    background: ${props => props.theme.palette.background};
    border: 1px solid ${props => props.theme.palette.border};
    line-height: ${props => props.theme.inputLineHeight};
    padding: ${props => props.theme.inputPadding};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    outline: none;
    opacity: 0.8;

    :focus {
      opacity: 1;
    }
  }

  .geosuggest__suggests {
    display: block;
    margin: 0.2em 0 0 0;
    padding: 0;
    list-style: none;
    width: 20em;
    max-width: 100%;
    font-size: 0.9em;
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.palette.text};
    background: ${props => props.theme.palette.background};
    border: 1px solid ${props => props.theme.palette.border};
    line-height: ${props => props.theme.inputLineHeight};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    &.geosuggest__suggests--hidden {
      display: none;
    }
  }

  .geosuggest__item {
    padding: ${props => props.theme.inputPadding};
    transition: background-color 0.2s, color 0.2s;
    cursor: pointer;

    :hover,
    :focus {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.geosuggest__item--active {
      color: ${props => props.theme.palette.background};
      background-color: ${props => props.theme.palette.main};
    }
  }
`

const Search = ({ onSuggestSelect, ...props }) => (
  <Wrapper>
    <Geosuggest
      {...props}
      onSuggestSelect={place => {
        if (place && place.gmaps) {
          const location = placeToHCard(place.gmaps)
          onSuggestSelect(location)
        }
      }}
    />
  </Wrapper>
)

Search.defaultProps = {}

Search.propTypes = { onSuggestSelect: PropTypes.func.isRequired }

export default Search
