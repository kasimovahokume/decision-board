import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import type { Decision } from "../types/decisions";


const STORAGE_KEY = 'decisions_app_data';

export function useDecisions() {
  const [decisions, setDecisions] = useLocalStorage<Decision[]>(STORAGE_KEY, []);

  function createDecision(title: string, optionLabels: string[]) {
    const newDecision: Decision = {
      id: crypto.randomUUID(),
      title,
      options: optionLabels
        .filter((label) => label.trim() !== '')
        .map((label) => ({ id: crypto.randomUUID(), label: label.trim() })),
      selectedOptionId: null,
      createdAt: Date.now(),
    };
    setDecisions((prev) => [newDecision, ...prev]);
    return newDecision.id;
  }

  function selectOption(decisionId: string, optionId: string) {
    setDecisions((prev) =>
      prev.map((decision) => {
        if (decision.id === decisionId) {
          if (decision.selectedOptionId !== null) return decision;
          return { ...decision, selectedOptionId: optionId };
        }
        return decision;
      })
    );
  }

  function deleteDecision(decisionId: string) {
    setDecisions((prev) => prev.filter((decision) => decision.id !== decisionId));
  }

  return { decisions, createDecision, selectOption, deleteDecision };
}