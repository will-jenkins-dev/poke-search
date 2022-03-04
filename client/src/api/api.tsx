const API_ROOT = 'http://localhost:3001/api'

const showAlert = (e: string): void =>
  alert(`Error! ${e} - is the server running?`)

// todo: add return types here
const getPolicies = async () => {
  const url = `${API_ROOT}/policies`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }

  const data = await fetch(url, options)
    .then(response => response.json())
    .catch(e => {
      showAlert(e.message)
      return {}
    })

  return data
}

const getOptions = async () => {
  const url = `${API_ROOT}/options`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
  const data = await fetch(url, options)
    .then(response => response.json())
    .catch(e => {
      showAlert(e.message)
      return {}
    })
  return data
}

const addPolicy = async (payload: any): Promise<boolean> => {
  const url = `${API_ROOT}/policy-add`
  const options = {
    method: 'POST',
    headers: {
      RequestMode: 'no-cors',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(payload),
  }
  const response = await fetch(url, options)
    .then(response => response)
    .catch(e => {
      showAlert(e.message)
      return false
    })

  return !!response
}
export { getPolicies, getOptions, addPolicy }
