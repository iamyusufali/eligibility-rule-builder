import { ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';
import { Select } from './common/Styled';
import { EligibilityRule } from '../types';

export const RuleCondition = ({ rule }: { rule: EligibilityRule }) => {
  const config = ELIGIBILITY_RULES_CONFIG[rule];

  if (!config?.condition) return null;

  return (
    <Select>
      {config.condition.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
