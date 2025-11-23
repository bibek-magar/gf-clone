import styled from "styled-components";
import { InputWrapper } from "../Input";
import { currentTheme } from "../../../utils/theme";
import { Minus, PlusIcon } from "lucide-react";

interface IProps {
  label: string;
  error: string;
  value: number;
  onChange: (value: number) => void;
}

const InputNumber = ({ label, error, value, onChange }: IProps) => {
  return (
    <Wrapper className="input-wrapper">
      <label>{label}</label>
      <div className="buttons">
        <button onClick={() => onChange(value - 1)} disabled={value === 1}>
          <Minus />
        </button>
        <span>{value}</span>
        <button onClick={() => onChange(value + 1)}>
          {" "}
          <PlusIcon />
        </button>
      </div>
      <p className="error">{error || '\u00A0'}</p>
    </Wrapper>
  );
};

export { InputNumber };

const Wrapper = styled(InputWrapper)`
  & .error {
    color: ${currentTheme.required};
    font-size: 13px;
    margin-top: 5px;
    min-height: 18px;
    line-height: 18px;
    margin-bottom: 0;
  }

  & .buttons {
    display: flex;
    gap: 14px;
    align-items: center;

    & span {
      color: ${currentTheme.text};
      font-weight: 500;
    }

    & button {
      background: ${currentTheme.searchBg};
      border: 1px solid ${currentTheme.border};
      color: ${currentTheme.primary};
      height: 32px;
      width: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;

      &:disabled {
        background: ${currentTheme.border};
        color: ${currentTheme.textSecondary};
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        border: 1px solid ${currentTheme.primary};
        opacity: 0.8;
      }

      & svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;
