'use client'

import { Languages } from '@tamagui/lucide-icons'
import { pipeline } from '@xenova/transformers'
import { useEffect, useRef, useState } from 'react'
import { Button, Spinner, TextArea, XStack, YStack } from 'tamagui'
import { LanguageSelector } from './LanguageSelector'
import { MyProgress } from './MyProgress'

export default function Translator() {
  // Model loading
  const [disabled, setDisabled] = useState(true)
  const [loadProgress, setLoadProgress] = useState({})
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Loading model (927MB)...')

  // Inputs and outputs
  const [input, setInput] = useState('Tôi yêu Việt Nam quê hương tôi.')
  const [sourceLanguage, setSourceLanguage] = useState('vie_Latn')
  const [targetLanguage, setTargetLanguage] = useState('eng_Latn')
  const [output, setOutput] = useState('')

  const task = 'translation'
  const model = 'Xenova/nllb-200-distilled-600M'

  // Pipeline references
  const pipelinePromise = useRef(null)

  // Load translator pipeline on first render
  useEffect(() => {
    pipelinePromise.current ??= pipeline(task, model, {
      quantized: true,
      progress_callback: (data: any) => {
        if (data.status !== 'progress') return
        setLoadProgress((prev) => ({ ...prev, [data.file]: data }))
      },
    })
  }, [])

  // Update progress bar based on load progress
  useEffect(() => {
    const items = Object.values(loadProgress)
    // if (items.length !== 5) return // 5 files to load
    let loaded = 0
    let total = 0
    for (const data of Object.values(loadProgress)) {
      loaded += data.loaded
      total += data.total
    }
    const progress = (loaded / total) * 100
    setProgress(progress)
    setStatusText(
      progress === 100 ? 'Ready!' : `Loading model (${progress.toFixed(2)}% of 927MB)...`
    )
    setDisabled(progress !== 100)
  }, [loadProgress])

  const translate = async () => {
    setDisabled(true)
    setStatusText('Translating...')
    setOutput('')

    // Get translator pipeline
    const translator = await pipelinePromise.current

    // Translate input text
    const outputs = await translator(input, {
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,

      // Allow for partial output
      callback_function: async (x: any) => {
        const decoded = translator.tokenizer.decode(x[0].output_token_ids, {
          skip_special_tokens: true,
        })
        setOutput(decoded)
      },
    })

    setStatusText('Done!')
    setDisabled(false)
  }

  return (
    <>
      <XStack gap="$4">
        <YStack gap="$4">
          <LanguageSelector
            type={'Source'}
            defaultLanguage={'vie_Latn'}
            onChange={setSourceLanguage}
          />
          <TextArea value={input} size="$6" onChange={setInput as any} />
        </YStack>

        <YStack gap="$4">
          <LanguageSelector
            type={'Target'}
            defaultLanguage={'eng_Latn'}
            onChange={setTargetLanguage}
          />
          <TextArea value={output} size="$6" readOnly />
        </YStack>
      </XStack>

      <Button
        disabled={disabled}
        icon={disabled ? <Spinner size="small" /> : <Languages />}
        onPress={translate}
      >
        Translate
      </Button>

      <MyProgress text={statusText} percentage={progress} />
    </>
  )
}
