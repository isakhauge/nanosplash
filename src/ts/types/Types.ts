import { Splash } from '../core/Splash'

export type GUIDString = string
export type CSSSelector = string
export type FindCallback<T> = (item: T, index: number) => boolean
export type NSFinder = FindCallback<Splash>
export type Reference = CSSSelector | Element

export enum ClassListAction {
	Add = 'add',
	Remove = 'remove',
}
