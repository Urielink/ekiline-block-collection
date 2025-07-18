// manual.
import { ManualSave } from './variations/manual'
// galeria.
import { GallerySave } from './variations/gallery'
// contenido.
import { ContentSave } from './variations/content'
// dinamico
import { DynamicSave } from './variations/dynamic'


export default function save ({ attributes }) {
  const { ChooseType } = attributes

  switch (ChooseType) {
    case 'manual':
      return <ManualSave attributes={attributes} />
    case 'gallery':
      return <GallerySave attributes={attributes} />
    case 'content':
      return attributes.contentIsDynamic
        ? <DynamicSave attributes={attributes} />
        : <ContentSave attributes={attributes} />
    default:
      return <ManualSave attributes={attributes} />
  }
}