import { useState } from 'react';
import { EligibilityRule, RuleOperator, RuleRelation, RuleStateConfig, RuleValue } from '../config/types';
import { ELIGIBILITY_RULES_CONFIG, ELIGIBILITY_RULES_OPTIONS } from '../config/eligibilityRules';
import { isExclusivityRule } from '../config/helpers';
import { OPERATOR_EXCLUSIVITY_RULES } from '../config/operatorExclusivity';

export const useRuleBuilder = () => {
  const [rules, setRules] = useState<RuleStateConfig[]>([
    {
      type: 'specific_collection',
      operator: ELIGIBILITY_RULES_CONFIG.specific_collection.operator?.defaultValue as RuleOperator,
      value: [],
    },
  ]);

  const isAllRulesAdded = rules.length === ELIGIBILITY_RULES_OPTIONS.length;
  const existingRules = rules.map((rule) => rule.type);

  const handleRuleTypeChange = (currentRuleIndex: number, newRuleType: EligibilityRule) => {
    // Find the index where this rule should be inserted based on ELIGIBILITY_RULES_OPTIONS order
    const insertIndex = ELIGIBILITY_RULES_OPTIONS.findIndex((option) => option.value === newRuleType);

    if (insertIndex === -1) return;

    const newRules = [...rules];

    // Remove the rule at currentRuleIndex
    newRules.splice(currentRuleIndex, 1);

    const newRule: RuleStateConfig = {
      ...(insertIndex !== 0 && { relation: 'AND' }), // Add relation only if not the first rule
      type: newRuleType,
      operator: ELIGIBILITY_RULES_CONFIG[newRuleType].operator?.defaultValue as RuleOperator,
      value: null,
    };

    // Insert the new rule at the correct position
    newRules.splice(insertIndex, 0, newRule);

    setRules(newRules);
  };

  const handleOperatorChange = (ruleType: EligibilityRule, operator: RuleOperator) => {
    setRules((currentRules) => {
      // First, update the rule that was changed
      const updatedRules = currentRules.map((rule) => (rule.type === ruleType ? { ...rule, operator } : rule));
      if (!isExclusivityRule(ruleType)) return updatedRules;

      // Then, handle the update of other rule due to mutual exclusivity
      const finalRules = updatedRules.map((rule) => {
        if (!isExclusivityRule(ruleType)) return rule;

        const exclusivityRuleConfig = OPERATOR_EXCLUSIVITY_RULES.find((rule) => rule.sourceRule === ruleType);
        const targetRule = rules.find((rule) => rule.type === exclusivityRuleConfig?.targetRule);
        if (!targetRule) return rule;

        const allowedTargetOperator = exclusivityRuleConfig?.allowedOperatorMapping?.[operator]?.[0];

        if (allowedTargetOperator && rule.operator === targetRule.operator) {
          return { ...rule, operator: allowedTargetOperator, value: null };
        }

        return rule;
      });

      return finalRules;
    });
  };

  const handleValueChange = (ruleType: EligibilityRule, value: RuleValue) => {
    setRules((currentRules) => currentRules.map((rule) => (rule.type === ruleType ? { ...rule, value } : rule)));
  };

  const handleAddRule = (relation: RuleRelation) => {
    // Find the next rule that isn't already added
    const ruleToAdd = ELIGIBILITY_RULES_OPTIONS.find(
      (option) => !rules.some((rule) => rule.type === option.value)
    )?.value;

    if (ruleToAdd) {
      // Find the index where this rule should be inserted based on ELIGIBILITY_RULES_OPTIONS order
      const insertIndex = ELIGIBILITY_RULES_OPTIONS.findIndex((option) => option.value === ruleToAdd);
      const nextRuleConfig = ELIGIBILITY_RULES_CONFIG[ruleToAdd];

      // Get the operator value for the new rule based on mutual exclusivity
      const exclusivityRuleConfig = OPERATOR_EXCLUSIVITY_RULES.find((rule) => rule.targetRule === ruleToAdd);
      const sourceRuleOperator = rules.find((rule) => rule.type === exclusivityRuleConfig?.sourceRule)?.operator;
      const operator = sourceRuleOperator
        ? exclusivityRuleConfig?.allowedOperatorMapping?.[sourceRuleOperator]?.[0]
        : nextRuleConfig.operator?.defaultValue;

      // Create a new array with the rule inserted at the correct position
      const newRules = [...rules];
      const newRule: RuleStateConfig = {
        relation,
        type: ruleToAdd,
        operator,
        value: null,
      };

      newRules.splice(insertIndex, 0, newRule);

      setRules(newRules);
    }
  };

  const handleDeleteRule = (ruleType: EligibilityRule) => {
    setRules(rules.filter((rule) => rule.type !== ruleType));
  };

  return {
    rules,
    isAllRulesAdded,
    existingRules,
    handleRuleTypeChange,
    handleOperatorChange,
    handleValueChange,
    handleAddRule,
    handleDeleteRule,
  };
};
