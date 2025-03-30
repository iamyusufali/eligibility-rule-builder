import { ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';
import { NumberInput, Select } from './common/Styled';
import { EligibilityRule } from '../types';
import { Dropdown } from './common/Dropdown';

export const RuleValue = ({ rule }: { rule: EligibilityRule }) => {
  const config = ELIGIBILITY_RULES_CONFIG[rule];
  if (!config?.value) return null;

  switch (config.value.type) {
    case 'multiselect':
      return <Dropdown options={config.value.options ?? []} placeholder={config.value.placeholder} />;
    case 'select':
      return (
        <Select>
          {config.value.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    case 'text':
      return (
        <Select defaultValue="code_free">
          <option value="code_free">code,free</option>
        </Select>
      );
    case 'range':
      return (
        <>
          <NumberInput type="number" defaultValue="100" />
          <NumberInput type="number" defaultValue="200" />
        </>
      );
    default:
      return null;
  }
};
