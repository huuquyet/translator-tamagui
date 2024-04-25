import Nllb200 from '@/models/Nllb200'
import VietAI from '@/models/VietAI'
import VinAIEn2Vi from '@/models/VinAIEn2Vi'
import VinAIVi2En from '@/models/VinAIVi2En'

export function generateStaticParams() {
  return [
    { model: 'nllb200' },
    { model: 'vinaivi2en' },
    { model: 'vinaien2vi' },
    { model: 'vietai' },
  ]
}

export default function Page({ params }: { params: { model: string } }) {
  const { model } = params

  switch (model) {
    case 'nllb200':
      return <Nllb200 />
    case 'vinaivi2en':
      return <VinAIVi2En />
    case 'vinaien2vi':
      return <VinAIEn2Vi />
    case 'vietai':
      return <VietAI />
    default:
      return null
  }
}
