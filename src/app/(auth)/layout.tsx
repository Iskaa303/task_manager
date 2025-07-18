interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children } : AuthLayoutProps) => {
  return (
    <div>
      <header>
        <h1>Authentication</h1>
      </header>
      {children}
    </div>
  );
}

export default AuthLayout;