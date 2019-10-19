import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import defaultComponents from '../../default-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Wrapper = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${props => props.theme.palette.main};
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    line-height: 20px;
  }
`

const Datetime = ({
  label,
  value,
  onChange,
  showTimeSelect,
  children,
  maxDate,
  minDate,
  placeholderText,
  inputComponent: Input,
  propertyComponent: Property,
  ...props
}) => {
  return (
    <Property label={label} {...props}>
      <Wrapper>
        <DatePicker
          id={`mf2_${props.property}`}
          selected={value && value[0] ? new Date(value[0]) : null}
          allowSameDay={true}
          onChange={date => {
            const dateString = date.toISOString()
            onChange([dateString])
          }}
          showTimeSelect={showTimeSelect}
          dateFormat="yyyy-MM-dd HH:mm"
          maxDate={maxDate}
          minDate={minDate}
          placeholderText={placeholderText}
          customInput={<Input />}
        />
      </Wrapper>
      {children}
    </Property>
  )
}

Datetime.defaultProps = {
  showTimeSelect: true,
  ...defaultComponents,
}

Datetime.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Datetime
