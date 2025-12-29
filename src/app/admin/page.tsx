import { getPortfolioData } from "@/lib/action";
import Dashboard from "./Dashboard";

// Force dynamic so admin always sees latest data
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Fetch all data on the server
  const data = await getPortfolioData();

  // Pass it to the Client Component
  return <Dashboard initialData={data} />;
}
