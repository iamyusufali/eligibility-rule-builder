import { AddButton, RuleContainer, RuleDescription, RuleGroup, RuleHeader, RuleTitle } from './common/Styled';
import RuleRow from './RuleRow';
import { RuleValueTag } from './RuleValueTags';
import { useRuleBuilder } from '../hooks/useRuleBuilder';
import { getAllowedOperators, getRuleValueLabels } from '../config/helpers';
import { useMemo } from 'react';

const RuleBuilder = () => {
  const {
    rules,
    isAllRulesAdded,
    existingRules,
    handleOperatorChange,
    handleValueChange,
    handleAddRule,
    handleDeleteRule,
    handleRuleTypeChange,
  } = useRuleBuilder();

  const allowedOperators = useMemo(() => {
    return rules.map((rule) => getAllowedOperators(rules, rule.type, rule.operator));
  }, [rules]);

  const ruleValueLabels = useMemo(() => {
    return rules.map((rule) => (Array.isArray(rule.value) ? getRuleValueLabels(rule.type, rule.value) : null));
  }, [rules]);

  console.log({ rules });

  return (
    <RuleContainer>
      <RuleHeader>
        <RuleTitle>Rule</RuleTitle>
        <RuleDescription>The offer will be triggered based on the rules in this section</RuleDescription>
      </RuleHeader>
      <RuleGroup>
        {rules.map((currentRule, index) => (
          <div key={currentRule.type} className="flex flex-col gap-1 mb-[10px]">
            <RuleRow
              rule={currentRule.type}
              relation={currentRule.relation}
              existingRules={existingRules}
              operator={currentRule.operator}
              allowedOperators={allowedOperators[index]}
              value={currentRule.value}
              onRuleTypeChange={(newRuleType) => handleRuleTypeChange(index, newRuleType)}
              onOperatorChange={(operator) => handleOperatorChange(currentRule.type, operator)}
              onValueChange={(value) => handleValueChange(currentRule.type, value)}
              onDelete={rules.length === 1 ? undefined : () => handleDeleteRule(currentRule.type)}
              isFirstRow={index === 0}
            />
            {Array.isArray(currentRule.value) && ruleValueLabels[index] && (
              <RuleValueTag value={ruleValueLabels[index]} />
            )}
          </div>
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
