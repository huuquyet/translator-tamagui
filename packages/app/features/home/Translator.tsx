import { Button, Paragraph, TextArea, XStack, YStack } from '@my/ui'
import { useTranslatorStore } from 'app/zustand'
import { useEffect, useRef } from 'react'
import { LanguageSelector } from '../components/LanguageSelector'
import { MyProgress } from '../components/MyProgress'

export const Translator = () => {
  // Model loading
  const {
    ready,
    disabled,
    progressItems,
    input,
    output,
    sourceLanguage,
    targetLanguage,
    setDisabled,
    setInput,
    setSourceLanguage,
    setTargetLanguage,
    onMessageReceived,
  } = useTranslatorStore()

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
