import React from "react";

type CancelFuncType = () => void;
type SelectFuncType = (tick: number) => void;

interface ContextType {
  onCancel: CancelFuncType;
  onSelect: SelectFuncType;
}

const Context = React.createContext({
  onCancel: () => {},
  onSelect: (tick: number) => {}
} as ContextType);

export { CancelFuncType, SelectFuncType, Context };
