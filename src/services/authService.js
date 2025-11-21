import usersData from '../data/users.json'

export const authService = {
  login: async (email, password) => {
    // Simulasi delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = usersData.users.find(
      u => u.email === email && u.password === password
    )

    if (user) {
      const { password, ...userWithoutPassword } = user
      return {
        success: true,
        user: userWithoutPassword
      }
    }

    return {
      success: false,
      message: 'Email atau password salah'
    }
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    const existingUser = usersData.users.find(u => u.email === userData.email)
    if (existingUser) {
      return {
        success: false,
        message: 'Email sudah terdaftar'
      }
    }

    const newUser = {
      id: Math.max(...usersData.users.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'mahasiswa',
      department: userData.department || 'Umum',
      createdAt: new Date().toISOString().split('T')[0]
    }

    usersData.users.push(newUser)

    const { password, ...userWithoutPassword } = newUser
    return {
      success: true,
      user: userWithoutPassword
    }
  }
}
