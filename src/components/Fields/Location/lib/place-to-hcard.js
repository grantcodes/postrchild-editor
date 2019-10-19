export default function(place) {
  let properties = {
    latitude: [place.geometry.location.lat()],
    longitude: [place.geometry.location.lng()],
  }

  if (place.name) {
    properties.name = [place.name]
  }

  if (place.website) {
    properties.url = [place.website]
  } else if (place.url) {
    properties.url = [place.url]
  }

  if (place.international_phone_number) {
    properties.tel = [place.international_phone_number]
  }

  if (place.photos) {
    properties.photo = place.photos.map(photo => photo.getUrl())
  }

  if (place.formatted_address) {
    properties.adr = [place.formatted_address]
  }

  return {
    type: ['h-card'],
    properties,
  }
}
