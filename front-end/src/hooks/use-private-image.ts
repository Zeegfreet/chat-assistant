import { filesServices } from "@/services/filesServices";
import { useEffect, useRef, useState } from "react";

export interface UsePrivateImageResponse {
  src: string | undefined;
  isLoading: boolean;
  reload: () => void
}

export const usePrivateImage = (url: string): UsePrivateImageResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [src, setSrc] = useState<string | undefined>();
  const objUrlRef = useRef<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  const reload = () => {
    setIsCached(false)
  }

  useEffect(() => {
    setIsLoading(true)
    const loadImage = async () => {
      const response = await filesServices.getFile(url)

      if(!response.success){
        if(objUrlRef.current){
          URL.revokeObjectURL(objUrlRef.current)
          setSrc(objUrlRef.current)
        }
        return;
      }

      if(response.contentChange){
        const newBinaryURL = URL.createObjectURL(response.binary)
        objUrlRef.current = newBinaryURL
        setSrc(objUrlRef.current)
      }
      
    }
    if(!isCached){
      loadImage()
      .finally(() => {
        setIsLoading(false)
      })
      setIsCached(true)
    }
    return () => {
     if(objUrlRef.current){
          URL.revokeObjectURL(objUrlRef.current)
          setSrc(objUrlRef.current)
        }
    }

  }, [url, isCached])
  
  return {
    src,
    isLoading,
    reload
  }
}