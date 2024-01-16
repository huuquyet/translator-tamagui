import { Button, Paragraph, TextArea, XStack, YStack } from '@my/ui'
import { useEffect, useRef, useState } from 'react'
import { LanguageSelector } from '../components/LanguageSelector'
import { MyProgress } from '../components/MyProgress'

export const Translator = () => {
  // Model loading
  const [ready, setReady] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [progressItems, setProgressItems] = useState([])

  // Inputs and outputs
  const [input, setInput] = useState('I love walking my dog.')
  const [sourceLanguage, setSourceLanguage] = useState('eng_Latn')
  const [targetLanguage, setTargetLanguage] = useState('fra_Latn')
  const [output, setOutput] = useState('')

  // Create a reference to the worker object.
  const worker = useRef(null)

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module',
      })
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          // Model file start load: add a new progress item to the list.
          setReady(false)
          setProgressItems((prev) => [...prev, e.data])
          break

        case 'progress':
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress }
              }
              return item
            })
          )
          break

        case 'done':
          // Model file loaded: remove the progress item from the list.
          setProgressItems((prev) => prev.filter((item) => item.file !== e.data.file))
          break

        case 'ready':
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true)
          break

        case 'update':
          // Generation update: update the output text.
          setOutput(e.data.output)
          break

        case 'complete':
          // Generation complete: re-enable the "Translate" button
          setDisabled(false)
          break
      }
    }

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived)

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  const translate = () => {
    setDisabled(true)
    worker.current.postMessage({
      text: input,
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
    })
  }

  return (
    <>
      <XStack space>
        <YStack space>
          <LanguageSelector
            type={'Source'}
            defaultLanguage={'eng_Latn'}
            onChange={setSourceLanguage}
          />
          <TextArea value={input} size="$4" onChange={(e) => setInput(e.target.value)} />
        </YStack>

        <YStack space>
          <LanguageSelector
            type={'Target'}
            defaultLanguage={'fra_Latn'}
            onChange={setTargetLanguage}
          />
          <TextArea value={output} size="$4" readOnly />
        </YStack>
      </XStack>

      <Button disabled={disabled} onPress={translate}>
        Translate
      </Button>

      <YStack space>
        {ready === false && <Paragraph>Loading models... (only run once)</Paragraph>}
        {progressItems.map((data: any) => (
          <YStack key={data.file}>
            <MyProgress text={data.file} percentage={data.progress} />
          </YStack>
        ))}
      </YStack>
    </>
  )
}
