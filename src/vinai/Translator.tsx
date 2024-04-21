'use client'

import { MyProgress } from '@/components/MyProgress'
import { AutoModelForSeq2SeqLM, AutoTokenizer } from '@xenova/transformers'
import { useEffect, useRef, useState } from 'react'

export default function Translator() {
  // Model loading
  const [disabled, setDisabled] = useState(true)
  const [loadProgress, setLoadProgress] = useState({})
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Loading model (511MB)...')

  // Inputs and outputs
  const [input, setInput] = useState(
    "I haven't been to a public gym before. When I exercise in a private space, I feel more comfortable."
  )
  const [sourceLanguage, setSourceLanguage] = useState('vie_Latn')
  const [targetLanguage, setTargetLanguage] = useState('eng_Latn')
  const [output, setOutput] = useState('')

  const MODEL_ID = 'huuquyet/vinai-translate-en2vi-v2'

  // Model and tokenizer references
  const modelPromise = useRef(null)
  const tokenizerPromise = useRef(null)

  // Load translator pipeline on first render
  useEffect(() => {
    modelPromise.current ??= AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID, {
      src_lang: 'en_EN',
      progress_callback: (data) => {
        if (data.status !== 'progress') return
        setLoadProgress((prev) => ({ ...prev, [data.file]: data }))
      },
    //   device: 'wasm',
    })

    tokenizerPromise.current ??= AutoTokenizer.from_pretrained(MODEL_ID)
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
      progress === 100 ? 'Ready!' : `Loading model (${progress.toFixed()}% of 511MB)...`
    )
    setDisabled(progress !== 100)
  }, [loadProgress])

  const translate = async () => {
    setDisabled(true)
    setStatusText('Translating...')
    setOutput('')

    // Get model and tokenizer
    const model = await modelPromise.current
    const tokenizer = await tokenizerPromise.current

    const { input_ids } = await tokenizer(input)
    const outputs = await model.generate(input_ids)
    const decoded = tokenizer.decode(outputs[0])//, { skip_special_tokens: true })
    setOutput(decoded)
    setDisabled(false)
    setStatusText('Done!')
  }

  return (
    <>
      <div className="flex flex-col items-center m-6 gap-2">
        <div className="flex w-2/3 gap-5">
          <div className="w-1/2">
            Source:
            <button type="button" disabled className="mb-4 p-3">
              English
            </button>
          </div>
          <div className="w-1/2">
            Target:
            <button type="button" disabled className="mb-4 p-3">
              Vietnamese
            </button>
          </div>
        </div>

        <div className="w-2/3 gap-5">
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

      <div className="w-1/2 mx-auto p-1 h-24">
        <MyProgress text={statusText} percentage={progress} />
      </div>
    </>
  )
}
