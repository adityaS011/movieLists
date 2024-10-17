const LoadingSkeleton: React.FC = () => (
  <div className='col-span-5 flex gap-6'>
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className='w-60 h-[50vh] rounded animate-pulse bg-gray-300'
      ></div>
    ))}
  </div>
);

export default LoadingSkeleton;
