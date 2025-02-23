import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-500 text-primary-500 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-2">
          <p className="text-sm font-medium">© 2025 Eventify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

