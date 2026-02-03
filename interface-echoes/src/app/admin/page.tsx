export default function AdminPage() {
    return (
        <div className="p-12 text-white">
            <h1 className="text-3xl font-bold mb-6 text-red-500">Admin Control</h1>
            <p className="mb-4">"Edit all this"</p>
            <div className="bg-zinc-900 p-6 rounded-lg border border-red-900/50">
                <p className="text-zinc-500">Restricted Area. Connect Supabase to enable editing episodes.</p>
            </div>
        </div>
    )
}
