import React, { useState } from 'react';
import { AddButton, RuleContainer, RuleDescription, RuleGroup, RuleHeader, RuleTitle } from './common/Styled';
import RuleRow from './RuleRow';
import { ELIGIBILITY_RULES_OPTIONS } from '../config/eligibilityRules';
import { EligibilityRule } from '../types';

const RuleBuilder: React.FC = () => {
  const [addedRules, setAddedRules] = useState<EligibilityRule[]>(['specific_collection']);
  const isAllRulesAdded = addedRules.length === ELIGIBILITY_RULES_OPTIONS.length;

  const handleAddRule = () => {
    // Find the next rule that isn't already added
    const nextRule = ELIGIBILITY_RULES_OPTIONS.find((option) => !addedRules.includes(option.value))?.value;

    if (nextRule) {
      // Find the index where this rule should be inserted based on ELIGIBILITY_RULES_OPTIONS order
      const insertIndex = ELIGIBILITY_RULES_OPTIONS.findIndex((option) => option.value === nextRule);

      // Create a new array with the rule inserted at the correct position
      const newRules = [...addedRules];
      newRules.splice(insertIndex, 0, nextRule);

      setAddedRules(newRules);
    }
  };

  const handleDeleteRule = (rule: EligibilityRule) => {
    setAddedRules(addedRules.filter((addedRule) => addedRule !== rule));
  };

  return (
    <RuleContainer>
      <RuleHeader>
        <RuleTitle>Rule</RuleTitle>
        <RuleDescription>The offer will be triggered based on the rules in this section</RuleDescription>
      </RuleHeader>
      <RuleGroup>
        {addedRules.map((rule, index) => (
          <RuleRow
            key={index}
            rule={rule}
            onDelete={addedRules.length === 1 ? undefined : () => handleDeleteRule(rule)}
          />
        ))}
        <div className="flex justify-center mt-4">
          <AddButton onClick={handleAddRule} disabled={isAllRulesAdded}>
            + AND
          </AddButton>
        </div>
      </RuleGroup>
    </RuleContainer>
  );
};

export default RuleBuilder;
