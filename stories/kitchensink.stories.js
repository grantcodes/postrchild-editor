import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  ComposableForm,
  Audio,
  BookmarkOf,
  Category,
  Content,
  Featured,
  InReplyTo,
  LikeOf,
  Location,
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
} from '../src'

// Demo Component
const ComposableFormDemo = ({ initialProperties = {}, ...props }) => {
  const [properties, setProperties] = useState(initialProperties)

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <ComposableForm
        {...props}
        properties={properties}
        onChange={newProperties => {
          setProperties(newProperties)
          action('onChange')(newProperties)
        }}
        mpConfig={{
          categories: ['predefined', 'categories', 'indieweb'],
          // properties: ['content', 'name', 'post-status'],
          // visibility: ['hidden', 'shown'],
          'syndicate-to': [
            {
              uid: 'https://archive.org/',
              name: 'archive.org',
            },
            {
              uid: 'https://wikimedia.org/',
              name: 'WikiMedia',
            },
            {
              uid: 'https://myfavoritesocialnetwork.example/aaronpk',
              name: 'aaronpk on myfavoritesocialnetwork',
              service: {
                name: 'My Favorite Social Network',
                url: 'https://myfavoritesocialnetwork.example/',
                photo: 'https://placeimg.com/100/100',
              },
              user: {
                name: 'aaronpk',
                url: 'https://myfavoritesocialnetwork.example/aaronpk',
                photo: 'https://placeimg.com/300/300',
              },
            },
          ],
        }}
      />
    </div>
  )
}

const section = storiesOf('Components', module)

section.add(
  'Kitchen Sink',
  () => (
    <ComposableFormDemo initialProperties={{}}>
      <Published />
      <Created />
      <MpSyndicateTo />
      <Name />
      <MpSlug />
      <Featured />
      <Category />
      <Content />
      <Summary />
      <InReplyTo />
      <BookmarkOf />
      <RepostOf />
      <LikeOf />
      <Photo />
      <Video />
      <Audio />
      <Location />
      <Visibility />
      <PostStatus />
    </ComposableFormDemo>
  ),
  {
    notes: {
      markdown: `
      \`ComposableForm\` is a container component that you can use to create advanced forms using child field components,
      the child components are passed the values from the \`properties\` prop.

      The returned properties are automatically cleaned up, there will not be empty properties.

      ~~~jsx
      import React, { useState } from 'react'
      import { ComposableForm , InReplyTo, Content } from '@postrchild/editor-base'

      const MyForm = () => {
        const [properties, setProperties] = useState({
          'in-reply-to': ['https://example.com'],
          content: ['Reply content'],
        })

        return (
          <ComposableForm
            properties={properties}
            onChange={setProperties}
          >
            <InReplyTo />
            <Content />
          </ComposableForm>
        )
      }
      ~~~
    `,
    },
  }
)
