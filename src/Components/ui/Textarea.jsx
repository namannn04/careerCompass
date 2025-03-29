import React from "react";

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
