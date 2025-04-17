export {};

declare global {
  // for dispatch args
  interface DispatchProps {
    type: string;
    payload?: any;
  }

  type DropDownDataItem = {
    label: string;
    value: string;
  };

  //  For object props
  type ObjParams = Record<string, object | string | undefined | boolean>;

  // Flex related style
  type AlignContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined;
  type AlignItems =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';
  type JustifyContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  type FlexDirection =
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
  type FlexAlignType =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';

  // Font related style
  type FontVariant =
    | 'small-caps'
    | 'oldstyle-nums'
    | 'lining-nums'
    | 'tabular-nums'
    | 'proportional-nums';
  type TextDecorationStyle =
    | 'solid'
    | 'double'
    | 'dotted'
    | 'dashed'
    | undefined;
  type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;

  // Animation related

  type EasingFunction = {(t: number): number;};
  type Easing =
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'ease-in-cubic'
    | 'ease-out-cubic'
    | 'ease-in-out-cubic'
    | 'ease-in-circ'
    | 'ease-out-circ'
    | 'ease-in-out-circ'
    | 'ease-in-expo'
    | 'ease-out-expo'
    | 'ease-in-out-expo'
    | 'ease-in-quad'
    | 'ease-out-quad'
    | 'ease-in-out-quad'
    | 'ease-in-quart'
    | 'ease-out-quart'
    | 'ease-in-out-quart'
    | 'ease-in-quint'
    | 'ease-out-quint'
    | 'ease-in-out-quint'
    | 'ease-in-sine'
    | 'ease-out-sine'
    | 'ease-in-out-sine'
    | 'ease-in-back'
    | 'ease-out-back'
    | 'ease-in-out-back'
    | EasingFunction;
  type Animation =
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight';

  type Direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

  type IWebViewPages = 't&c' | 'p&p';
}
