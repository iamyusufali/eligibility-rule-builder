import { ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';
import { Select } from './common/Styled';
import { EligibilityRule, RuleOperator } from '../config/types';

interface RuleOperatorProps {
  rule: EligibilityRule;
  value?: RuleOperator;
  onChange: (operator: RuleOperator) => void;
  allowedOperators?: RuleOperator[];
}

export const RuleOperatorComponent = ({ rule, value, onChange, allowedOperators }: RuleOperatorProps) => {
  const config = ELIGIBILITY_RULES_CONFIG[rule];

  if (!config?.operator) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as RuleOperator);
  };

  // If allowedOperators is provided, only show those operators
  const operatorOptions = allowedOperators
    ? config.operator.options.filter((option) => allowedOperators.includes(option.value))
    : config.operator.options;

  return (
    <Select value={value} onChange={handleChange}>
      {operatorOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
