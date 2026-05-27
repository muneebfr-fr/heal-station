/**
 * Injects a JSON-LD schema block into the page <head>.
 * Usage: <SchemaScript schema={productSchema(product)} />
 */
export default function SchemaScript({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
