export default function isMarkerTextId(textId: string) {
  const id = textId.slice(2) // Remove country code
  return /^\d+$/.test(id);
}