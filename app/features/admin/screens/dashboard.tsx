import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Admin Dashboard | Supaplate" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900">
        Dashboard
      </h1>
      <p className="text-stone-600">
        Welcome to the customized Blog Admin System. Manage your topics and posts here.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Stats Placeholder */}
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-500">Total Posts</h3>
          <p className="mt-2 text-3xl font-bold text-stone-900">0</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-500">Published</h3>
          <p className="mt-2 text-3xl font-bold text-stone-900">0</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-500">Drafts</h3>
          <p className="mt-2 text-3xl font-bold text-stone-900">0</p>
        </div>
      </div>
    </div>
  );
}
