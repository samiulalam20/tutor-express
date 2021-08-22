const create = async (params, credentials, applicationData) => {
    try {
        let response = await fetch('/api/application/new/'+params.tuitionId, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            
            'Authorization': 'Bearer ' + credentials.t
          },
          body: applicationData
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const listApplied = async (credentials, signal) => {
    try {
      let response = await fetch('/api/application/applied', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const applicationStats = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/application/stats/'+params.tuitionId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        signal: signal,
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/application/' + params.applicationId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const complete = async (params, credentials, application) => {
    try {
      let response = await fetch('/api/application/complete/' + params.applicationId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(application)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/application/' + params.applicationId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    create,
    read,
    complete,
    remove,
    listApplied,
    applicationStats
  }