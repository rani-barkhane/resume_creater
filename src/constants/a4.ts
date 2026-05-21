/** A4 at 96 DPI — used for screen preview measurement */
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;

export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

/** Default content padding inside a page (mm) */
export const PAGE_PADDING_MM = {
  top: 18,
  right: 16,
  bottom: 18,
  left: 16,
};

export const PAGE_CONTENT_HEIGHT_PX =
  A4_HEIGHT_PX -
  (PAGE_PADDING_MM.top + PAGE_PADDING_MM.bottom) * 3.7795275591;

export const PAGE_CONTENT_WIDTH_PX =
  A4_WIDTH_PX -
  (PAGE_PADDING_MM.left + PAGE_PADDING_MM.right) * 3.7795275591;
