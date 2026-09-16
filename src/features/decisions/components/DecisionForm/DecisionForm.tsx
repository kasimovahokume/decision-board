// features/decisions/components/DecisionForm/DecisionForm.tsx
import { useState } from 'react';

interface DecisionFormProps {
  onCreate: (title: string, optionLabels: string[]) => void;
}

export default function DecisionForm({ onCreate }: DecisionFormProps) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);

  function handleOptionChange(index: number, newValue: string) {
    setOptions((prev) => prev.map((opt, i) => (i === index ? newValue : opt)));
  }

  function handleAddOptionField() {
    setOptions((prev) => [...prev, '']);
  }

  function handleRemoveOptionField(index: number) {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const validOptions = options.map((o) => o.trim()).filter((o) => o !== '');

    if (!trimmedTitle || validOptions.length < 2) return;

    onCreate(trimmedTitle, validOptions);
    setTitle('');
    setOptions(['', '']);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Where should I study?"
      />

      {options.map((opt, index) => (
        <div key={index}>
          <input
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          {options.length > 2 && (
            <button type="button" onClick={() => handleRemoveOptionField(index)}>
              ✕
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddOptionField}>
        + Add option
      </button>

      <button type="submit">Create decision</button>
    </form>
  );
}