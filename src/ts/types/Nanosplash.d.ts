export type DestinationSelector = string
export type DestinationNode = Node | Element | HTMLElement
export type DestinationCallback = () =>
	| DestinationNode
	| Promise<DestinationNode>
export type Destination =
	| DestinationSelector
	| DestinationNode
	| DestinationCallback
