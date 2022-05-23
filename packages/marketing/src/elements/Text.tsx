import React from 'react';
import styled from '@emotion/styled';
import Colors, { ColorsType } from '../styles/Colors';

export const TextStyles = styled.div<TextProps>`
  position: relative;
  padding: 0px;
  font-family: "Open Sans", sans-serif;
  font-family: ${(props) => {
    switch (props.family) {
      case TextFamilyEnum.OpenSans:
        return '"Open Sans", sans-serif';
      case TextFamilyEnum.Pacifico:
        return '"Pacifico", cursive';
      default:
        return '"Open Sans", sans-serif';
    }
  }};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  text-align: ${(props) => props.align};
  white-space: ${(props) => (props.noWrap ? 'nowrap' : null)};
  font-size: ${(props) => {
    if (props.type.includes('10')) return '1.0rem';
    if (props.type.includes('12')) return '1.2rem';
    if (props.type.includes('14')) return '1.4rem';
    if (props.type.includes('16')) return '1.6rem';
    if (props.type.includes('18')) return '1.8rem';
    if (props.type.includes('24')) return '2.4rem';
    if (props.type.includes('30')) return '3.0rem';
    return '400';
  }};
  line-height: ${(props) => {
    if (props.type.includes('10')) return '1.6rem';
    if (props.type.includes('12')) return '1.6rem';
    if (props.type.includes('14')) {
      if (props.type.includes('Small')) {
        return '1.6rem';
      }
      return '2.4rem';
    }
    if (props.type.includes('16')) return '2.4rem';
    if (props.type.includes('18')) return '2.4rem';
    if (props.type.includes('24')) return '3.2rem';
    if (props.type.includes('30')) return '3.2rem';
    return '400';
  }};
  font-weight: ${(props) => {
    if (props.type.includes('Regular')) return '400';
    if (props.type.includes('Medium')) return '500';
    if (props.type.includes('Bold')) return '700';
    return '400';
  }};

  &:hover {
    cursor: ${(props) => (props.onClick ? 'pointer' : null)};
  }
`;

const Paragraph = TextStyles.withComponent('p');
const Label = TextStyles.withComponent('label');
const Span = TextStyles.withComponent('span');

export enum TextTypesEnum {
  Regular10 = 'Regular10',
  Medium10 = 'Medium10',
  Bold10 = 'Bold10',
  Regular12 = 'Regular12',
  Medium12 = 'Medium12',
  Bold12 = 'Bold12',
  Regular14 = 'Regular14',
  Regular14Small = 'Regular14Small',
  Medium14 = 'Medium14',
  Medium14Small = 'Medium14Small',
  Bold14 = 'Bold14',
  Bold14Small = 'Bold14Small',
  Regular16 = 'Regular16',
  Medium16 = 'Medium16',
  Bold16 = 'Bold16',
  Regular18 = 'Regular18',
  Medium18 = 'Medium18',
  Bold18 = 'Bold18',
  Regular24 = 'Regular24',
  Medium24 = 'Medium24',
  Bold24 = 'Bold24',
  Bold30 = 'Bold30',
}

export enum TextAsEnum {
  Label = 'Label',
  Paragraph = 'Paragraph',
  Span = 'Span'
}

export enum TextFamilyEnum {
  OpenSans = 'Open Sans',
  Pacifico = 'Pacifico',
}

export type TextProps = {
  children?: string | React.ReactNode;
  type?: TextTypesEnum;
  as?: TextAsEnum;
  family?: TextFamilyEnum;
  color?: ColorsType;
  width?: 'auto' | '100%' | string;
  align?: 'left' | 'right' | 'center';
  display?: 'inline-block' | 'block';
  margin?: string;
  onClick?: ((event?: MouseEvent) => void) & React.MouseEventHandler<HTMLElement>
  noWrap?: boolean;
  skWidth?: string | number | null;
  id?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  type = TextTypesEnum.Regular16,
  as = TextAsEnum.Paragraph,
  family = TextFamilyEnum.OpenSans,
  color = Colors.Black,
  width = 'auto',
  align = 'left',
  margin = '0',
  onClick = null,
  noWrap = false,
  skWidth,
  id,
}) => {
  const paragraph = (
    <Paragraph
      id={id}
      type={type}
      color={color}
      family={family}
      width={width}
      align={align}
      margin={margin}
      onClick={onClick && onClick}
      noWrap={noWrap}
    >
      {children}
    </Paragraph>
  );

  const label = (
    <Label
      id={id}
      type={type}
      color={color}
      family={family}
      width={width}
      align={align}
      margin={margin}
      onClick={onClick && onClick}
      noWrap={noWrap}
    >
      {children}
    </Label>
  );

  const span = (
    <Span
      id={id}
      type={type}
      color={color}
      family={family}
      width={width}
      align={align}
      margin={margin}
      onClick={onClick && onClick}
      noWrap={noWrap}
    >
      {children}
    </Span>
  );

  switch (as) {
    case TextAsEnum.Paragraph:
      return paragraph;
    case TextAsEnum.Label:
      return label;
    case TextAsEnum.Span:
      return span;
    default:
      return paragraph;
  }
};

export default Text;
