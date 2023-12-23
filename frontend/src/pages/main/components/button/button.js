import styled from "styled-components"
import { useState } from "react";
import { CATEGORY_DIRECTION } from "../../../../constants";

const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "#e91e63",
      hover: "#ad1457"
    }
};

const Button = styled.button`
        background-color: ${(props) => theme[props.theme].default};
        color: white;
        padding: 5px 15px;
        border-radius: 5px;
        outline: 0;
        text-transform: uppercase;
        margin: 10px 0px;
        cursor: pointer;
        box-shadow: 0px 2px 2px lightgray;
        transition: ease background-color 250ms;
        &:hover {
            background-color: ${(props) => theme[props.theme].hover};
        }
        &:disabled {
            cursor: default;
            opacity: 0.7;
        }
`;

Button.defaultProps = {
    theme: "blue"
  };

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;

const types = [CATEGORY_DIRECTION.INCOME,CATEGORY_DIRECTION.EXPENSE];

export function ToggleGroup({onClick}) {
    const [active, setActive] = useState(types[0]);
    return (
        <div>
            {types.map((type) => (
                <ButtonToggle
                    key={type}
                    active={active === type}
                    onClick={ () => {
                            setActive(type);
                            onClick(type)
                    }}>

                    {type}
                </ButtonToggle>
            ))}
        </div>
    );
}
