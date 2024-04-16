export const MyProgress = ({ text, percentage }: { text: string; percentage: number }) => {
  percentage = percentage ?? 0
  return (
    <>
      <p>{text}</p>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage * 100}%`, height: '1em' }}>
          {/* ({`${percentage.toFixed(2)}%`}) */}
        </div>
      </div>
    </>
  )
}
