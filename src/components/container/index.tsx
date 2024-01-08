import { ReactNode } from "react";

export default function Container({children}: {children: ReactNode} ) {
  return (
    <div 
      className="flex items-center w-full md:w-3/4 mx-auto 
                  h-20 px-4 bg-gray-950 text-gray-100">
      {children}
    </div>
  )
}
