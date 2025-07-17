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
  }
}

export default sharedAttributes