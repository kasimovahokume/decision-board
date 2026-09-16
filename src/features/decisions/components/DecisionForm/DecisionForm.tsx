import { useState } from 'react';

interface DecisionFormProps {
  onCreate: (title: string, optionLabels: string[]) => void;
  onCancel: () => void;
}

export default function DecisionForm({ onCreate, onCancel }: DecisionFormProps) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index: number, value: string) => {
    setOptions(prev => prev.map((opt, i) => i === index ? value : opt));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = options.filter(o => o.trim() !== '');
    if (!title.trim() || validOptions.length < 2) return;
    onCreate(title, validOptions);
  };

  const isFormValid = title.trim().length > 0 && options.filter(o => o.trim()).length >= 2;

  return (
    <div className="max-w-xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="bg-white border border-zinc-200/80 rounded-xl shadow-sm p-6 sm:p-8">
        <div className="mb-6 border-b border-zinc-100 pb-4">
          <h2 className="text-lg font-semibold text-zinc-900">Yeni Decision Yarat</h2>
          <p className="text-xs text-zinc-500 mt-1">Mövzunu yazın və istifadəçilərin seçəcəyi variantları əlavə edin.</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider mb-2">
              Qərar Mövzusu (Sual)
            </label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Məsələn: Where should I study?" 
              autoFocus
              className="w-full bg-zinc-50/50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
              Seçimlər (Minimum 2)
            </label>
            {options.map((opt, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Seçim ${index + 1}`}
                  className="flex-1 bg-zinc-50/50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                />
                {options.length > 2 && (
                  <button 
                    type="button" 
                    onClick={() => setOptions(prev => prev.filter((_, i) => i !== index))}
                    className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            type="button" 
            onClick={() => setOptions(prev => [...prev, ''])}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 py-1 transition-colors"
          >
            + Seçim əlavə et
          </button>
        </div>

        <div className="mt-8 flex gap-2 justify-end pt-4 border-t border-zinc-100">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            Ləğv et
          </button>
          <button 
            type="submit" 
            disabled={!isFormValid}
            className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
          >
            Yarat
          </button>
        </div>
      </form>
    </div>
  );
}