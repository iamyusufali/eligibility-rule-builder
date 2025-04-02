import { ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';
import { Select } from './common/Styled';
import { EligibilityRule } from '../config/types';
import type { RuleOperator } from '../config/types';

interface RuleOperatorProps {
  rule: EligibilityRule;
  value?: RuleOperator;
  onChange: (operator: RuleOperator) => void;
}

export const RuleOperatorComponent = ({ rule, value, onChange }: RuleOperatorProps) => {
  const config = ELIGIBILITY_RULES_CONFIG[rule];

  if (!config?.operator) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as RuleOperator);
  };

  return (
    <Select value={value} onChange={handleChange}>
      {config.operator.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
