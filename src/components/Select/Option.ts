// `Item` is a react-stately *collection* component (identified by a static
// `getCollectionNode`), so it must be re-exported rather than wrapped — a
// function wrapper would break the collection builder that RudiSelect relies on.
export { Item as RudiOption } from 'react-stately'
export type { ItemProps as RudiOptionProps } from 'react-stately'
