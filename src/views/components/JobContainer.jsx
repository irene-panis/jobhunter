export const JobContainer = ({ job }) => {
  return (
    <div className="flex flex-col bg-white text-black rounded-md">
      <p>{ job.position }</p>
      <p>{ job.company }</p>
      <p>{ job.location }</p>
      <p>{ job.notes }</p>
    </div>
  );
}