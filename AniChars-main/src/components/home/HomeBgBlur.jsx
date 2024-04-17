function HomeBgBlur({ children }) {
  return (
    <div className="bg-[url('/landing-page-bg.jpg')] bg-cover">
      <div className="backdrop-blur-sm">
        <div className="relative flex h-screen items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HomeBgBlur;
