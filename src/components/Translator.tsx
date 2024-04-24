'use client'

import { Languages } from '@tamagui/lucide-icons'
import { type TranslationPipeline, pipeline } from '@xenova/transformers#v3'
import { useEffect, useRef, useState } from 'react'
import { Button, Spinner, TextArea, XStack, YStack } from 'tamagui'
import { LanguageSelector } from './LanguageSelector'
import { MyProgress } from './MyProgress'

interface TranslatorProps {
  initSource: string
  initTarget: string
  model: string
  example: string
  size: string
  disableSelect: boolean
  LANGUAGES: object
}

export const Translator = ({
  initSource,
  initTarget,
  model,
  example,
  size,
  disableSelect,
  LANGUAGES,
}: TranslatorProps) => {
  // Model loading
  const [disabled, setDisabled] = useState(true)
  const [loadProgress, setLoadProgress] = useState({})
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState(`Loading ${model} model (${size})...`)

  // Inputs and outputs
  const [input, setInput] = useState(example)
  const [sourceLanguage, setSourceLanguage] = useState(initSource)
  const [targetLanguage, setTargetLanguage] = useState(initTarget)
  const [output, setOutput] = useState('')

  const task = 'translation'

  // Pipeline references
  const pipelinePromise = useRef<TranslationPipeline | null>(null)

  // Load translator pipeline on first render
  useEffect(() => {
    pipelinePromise.current ??= pipeline(task, model, {
      // Use WebGPU v3 https://github.com/xenova/transformers.js/pull/545
      device: 'webgpu',
      dtype: 'fp32', // or 'fp16'
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
      // @ts-ignore
      loaded += data.loaded
      // @ts-ignore
      total += data.total
    }
    const progress = (loaded / total) * 100
    setProgress(progress)
    setStatusText(
      progress === 100 ? 'Ready!' : `Loading ${model} model (${progress.toFixed(2)}% of ${size})...`
    )
    setDisabled(progress !== 100)
  }, [loadProgress])

  const translate = async () => {
    setDisabled(true)
    setStatusText('Translating...')
    setOutput('')

    // Get translator pipeline
    const translator = await pipelinePromise.current!

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
        setStatusText('Done!')
        setDisabled(false)
      },
    })
  }

  return (
    <>
      <XStack gap="$4">
        <YStack gap="$4">
          <LanguageSelector
            type={'Source'}
            defaultLanguage={initSource}
            onChange={setSourceLanguage}
            disableSelect={disableSelect}
            LANGUAGES={LANGUAGES}
          />
          <TextArea
            value={input}
            size="$6"
            maw={340}
            rows={6}
            multiline
            onChange={setInput as any}
          />
        </YStack>

        <YStack gap="$4">
          <LanguageSelector
            type={'Target'}
            defaultLanguage={initTarget}
            onChange={setTargetLanguage}
            disableSelect={disableSelect}
            LANGUAGES={LANGUAGES}
          />
          <TextArea value={output} size="$6" maw={340} rows={6} multiline readOnly />
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
