/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/extensions */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { User } from '@/types/userInterface';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserDataProps {
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
}

interface AuthContextType {
  userData: UserDataProps;
  setUserData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [userData, setUserData] = useState<UserDataProps>(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      return JSON.parse(storedUserData);
    }

    return { isLoading: false, user: null, accessToken: null };
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const authContextValue = {
    userData,
    setUserData,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
