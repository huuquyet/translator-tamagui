'use client'

import { pipeline } from '@xenova/transformers'
import { useEffect, useRef, useState } from 'react'
import { LanguageSelector } from './LanguageSelector'
import { MyProgress } from './MyProgress'

export default function Translator({
  initSource,
  initTarget,
  model,
  example,
  size,
  disableSelect,
  langList,
}: {
  initSource: string
  initTarget: string
  model: string
  example: string
  size: string
  disableSelect: boolean
  langList: any
}) {
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
  const pipelinePromise = useRef(null)

  // Load translator pipeline on first render
  useEffect(() => {
    pipelinePromise.current ??= pipeline(task, model, {
      quantized: true,
      progress_callback: (data) => {
        if (data.status !== 'progress') return
        setLoadProgress((prev) => ({ ...prev, [data.file]: data }))
      },
    })
  }, [])

  // Update progress bar based on load progress
  useEffect(() => {
    setDisabled(true)
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
      progress === 100 ? 'Ready!' : `Loading ${model} model (${progress.toFixed(2)}% of ${size})...`
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
      callback_function: (x: any) => {
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
      <div className="flex flex-col items-center m-6 gap-2">
        <div className="flex w-4/5 gap-5">
          <LanguageSelector
            type={'Source'}
            defaultLanguage={initSource}
            disableSelect={disableSelect}
            langList={langList}
            onChange={(x: any) => setSourceLanguage(x.target.value)}
          />
          <LanguageSelector
            type={'Target'}
            defaultLanguage={initTarget}
            disableSelect={disableSelect}
            langList={langList}
            onChange={(x: any) => setTargetLanguage(x.target.value)}
          />
        </div>

        <div className="w-4/5 gap-5">
          <textarea
            className="w-1/2 p-2"
            value={input}
            rows={6}
            onChange={(e) => setInput(e.target.value)}
          />
          <textarea className="w-1/2 p-2" value={output} rows={6} readOnly />
        </div>
      </div>

      <button
        className="mb-4 bg-blue-400 hover:bg-blue-300 transition-colors duration-100 text-white px-4 py-3 rounded-lg font-semibold"
        type="button"
        disabled={disabled}
        onClick={translate}
      >
        Translate
      </button>

      <div className="w-4/5 mx-auto p-1 h-24">
        <MyProgress text={statusText} percentage={progress} />
      </div>
    </>
  )
}
