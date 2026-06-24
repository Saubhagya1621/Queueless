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

    // Create service centers first to get their _ids
    const centers = await ServiceCenter.create([
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
          { name: 'Counter 1', status: 'open' },
          { name: 'Counter 2', status: 'open' }
        ]
      },
      {
        name: 'HDFC Bank',
        type: 'Banking Services',
        location: 'Lucknow, UP',
        category: 'bank',
        counters: [
          { name: 'Counter 1', status: 'open' },
          { name: 'Counter 2', status: 'open' }
        ]
      },
      {
        name: 'District Hospital',
        type: 'OPD Registration',
        location: 'Lucknow, UP',
        category: 'hospital',
        counters: [
          { name: 'Counter 1', status: 'open' },
          { name: 'Counter 2', status: 'open' }
        ]
      },
      {
        name: 'RTO Office',
        type: 'Vehicle Registration',
        location: 'Lucknow, UP',
        category: 'government',
        counters: [
          { name: 'Counter 1', status: 'open' },
          { name: 'Counter 2', status: 'open' }
        ]
      }
    ])

    const [cityHospital, sbi, passportOffice, hdfcBank, districtHospital, rto] = centers

    await User.create([
      // Customers
      { name: 'Rahul Verma', email: 'user@test.com', phone: '9800000000', password: '123456', role: 'user' },
      { name: 'Sneha Singh', email: 'user2@test.com', phone: '9800000001', password: '123456', role: 'user' },

      // City Hospital operators + admin
      {
        name: 'Amit Sharma',
        email: 'op.hospital1@test.com',
        phone: '9800000010',
        password: '123456',
        role: 'operator',
        serviceCenterId: cityHospital._id,
        counterId: cityHospital.counters[0]._id
      },
      {
        name: 'Neha Gupta',
        email: 'op.hospital2@test.com',
        phone: '9800000011',
        password: '123456',
        role: 'operator',
        serviceCenterId: cityHospital._id,
        counterId: cityHospital.counters[1]._id
      },
      {
        name: 'Dr. Ramesh Yadav',
        email: 'admin.hospital@test.com',
        phone: '9800000012',
        password: '123456',
        role: 'admin',
        serviceCenterId: cityHospital._id
      },

      // SBI operators + admin
      {
        name: 'Vikram Tiwari',
        email: 'op.sbi1@test.com',
        phone: '9800000020',
        password: '123456',
        role: 'operator',
        serviceCenterId: sbi._id,
        counterId: sbi.counters[0]._id
      },
      {
        name: 'Pooja Mishra',
        email: 'op.sbi2@test.com',
        phone: '9800000021',
        password: '123456',
        role: 'operator',
        serviceCenterId: sbi._id,
        counterId: sbi.counters[1]._id
      },
      {
        name: 'Suresh Kumar',
        email: 'admin.sbi@test.com',
        phone: '9800000022',
        password: '123456',
        role: 'admin',
        serviceCenterId: sbi._id
      },

      // Passport Office operators + admin
      {
        name: 'Anjali Singh',
        email: 'op.passport1@test.com',
        phone: '9800000030',
        password: '123456',
        role: 'operator',
        serviceCenterId: passportOffice._id,
        counterId: passportOffice.counters[0]._id
      },
      {
        name: 'Ravi Shukla',
        email: 'op.passport2@test.com',
        phone: '9800000031',
        password: '123456',
        role: 'operator',
        serviceCenterId: passportOffice._id,
        counterId: passportOffice.counters[1]._id
      },
      {
        name: 'Manoj Tripathi',
        email: 'admin.passport@test.com',
        phone: '9800000032',
        password: '123456',
        role: 'admin',
        serviceCenterId: passportOffice._id
      },

      // HDFC Bank operators + admin
      {
        name: 'Kavya Joshi',
        email: 'op.hdfc1@test.com',
        phone: '9800000040',
        password: '123456',
        role: 'operator',
        serviceCenterId: hdfcBank._id,
        counterId: hdfcBank.counters[0]._id
      },
      {
        name: 'Deepak Pandey',
        email: 'op.hdfc2@test.com',
        phone: '9800000041',
        password: '123456',
        role: 'operator',
        serviceCenterId: hdfcBank._id,
        counterId: hdfcBank.counters[1]._id
      },
      {
        name: 'Priya Agarwal',
        email: 'admin.hdfc@test.com',
        phone: '9800000042',
        password: '123456',
        role: 'admin',
        serviceCenterId: hdfcBank._id
      },

      // District Hospital operators + admin
      {
        name: 'Sandeep Rao',
        email: 'op.disthospital1@test.com',
        phone: '9800000050',
        password: '123456',
        role: 'operator',
        serviceCenterId: districtHospital._id,
        counterId: districtHospital.counters[0]._id
      },
      {
        name: 'Meena Chauhan',
        email: 'op.disthospital2@test.com',
        phone: '9800000051',
        password: '123456',
        role: 'operator',
        serviceCenterId: districtHospital._id,
        counterId: districtHospital.counters[1]._id
      },
      {
        name: 'Dr. Anita Srivastava',
        email: 'admin.disthospital@test.com',
        phone: '9800000052',
        password: '123456',
        role: 'admin',
        serviceCenterId: districtHospital._id
      },

      // RTO operators + admin
      {
        name: 'Rohit Dubey',
        email: 'op.rto1@test.com',
        phone: '9800000060',
        password: '123456',
        role: 'operator',
        serviceCenterId: rto._id,
        counterId: rto.counters[0]._id
      },
      {
        name: 'Sunita Patel',
        email: 'op.rto2@test.com',
        phone: '9800000061',
        password: '123456',
        role: 'operator',
        serviceCenterId: rto._id,
        counterId: rto.counters[1]._id
      },
      {
        name: 'Rajesh Saxena',
        email: 'admin.rto@test.com',
        phone: '9800000062',
        password: '123456',
        role: 'admin',
        serviceCenterId: rto._id
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