export const MyProgress = ({ text, percentage }: { text: string; percentage: number }) => {
  percentage = percentage ?? 0
  return (
    <>
      <p className="text-sm my-4">{text}</p>
      {percentage !== 100 && (
        <div className="relative bg-gray-200 h-4 rounded-full">
          <div className="bg-blue-300 h-4 rounded-full" style={{ width: `${percentage}%` }}>
            {/* ({`${percentage.toFixed(2)}%`}) */}
          </div>
        </div>
      )}
    </>
  )
}
