
import { AuditRecord, ContractAuditResult } from '../types';

/**
 * Backend Simulator
 * Manages "Database" in LocalStorage and mimics a real REST API architecture.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  plan: 'Starter' | 'Pro' | 'Business';
  joinedAt: string;
  auditCount: number;
}

// Internal representation including sensitive data
interface DBUser extends User {
  password?: string; // Only for email/password users
}

const STORAGE_KEYS = {
  SESSION: 'contractlens_session',
  USERS: 'contractlens_users_db',
  AUDITS: 'contractlens_audits_db',
  REMEMBER: 'contractlens_remember_email'
};

// Initialize "DB" if empty
if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
}
if (!localStorage.getItem(STORAGE_KEYS.AUDITS)) {
  localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify([]));
}

export const backend = {
  /**
   * AUTHENTICATION
   */
  login: async (email: string, password: string, remember: boolean = false): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user) {
          if (user.password === password) {
            const { password: _, ...userSession } = user;
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
            
            if (remember) {
              localStorage.setItem(STORAGE_KEYS.REMEMBER, email);
            } else {
              localStorage.removeItem(STORAGE_KEYS.REMEMBER);
            }
            resolve(userSession);
          } else {
            reject(new Error("Incorrect password. Please try again."));
          }
        } else {
          reject(new Error("No account found with this email address."));
        }
      }, 1000);
    });
  },

  signup: async (email: string, password: string, name?: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
          reject(new Error("An account with this email already exists."));
          return;
        }

        if (password.length < 8) {
          reject(new Error("Password must be at least 8 characters long."));
          return;
        }

        const newUser: DBUser = {
          id: 'u' + Math.random().toString(36).substr(2, 9),
          email: email.toLowerCase(),
          name: name || email.split('@')[0],
          password: password,
          plan: 'Starter',
          joinedAt: new Date().toISOString(),
          auditCount: 0
        };
        
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        const { password: _, ...userSession } = newUser;
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
        resolve(userSession);
      }, 1200);
    });
  },

  /**
   * MOCK GOOGLE AUTHENTICATION
   * Specifically handles storing and syncing Google user data like "Google User 88".
   */
  loginWithGoogle: async (email: string, name: string, avatar?: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        let userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
        let user: DBUser;

        if (userIndex === -1) {
          // New Google User
          user = {
            id: 'g' + Math.random().toString(36).substr(2, 9),
            email: email.toLowerCase(),
            name: name,
            avatar: avatar,
            plan: 'Starter',
            joinedAt: new Date().toISOString(),
            auditCount: 0
          };
          users.push(user);
        } else {
          // Existing User - Update profile info from Google provider
          users[userIndex].name = name || users[userIndex].name;
          users[userIndex].avatar = avatar || users[userIndex].avatar;
          user = users[userIndex];
        }
        
        // Persist DB update
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        // Strip sensitive data and set active session
        const { password: _, ...userSession } = user;
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
        resolve(userSession);
      }, 1000);
    });
  },

  resetPassword: async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          resolve();
        } else {
          reject(new Error("Email not found."));
        }
      }, 1500);
    });
  },

  updateUserProfile: async (userId: string, updates: { name?: string; email?: string }): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const userIdx = users.findIndex(u => u.id === userId);
        if (userIdx > -1) {
          users[userIdx] = { ...users[userIdx], ...updates };
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
          
          const { password: _, ...userSession } = users[userIdx];
          localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
          resolve(userSession);
        } else {
          reject(new Error("User not found"));
        }
      }, 800);
    });
  },

  deleteUser: async (userId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const filteredUsers = users.filter(u => u.id !== userId);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
        
        const audits: AuditRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDITS) || '[]');
        const filteredAudits = audits.filter(a => a.userId !== userId);
        localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(filteredAudits));
        
        localStorage.removeItem(STORAGE_KEYS.SESSION);
        resolve();
      }, 1000);
    });
  },

  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  },

  getRememberedEmail: (): string => {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER) || '';
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  upgradePlan: async (userId: string, plan: 'Pro' | 'Business' | 'Starter'): Promise<User> => {
    return new Promise((resolve) => {
      const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const userIdx = users.findIndex(u => u.id === userId);
      if (userIdx > -1) {
        users[userIdx].plan = plan;
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        const { password: _, ...userSession } = users[userIdx];
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
        resolve(userSession);
      }
    });
  },

  saveAudit: async (userId: string, title: string, data: ContractAuditResult): Promise<AuditRecord> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users: DBUser[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        const userIdx = users.findIndex(u => u.id === userId);
        
        if (userIdx > -1) {
          const user = users[userIdx];
          if (user.plan === 'Starter' && user.auditCount >= 3) {
            reject(new Error("Plan limit reached. Upgrade to Pro for unlimited audits."));
            return;
          }

          const audits: AuditRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDITS) || '[]');
          const newRecord: AuditRecord = {
            ...data,
            id: 'a' + Math.random().toString(36).substr(2, 9),
            userId,
            contractTitle: title,
            timestamp: new Date().toISOString()
          };
          audits.unshift(newRecord);
          localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(audits));

          users[userIdx].auditCount += 1;
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
          
          const { password: _, ...userSession } = users[userIdx];
          localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));

          resolve(newRecord);
        }
      }, 500);
    });
  },

  getUserAudits: async (userId: string): Promise<AuditRecord[]> => {
    return new Promise((resolve) => {
      const audits: AuditRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDITS) || '[]');
      const userAudits = audits.filter(a => a.userId === userId);
      resolve(userAudits);
    });
  },

  deleteAudit: async (auditId: string): Promise<void> => {
    const audits: AuditRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDITS) || '[]');
    const filtered = audits.filter(a => a.id !== auditId);
    localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(filtered));
  }
};

export const authService = backend;
