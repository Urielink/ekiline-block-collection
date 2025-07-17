import { ManualSave } from './variations/manual'

export default function save ({ attributes }) {
  const { ChooseType } = attributes

  switch (ChooseType) {
    case 'manual':
    default:
      return <ManualSave />
  }
}