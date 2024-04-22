import { Translator } from '@/components/Translator'

export default function VinAIVi2En() {
  const model = 'huuquyet/vinai-translate-vi2en-v2'
  const example =
    'Cô cho biết: trước giờ tôi không đến phòng tập công cộng, ' +
    'mà tập cùng giáo viên Yoga riêng hoặc tự tập ở nhà. ' +
    'Khi tập thể dục trong không gian riêng tư, tôi thoải mái dễ chịu hơn.'

  return (
    <Translator
      initSource="vi_VN"
      initTarget="en_XX"
      model={model}
      example={example}
      size="511MB"
      disableSelect={true}
      LANGUAGES={LANGUAGES}
    />
  )
}

const LANGUAGES = {
  Vietnamese: 'vi_VN',
  English: 'en_XX',
}
