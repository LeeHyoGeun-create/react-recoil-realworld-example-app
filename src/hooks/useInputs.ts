import type React from 'react';
import { useState, useCallback } from 'react';

function useInputs<T extends Record<string, string>>(
  initialForm: T,
): [
  T,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  () => void,
  (name: string, value: string) => void,
  (newState: T) => void,
] {
  const [form, setForm] = useState<T>(initialForm);
  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (event.target instanceof HTMLInputElement) {
      const { name, value } = event.target;
      setForm((preState) => ({ ...preState, [name]: value }));
    }
    const { name, value } = event.target;
    setForm((preState) => ({ ...preState, [name]: value }));
  };

  const setValue = (name: string, value: string): void => {
    setForm((preState) => ({ ...preState, [name]: value }));
  };

  const setValues = (newSatate: T): void => {
    setForm((preState) => ({ ...preState, ...newSatate }));
  };

  return [form, onChange, reset, setValue, setValues];
}

export default useInputs;
