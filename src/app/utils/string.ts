export function stripMarkdown(text: string | null | undefined): string {
  if (!text) return '';
  return text
    // Remove headers (e.g. ## Header)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic (* or _)
    .replace(/([*_]{1,3})(.*?)\1/g, '$2')
    // Remove inline links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove list markers (- or *)
    .replace(/^\s*[-*+]\s+/gm, '')
    // Remove blockquotes (>)
    .replace(/^\s*>\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Replace multiple newlines with a single space to make it flow nicely in previews
    .replace(/\n+/g, ' ')
    .trim();
}
