import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'

export default function save({ attributes }) {
  function addClassnames(data) {
    if (data === 'offcanvas') {
      return 'offcanvas offcanvas-end'
    }
    return data + ' navbar-collapse'
  }

  const blockProps = useBlockProps.save({
    className: addClassnames(attributes.parentNavStyle) + attributes.parentAlignItems
  })

  if (attributes.parentNavPosition === ' fixed-bottom' || attributes.parentNavPosition === ' sticky-bottom') {
    blockProps.className += ' order-first'
  }

  function addClassnamesBtn(data) {
    switch (data) {
      case ' navbar-expand-lg':
        return ' d-lg-none'
      case ' navbar-expand-sm':
        return ' d-sm-none'
      case ' navbar-expand':
        return ' d-none'
      default:
        return ''
    }
  }

  return (
    <div {...blockProps}>
      {attributes.parentNavStyle === 'offcanvas' && (
        <button
          type='button'
          class={'btn-close' + addClassnamesBtn(attributes.parentNavShow)}
          data-bs-dismiss='offcanvas'
          aria-label='Close'
        />
      )}
      <InnerBlocks.Content />
    </div>
  )
}