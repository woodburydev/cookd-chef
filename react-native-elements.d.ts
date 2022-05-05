export * from '@rneui/themed';

type RecursivePartial<T> = {[P in keyof T]?: RecursivePartial<T[P]>};

declare module '@rneui/themed' {
  export interface TextProps {
    type?: 'description' | 'header' | 'label' | 'info' | 'error';
    centerText?: boolean;
  }

  export interface Colors {}

  export interface ButtonProps {
    circle?: boolean;
    mode?: 'warning';
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
    Text: Partial<TextProps>;
    Button: ButtonProps;
  }
}
