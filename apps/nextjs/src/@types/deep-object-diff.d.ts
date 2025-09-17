declare module 'deep-object-diff' {
  export function diff(lhs: any, rhs: any): any;
  export function addedDiff(lhs: any, rhs: any): any;
  export function deletedDiff(lhs: any, rhs: any): any;
  export function updatedDiff(lhs: any, rhs: any): any;
  export function detailedDiff(lhs: any, rhs: any): any;
}
