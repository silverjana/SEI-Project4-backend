import { Buffer } from 'buffer'


export const setToken = (token) => {
  window.localStorage.setItem('Project4Token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('Project4Token')
}


// If token exists and it's a valid token, this  will return the payload as an object. else = falsey
export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return // If the length isn't 3-> not a JWT, so it's invalid
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

// False if the token is invalid or expired
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return 
  // If payload is truthy, check the expiry date is in the future
  const currentTime = Math.round(Date.now() / 1000) // Date.now() returns back the unix timestamp in miliseconds, the exp is in seconds so we divide it by 1000
  console.log('EXPIRY DATE  ->', payload.exp)
  console.log('CURRENT TIME ->', currentTime)
  console.log('IS EXPIRY DATE IN FUTURE', currentTime < payload.exp)
  return currentTime < payload.exp
}
