import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/stat-card";
import { MapPin, Hotel, Compass, Mountain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardLocationsPage() {
  await requireRole(["ADMIN"]);

  const [
    destinationCount,
    experienceCount,
    hotelCount,
    hotelsWithCoords,
    destinationsWithCoords,
  ] = await Promise.all([
    db.destination.count(),
    db.experience.count(),
    db.hotel.count(),
    db.hotel.count({
      where: { latitude: { not: null }, longitude: { not: null } },
    }),
    db.destination.count({
      where: { latitude: { not: null }, longitude: { not: null } },
    }),
  ]);

  const hotelCoverage =
    hotelCount > 0 ? Math.round((hotelsWithCoords / hotelCount) * 100) : 0;
  const destCoverage =
    destinationCount > 0
      ? Math.round((destinationsWithCoords / destinationCount) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
        <p className="text-sm text-muted-foreground">
          Map data coverage and location management
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard title="Hotels" value={hotelCount} icon={Hotel} />
        <StatCard
          title="Destinations"
          value={destinationCount}
          icon={Mountain}
        />
        <StatCard
          title="Experiences"
          value={experienceCount}
          icon={Compass}
        />
        <StatCard title="Map Pins" value={hotelsWithCoords + destinationsWithCoords} icon={MapPin} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hotel Coordinates</CardTitle>
            <CardDescription>
              {hotelsWithCoords} of {hotelCount} hotels have lat/lng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${hotelCoverage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{hotelCoverage}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Destination Coordinates
            </CardTitle>
            <CardDescription>
              {destinationsWithCoords} of {destinationCount} destinations have
              lat/lng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${destCoverage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{destCoverage}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Location Management</CardTitle>
          <CardDescription>
            Coming soon — add, edit, and manage map pins for hotels,
            destinations, and experiences directly from the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use this page to track coordinate coverage. Full CRUD management for
            locations will be added in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
