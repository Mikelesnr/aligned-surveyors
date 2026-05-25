// resources/js/Layouts/GroupLayout.jsx
export default function GroupLayout({ myGroups, children }) {
    return (
        <div className="flex h-screen">
            {/* Persistent Sidebar */}
            <aside className="w-64 border-r overflow-y-auto">
                <h2 className="p-4 font-bold">My Groups</h2>
                {myGroups.map((group) => (
                    <a
                        href={route("groups.show", group.id)}
                        className="block p-2 hover:bg-gray-100"
                    >
                        {group.name}
                    </a>
                ))}
            </aside>

            {/* Dynamic Content Area */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
