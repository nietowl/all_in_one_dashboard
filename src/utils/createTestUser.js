// Utility to create a test user for development
export const createTestUser = () => {
  const users = JSON.parse(localStorage.getItem('dashboard_users') || '[]');
  const organizations = JSON.parse(localStorage.getItem('dashboard_organizations') || '[]');

  // Check if test user already exists
  if (users.find(u => u.email === 'admin@test.com')) {
    console.log('Test user already exists');
    return;
  }

  const orgId = 'org_test_123';
  const userId = 'user_test_123';

  // Create test organization
  const testOrg = {
    id: orgId,
    name: 'Test Organization',
    createdAt: new Date().toISOString(),
    ownerId: userId,
    settings: {
      allowedDomains: [],
      twoFactorRequired: false
    }
  };

  // Create test user
  const testUser = {
    id: userId,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    password: 'password123',
    organizationId: orgId,
    organizationName: 'Test Organization',
    role: 'owner',
    createdAt: new Date().toISOString(),
    emailVerified: true,
    lastLogin: new Date().toISOString()
  };

  // Save to localStorage
  organizations.push(testOrg);
  users.push(testUser);

  localStorage.setItem('dashboard_organizations', JSON.stringify(organizations));
  localStorage.setItem('dashboard_users', JSON.stringify(users));

  console.log('Test user created:');
  console.log('Email: admin@test.com');
  console.log('Password: password123');
};

// Auto-create test user when module is imported
if (typeof window !== 'undefined' && import.meta.env.MODE === 'development') {
  createTestUser();
}