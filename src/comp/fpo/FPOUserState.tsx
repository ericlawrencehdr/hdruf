import { useEffect  } from "react"
import { useUserState } from '@/src/state/userState'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

export default function FPOUserState () {
  const authChecked = useUserState((state) => state.authChecked)
  const authState = useUserState((state) => state.authState)

  return (
    <Stack sx={{border: '1px solid red', p:2}}> 
      <div><b>authChecked:</b> {authChecked ? 'true' : 'false'}</div>
      <div><b>authState:</b> {authState}</div>
    </Stack>
  )
}
