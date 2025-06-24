import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loginWithKeycloak: () => void;
  checkUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loginWithKeycloak: () => {},
  checkUser: async () => {},
});

// Configuration de l'URL du serveur
const getServerUrl = () => {
  // En production/Docker, utiliser l'URL relative (proxy nginx)
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  // En développement local
  return 'http://localhost:3001';
};

// Ajout du hook useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCheckTime, setLastCheckTime] = useState(0);

  const checkUser = async () => {
    try {
      // Si l'utilisateur est déjà authentifié, ne pas refaire la vérification
      if (user) {
        return;
      }
      
      // Éviter les appels répétés dans un court laps de temps (2 secondes)
      const now = Date.now();
      if (now - lastCheckTime < 2000) {
        return;
      }
      
      setLastCheckTime(now);
      setIsLoading(true);
      
      const serverUrl = getServerUrl();
      
      // Essayer d'abord Google
      let response = await fetch(`${serverUrl}/api/google/user/infos`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log('User authenticated via Google:', userData);
        return;
      }
      
      // Si Google échoue, essayer Keycloak
      response = await fetch(`${serverUrl}/api/keycloak/user/infos`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log('User authenticated via Keycloak:', userData);
        return;
      }
      
      // Aucune authentification trouvée
      setUser(null);
      console.log('No user authenticated');
      
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Vérifier l'utilisateur au montage du composant
    checkUser();
  }, []);

  const loginWithKeycloak = () => {
    // Redirection vers le backend qui gère Keycloak
    const serverUrl = getServerUrl();
    window.location.href = `${serverUrl}/api/keycloak/auth`;
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const serverUrl = getServerUrl();
      // Essayer de se déconnecter des deux services
      await Promise.allSettled([
        fetch(`${serverUrl}/api/google/user/logout`, {
          method: 'GET',
          credentials: 'include'
        }),
        fetch(`${serverUrl}/api/keycloak/user/logout`, {
          method: 'GET',
          credentials: 'include'
        })
      ]);
      
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loginWithKeycloak,
        checkUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;