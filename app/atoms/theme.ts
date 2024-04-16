import { type WritableAtom, atom } from 'jotai'

export type mode = 'dark' | 'light' | 'system'

export function themeWithToggle(initialValue?: mode): WritableAtom<mode, [mode?], void> {
  const themeAtom = atom(initialValue, (get, set, next?: mode) => {
    const update =
      get(themeAtom) === 'dark' ? 'light' : get(themeAtom) === 'light' ? 'system' : 'dark'
    set(themeAtom, update)
  })

  return themeAtom as WritableAtom<mode, [mode?], void>
}
