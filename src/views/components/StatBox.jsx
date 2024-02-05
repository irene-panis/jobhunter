export const StatBox = ({ number, status }) => {

  return (
    <div className="bg-dm-black rounded-md w-[24%] flex flex-col justify-center items-center shadow-md font-roboto">
      <span className="text-6xl">{number}</span>
      <span className="text-2xl uppercase">{status}</span>
    </div>
  )
}