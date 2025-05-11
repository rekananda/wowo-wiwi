import { BaseHTMLAttributes, ReactNode } from "react";

export type PropBaseT<T = any> = {
  className?: string;
  children?: ReactNode;
  ref?: any;
} & Partial<BaseHTMLAttributes<T>>