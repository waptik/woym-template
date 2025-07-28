import * as React from 'react'
import { useFocusEffect } from '@react-navigation/native'


/**
 * Custom hook to refetch data when the screen is focused.
 * 
 * @param refetch - The function to call to refetch data.
 * @param refetchName - Optional name for logging purposes.
 */
export function useRefreshOnFocus(
  refetch: () => void,
  refetchName?: string) {
  const enabledRef = React.useRef(false)

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        refetch()
        console.log(`[useRefreshOnFocus] Refetching: ${refetchName || 'default'}`);
        
      } else {
        enabledRef.current = true
      }
    }, [refetch]),
  )
}