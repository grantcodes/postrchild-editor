import React from 'react'
import PropTypes from 'prop-types'
import defaultComponents from '../../default-components'
import { CheckGroup, CheckGroupItem } from '../Util'

const MpSyndicateTo = ({
  value,
  onChange,
  syndication,
  propertyComponent: Property,
  ...props
}) => {
  const { mpConfig } = props
  if (mpConfig['syndicate-to']) {
    syndication = mpConfig['syndicate-to']
  }
  if (!syndication || !syndication.length) {
    return null
  }

  return (
    <Property label="Syndication" {...props}>
      <CheckGroup>
        {syndication.map(service => {
          let checked = false
          let { name, uid } = service
          // if (service.service && service.service.name) {
          //   name = service.service.name
          // }
          if (value && value.indexOf(uid) > -1) {
            checked = true
          }

          return (
            <CheckGroupItem
              key={uid}
              checked={checked}
              onChange={e => {
                let selectedServices = value || []
                const existingIndex = selectedServices.indexOf(uid)
                if (existingIndex > -1) {
                  selectedServices.splice(existingIndex, 1)
                } else {
                  selectedServices.push(uid)
                }
                onChange([...selectedServices])
              }}
              value={uid}
              photoSrc={
                service.user && service.user.photo ? service.user.photo : null
              }
              photoAlt={
                service.user && service.user.name ? service.user.name : null
              }
              iconSrc={
                service.service && service.service.photo
                  ? service.service.photo
                  : null
              }
              iconAlt={
                service.service && service.service.name
                  ? service.service.name
                  : null
              }
            >
              {name}
            </CheckGroupItem>
          )
        })}
      </CheckGroup>
    </Property>
  )
}

MpSyndicateTo.defaultProps = {
  property: 'mp-syndicate-to',
  ...defaultComponents,
}

MpSyndicateTo.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  syndication: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
}

export default MpSyndicateTo
