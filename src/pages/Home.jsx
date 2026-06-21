import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-8">
        <h1 className="text-2xl font-semibold text-gray-800">Home Page</h1>
      </div>
    </div>
  )
}

export default Home