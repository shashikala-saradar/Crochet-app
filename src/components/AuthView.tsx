import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Heart,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

import imgTeddyBear from '../assets/images/crochet_teddy_bear_1790661313223.jpg';
import imgTulipBouquet from '../assets/images/crochet_tulip_bouquet_1790661298339.jpg';

export const AuthView: React.FC = () => {
  const { login, signup } = useShop();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login form fields
  const [loginIdentifier, setLoginIdentifier] = useState('shashikala@saradar.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');

  // Sign up form fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      login(loginIdentifier.trim());
      setIsLoading(false);
    }, 700);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the terms and conditions.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      signup(signupName.trim(), signupEmail.trim(), signupPhone.trim());
      setIsLoading(false);
    }, 800);
  };

  const handleDemoLogin = (name: string, email: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login(email, name);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-white rounded-[32px] border border-[#EDE5DA] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Card with Brand Logo & Motif */}
        <div className="bg-gradient-to-b from-[#F5EFE6] to-white p-6 text-center border-b border-[#F0EAE0] relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#E0D5C7] shadow-sm mb-3">
            <span className="text-3xl">🧶</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-serif-brand text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D2118]">
              Saradar
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-[#8A796B] font-bold">
              Handcrafted Crochet Boutique
            </p>
          </div>

          <p className="text-xs text-[#6F5E52] max-w-xs mx-auto mt-2 leading-relaxed">
            Welcome! Discover timeless handmade flowers, plushies, bags, and custom yarn gifts.
          </p>

          {/* Quick thumbnails peek */}
          <div className="flex items-center justify-center gap-2 pt-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white shadow-xs">
              <img src={imgTeddyBear} alt="Crochet Bear" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white shadow-xs">
              <img src={imgTulipBouquet} alt="Crochet Bouquet" className="w-full h-full object-cover" />
            </div>
            <div className="text-[10px] text-[#8F4436] font-semibold bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#EAE0D3] flex items-center gap-1">
              <Sparkles size={11} /> 100% Milk Cotton
            </div>
          </div>
        </div>

        {/* Tab switcher: Login | Sign Up */}
        <div className="p-6 pt-4 space-y-4">
          <div className="flex bg-[#F6F1EA] p-1 rounded-2xl border border-[#EAE1D5]">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                authMode === 'login'
                  ? 'bg-white text-[#2E2118] shadow-xs'
                  : 'text-[#7D6D61] hover:text-[#2E2118]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-[#2E2118] shadow-xs'
                  : 'text-[#7D6D61] hover:text-[#2E2118]'
              }`}
            >
              Create Account
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 bg-[#FDF2F0] border border-[#F5C7C1] text-[#B83E31] text-xs font-semibold rounded-xl text-center">
              {errorMessage}
            </div>
          )}

          {/* Form 1: Sign In */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. shashikala@saradar.com"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs font-medium text-[#2E2118] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E8E80]" size={16} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#48392E]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to registered email!')}
                    className="text-[11px] font-semibold text-[#C47062] hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs font-medium text-[#2E2118] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E8E80]" size={16} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E8E80] hover:text-[#48392E]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6F5E52] pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-[#D0C5B7] text-[#C47062] focus:ring-[#C47062]"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#C47062] hover:bg-[#B35F52] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Saradar Store</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Form 2: Create Account */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Shashikala Sardar"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs font-medium text-[#2E2118] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8E80]" size={15} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs font-medium text-[#2E2118] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8E80]" size={15} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs font-medium text-[#2E2118] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8E80]" size={15} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full h-10 pl-9 pr-9 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs font-medium text-[#2E2118] placeholder-[#9E8E80] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8E80]" size={15} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8E80]"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs text-[#6F5E52] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-[#D0C5B7] text-[#C47062] focus:ring-[#C47062]"
                />
                <span>I agree to Saradar Boutique terms & privacy policy</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#48392E] hover:bg-[#34271D] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create My Account</span>
                    <CheckCircle2 size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Access / Guest Entry Shortcuts */}
          <div className="pt-2 border-t border-[#F0EAE0] space-y-2">
            <div className="text-center">
              <span className="text-[11px] text-[#9E8E80] uppercase tracking-wider font-semibold">
                Or jump right in
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('Shashikala Sardar', 'shashikala@saradar.com')}
                className="w-full py-2 bg-[#FAF5EE] hover:bg-[#F2ECE4] border border-[#E5DACD] text-[#554336] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles size={12} className="text-[#C47062]" />
                <span>Demo Account</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('Guest Shopper', 'guest@saradar.com')}
                className="w-full py-2 bg-white hover:bg-[#FAF7F2] border border-[#DDD3C6] text-[#554336] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Guest Mode</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer reassurance */}
        <div className="bg-[#FAF7F2] py-3 px-6 border-t border-[#EDE5DA] text-center text-[11px] text-[#8A796B] flex items-center justify-center gap-2">
          <ShieldCheck size={13} className="text-[#5B7B59]" />
          <span>Secure artisan platform • 100% handmade crochet</span>
        </div>
      </div>
    </div>
  );
};
