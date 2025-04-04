import { ELIGIBILITY_RULES_CONFIG } from './eligibilityRules';
import { OPERATOR_EXCLUSIVITY_RULES } from './operatorExclusivity';
import { EligibilityRule, RuleOperator, RuleStateConfig } from './types';

export const getRuleValueLabels = (ruleType: EligibilityRule, values?: string[]) => {
  return (
    ELIGIBILITY_RULES_CONFIG[ruleType].value.options
      ?.filter((option) => values?.includes(option.value))
      .map((option) => option.label) ?? []
  );
};

export const getAllowedOperators = (
  addedRules: RuleStateConfig[],
  ruleType: EligibilityRule,
  currentOperator?: RuleOperator
): RuleOperator[] | undefined => {
  if (!isExclusivityRule(ruleType)) return undefined;

  const exclusivityRuleConfig = OPERATOR_EXCLUSIVITY_RULES.find((rule) => rule.targetRule === ruleType);
  if (!exclusivityRuleConfig || !currentOperator) return undefined;

  const sourceRule = addedRules.find((rule) => rule.type === exclusivityRuleConfig.sourceRule);
  const allowedOperators = sourceRule?.operator
    ? exclusivityRuleConfig.allowedOperatorMapping?.[sourceRule.operator]
    : undefined;

  return allowedOperators;
};

export const getFirstValidOperator = (
  ruleType: EligibilityRule,
  allowedOperators?: RuleOperator[]
): RuleOperator | undefined => {
  if (allowedOperators) return allowedOperators[0];

  return ELIGIBILITY_RULES_CONFIG[ruleType].operator?.defaultValue as RuleOperator;
};

export const isExclusivityRule = (ruleType: EligibilityRule) => {
  return OPERATOR_EXCLUSIVITY_RULES.some((rule) => rule.sourceRule.includes(ruleType));
};
