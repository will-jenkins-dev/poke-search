import React, { useState, useEffect } from 'react'

import * as api from './api/api'
import './App.css'
import type { Policy } from './common/types/Policy'

import { AddPolicyForm } from './add-policy/FormAddPolicy'

function App() {
  const [policies, setPolicies] = useState<Array<Policy>>([])
  const fetchPets = async () => {
    api.getPolicies().then(({ policies = [] }) => {
      setPolicies(policies)
    })
  }

  useEffect(() => {
    fetchPets()
  }, [])
  return (
    <div className="App">
      <h1>Pet Insurance Manager 5000</h1>
      {Array.isArray(policies) && policies.length > 0 ? (
        <>
          <h2>Here are your Policies</h2>
          <div>
            <table className="table-pets">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Pet name</th>
                  <th>Age</th>
                  <th>Type of pet</th>
                  <th>Insurance Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.map(
                  ({ id, name, age, petType, insuranceStatus }, index) => (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{age}</td>
                      <td>{petType.label}</td>
                      <td>{insuranceStatus.label}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>You currently have no policies</div>
      )}
      <AddPolicyForm onAdd={fetchPets} />
    </div>
  )
}

export default App
