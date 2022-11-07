export type TableDataLegend = {
  label: string,
  entry: string
}

export type TableDataFilterSort = {
  index: number,
  filter: TablDataFilterSortType
}

export type TablDataProps = {
  listObjectsData: Object[],
  listLegend: TableDataLegend[],
  lang?: string,
  color?: string,
  textColor?: string
}

export enum TablDataFilterSortType {
  asc,
  desc,
  none
}