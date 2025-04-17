import {SvgProps} from 'react-native-svg';
import React from 'react';
import {_SVG_ICONS, _SVG_ICONS_MAP} from '@assets/svgs';
type SVGIconProps = SvgProps & {
  icon: _SVG_ICONS;
  height?: number | string;
  width?: number | string;
  pathFill?: string;
};

/**
 * AppSvg is a functional component that renders an SVG icon.
 * It takes in various properties to customize the icon's appearance.
 *
 * @param {SVGIconProps} props - The properties for the SVG icon component.
 * @param {_SVG_ICONS} props.icon - The icon type to be rendered, defined in the ASSETS.
 * @param {number|string} [props.height] - Optional height for the SVG icon.
 * @param {number|string} [props.width] - Optional width for the SVG icon.
 * @param {string} [props.pathFill='#FFF'] - Optional fill color for the SVG path, defaults to white.
 */

const AppSvg: React.FC<SVGIconProps> = (props) => {
  const {icon, pathFill = '#FFF'} = props;
  const IconsImage = _SVG_ICONS_MAP[icon];

  return <IconsImage pathFill={pathFill} {...props} />;
};

export default AppSvg;
