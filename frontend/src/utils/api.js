import axiosInstance from './axiosInstance'

// AUTH
export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password })
  return response.data
}

export const registerUser = async (name, email, phone, password) => {
  const response = await axiosInstance.post('/auth/register', { name, email, phone, password })
  return response.data
}

export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout')
  return response.data
}

// USER
export const getServiceCenters = async () => {
  const response = await axiosInstance.get('/servicecenter')
  return response.data
}

export const getServiceCenterById = async (id) => {
  const response = await axiosInstance.get(`/servicecenter/${id}`)
  return response.data
}

export const joinQueue = async (serviceCenterId) => {
  const response = await axiosInstance.post('/token/join', { serviceCenterId })
  return response.data
}

export const getMyToken = async () => {
  const response = await axiosInstance.get('/token/my-token')
  return response.data
}

export const cancelToken = async (tokenId) => {
  const response = await axiosInstance.patch(`/token/${tokenId}/cancel`)
  return response.data
}

// OPERATOR
export const getQueueForCounter = async () => {
  const response = await axiosInstance.get('/queue/counter')
  return response.data
}

export const callNextToken = async () => {
  const response = await axiosInstance.patch('/queue/call-next')
  return response.data
}

export const skipToken = async (tokenId) => {
  const response = await axiosInstance.patch(`/queue/${tokenId}/skip`)
  return response.data
}

export const addWalkIn = async () => {
  const response = await axiosInstance.post('/queue/walk-in')
  return response.data
}

// ADMIN
export const getAdminOverview = async () => {
  const response = await axiosInstance.get('/admin/overview')
  return response.data
}

export const toggleCounter = async (counterId, status) => {
  const response = await axiosInstance.patch(`/admin/counter/${counterId}`, { status })
  return response.data
}