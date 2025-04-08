export class ApiClient {
  constructor(baseURL = import.meta.env.VITE_API_URL) {
    this.baseURL = baseURL
  }

  async post(endpoint, data) {
    console.log(data);
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json()
  }
}
