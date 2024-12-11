export default function Footer() {
  return (
    <footer className="py-6 bg-gradient-to-r from-black via-black to-black border-purple-500 text-center text-purple-600 font-mono">
      <p>
        {`-------------------------------[ Footer ]-------------------------------`}
      </p>
      <p>© {new Date().getFullYear()} SwiftCoder. All rights reserved.</p>
      <p>
        {`--------------------------------------------------------------------------`}
      </p>
    </footer>
  );
}
