import { Node } from 'prosemirror-model'
import { Decoration, EditorView, NodeView } from 'prosemirror-view'
import React, { useContext, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import shortid from 'shortid'

type ReactNodeViewContextProps = {
  node: Node
  view: EditorView
  getPos: TGetPos
  decorations: Decoration[]
  text: string
}

const ReactNodeViewContext = React.createContext<
  Partial<ReactNodeViewContextProps>
>({
  node: undefined,
  view: undefined,
  getPos: undefined,
  decorations: undefined,
  text: '',
})

type TGetPos = boolean | (() => number)

class ReactNodeView implements NodeView {
  componentRef: React.RefObject<HTMLDivElement>
  dom?: HTMLElement
  contentDOM?: HTMLElement
  component: React.FC<any>
  node: Node
  view: EditorView
  getPos: TGetPos
  decorations: Decoration[]

  constructor(
    node: Node,
    view: EditorView,
    getPos: TGetPos,
    decorations: Decoration[],
    component: React.FC<any>,
  ) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.decorations = decorations
    this.component = component
    this.componentRef = React.createRef()
  }

  init() {
    this.dom = document.createElement('div')
    this.dom.classList.add('ProseMirror__dom')

    if (!this.node.isLeaf) {
      this.contentDOM = document.createElement('span')
      this.contentDOM.classList.add('ProseMirror__contentDOM')
      this.dom.appendChild(this.contentDOM)
    }

    return {
      nodeView: this,
      portal: this.renderPortal(this.dom),
    }
  }

  renderPortal(container: HTMLElement) {
    const Component: React.FC = (props) => {
      const componentRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const componentDOM = componentRef.current
        if (!!componentDOM && !!this.contentDOM) {
          if (!this.node.isLeaf) {
            componentDOM.firstChild?.appendChild(this.contentDOM)
          }
        }
      }, [componentRef])

      const NodeView = this.component

      return (
        <div ref={componentRef} className="ProseMirror__reactComponent">
          <ReactNodeViewContext.Provider
            value={{
              node: this.node,
              view: this.view,
              getPos: this.getPos,
              decorations: this.decorations,
              text: this.contentDOM?.innerText ?? '',
            }}
          >
            <NodeView {...props} />
          </ReactNodeViewContext.Provider>
        </div>
      )
    }

    return ReactDOM.createPortal(<Component />, container, shortid.generate())
  }

  update(_: Node) {
    return true
  }

  destroy() {
    this.dom = undefined
    this.contentDOM = undefined
  }
}

type CreateReactNodeViewProps = {
  component: React.FC<any>
  onCreatePortal: (portal: any) => void
} & Omit<ReactNodeViewContextProps, 'text'>

export const createReactNodeView = ({
  node,
  view,
  getPos,
  decorations,
  component,
  onCreatePortal,
}: CreateReactNodeViewProps) => {
  const reactNodeView = new ReactNodeView(
    node,
    view,
    getPos,
    decorations,
    component,
  )
  const { nodeView, portal } = reactNodeView.init()
  onCreatePortal(portal)

  return nodeView
}
export const useReactNodeView = () => useContext(ReactNodeViewContext)
