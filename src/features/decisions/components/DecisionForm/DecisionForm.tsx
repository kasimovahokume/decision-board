import { useState, useCallback, useMemo } from 'react';
import type { DecisionFormProps } from '../../types/decisions';
import { Card, Input, Button } from '../../../../shared/ui'; // Shared UI istifadəsi!

export default function DecisionForm({ onCreate, onCancel }: DecisionFormProps) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleOptionChange = useCallback((index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  }, []);

  const handleAddOption = useCallback(() => {
    setOptions((prev) => [...prev, '']);
  }, []);

  const handleRemoveOption = useCallback((index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const isFormValid = useMemo(() => {
    const trimmedTitle = title.trim();
    const validOptionsCount = options.filter((o) => o.trim() !== '').length;
    return trimmedTitle.length > 0 && validOptionsCount >= 2;
  }, [title, options]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validOptions = options.map((o) => o.trim()).filter((o) => o !== '');
      if (!title.trim() || validOptions.length < 2) return;

      onCreate(title.trim(), validOptions);
    },
    [title, options, onCreate]
  );

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 border-b border-zinc-100 pb-4">
            <h2 className="text-lg font-semibold text-zinc-900">Yeni Decision Yarat</h2>
            <p className="text-xs text-zinc-500 mt-1">Mövzunu yazın və istifadəçilərin seçəcəyi variantları əlavə edin.</p>
          </div>

          <div className="space-y-5">
            <Input
              label="Qərar Mövzusu (Sual)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Məsələn: Where should I study?"
              autoFocus
            />

            <div className="space-y-2.5">
              <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                Seçimlər (Minimum 2)
              </label>
              {options.map((opt, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Seçim ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                      className="text-zinc-400 hover:text-red-600 !p-2"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAddOption}
              className="text-zinc-600 hover:text-zinc-900 -ml-2"
            >
              + Seçim əlavə et
            </Button>
          </div>

          <div className="mt-8 flex gap-2 justify-end pt-4 border-t border-zinc-100">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Ləğv et
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Yarat
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}