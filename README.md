# hydroponic :seedling:

IIIF Collection grow kit for [@samvera/bloom-iiif](https://github.com/samvera-labs/bloom-iiif).

## Usage

### Define new collection structure
```jsx
const instance = {
  id: "https://published.uri/for/the/collection.json",
  label: { none: ["My Curated Collection"] },
  summary: { none: ["A short summary of this collection, optionally."] },
  homepage: [
    {
      id: "https://published.homepage/for/the/collection",
      type: "Text",
      label: { none: "An optional homepage for this collection." },
      format: "text/html",
    },
  ],
}

const items = [
  {id: "https://manifest.id/uri.json"},
  {id: "https://manifest.id/uri.json", href: "https://optional.id/for/this/items/homepage/entry"},
  {id: "https://manifest.id/uri.json"},
  {id: "https://collection.id/uri.json"},
  {id: "https://manifest.id/uri.json"},
  {id: "https://manifest.id/uri.json"}
]
```

### Grow your Bloom ready IIIF Collection
```jsx
const hydroponic = new Hydroponic();
const collection = hydroponic.grow(instance, items);

// `collection` now can be written to file or screen for use.
```


## Constructed JSON Shape

**IIIF Presentation API 3.0 Collection**

- @context: **"http://iiif.io/api/presentation/3/context.json"**
- type: **"Collection"**
- id: **string**
- label: **InternationalString**
- summary: **InternationalString** (optional)
- homepage: **ExternalResource[]** (optional)
- items[]:
  - type: **"Manifest" | "Collection"**
  - id: **string**
  - label: **InternationalString**
  - summary: **InternationalString** (optional)
  - homepage: **ExternalResource[]** (optional)
  - thumbnail: **ContentResource[]** (optional)
