import { Translator } from '@/components/Translator'

export default function VietAI() {
  const model = 'huuquyet/envit5-translation'
  const example =
    'VietAI là tổ chức phi lợi nhuận với sứ mệnh ươm mầm tài năng về trí tuệ nhân tạo ' +
    'và xây dựng một cộng đồng các chuyên gia trong lĩnh vực trí tuệ nhân tạo đẳng cấp quốc tế tại Việt Nam.'

  return (
    <Translator
      initSource="vi_VN"
      initTarget="en_XX"
      model={model}
      example={example}
      size="330MB"
      disableSelect={false}
      LANGUAGES={LANGUAGES}
    />
  )
}

const LANGUAGES = {
  Vietnamese: 'vi_VN',
  English: 'en_XX',
}
