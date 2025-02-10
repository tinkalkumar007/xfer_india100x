import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import EmailReset from './EmailReset'
import PasswordReset from './PasswordReset'

export default function ForgotPasswordForm({
  setScreen,
  inputType,
  setInputType,
}) {
  return inputType === 'email' ? (
    <EmailReset
      setScreen={setScreen}
      inputType={inputType}
      setInputType={setInputType}
    />
  ) : (
    <PasswordReset
      setScreen={setScreen}
      inputType={inputType}
      setInputType={setInputType}
    />
  )
}
