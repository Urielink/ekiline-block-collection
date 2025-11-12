

import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Read site meta & site logo reactively via core-data resolvers.
 * Returns { siteHome, siteTitle, siteLogoId, siteLogoMedia }
 */
export const useSiteBrandSources = () => {
  const site = useSelect( (select) => select('core').getEntityRecord('root','site'), [] );
  const siteHome = site?.url || site?.home || '';
  const siteTitle = site?.title || '';
  const siteLogoId = site?.site_logo || site?.site_logo_id || 0;

  const siteLogoMedia = useSelect(
    (select) => siteLogoId ? select('core').getEntityRecord('root','media', siteLogoId) : null,
    [ siteLogoId ]
  );

  return { siteHome, siteTitle, siteLogoId, siteLogoMedia };
};

/**
 * Keep navbar attributes in sync with Site meta when appropriate.
 * - Sync brandHomeUrl when siteHome is available.
 * - When brandLogoMode === 'auto' and media resolved, populate brandLogo* fields.
 */
export const useSyncBrandFromSite = (attributes, setAttributes, sources) => {
  const { siteHome, siteLogoId, siteLogoMedia } = sources;

  // Sync Home URL once available
  useEffect(() => {
    if (siteHome && attributes.brandHomeUrl !== siteHome) {
      setAttributes({ brandHomeUrl: siteHome });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ siteHome ]);

  // Auto logo population
  useEffect(() => {
    if (attributes.brandLogoMode !== 'auto') return;
    if (!siteLogoId || !siteLogoMedia || !siteLogoMedia.source_url) return;

    setAttributes({
      brandLogoId: siteLogoId,
      brandLogoUrl: siteLogoMedia.source_url,
    // Respect user intent: do NOT auto-fill width/height.
    // Leaving them as 0 means <img> renders without width/height attributes for natural proportions.
    // brandLogoWidth: attributes.brandLogoWidth || siteLogoMedia?.media_details?.width || 0,
    // brandLogoHeight: attributes.brandLogoHeight || siteLogoMedia?.media_details?.height || 0,
      brandLogoAlt: attributes.brandLogoAlt || siteLogoMedia?.alt_text || ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ attributes.brandLogoMode, siteLogoId, !!siteLogoMedia, siteLogoMedia?.source_url ]);
};

/** Small util for alt text fallback */
export const brandImgAlt = (attributes, siteTitle) =>
  attributes.brandLogoAlt || siteTitle || 'Site logo';