import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type RouteAppObject = {
  path: string
  name: string
  label?: string
  title: string
  Component: React.FunctionComponent
  icon?: IconProp
}