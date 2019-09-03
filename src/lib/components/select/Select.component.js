//@flow
import React from "react";
import styled from "styled-components";
import Select from "react-virtualized-select";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";
import { lighten } from "polished";

export type Item = {
  label: string,
  value: string | number
};
type Items = Array<Item>;

type Props = {
  options: Items,
  optionRenderer?: () => void
};

const SelectContainer = styled.div`
  .Select-control {
    border-radius: 4px;
    border: 1px solid ${defaultTheme.gray};
    height: auto;
  }

  .Select.is-focused > .Select-control {
    border-color: ${props => mergeTheme(props.theme, defaultTheme).primary};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 1px rgba(0, 126, 255, 0.1);
    outline: none;
  }

  .Select-menu-outer {
    margin-top: -2px;
    border: 1px solid ${props => mergeTheme(props.theme, defaultTheme).primary};
    box-sizing: border-box;
  }

  .Select--multi .Select-value {
    color: ${props => mergeTheme(props.theme, defaultTheme).primary};
    background-color: ${defaultTheme.grayLightest};
    vertical-align: initial;
  }

  .Select-clear {
    line-height: inherit;
  }

  .Select-clear-zone:hover {
    color: ${props => mergeTheme(props.theme, defaultTheme).danger};
  }
`;

const DefaultOption = styled.div`
  display: flex;
  &:hover {
    background-color: ${props =>
      lighten(0.3, mergeTheme(props.theme, defaultTheme).primary)};
  }

  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
`;

const defaultOptionRenderer = ({
  focusedOption,
  focusOption,
  key,
  labelKey,
  option,
  selectValue,
  style,
  valueArray
}) => {
  const classNames = ["VirtualizedSelectOption"];
  const { disabled, className, title, ...rest } = option;

  if (option === focusedOption) {
    classNames.push("VirtualizedSelectFocusedOption");
  }

  if (disabled) {
    classNames.push("VirtualizedSelectDisabledOption");
  }

  if (valueArray && valueArray.indexOf(option) >= 0) {
    classNames.push("VirtualizedSelectSelectedOption");
  }

  if (className) {
    classNames.push(className);
  }

  const events = disabled
    ? {}
    : {
        onClick: () => selectValue(option),
        onMouseEnter: () => focusOption(option)
      };

  return (
    <DefaultOption
      className={classNames.join(" ")}
      key={key}
      style={style}
      title={title}
      {...events}
      {...rest}
    >
      {option[labelKey]}
    </DefaultOption>
  );
};

function SelectBox({ options, optionRenderer, ...rest }: Props) {
  return (
    <SelectContainer className="sc-select">
      <Select
        options={options}
        optionRenderer={optionRenderer || defaultOptionRenderer}
        {...rest}
      />
    </SelectContainer>
  );
}

export default SelectBox;
