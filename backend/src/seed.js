import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ServiceCenter from './models/serviceCenter.model.js'
import User from './models/user.model.js'

dotenv.config({ path: './.env' })

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to DB')

    await ServiceCenter.deleteMany()
    await User.deleteMany()

    await User.create([
      { name: 'Rahul', email: 'user@test.com', phone: '9800000000', password: '123456', role: 'user' },
      { name: 'Priya', email: 'operator@test.com', phone: '9800000001', password: '123456', role: 'operator' },
      { name: 'Admin', email: 'admin@test.com', phone: '9800000002', password: '123456', role: 'admin' }
    ])

    await ServiceCenter.create([
      {
        name: 'City Hospital',
        type: 'OPD Registration',
        location: 'Kanpur, UP',
        category: 'hospital',
        counters: [
          { name: 'Counter 1', status: 'open' },
          { name: 'Counter 2', status: 'open' }
        ]
      },
      {
        name: 'State Bank of India',
        type: 'Banking Services',
        location: 'Kanpur, UP',
        category: 'bank',
        counters: [
          { name: 'Counter 1', status: 'open' },
          { name: 'Counter 2', status: 'open' }
        ]
      },
      {
        name: 'Regional Passport Office',
        type: 'Passport Services',
        location: 'Kanpur, UP',
        category: 'government',
        counters: [
          { name: 'Counter 1', status: 'open' }
        ]
      }
    ])

    console.log('Seed data inserted successfully')
    process.exit(0)

  } catch (error) {
    console.log('Seed error:', error)
    process.exit(1)
  }
}

seedData()