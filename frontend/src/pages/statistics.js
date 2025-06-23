import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import customAxios from '../api/customAxios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

function Stats() {
  const [stats, setStats] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await customAxios.get(`/stats/${location.state.urlID}`)
        setStats(info.data.findURL.clicksInfo)
      } catch (err) {
        console.log("error: ", err)
      }
    }
    fetchInfo()
  }, [location.state.urlID])

  function getBarChartData() {
    if (!stats || stats.length === 0) return []
    const updateDate = []
    const finalDate = []

    for (let i = 0; i < stats.length; i++) {
      const date = stats[i].timestamp.split("T")[0]
      updateDate.push(date)
    }

    updateDate.sort()

    for (let i = 0; i < updateDate.length; i++) {
      const currentDate = updateDate[i]
      if (finalDate.length > 0 && finalDate[finalDate.length - 1].date === currentDate) {
        finalDate[finalDate.length - 1].count += 1
      } else {
        finalDate.push({ count: 1, date: currentDate })
      }
    }

    return finalDate
  }

  function getPieChartData() {
    if (!stats || stats.length === 0) return []
    const city = []
    const cities = []

    for (let i = 0; i < stats.length; i++) {
      cities.push(stats[i].city)
    }

    cities.sort()

    for (let i = 0; i < cities.length; i++) {
      const currentCity = cities[i]
      if (city.length > 0 && city[city.length - 1].city === currentCity) {
        city[city.length - 1].count += 1
      } else {
        city.push({ city: currentCity, count: 1 })
      }
    }

    return city
  }

  const barData = getBarChartData()
  const pieData = getPieChartData()

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      <h1 className="text-2xl font-semibold text-center">Analytics Dashboard</h1>

      {(!stats || stats.length === 0) ? (
        <p className="text-center text-gray-500">No click data available for this URL yet.</p>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-2">📅 Dates and Click Count</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">🏙️ City-wise Click Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="count"
                  nameKey="city"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">📍 Latest 5 Location Stats</h2>
            {stats.slice()
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .slice(0, 5)
              .map((stat, index) => (
                <div key={index} className="border p-4 mb-2 rounded bg-white">
                  <p>📍 IP: {stat?.ip || 'Unknown'}</p>
                  <p>🏙️ City: {stat?.city || 'Unknown'}</p>
                  <p>🗺️ Region: {stat?.regionName || 'Unknown'}</p>
                  <p>🕒 Date: {stat?.timestamp ? new Date(stat.timestamp).toLocaleString() : 'N/A'}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Stats
