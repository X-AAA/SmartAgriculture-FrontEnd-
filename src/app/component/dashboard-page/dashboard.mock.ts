import { ChartConfiguration, ChartOptions } from 'chart.js';

// Mock data structure interfaces (optional but good practice)
interface StatData {
  totalFarms: number;
  totalAcres: number;
  avgHealth: number;
  tasksToday: number;
}

interface WeatherData {
  location: string;
  currentTemp: number;
  currentIcon: string;
  wind: number;
  humidity: number;
  cloudiness: number;
  forecast: { day: string; icon: string; temp: number }[];
}

interface FarmData {
  id: number;
  name: string;
  location: string;
  size: number;
  health: number;
  status: 'active' | 'warning' | 'danger';
}

interface ActivityData {
  icon: string;
  title: string;
  details: string;
  time: string;
}

interface NotificationData {
  icon: string;
  text: string;
  link: string;
}

export interface DashboardMockData {
  stats: StatData;
  weather: WeatherData;
  farms: FarmData[];
  activities: ActivityData[];
  notifications: NotificationData[];
}

export function getMockData(): DashboardMockData {
  const farms: FarmData[] = [
    { id: 1, name: 'Green Valley Farm', location: 'Riverside County', size: 120, health: 75, status: 'active' },
    { id: 2, name: 'Sunny Meadows', location: 'Orange County', size: 85, health: 92, status: 'active' },
    { id: 3, name: 'Highland Ranch', location: 'San Diego', size: 150, health: 68, status: 'warning' },
    { id: 4, name: 'Eastwood Fields', location: 'Los Angeles', size: 95, health: 88, status: 'active' },
    { id: 5, name: 'Coastal Acres', location: 'Ventura County', size: 110, health: 82, status: 'active' }
  ];

  const activities: ActivityData[] = [
    { icon: 'fas fa-water', title: 'Irrigation completed', details: 'Green Valley Farm - North Section', time: 'Today, 10:30 AM' },
    { icon: 'fas fa-bug', title: 'Pest control alert', details: 'Highland Ranch - East Field', time: 'Yesterday, 4:15 PM' },
    { icon: 'fas fa-seedling', title: 'New crop planted', details: 'Sunny Meadows - South Field', time: 'May 22, 2025' },
    { icon: 'fas fa-truck', title: 'Harvest delivered', details: 'Eastwood Fields - 2.5 tons', time: 'May 20, 2025' },
    { icon: 'fas fa-tint', title: 'Soil moisture check', details: 'Green Valley Farm - All Sections', time: 'May 19, 2025' },
    { icon: 'fas fa-thermometer-half', title: 'Temperature alert', details: 'Highland Ranch - Greenhouse', time: 'May 18, 2025' },
    { icon: 'fas fa-tools', title: 'Equipment maintenance', details: 'All Farms - Irrigation Systems', time: 'May 15, 2025' },
    { icon: 'fas fa-chart-line', title: 'Yield forecast updated', details: 'All Farms - Q2 2025', time: 'May 10, 2025' }
  ];

  const notifications: NotificationData[] = [
      { icon: 'fas fa-water text-primary', text: 'Irrigation completed', link: '#' },
      { icon: 'fas fa-bug text-warning', text: 'Pest control alert', link: '#' },
      { icon: 'fas fa-seedling text-success', text: 'New crop planted', link: '#' }
  ];

  const stats: StatData = {
    totalFarms: farms.length,
    totalAcres: farms.reduce((sum, farm) => sum + farm.size, 0),
    avgHealth: farms.length > 0 ? Math.round(farms.reduce((sum, farm) => sum + farm.health, 0) / farms.length) : 0,
    tasksToday: 3 // Example static value
  };

  const weather: WeatherData = {
    location: 'Riverside County',
    currentTemp: 78,
    currentIcon: 'fas fa-sun',
    wind: 5,
    humidity: 20,
    cloudiness: 10,
    forecast: [
      { day: 'Mon', icon: 'fas fa-sun', temp: 80 },
      { day: 'Tue', icon: 'fas fa-cloud-sun', temp: 76 },
      { day: 'Wed', icon: 'fas fa-cloud', temp: 72 },
      { day: 'Thu', icon: 'fas fa-cloud-sun', temp: 75 }
    ]
  };

  return {
    stats,
    weather,
    farms,
    activities,
    notifications
  };
}

// Chart Configurations (can also be moved here or kept in component)
export function getProductivityChartConfig(isDark: boolean): ChartConfiguration {
    const textColor = isDark ? '#e0e0e0' : '#666666';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const accentColor = isDark ? '#8ab547' : '#759a3b';
    const accentBgColor = isDark ? 'rgba(138, 181, 71, 0.15)' : 'rgba(117, 154, 59, 0.1)';

    return {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Crop Yield (tons)',
                data: [12, 19, 15, 17, 22, 25, 32, 38, 35, 30, 25, 20],
                borderColor: accentColor,
                backgroundColor: accentBgColor,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { display: false, color: gridColor }, ticks: { color: textColor } },
                x: { grid: { display: false, color: gridColor }, ticks: { color: textColor } }
            }
        }
    };
}

export function getCropDistributionChartConfig(isDark: boolean): ChartConfiguration {
    const textColor = isDark ? '#e0e0e0' : '#666666';
    return {
        type: 'doughnut',
        data: {
            labels: ['Corn', 'Wheat', 'Soybeans', 'Vegetables', 'Fruits'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: ['#759a3b', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'], // Consider theme-adaptive colors if needed
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: textColor } }
            },
            cutout: '70%' as const
        } as ChartOptions<'doughnut'>
    };
}
