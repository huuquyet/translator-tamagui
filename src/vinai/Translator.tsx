'use client'

import { MyProgress } from '@/components/MyProgress'
import { pipeline } from '@xenova/transformers'
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
  const [output, setOutput] = useState('')

  const task = 'translation'
  const model = 'huuquyet/vinai-translate-en2vi-v2'

  // Pipeline references
  const pipelinePromise = useRef(null)

  // Load translator pipeline on first render
  useEffect(() => {
    pipelinePromise.current ??= pipeline(task, model, {
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
      progress === 100 ? 'Ready!' : `Loading model (${progress.toFixed()}% of 511MB)...`
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
      src_lang: 'en_XX',
      tgt_lang: 'vi_VN',

      // Allow for partial output
      callback_function: (x: any) => {
        const decoded = translator.tokenizer.decode(x[0].output_token_ids, {
          skip_special_tokens: true,
        })
        setOutput(decoded)
      },
    })

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
