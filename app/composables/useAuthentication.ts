export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession()

  const login = async (email: string, password: string) => {
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      await fetch()
      navigateTo('/dashboard?message=login-success')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })
      await fetch()
      navigateTo('/confirm-account?message=registration-success')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const logout = async () => {
    await clear()
    navigateTo('/?message=logout-success')
  }

  const confirmAccount = async (otp: string) => {
    try {
      await $fetch('/api/auth/confirm-account', {
        method: 'POST',
        body: { token: otp }
      })
      await fetch()
      navigateTo('/login?message=account-confirmed')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      })
      await fetch()
      navigateTo('/validate-code?message=password-reset-success')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const validateCode = async (otp: string) => {
    try {
      await $fetch(`/api/auth/validate-token`, {
        method: 'POST',
        body: { token: otp }
      })
      await fetch()
      navigateTo(`/reset-password/${otp}?message=code-validated`)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const resetPassword = async (otp: string, password: string) => {
    try {
      await $fetch(`/api/auth/reset-password/${otp}`, {
        method: 'POST',
        body: { password }
      })
      await fetch()
      navigateTo('/login?message=password-reset-success')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const checkPassword = async (password: string) => {
    try {
      await $fetch('/api/auth/check-password', {
        method: 'POST',
        body: { password }
      })
      await fetch()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await $fetch('/api/auth/update-password', {
        method: 'POST',
        body: { currentPassword, newPassword }
      })
      await fetch()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const updateUser = async (name: string, email: string) => {
    try {
      await $fetch('/api/auth/update-user', {
        method: 'POST',
        body: { name, email }
      })
      await fetch()
      return { success: true }
    } catch (err) {
      const error = err as FetchError
      const message = error.data?.data?.message ?? error.data?.statusMessage
      return { success: false, message }
    }
  }

  return {
    session,
    user,
    isLoggedIn: loggedIn,
    login,
    register,
    confirmAccount,
    logout,
    forgotPassword,
    validateCode,
    resetPassword,
    checkPassword,
    updatePassword,
    updateUser
  }
}
