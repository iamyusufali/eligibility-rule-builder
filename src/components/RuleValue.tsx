import { ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';
import { NumberInput, Select } from './common/Styled';
import { EligibilityRule } from '../config/types';
import type { RuleValue as RuleValueType } from '../config/types';
import { Dropdown } from './common/Dropdown';

interface RuleValueProps {
  rule: EligibilityRule;
  value: RuleValueType;
  onChange: (value: RuleValueType) => void;
}

export const RuleValueComponent = ({ rule, value, onChange }: RuleValueProps) => {
  const config = ELIGIBILITY_RULES_CONFIG[rule];
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
        <Select value={(value ?? '') as string} onChange={(e) => handleChange(e.target.value)} defaultValue="code_free">
          <option value="code_free">code,free</option>
        </Select>
      );
    case 'range':
      const rangeValue = value as [number, number];
      return (
        <>
          <NumberInput
            type="number"
            value={rangeValue?.[0] ?? 0}
            onChange={(e) => handleChange([Number(e.target.value), rangeValue?.[1] ?? 0])}
          />
          <NumberInput
            type="number"
            value={rangeValue?.[1] ?? 0}
            onChange={(e) => handleChange([rangeValue?.[0] ?? 0, Number(e.target.value)])}
          />
        </>
      );
    default:
      return null;
  }
};
