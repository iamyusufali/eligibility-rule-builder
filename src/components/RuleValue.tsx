import { RuleRenderConfig } from '../config/eligibilityRules';
import { Input, Select } from './common/Styled';
import type { RuleOperator, RuleValue as RuleValueType } from '../config/types';
import { Dropdown } from './common/Dropdown';

interface RuleValueProps {
  config: RuleRenderConfig;
  operator?: RuleOperator;
  value: RuleValueType;
  onChange: (value: RuleValueType) => void;
}

export const RuleValueComponent = ({ config, operator, value, onChange }: RuleValueProps) => {
  if (!config?.value) return null;

  const handleChange = (newValue: RuleValueType) => {
    onChange(newValue);
  };

  switch (config.value.inputType) {
    case 'multiselect':
      return (
        <Dropdown
          options={config.value.options ?? []}
          placeholder={config.value.placeholder}
          value={(value ?? []) as string[]}
          onChange={handleChange}
        />
      );
    case 'select':
      return (
        <Select value={(value ?? '') as string} onChange={(e) => handleChange(e.target.value)}>
          {config.value.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    case 'text':
      return (
        <Input
          className="min-w-[300px]"
          type="text"
          value={(value ?? '') as string}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={config.value.placeholder}
        />
      );
    case 'range':
      const rangeValue = (value ?? { min: 0, max: 0 }) as { min: number; max: number };
      return renderRangeInput({ operator, value: rangeValue, handleChange });
    default:
      return null;
  }
};

const renderRangeInput = ({
  operator,
  value,
  handleChange,
}: {
  operator?: RuleOperator;
  value: { min: number; max: number };
  handleChange: (value: { min: number; max: number }) => void;
}) => {
  switch (operator) {
    case 'is_between':
      return (
        <>
          <Input
            type="number"
            value={value.min}
            onChange={(e) => handleChange({ ...value, min: Number(e.target.value) })}
          />
          <Input
            type="number"
            value={value.max}
            onChange={(e) => handleChange({ ...value, max: Number(e.target.value) })}
          />
        </>
      );
    case 'is_greater_than':
      return (
        <Input
          type="number"
          value={value.min}
          onChange={(e) => handleChange({ min: Number(e.target.value), max: Infinity })}
        />
      );
    case 'is_less_than':
      return (
        <Input
          type="number"
          value={value.max}
          onChange={(e) => handleChange({ min: 0, max: Number(e.target.value) })}
        />
      );
    default:
      return null;
  }
};
