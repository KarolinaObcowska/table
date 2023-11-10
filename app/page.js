'use client'
import Loader from '@/components/Loader'
import Table from '@/components/Table'
import { useState, useEffect } from 'react'
export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch(`/api/get-data?page=1&pageSize=1000&name==`)
    const data = await res.json()
    setData(data.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return <main className="flex min-h-screen max-h-screen flex-col items-center justify-between py-8">{loading ? <Loader /> : <Table data={data} />}</main>
}
