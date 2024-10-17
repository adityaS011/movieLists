import React from 'react';

const Seprator = ({ className }: { className?: string }) => {
  return (
    <div className={`h-[1px]  ${className ? className : 'bg-gray-500'}`}></div>
  );
};

export default Seprator;
