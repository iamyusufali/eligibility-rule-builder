import { ELIGIBILITY_RULES_OPTIONS } from '../config/eligibilityRules';
import { Select } from './common/Styled';
import { EligibilityRule } from '../config/types';

interface RuleOperatorProps {
  rule: EligibilityRule;
  handleRuleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const RuleTypeComponent = ({ rule, handleRuleTypeChange }: RuleOperatorProps) => {
  return (
    <Select value={rule} onChange={handleRuleTypeChange}>
      {ELIGIBILITY_RULES_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
