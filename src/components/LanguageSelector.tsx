interface LanguageSelectorProps {
  type: string
  onChange: any
  defaultLanguage: string
  disableSelect: boolean
  langList: any
}

export const LanguageSelector = ({
  type,
  onChange,
  defaultLanguage,
  disableSelect,
  langList,
}: LanguageSelectorProps) => {
  return (
    <div className="w-1/2 p-2">
      <label>{type}: </label>
      <select
        aria-label="Select language"
        className="w-40 p-1 cursor-pointer"
        onChange={onChange}
        defaultValue={defaultLanguage}
        disabled={disableSelect}
      >
        {Object.entries(langList).map(([key, value]) => {
          return (
            <option key={key} value={value}>
              {key}
            </option>
          )
        })}
      </select>
    </div>
  )
}
