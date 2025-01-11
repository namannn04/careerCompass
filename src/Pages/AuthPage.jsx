import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import { Eye, EyeOff, ChevronRight, Mail } from 'lucide-react';
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import { Label } from "../Components/ui/Label";
import { signUp, signIn } from "../../backend/authService"; // Import authentication methods
import logo from '../assets/logo-avatars/logo.png';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (isSignUp) {
        // Handle Sign-Up
        const user = await signUp(email, password, name); // Assuming `signUp` accepts `name`
        setSuccessMessage(`Welcome, ${user.email}! Your account has been created.`);
      } else {
        // Handle Sign-In
        const user = await signIn(email, password);
        setSuccessMessage(`Welcome back, ${user.email}!`);
        // Redirect to the landing page
        navigate('/'); // Update the path as per your routing configuration
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-gradient-to-br from-[#a3a3a3] to-[#b8b8b8] lg:block">
        <div className="flex h-full mx-32 items-center justify-center">
          <img src={logo} alt="careerCompass" className="w-1/4" />
          <br />
          <h1 className="text-6xl font-bold text-black">Welcome to careerCompass</h1>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center px-7 bg-gradient-to-br from-[#000000] to-[#343232] lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleAuth}>
            <div className="space-y-4 rounded-md shadow-sm">
              {isSignUp && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 text-black"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 text-black"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="pr-10 text-black"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <div>
              <Button type="submit" className="group relative flex w-full justify-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {isSignUp ? 'Sign up' : 'Sign in'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
