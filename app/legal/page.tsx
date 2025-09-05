export default function Legal() {
  return (
    <div className="card max-w-4xl mx-auto">
      <div className="card-body">
        <h1 className="text-3xl font-bold mb-6">Terms & Privacy</h1>
        
        <div className="prose prose-slate max-w-none">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">🔒 Privacy First</h2>
            <p className="text-blue-800">This is a demo, login‑free application. Your data is stored only in your browser's localStorage and never leaves your device. Clearing site data or clicking "Reset App" deletes it permanently.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What We DON'T Do</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  No user accounts or registration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  No data sent to servers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  No tracking or analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✗</span>
                  No cookies or third-party services
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What We DO</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Store data locally in your browser
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Provide educational content
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Demonstrate fitness app concepts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Give you full control over your data
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">⚠️ Important Disclaimers</h3>
            <ul className="space-y-2 text-amber-800">
              <li>• All features are for demonstration and educational purposes only</li>
              <li>• This is not a substitute for professional medical or fitness advice</li>
              <li>• Always consult healthcare professionals before making significant health changes</li>
              <li>• The app does not provide medical diagnosis or treatment recommendations</li>
            </ul>
          </div>

          <div className="mt-8 p-6 border-l-4 border-indigo-500 bg-slate-50">
            <h3 className="text-lg font-semibold mb-3">Data Management</h3>
            <p className="text-slate-700 mb-3">Your data is completely under your control:</p>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>Export:</strong> You can view all your data in the browser's developer tools</li>
              <li>• <strong>Delete:</strong> Use the "Reset App" button or clear your browser's local storage</li>
              <li>• <strong>Backup:</strong> Your data persists until you manually clear it</li>
            </ul>
          </div>

          <div className="mt-8 text-center text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} FitBuddy Demo • No data collected • No accounts required</p>
          </div>
        </div>
      </div>
    </div>
  );
}