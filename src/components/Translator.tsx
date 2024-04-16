'use client'

import { M2M100ForConditionalGeneration, M2M100Tokenizer } from '@xenova/transformers'
import { useEffect, useRef, useState } from 'react'
import { LanguageSelector } from './LanguageSelector'
import { MyProgress } from './MyProgress'

export const Translator = () => {
  // Model loading
  const [ready, setReady] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [loadProgress, setLoadProgress] = useState({})
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Loading model (912MB)...')

  // Inputs and outputs
  const [input, setInput] = useState('Tôi yêu Việt Nam quê hương tôi.')
  const [sourceLanguage, setSourceLanguage] = useState('vie_Latn')
  const [targetLanguage, setTargetLanguage] = useState('eng_Latn')
  const [output, setOutput] = useState('')

  const MODEL_ID = 'Xenova/nllb-200-distilled-600M'

  // Model and tokenizer references
  const modelPromise = useRef(null)
  const tokenizerPromise = useRef(null)

  // Load model and tokenizer on first render
  useEffect(() => {
    modelPromise.current ??= M2M100ForConditionalGeneration.from_pretrained(MODEL_ID, {
      progress_callback: (data) => {
        if (data.status !== 'progress') return
        setLoadProgress((prev) => ({ ...prev, [data.file]: data }))
      },
      device: 'wasm',
    })

    tokenizerPromise.current ??= M2M100Tokenizer.from_pretrained(MODEL_ID, {
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
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
      progress === 1 ? 'Ready!' : `Loading model (${(progress * 100).toFixed()}% of 912MB)...`
    )
    setDisabled(false)
  }, [loadProgress])

  const translate = async () => {
    setDisabled(true)
    setStatusText('Translating...')
    // setOutput('')

    // Get model and tokenizer
    const model = await modelPromise.current
    const tokenizer = await tokenizerPromise.current

    // Tokenizer input text
    tokenizer.src_lang = sourceLanguage
    tokenizer.tgt_lang = targetLanguage
    const {input_ids} = await tokenizer(input)
    const outputs = await model.generate(input_ids)

    const decoded = tokenizer.decode(outputs[0], { skip_special_tokens: true })
    setOutput(decoded)
    setStatusText('Done!')
    setDisabled(false)
  }

  return (
    <>
      <div className="container">
        <div className="language-container">
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

        <div className="textbox-container">
          <textarea value={input} rows={3} onChange={(e) => setInput(e.target.value)} />
          <textarea value={output} rows={3} readOnly />
        </div>
      </div>

      <button type="button" disabled={disabled} onClick={translate}>
        Translate
      </button>

      <div className="progress-bars-container">
        <MyProgress text={statusText} percentage={progress} />
      </div>
    </>
  )
}
