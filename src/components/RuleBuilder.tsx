import { useState } from 'react';
import { AddButton, RuleContainer, RuleDescription, RuleGroup, RuleHeader, RuleTitle } from './common/Styled';
import RuleRow from './RuleRow';
import { ELIGIBILITY_RULES_OPTIONS, ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';
import { EligibilityRule, RuleStateConfig, RuleOperator, RuleRelation } from '../config/types';

const RuleBuilder = () => {
  const [rules, setRules] = useState<RuleStateConfig[]>([
    {
      type: 'specific_collection',
      operator: ELIGIBILITY_RULES_CONFIG.specific_collection.operator?.defaultValue as RuleOperator,
      value: [],
    },
  ]);

  const isAllRulesAdded = rules.length === ELIGIBILITY_RULES_OPTIONS.length;

  const handleAddRule = (relation: RuleRelation) => {
    // Find the next rule that isn't already added
    const nextRule = ELIGIBILITY_RULES_OPTIONS.find(
      (option) => !rules.some((rule) => rule.type === option.value)
    )?.value;

    if (nextRule) {
      // Find the index where this rule should be inserted based on ELIGIBILITY_RULES_OPTIONS order
      const insertIndex = ELIGIBILITY_RULES_OPTIONS.findIndex((option) => option.value === nextRule);

      // Create a new array with the rule inserted at the correct position
      const newRules = [...rules];
      const newRule: RuleStateConfig = {
        relation,
        type: nextRule,
        operator: ELIGIBILITY_RULES_CONFIG[nextRule].operator?.defaultValue as RuleOperator,
        value: null,
      };
      newRules.splice(insertIndex, 0, newRule);

      setRules(newRules);
    }
  };

  const handleDeleteRule = (ruleType: EligibilityRule) => {
    setRules(rules.filter((rule) => rule.type !== ruleType));
  };

  const handleRuleChange = (ruleType: EligibilityRule, updates: Partial<RuleStateConfig>) => {
    setRules(rules.map((rule) => (rule.type === ruleType ? { ...rule, ...updates } : rule)));
  };

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

  return (
    <RuleContainer>
      <RuleHeader>
        <RuleTitle>Rule</RuleTitle>
        <RuleDescription>The offer will be triggered based on the rules in this section</RuleDescription>
      </RuleHeader>
      <RuleGroup>
        {rules.map((rule, index) => (
          <RuleRow
            key={index}
            rule={rule.type}
            operator={rule.operator}
            value={rule.value}
            onDelete={rules.length === 1 ? undefined : () => handleDeleteRule(rule.type)}
            onChange={(operator, value) => handleRuleChange(rule.type, { operator, value })}
            onRuleTypeChange={(newRuleType) => handleRuleTypeChange(index, newRuleType)}
          />
        ))}
        <div className="flex justify-center mt-4">
          <AddButton onClick={() => handleAddRule('AND')} disabled={isAllRulesAdded}>
            + AND
          </AddButton>
        </div>
      </RuleGroup>
    </RuleContainer>
  );
};

export default RuleBuilder;
