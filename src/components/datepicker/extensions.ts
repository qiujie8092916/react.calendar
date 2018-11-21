import "react";

declare module "react" {
  // [ts] 类型“DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>”上不存在属性“flex”
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    flex?: string;
    visible?: boolean;
  }
}
