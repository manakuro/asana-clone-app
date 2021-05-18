import { NodeType } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'

const isOfType = <Type>(type: string, predicate?: (value: Type) => boolean) => {
  return (value: unknown): value is Type => {
    if (typeof value !== type) return false
    return predicate ? predicate(value as Type) : true
  }
}
export const isString = isOfType<string>('string')
export const isNull = (value: unknown): value is null => value === null
export const isUndefined = isOfType<undefined>('undefined')
export const isFunction = isOfType<Function>('function')
export const isNumber = isOfType<number>(
  'number',
  (value) => !Number.isNaN(value),
)
export const Cast = <Type = any>(value: unknown): Type => value as Type
export const toString = (value: unknown): string =>
  Object.prototype.toString.call(value)

export const isNullOrUndefined = (
  value: unknown,
): value is null | undefined => {
  return isNull(value) || isUndefined(value)
}
export const isObject = <Type extends any>(value: unknown): value is Type => {
  return (
    !isNullOrUndefined(value) &&
    (isFunction(value) || isOfType('object')(value))
  )
}

export const isNodeOfType = (props: any): boolean => {
  const { types, node } = props

  if (!node) return false

  const matches = (type: NodeType | string) =>
    type === node.type || type === node.type.name

  if (Array.isArray(types)) return types.some(matches)

  return matches(types)
}

export const isDomNode = (domNode: unknown): domNode is Node =>
  isObject(Node)
    ? domNode instanceof Node
    : isObject(domNode) &&
      isNumber(Cast(domNode).nodeType) &&
      isString(Cast(domNode).nodeName)

const getObjectType = (value: unknown) => toString(value).slice(8, -1)

export const isPlainObject = (value: unknown) => {
  if (getObjectType(value) !== 'Object') return false

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.getPrototypeOf({})
}

export const isDomNodeOutputSpec = (
  value: unknown,
): value is Node | { dom: Node; contentDOM?: Node } =>
  isDomNode(value) || (isPlainObject(value) && isDomNode((value as any).dom))

export const isElementDomNode = (domNode: unknown): domNode is HTMLElement =>
  isDomNode(domNode) && domNode.nodeType === Node.ELEMENT_NODE

export const entries = <
  Type extends object,
  Key extends Extract<keyof Type, string>,
  Value extends Type[Key],
  Entry extends [Key, Value],
>(
  value: Type,
): Entry[] => Object.entries(value) as Entry[]

export const isContentEmpty = (view: EditorView): boolean => {
  const { state } = view

  return state.doc.content.size === 0 || state.doc.textContent === ''
}
