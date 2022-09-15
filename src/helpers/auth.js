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


