import { ELIGIBILITY_RULES_OPTIONS } from '../config/eligibilityRules';
import { Select } from './common/Styled';
import { EligibilityRule } from '../config/types';

interface RuleTypeProps {
  rule: EligibilityRule;
  handleRuleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  existingRules: EligibilityRule[];
}

export const RuleTypeComponent = ({ rule, handleRuleTypeChange, existingRules }: RuleTypeProps) => {
  return (
    <Select value={rule} onChange={handleRuleTypeChange}>
      {ELIGIBILITY_RULES_OPTIONS.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={existingRules.includes(option.value) && option.value !== rule}
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
};
