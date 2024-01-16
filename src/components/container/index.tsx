import { ReactNode } from "react";

export default function Container({children}: {children: ReactNode} ) {
  return (
    <div 
      className="flex items-center w-full md:w-3/4 mx-auto 
                  my-4">
      {children}
    </div>
  )
}
