import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  User,
  LoginCredentials,
  SignUpCredentials,
} from "@src/types/auth.types";

/**
 * Estado da autenticação
 */
interface AuthState {
  // Estado
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Ações
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User | null) => void;

  // Helpers
  checkAuth: () => boolean;
}

/**
 * Store de autenticação usando Zustand
 *
 * Persistido no AsyncStorage para manter o login entre sessões
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /**
       * Realiza o login do usuário
       */
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // TODO: API integration when backend is ready

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Basic validation (remove in production)
          if (!credentials.email || !credentials.password) {
            throw new Error("Email and password are required");
          }

          // Mock user (replace with real API data)
          const mockUser: User = {
            id: "1",
            name: "Test User",
            email: credentials.email,
            avatar: "https://i.pravatar.cc/150?img=1",
            createdAt: new Date(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error logging in";
          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      signUp: async (credentials: SignUpCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // TODO: API integration when backend is ready
          // Example: const response = await api.post('/auth/signup', credentials);

          // Simulação de chamada à API
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Basic validation (remove in production)
          if (
            !credentials.name ||
            !credentials.email ||
            !credentials.password
          ) {
            throw new Error("All fields are required");
          }

          if (credentials.password.length < 6) {
            throw new Error("The password must be at least 6 characters long");
          }

          // Mock user (replace with real API data)
          const mockUser: User = {
            id: Date.now().toString(),
            name: credentials.name,
            email: credentials.email,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            createdAt: new Date(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error signing up";
          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // isLoading and error doesn`t persist
      }),
    },
  ),
);

export const useUser = () => useAuthStore((state) => state.user);

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    signUp: state.signUp,
    logout: state.logout,
    clearError: state.clearError,
  }));
