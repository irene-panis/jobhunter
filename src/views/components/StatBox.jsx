export const StatBox = ({ number, status }) => {

  return (
    <div className="bg-dm-black rounded-md w-[30%] flex flex-col justify-center items-center shadow-md">
      <span className="text-8xl">{number}</span>
      <span className="text-2xl uppercase">{status}</span>
    </div>
  )
}