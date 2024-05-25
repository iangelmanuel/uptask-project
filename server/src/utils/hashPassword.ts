import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const res = await bcrypt.hash(password, salt)
  return res
}

export const checkPassword = async (
  password: string,
  storedHash: string,
) => {
  const res = await bcrypt.compare(password, storedHash)
  return res
}
