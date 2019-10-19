import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'
import Select from 'react-select/creatable'
import defaultComponents from '../../default-components'
import { lighten, mix } from 'polished'

const Tags = styled(Select).attrs(props => ({
  classNamePrefix: 'react-select',
  isMulti: true,
}))`
  .react-select__control {
  }
`

const Category = ({
  value,
  onChange,
  propertyComponent: Property,
  ...props
}) => {
  const { mpConfig } = props
  const theme = useContext(ThemeContext)
  const suggestions = mpConfig && mpConfig.categories ? mpConfig.categories : []

  const styles = {
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? 'red' : 'blue',
    }),
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      lineHeight: 1,
      padding: theme.inputPadding.split(' ')[0],
      minHeight: '3.5em',
      border: `1px solid ${
        state.isFocused ? theme.palette.main : theme.palette.border
      }`,
      '&:hover': {
        borderColor: state.isFocused ? theme.palette.main : theme.palette.text,
      },
    }),
    valueContainer: provided => ({
      ...provided,
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      margin: -2,
    }),
    dropdownIndicator: provided => ({
      ...provided,
      marginTop: 0 - provided.padding,
      marginBottom: 0 - provided.padding,
    }),
    clearIndicator: provided => ({
      ...provided,
      marginTop: 0 - provided.padding,
      marginBottom: 0 - provided.padding,
    }),
    multiValue: provided => ({
      ...provided,
      overflow: 'hidden',
      borderRadius: theme.borderRadius,
      padding: 0,
    }),
    multiValueLabel: provided => ({
      ...provided,
      padding: theme.inputPadding + ' !important',
    }),
    multiValueRemove: provided => ({
      ...provided,
      cursor: 'pointer',
    }),
  }

  return (
    <Property label="Tags" {...props}>
      <Tags
        styles={styles}
        theme={selectTheme => ({
          ...selectTheme,
          borderRadius: theme.borderRadius,
          colors: {
            ...selectTheme.colors,
            primary: theme.palette.main,
            primary75: lighten(0.1, theme.palette.main),
            primary50: lighten(0.3, theme.palette.main),
            primary25: lighten(0.5, theme.palette.main),
            danger: theme.palette.warning,
            neutral0: mix(0, theme.palette.text, theme.palette.background),
            neutral5: mix(0.05, theme.palette.text, theme.palette.background),
            neutral10: mix(0.1, theme.palette.text, theme.palette.background),
            neutral20: mix(0.2, theme.palette.text, theme.palette.background),
            neutral30: mix(0.3, theme.palette.text, theme.palette.background),
            neutral40: mix(0.4, theme.palette.text, theme.palette.background),
            neutral50: mix(0.5, theme.palette.text, theme.palette.background),
            neutral60: mix(0.6, theme.palette.text, theme.palette.background),
            neutral70: mix(0.7, theme.palette.text, theme.palette.background),
            neutral80: mix(0.8, theme.palette.text, theme.palette.background),
            neutral90: mix(0.9, theme.palette.text, theme.palette.background),
          },
        })}
        value={value.map(item => ({ value: item, label: item }))}
        options={suggestions.map(item => ({ value: item, label: item }))}
        onChange={(newValue, actionMeta) => {
          onChange(newValue ? newValue.map(item => item.value) : [])
        }}
      />
    </Property>
  )
}

Category.defaultProps = {
  property: 'category',
  ...defaultComponents,
}

Category.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  mpConfig: PropTypes.object,
}

export default Category
