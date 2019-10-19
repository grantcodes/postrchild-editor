export const fromLocation = location => {
  if (typeof location === 'string') {
    location = location.replace('geo:', '')
    const semiIndex = location.indexOf(';')
    if (semiIndex > -1) {
      semiIndex = semiIndex.substring(0, semiIndex)
    }
    return location.split(',').map(parseFloat)
  }

  if (
    location &&
    location.properties &&
    location.properties.longitude &&
    location.properties.latitude
  ) {
    return [location.properties.latitude[0], location.properties.longitude[0]]
  }

  return null
}

export const toGeoUri = ([lat, lng]) => `geo:${lat},${lng}`
