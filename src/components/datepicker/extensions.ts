import "react";

declare module "react" {
  // [ts] 类型“DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>”上不存在属性“flex”
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    flex?: string;
  }

  // 类型“IntrinsicAttributes & ProviderProps<ContextType>”上不存在属性“visible”。
  interface ProviderProps<T> extends ProviderProps<T> {
    visible?: boolean;
  }
}
