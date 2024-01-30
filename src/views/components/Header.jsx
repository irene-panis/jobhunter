export const Header = () => {
  return (
    <div className="h-1/6 bg-dark-mode flex items-center">
      <div className="text w-3/4 pl-10">
        <h2 className="text-4xl">Hi there, Irene.</h2>
        <p>This is a motivational quote.</p>
      </div>
      <div className="logContainer">
        <button 
        type="button"
        className="uppercase bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md py-1 px-2"
        >
          + New Application
        </button>
      </div>
    </div>
  );
}