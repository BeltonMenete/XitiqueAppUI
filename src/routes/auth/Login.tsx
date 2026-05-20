import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, User, Lock, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/auth/Login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Login attempt:", { email, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-5xl">
        {/* Left image - sutil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "linear" }}
          className="hidden lg:block absolute inset-y-0 -left-8 w-3/5 rounded-3xl overflow-hidden"
        >
          <motion.img
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 1.5 }}
            src="/xitique-left-panel.avif"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right card - rápido */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="relative lg:ml-auto lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <div className="w-full max-w-md mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-2.5">
                <motion.img
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  src="/xitique-logo.svg"
                  alt="Xitique"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-3xl font-semibold text-gray-900">
                  Xitique
                </span>
              </div>

              <motion.a
                href="#"
                whileHover={{ x: 1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-sky-blue-600)]"
              >
                <UserPlus size={18} />
                Criar conta
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.08 }}
            >
              <h1 className="text-3xl font-semibold text-gray-900 mb-1">
                Iniciar sessão
              </h1>
              <p className="text-gray-600">Aceda à sua conta</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.1 }}
                className="space-y-1.5"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email ou Nome de Utilizador
                </label>
                <motion.div
                  whileFocus={{ scale: 1.005 }}
                  transition={{ duration: 0.1 }}
                  className="relative"
                >
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)] transition-all"
                    placeholder="o.seu@email.com"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.12 }}
                className="space-y-1.5"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Palavra-passe
                </label>
                <motion.div
                  whileFocus={{ scale: 1.005 }}
                  transition={{ duration: 0.1 }}
                  className="relative"
                >
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-mint-leaf-500)] transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.08 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showPassword ? "off" : "on"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.14 }}
                className="flex justify-end"
              >
                <motion.a
                  href="#"
                  whileHover={{ x: 1 }}
                  transition={{ duration: 0.1 }}
                  className="text-sm text-[var(--color-sky-blue-600)] font-medium"
                >
                  Esqueceu-se da palavra-passe?
                </motion.a>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.16 }}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.1 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg bg-[var(--color-mint-leaf-500)] hover:bg-[var(--color-mint-leaf-600)] transition-colors shadow-lg disabled:opacity-70 cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      A iniciar sessão...
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      Iniciar sessão
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.18 }}
              className="text-center text-xs text-gray-500 pt-2"
            >
              © {new Date().getFullYear()} Xitique. Todos os direitos
              reservados.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
