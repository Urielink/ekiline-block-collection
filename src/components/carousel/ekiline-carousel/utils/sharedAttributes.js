// src/components/ekiline-carousel/utils/sharedAttributes.js

const sharedAttributes = {
  ChooseType: {
    type: 'string',
    default: 'manual'
  },
  SetColumns: {
    type: 'number',
    default: 1
  },
  AddControls: {
    type: 'boolean',
    default: true
  },
  AddIndicators: {
    type: 'boolean',
    default: true
  },
  SetAuto: {
    type: 'boolean',
    default: true
  },
  SetTime: {
    type: 'number',
    default: 5000
  },
  SetAnimation: {
    type: 'string',
    default: ''
  },
  SetHeight: {
    type: 'number',
    default: 480
  },
  // galeria.
  GalleryImages: {
    type: 'array',
    default: []
  },
  // contenidos.
  contentPostType: {
    type: 'string',
    default: 'post'
  },
  contentCategory: {
    type: 'string',
    default: ''
  },
  contentPostsPerPage: {
    type: 'number',
    default: 6
  },
  contentOrder: {
    type: 'string',
    default: 'desc'
  },
  contentOrderBy: {
    type: 'string',
    default: 'date'
  },
  // atributos para guardar contenido en carrusel.
  contentIsDynamic: {
    type: 'boolean',
    default: false
  },
  posts: {
    type: 'array',
    default: []
  }
}

export default sharedAttributes