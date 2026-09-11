// Display distinctions derived from the source text or inspected source image.
export function resourceLabel(item) {
  return ({ 'eng-t87-v1': 'Lord — title of authority', 'eng-t88-v1': 'Lord — reference to God', 'a203': 'Sandals — full view', 'a204': 'Sandals — close view' })[item.content_id] ?? item.title;
}
