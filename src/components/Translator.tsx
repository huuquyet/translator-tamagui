'use client'

import { pipeline } from '@xenova/transformers'
import { useEffect, useRef, useState } from 'react'
import { LanguageSelector } from './LanguageSelector'
import { MyProgress } from './MyProgress'

export const Translator = () => {
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
    const progress = loaded / total
    setProgress(progress)
    setStatusText(
      progress === 1 ? 'Ready!' : `Loading model (${(progress * 100).toFixed()}% of 927MB)...`
    )
    setDisabled(false)
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
      <div className="flex flex-col m-6 gap-2">
        <div className="flex gap-5">
          <LanguageSelector
            type={'Source'}
            defaultLanguage={'vie_Latn'}
            onChange={(x: any) => setSourceLanguage(x.target.value)}
          />
          <LanguageSelector
            type={'Target'}
            defaultLanguage={'eng_Latn'}
            onChange={(x: any) => setTargetLanguage(x.target.value)}
          />
        </div>

        <div className="flex justify-center gap-5 w-full">
          <textarea
            className="w-1/2 p-2"
            value={input}
            rows={3}
            onChange={(e) => setInput(e.target.value)}
          />
          <textarea className="w-1/2 p-2" value={output} rows={3} readOnly />
        </div>
      </div>

      <button
        className="mb-4 bg-green-500 hover:bg-green-400 transition-colors duration-100 text-white px-4 py-3 rounded-lg font-semibold"
        type="button"
        disabled={disabled}
        onClick={translate}
      >
        Translate
      </button>

      <div className="w-1/2 mx-auto p-1 h-36 text-center">
        <MyProgress text={statusText} percentage={progress} />
      </div>
    </>
  )
}
