// src/customLib/utils/resolveImage.js
const allImages = import.meta.glob('@/assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export function resolveImg(jsonPath) {
  const relativePath = jsonPath.replace(/^\/src\//, '');
  const match = Object.keys(allImages).find((key) => key.endsWith(relativePath));

  if (!match) {
    console.warn(`resolveImg: couldn't find image for path "${jsonPath}"`);
    return '';
  }

  return allImages[match];
}