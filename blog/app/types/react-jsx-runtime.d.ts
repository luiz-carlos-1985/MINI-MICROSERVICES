declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: string | number): any;
  export function jsxs(type: any, props: any, key?: string | number): any;
  export function jsxDEV(type: any, props: any, key?: string | number, isStaticChildren?: boolean, source?: any, self?: any): any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
