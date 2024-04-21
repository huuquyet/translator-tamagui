'use client'

import Translator from '@/components/Translator'

export default function App() {
  const model = 'huuquyet/vinai-translate-en2vi-v2'
  const example =
    "I haven't been to a public gym before. When I exercise in a private space, I feel more comfortable."

  return (
    <Translator
      initSource="en_XX"
      initTarget="vi_VN"
      model={model}
      example={example}
      size="511MB"
      disableSelect={true}
      langList={LANGUAGES}
    />
  )
}

const LANGUAGES = {
  Vietnamese: 'vi_VN',
  English: 'en_XX',
}
