import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const readFileAsDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.onloadend = () => {
          if (typeof fileReader.result === 'string') {
              resolve(fileReader.result);
          } else {
              reject(new Error("Failed to read file as Data URL"));
          }
      };

      fileReader.onerror = () => {
          reject(new Error("Error reading file"));
      };

      fileReader.readAsDataURL(file);
  });
};
