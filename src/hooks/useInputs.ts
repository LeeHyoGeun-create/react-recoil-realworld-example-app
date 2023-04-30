import type React from 'react';
import { useState, useCallback } from 'react';

function useInputs<T extends Record<string, any>>(
  initialForm: T,
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void, () => void] {
  const [form, setForm] = useState<T>(initialForm);
  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm((preState) => ({ ...preState, [name]: value }));
  };

  return [form, onChange, reset];
}

export default useInputs;
