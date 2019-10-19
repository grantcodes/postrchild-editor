import {
  AutoForm,
  ComposableForm,
  // Audio,
  Content,
  // Featured,
  // Location,
  MpSlug,
  // MpSyndicateTo,
  Name,
  // Photo,
  PostStatus,
  Summary,
  // Video,
} from '@postrchild/editor-base'
import withStyledComponents from './with-styled-components'

// Import custom components
import Category from './components/Fields/Category'
import Visibility from './components/Fields/Visibility'
import LikeOf from './components/Fields/LikeOf'
import BookmarkOf from './components/Fields/BookmarkOf'
import RepostOf from './components/Fields/RepostOf'
import InReplyTo from './components/Fields/InReplyTo'
import Photo from './components/Fields/Photo'
import Featured from './components/Fields/Featured'
import Video from './components/Fields/Video'
import Audio from './components/Fields/Audio'
import Location from './components/Fields/Location'
import Checkin from './components/Fields/Checkin'
import MpSyndicateTo from './components/Fields/MpSyndicateTo'
import Published from './components/Fields/Published'
import Created from './components/Fields/Created'
import Rsvp from './components/Fields/Rsvp'
import Start from './components/Fields/Start'
import End from './components/Fields/End'

// Wrap forms with styled components
const StyledAutoForm = withStyledComponents(AutoForm)
const StyledComposableForm = withStyledComponents(ComposableForm)

export {
  StyledAutoForm as AutoForm,
  StyledComposableForm as ComposableForm,
  Audio,
  BookmarkOf,
  Category,
  Content,
  Featured,
  InReplyTo,
  LikeOf,
  Location,
  Checkin,
  MpSlug,
  MpSyndicateTo,
  Name,
  Photo,
  PostStatus,
  RepostOf,
  Summary,
  Video,
  Visibility,
  Published,
  Created,
  Rsvp,
  Start,
  End,
}
