import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import type { Decision } from "../types/decisions";


const STORAGE_KEY = 'decisions';

export function useDecisions() {
  const [decisions, setDecisions] = useLocalStorage<Decision[]>(STORAGE_KEY, []);

  function createDecision(title: string, optionLabels: string[]) {
    const newDecision: Decision = {
      id: crypto.randomUUID(),
      title,
      options: optionLabels
        .filter((label) => label.trim() !== '')
        .map((label) => ({ id: crypto.randomUUID(), label })),
      selectedOptionId: null,
      createdAt: Date.now(),
    };
    setDecisions((prev) => [...prev, newDecision]);
  }

  function addOption(decisionId: string, label: string) {
    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === decisionId
          ? {
              ...decision,
              options: [...decision.options, { id: crypto.randomUUID(), label }],
            }
          : decision
      )
    );
  }

  function selectOption(decisionId: string, optionId: string) {
    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === decisionId
          ? { ...decision, selectedOptionId: optionId }
          : decision
      )
    );
  }

  function deleteDecision(decisionId: string) {
    setDecisions((prev) => prev.filter((decision) => decision.id !== decisionId));
  }

  return { decisions, createDecision, addOption, selectOption, deleteDecision };
}