export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuthentication()
  if (isLoggedIn.value) {
    return navigateTo('/dashboard')
  }
})
