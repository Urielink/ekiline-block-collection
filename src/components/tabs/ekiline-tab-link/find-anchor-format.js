import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose, ifCondition } from '@wordpress/compose';
import { registerFormatType } from '@wordpress/rich-text';
import { withSelect } from '@wordpress/data';

const replaceSpecialChars = (str) => {
  return str.normalize('NFD').replace(/(<([^>]+)>)/gi, '')
    .replace(/[̀-ͯ]/g, '')
    .replace(/([^\w]+|\s+)/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-+|-+$)/, '')
    .toLowerCase();
};

const findAnchorButton = (props) => {
  return (
    <RichTextToolbarButton
      icon="code-standards"
      title="Find anchor"
      onClick={() => {
        const linkToTab = replaceSpecialChars(props.value.text);
        alert(__('Tab-Content Anchor: ' + linkToTab, 'ekiline-block-collection'));
      }}
    />
  );
};

const ConditionalButton = compose(
  withSelect((select) => {
    return {
      selectedBlock: select('core/block-editor').getSelectedBlock()
    };
  }),
  ifCondition((props) => {
    return props.selectedBlock && props.selectedBlock.name === 'ekiline-block-collection/ekiline-tab-link';
  })
)(findAnchorButton);

registerFormatType('ekiline-format/find-anchor', {
  title: 'Find anchor',
  tagName: 'findanchor',
  className: null,
  edit: ConditionalButton
});
