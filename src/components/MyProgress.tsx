export const MyProgress = ({ text, percentage }: { text: string; percentage: number }) => {
  percentage = percentage ?? 0
  return (
    <>
      <p className="text-sm text-center my-4">{text}</p>
      <div className="relative bg-gray-200 h-4 w-full rounded-full">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${percentage * 100}%`, height: '1em' }}
        >
          {/* ({`${percentage.toFixed(2)}%`}) */}
        </div>
      </div>
    </>
  )
}
