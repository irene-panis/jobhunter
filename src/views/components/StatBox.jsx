export const StatBox = ({ number, status }) => {

  return (
    <div className="bg-red-300 rounded-md w-52 h-52 flex flex-col justify-center items-center">
      <span className="text-5xl">{number}</span>
      <span className="text-2xl">{status}</span>
    </div>
  )
}