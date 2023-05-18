import { IconBrandGoogle } from '@tabler/icons-react'

interface AuthGoogleButtonProps {
    onClick: () => void
}

const AuthGoogleButton: React.FC<AuthGoogleButtonProps> = ({ onClick }) => {
  return (
    <button type='button' onClick={onClick} 
    className='inline-flex w-full justify-center rounded-md bg-white
    px-4 py-2 '>
      <IconBrandGoogle color='#000'/>
    </button>
  )
}

export default AuthGoogleButton
