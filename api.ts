import { Product, Consumer, Farmer, FarmingTool } from '../types';

// Enhanced mock data with more comprehensive tracking
const mockProducts: Product[] = [
  {
    id: 'demo-product-1',
    name: 'Organic Tomatoes',
    farmerId: 'farmer-1',
    plantedDate: '2024-11-15',
    harvestedDate: '2024-12-20',
    currentLocation: 'Distribution Center, Mumbai',
    estimatedDelivery: '2024-12-30',
    trackingNumber: 'TRK-2024-001',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Premium organic tomato seeds planted in nutrient-rich soil with proper spacing',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-11-15T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Growth Monitoring',
        description: 'Daily monitoring with organic fertilizers and natural pest control methods',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-12-01T10:00:00Z',
        status: 'completed',
        icon: 'Eye'
      },
      {
        id: '3',
        title: 'Harvest Complete',
        description: 'Fresh tomatoes harvested at peak ripeness using sustainable methods',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-12-20T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '4',
        title: 'Quality Testing',
        description: 'Comprehensive FSSAI quality testing including pesticide residue analysis',
        location: 'Certified Testing Lab, Chandigarh',
        timestamp: '2024-12-21T14:00:00Z',
        status: 'completed',
        icon: 'CheckCircle'
      },
      {
        id: '5',
        title: 'Processing & Packaging',
        description: 'Cleaned, sorted and packaged in eco-friendly materials with traceability codes',
        location: 'Processing Unit, Delhi',
        timestamp: '2024-12-23T09:00:00Z',
        status: 'completed',
        icon: 'Package2'
      },
      {
        id: '6',
        title: 'Cold Storage',
        description: 'Stored in temperature-controlled environment to maintain freshness',
        location: 'Cold Storage Facility, Delhi',
        timestamp: '2024-12-24T16:00:00Z',
        status: 'completed',
        icon: 'Warehouse'
      },
      {
        id: '7',
        title: 'In Transit',
        description: 'Transported in refrigerated trucks maintaining optimal temperature',
        location: 'Highway EN-1, Delhi to Mumbai',
        timestamp: '2024-12-25T12:00:00Z',
        status: 'in-progress',
        icon: 'Truck'
      },
      {
        id: '8',
        title: 'Distribution Center',
        description: 'Arrived at regional distribution center for final quality check',
        location: 'Distribution Center, Mumbai',
        timestamp: '2024-12-26T18:00:00Z',
        status: 'in-progress',
        icon: 'Warehouse'
      },
      {
        id: '9',
        title: 'Final Delivery',
        description: 'Ready for final delivery to retailers and consumers',
        location: 'Local Retailers, Mumbai',
        timestamp: '2024-12-28T10:00:00Z',
        status: 'pending',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-TOM-001',
      date: '2024-12-21',
      verified: true
    }
  },
  {
    id: 'product-2',
    name: 'Organic Spinach',
    farmerId: 'farmer-2',
    plantedDate: '2024-11-20',
    harvestedDate: '2024-12-18',
    currentLocation: 'Local Market, Bangalore',
    estimatedDelivery: '2024-12-25',
    trackingNumber: 'TRK-2024-002',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Premium organic spinach seeds planted in nutrient-rich soil',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-11-20T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh spinach harvested at peak freshness',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-12-18T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Quality Testing',
        description: 'FSSAI quality testing completed',
        location: 'Testing Lab, Bangalore',
        timestamp: '2024-12-19T14:00:00Z',
        status: 'completed',
        icon: 'CheckCircle'
      },
      {
        id: '4',
        title: 'Final Delivery',
        description: 'Delivered to local market',
        location: 'Local Market, Bangalore',
        timestamp: '2024-12-20T10:00:00Z',
        status: 'completed',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-SPI-002',
      date: '2024-12-19',
      verified: true
    }
  },
  {
    id: 'product-3',
    name: 'Fresh Carrots',
    farmerId: 'farmer-3',
    plantedDate: '2024-11-10',
    harvestedDate: '2024-12-15',
    currentLocation: 'Distribution Center, Ahmedabad',
    estimatedDelivery: '2024-12-28',
    trackingNumber: 'TRK-2024-003',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Premium carrot seeds planted in well-drained soil',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-11-10T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh carrots harvested and cleaned',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-12-15T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Quality Testing',
        description: 'FSSAI quality testing completed',
        location: 'Testing Lab, Ahmedabad',
        timestamp: '2024-12-16T14:00:00Z',
        status: 'completed',
        icon: 'CheckCircle'
      },
      {
        id: '4',
        title: 'In Transit',
        description: 'Transported to distribution center',
        location: 'Highway, Gujarat to Mumbai',
        timestamp: '2024-12-17T12:00:00Z',
        status: 'in-progress',
        icon: 'Truck'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-CAR-003',
      date: '2024-12-16',
      verified: true
    }
  },
  {
    id: 'product-4',
    name: 'Sweet Corn',
    farmerId: 'farmer-4',
    plantedDate: '2024-11-05',
    harvestedDate: '2024-12-12',
    currentLocation: 'Local Market, Jaipur',
    estimatedDelivery: '2024-12-22',
    trackingNumber: 'TRK-2024-004',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Sweet corn seeds planted in fertile soil',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-11-05T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Sweet corn harvested at peak sweetness',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-12-12T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Quality Testing',
        description: 'FSSAI quality testing completed',
        location: 'Testing Lab, Jaipur',
        timestamp: '2024-12-13T14:00:00Z',
        status: 'completed',
        icon: 'CheckCircle'
      },
      {
        id: '4',
        title: 'Final Delivery',
        description: 'Delivered to local market',
        location: 'Local Market, Jaipur',
        timestamp: '2024-12-14T10:00:00Z',
        status: 'completed',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-COR-004',
      date: '2024-12-13',
      verified: true
    }
  },
  {
    id: 'product-5',
    name: 'Fresh Broccoli',
    farmerId: 'farmer-1',
    plantedDate: '2024-11-10',
    harvestedDate: '2024-12-15',
    currentLocation: 'Distribution Center, Mumbai',
    estimatedDelivery: '2024-12-25',
    trackingNumber: 'TRK-2024-005',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Broccoli seeds planted in nutrient-rich soil',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-11-10T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh broccoli harvested at peak freshness',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-12-15T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'In Transit',
        description: 'Transported to distribution center',
        location: 'Distribution Center, Mumbai',
        timestamp: '2024-12-25T12:00:00Z',
        status: 'in-progress',
        icon: 'Truck'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-BRO-005',
      date: '2024-12-16',
      verified: true
    }
  },
  {
    id: 'product-6',
    name: 'Green Peas',
    farmerId: 'farmer-1',
    plantedDate: '2024-11-08',
    harvestedDate: '2024-12-13',
    currentLocation: 'Processing Unit, Delhi',
    estimatedDelivery: '2024-12-23',
    trackingNumber: 'TRK-2024-006',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Pea seeds planted in fertile soil',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-11-08T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh green peas harvested',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-12-13T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Processing',
        description: 'Being processed and packaged',
        location: 'Processing Unit, Delhi',
        timestamp: '2024-12-23T09:00:00Z',
        status: 'in-progress',
        icon: 'Package2'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-PEA-006',
      date: '2024-12-14',
      verified: true
    }
  },
  {
    id: 'product-7',
    name: 'Fresh Onions',
    farmerId: 'farmer-1',
    plantedDate: '2024-10-20',
    harvestedDate: '2024-12-05',
    currentLocation: 'Local Market, Punjab',
    estimatedDelivery: '2024-12-20',
    trackingNumber: 'TRK-2024-007',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Onion seeds planted in well-drained soil',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-10-20T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh onions harvested and dried',
        location: 'Green Valley Farm, Punjab',
        timestamp: '2024-12-05T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Final Delivery',
        description: 'Ready for sale at local market',
        location: 'Local Market, Punjab',
        timestamp: '2024-12-20T10:00:00Z',
        status: 'in-progress',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-ONI-007',
      date: '2024-12-06',
      verified: true
    }
  },
  {
    id: 'product-8',
    name: 'Fresh Lettuce',
    farmerId: 'farmer-2',
    plantedDate: '2024-11-15',
    harvestedDate: '2024-12-18',
    currentLocation: 'Local Market, Bangalore',
    estimatedDelivery: '2024-12-25',
    trackingNumber: 'TRK-2024-008',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Lettuce seeds planted in organic soil',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-11-15T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh lettuce harvested',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-12-18T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Final Delivery',
        description: 'Delivered to local market',
        location: 'Local Market, Bangalore',
        timestamp: '2024-12-25T10:00:00Z',
        status: 'in-progress',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-LET-008',
      date: '2024-12-19',
      verified: true
    }
  },
  {
    id: 'product-9',
    name: 'Fresh Cucumber',
    farmerId: 'farmer-2',
    plantedDate: '2024-11-12',
    harvestedDate: '2024-12-16',
    currentLocation: 'Distribution Center, Bangalore',
    estimatedDelivery: '2024-12-26',
    trackingNumber: 'TRK-2024-009',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Cucumber seeds planted in organic soil',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-11-12T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh cucumbers harvested',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-12-16T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'In Transit',
        description: 'Transported to distribution center',
        location: 'Distribution Center, Bangalore',
        timestamp: '2024-12-26T12:00:00Z',
        status: 'in-progress',
        icon: 'Truck'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-CUC-009',
      date: '2024-12-17',
      verified: true
    }
  },
  {
    id: 'product-10',
    name: 'Fresh Bell Peppers',
    farmerId: 'farmer-2',
    plantedDate: '2024-11-05',
    harvestedDate: '2024-12-12',
    currentLocation: 'Local Market, Bangalore',
    estimatedDelivery: '2024-12-22',
    trackingNumber: 'TRK-2024-010',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Bell pepper seeds planted in organic soil',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-11-05T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh bell peppers harvested',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-12-12T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Final Delivery',
        description: 'Delivered to local market',
        location: 'Local Market, Bangalore',
        timestamp: '2024-12-22T10:00:00Z',
        status: 'in-progress',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-PEP-010',
      date: '2024-12-13',
      verified: true
    }
  },
  {
    id: 'product-11',
    name: 'Fresh Cauliflower',
    farmerId: 'farmer-2',
    plantedDate: '2024-11-08',
    harvestedDate: '2024-12-14',
    currentLocation: 'Cold Storage, Bangalore',
    estimatedDelivery: '2024-12-24',
    trackingNumber: 'TRK-2024-011',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Cauliflower seeds planted in organic soil',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-11-08T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh cauliflower harvested',
        location: 'Organic Valley Farm, Karnataka',
        timestamp: '2024-12-14T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Cold Storage',
        description: 'Stored in temperature-controlled environment',
        location: 'Cold Storage, Bangalore',
        timestamp: '2024-12-24T16:00:00Z',
        status: 'in-progress',
        icon: 'Warehouse'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-CAU-011',
      date: '2024-12-15',
      verified: true
    }
  },
  {
    id: 'product-12',
    name: 'Fresh Potatoes',
    farmerId: 'farmer-3',
    plantedDate: '2024-10-15',
    harvestedDate: '2024-12-10',
    currentLocation: 'Cold Storage, Ahmedabad',
    estimatedDelivery: '2024-12-28',
    trackingNumber: 'TRK-2024-012',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Potato seeds planted in well-drained soil',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-10-15T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh potatoes harvested',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-12-10T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Cold Storage',
        description: 'Stored in temperature-controlled environment',
        location: 'Cold Storage, Ahmedabad',
        timestamp: '2024-12-28T16:00:00Z',
        status: 'in-progress',
        icon: 'Warehouse'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-POT-012',
      date: '2024-12-11',
      verified: true
    }
  },
  {
    id: 'product-13',
    name: 'Fresh Garlic',
    farmerId: 'farmer-3',
    plantedDate: '2024-10-20',
    harvestedDate: '2024-12-08',
    currentLocation: 'Processing Unit, Ahmedabad',
    estimatedDelivery: '2024-12-25',
    trackingNumber: 'TRK-2024-013',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Garlic cloves planted in fertile soil',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-10-20T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh garlic harvested and dried',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-12-08T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Processing',
        description: 'Being processed and packaged',
        location: 'Processing Unit, Ahmedabad',
        timestamp: '2024-12-25T09:00:00Z',
        status: 'in-progress',
        icon: 'Package2'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-GAR-013',
      date: '2024-12-09',
      verified: true
    }
  },
  {
    id: 'product-14',
    name: 'Fresh Ginger',
    farmerId: 'farmer-3',
    plantedDate: '2024-10-25',
    harvestedDate: '2024-12-12',
    currentLocation: 'Local Market, Ahmedabad',
    estimatedDelivery: '2024-12-26',
    trackingNumber: 'TRK-2024-014',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Ginger rhizomes planted in fertile soil',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-10-25T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh ginger harvested',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-12-12T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Final Delivery',
        description: 'Ready for sale at local market',
        location: 'Local Market, Ahmedabad',
        timestamp: '2024-12-26T10:00:00Z',
        status: 'in-progress',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-GIN-014',
      date: '2024-12-13',
      verified: true
    }
  },
  {
    id: 'product-15',
    name: 'Fresh Turmeric',
    farmerId: 'farmer-3',
    plantedDate: '2024-10-30',
    harvestedDate: '2024-12-15',
    currentLocation: 'Processing Unit, Ahmedabad',
    estimatedDelivery: '2024-12-27',
    trackingNumber: 'TRK-2024-015',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Turmeric rhizomes planted in fertile soil',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-10-30T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh turmeric harvested',
        location: 'Green Acres Farm, Gujarat',
        timestamp: '2024-12-15T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Processing',
        description: 'Being processed and packaged',
        location: 'Processing Unit, Ahmedabad',
        timestamp: '2024-12-27T09:00:00Z',
        status: 'in-progress',
        icon: 'Package2'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-TUR-015',
      date: '2024-12-16',
      verified: true
    }
  },
  {
    id: 'product-16',
    name: 'Fresh Radish',
    farmerId: 'farmer-4',
    plantedDate: '2024-11-10',
    harvestedDate: '2024-12-18',
    currentLocation: 'Local Market, Jaipur',
    estimatedDelivery: '2024-12-26',
    trackingNumber: 'TRK-2024-016',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Radish seeds planted in fertile soil',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-11-10T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh radish harvested',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-12-18T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Final Delivery',
        description: 'Delivered to local market',
        location: 'Local Market, Jaipur',
        timestamp: '2024-12-26T10:00:00Z',
        status: 'in-progress',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-RAD-016',
      date: '2024-12-19',
      verified: true
    }
  },
  {
    id: 'product-17',
    name: 'Fresh Beetroot',
    farmerId: 'farmer-4',
    plantedDate: '2024-11-08',
    harvestedDate: '2024-12-16',
    currentLocation: 'Distribution Center, Jaipur',
    estimatedDelivery: '2024-12-25',
    trackingNumber: 'TRK-2024-017',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Beetroot seeds planted in fertile soil',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-11-08T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh beetroot harvested',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-12-16T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'In Transit',
        description: 'Transported to distribution center',
        location: 'Distribution Center, Jaipur',
        timestamp: '2024-12-25T12:00:00Z',
        status: 'in-progress',
        icon: 'Truck'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-BEE-017',
      date: '2024-12-17',
      verified: true
    }
  },
  {
    id: 'product-18',
    name: 'Fresh Turnip',
    farmerId: 'farmer-4',
    plantedDate: '2024-11-12',
    harvestedDate: '2024-12-19',
    currentLocation: 'Local Market, Jaipur',
    estimatedDelivery: '2024-12-27',
    trackingNumber: 'TRK-2024-018',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Turnip seeds planted in fertile soil',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-11-12T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh turnip harvested',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-12-19T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Final Delivery',
        description: 'Ready for sale at local market',
        location: 'Local Market, Jaipur',
        timestamp: '2024-12-27T10:00:00Z',
        status: 'in-progress',
        icon: 'Store'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-TUR-018',
      date: '2024-12-20',
      verified: true
    }
  },
  {
    id: 'product-19',
    name: 'Fresh Cabbage',
    farmerId: 'farmer-4',
    plantedDate: '2024-11-05',
    harvestedDate: '2024-12-14',
    currentLocation: 'Cold Storage, Jaipur',
    estimatedDelivery: '2024-12-24',
    trackingNumber: 'TRK-2024-019',
    journey: [
      {
        id: '1',
        title: 'Seeds Planted',
        description: 'Cabbage seeds planted in fertile soil',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-11-05T08:00:00Z',
        status: 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Harvest Complete',
        description: 'Fresh cabbage harvested',
        location: 'Heritage Farm, Rajasthan',
        timestamp: '2024-12-14T06:00:00Z',
        status: 'completed',
        icon: 'Package'
      },
      {
        id: '3',
        title: 'Cold Storage',
        description: 'Stored in temperature-controlled environment',
        location: 'Cold Storage, Jaipur',
        timestamp: '2024-12-24T16:00:00Z',
        status: 'in-progress',
        icon: 'Warehouse'
      }
    ],
    fssaiVerification: {
      certificateNumber: 'FSSAI-2024-CAB-019',
      date: '2024-12-15',
      verified: true
    }
  }
];

// Shared mutable array for all farmer operations
let mockFarmers: Farmer[] = [
  {
  id: 'farmer-1',
  name: 'Rajesh Kumar',
  location: 'Green Valley Farm, Punjab',
  walletAddress: '0x123d35Cc6634C0532925a3b8D4C0532925a3b8D4',
  profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg',
  rating: 4.8,
  tokens: 1250,
    products: mockProducts.filter(p => p.farmerId === 'farmer-1'),
  transactions: [
    {
      id: '1',
      type: 'RECEIVED',
      amount: 50,
      description: 'Rating reward for Organic Tomatoes',
        timestamp: '2024-12-25T10:00:00Z',
      from: 'consumer-1'
    },
    {
      id: '2',
      type: 'SPENT',
      amount: 200,
      description: 'Purchased Smart Irrigation System',
        timestamp: '2024-12-20T15:30:00Z',
      to: 'store'
    }
  ]
  },
  {
    id: 'farmer-2',
    name: 'Priya Sharma',
    location: 'Organic Valley Farm, Karnataka',
    walletAddress: '0x456d35Cc6634C0532925a3b8D4C0532925a3b8D4',
    profileImage: 'https://images.unsplash.com/photo-1592419044706-39796d2f9b1f?w=200&h=200&fit=crop',
    rating: 4.9,
    tokens: 2100,
    products: mockProducts.filter(p => p.farmerId === 'farmer-2'),
    transactions: [
      {
        id: '3',
        type: 'RECEIVED',
        amount: 80,
        description: 'Rating reward for Organic Spinach',
        timestamp: '2024-12-24T14:00:00Z',
        from: 'consumer-2'
      }
    ]
  },
  {
    id: 'farmer-3',
    name: 'Amit Patel',
    location: 'Green Acres Farm, Gujarat',
    walletAddress: '0x789d35Cc6634C0532925a3b8D4C0532925a3b8D4',
    profileImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&h=200&fit=crop',
    rating: 4.7,
    tokens: 1800,
    products: mockProducts.filter(p => p.farmerId === 'farmer-3'),
    transactions: [
      {
        id: '4',
        type: 'RECEIVED',
        amount: 60,
        description: 'Rating reward for Fresh Carrots',
        timestamp: '2024-12-23T16:30:00Z',
        from: 'consumer-3'
      }
    ]
  },
  {
    id: 'farmer-4',
    name: 'Sunita Devi',
    location: 'Heritage Farm, Rajasthan',
    walletAddress: '0x012d35Cc6634C0532925a3b8D4C0532925a3b8D4',
    profileImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    rating: 4.6,
    tokens: 950,
    products: mockProducts.filter(p => p.farmerId === 'farmer-4'),
    transactions: [
      {
        id: '5',
        type: 'RECEIVED',
        amount: 40,
        description: 'Rating reward for Sweet Corn',
        timestamp: '2024-12-22T11:15:00Z',
        from: 'consumer-4'
      }
    ]
  }
];

const mockConsumer: Consumer = {
  id: 'consumer-1',
  name: 'Sarah Johnson',
  walletAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
  scannedProducts: []
};

// Enhanced tools with more variety and better images
const mockTools: FarmingTool[] = [
  {
    id: 'tool-1',
    name: 'Smart Irrigation System Pro',
    description: 'AI-powered automated drip irrigation with soil moisture sensors, weather integration, and mobile app control',
    tokenPrice: 450,
    category: 'Irrigation',
    rating: 4.8,
    reviews: 127,
    features: ['AI Control', 'Weather Integration', 'Mobile App', 'Water Saving', 'Remote Monitoring'],
    available: true,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-2',
    name: 'Organic Fertilizer Premium Kit',
    description: 'Complete organic fertilizer package with micronutrients, beneficial bacteria, and slow-release formula',
    tokenPrice: 180,
    category: 'Fertilizers',
    rating: 4.6,
    reviews: 89,
    features: ['100% Organic', 'Micronutrients', 'Slow Release', 'Eco-Friendly', 'Soil Health'],
    available: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-3',
    name: 'Precision Seed Planter GPS',
    description: 'High-precision GPS-guided planting equipment for optimal seed spacing and depth control',
    tokenPrice: 320,
    category: 'Planting',
    rating: 4.9,
    reviews: 156,
    features: ['GPS Guided', 'Variable Rate', 'Depth Control', 'Multi-Crop', 'Auto Steering'],
    available: true,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-4',
    name: 'Digital Soil Testing Kit Pro',
    description: 'Professional digital soil analysis kit with pH, NPK, micronutrient testing, and cloud data sync',
    tokenPrice: 95,
    category: 'Testing',
    rating: 4.7,
    reviews: 203,
    features: ['Digital Display', 'Multiple Tests', 'Quick Results', 'Cloud Sync', 'Mobile App'],
    available: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-5',
    name: 'Agricultural Drone 4K Pro',
    description: 'Advanced agricultural drone with 4K multispectral imaging for crop health monitoring and analysis',
    tokenPrice: 850,
    category: 'Automation',
    rating: 4.9,
    reviews: 78,
    features: ['4K Camera', 'GPS Navigation', 'Real-time Data', 'Weather Resistant', 'AI Analysis'],
    available: true,
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-6',
    name: 'Bio-Pesticide Smart Sprayer',
    description: 'Eco-friendly precision pesticide application system with smart targeting and drift control',
    tokenPrice: 275,
    category: 'Protection',
    rating: 4.5,
    reviews: 134,
    features: ['Eco-Friendly', 'Precision Spray', 'Low Drift', 'Smart Control', 'Battery Powered'],
    available: true,
    image: 'https://images.unsplash.com/photo-1592419044706-39796d2f9b1f?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-7',
    name: 'Smart Greenhouse Controller',
    description: 'Automated climate control system with IoT sensors for optimal greenhouse growing conditions',
    tokenPrice: 520,
    category: 'Automation',
    rating: 4.8,
    reviews: 92,
    features: ['IoT Sensors', 'Climate Control', 'Remote Access', 'Energy Efficient', 'Data Analytics'],
    available: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-8',
    name: 'AI Harvest Robot Assistant',
    description: 'Semi-autonomous harvesting robot with AI vision for delicate crop handling',
    tokenPrice: 1200,
    category: 'Automation',
    rating: 4.6,
    reviews: 45,
    features: ['AI Vision', 'Gentle Handling', 'Long Battery', 'Multi-Crop', 'Self-Learning'],
    available: true,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-9',
    name: 'Hydroponic System Starter',
    description: 'Complete hydroponic growing system with nutrient monitoring and automated feeding',
    tokenPrice: 380,
    category: 'Irrigation',
    rating: 4.7,
    reviews: 112,
    features: ['Automated Feeding', 'Nutrient Monitor', 'pH Control', 'LED Lighting', 'Compact Design'],
    available: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-10',
    name: 'Organic Compost Maker',
    description: 'Automated composting system that converts farm waste into nutrient-rich organic fertilizer',
    tokenPrice: 290,
    category: 'Fertilizers',
    rating: 4.4,
    reviews: 87,
    features: ['Automated Process', 'Odor Control', 'Fast Composting', 'Nutrient Rich', 'Eco-Friendly'],
    available: true,
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-11',
    name: 'Weather Station Pro',
    description: 'Professional weather monitoring station with real-time data and predictive analytics',
    tokenPrice: 220,
    category: 'Testing',
    rating: 4.6,
    reviews: 156,
    features: ['Real-time Data', 'Weather Prediction', 'Mobile Alerts', 'Solar Powered', 'Cloud Storage'],
    available: true,
    image: 'https://images.unsplash.com/photo-1592419044706-39796d2f9b1f?w=500&h=300&fit=crop'
  },
  {
    id: 'tool-12',
    name: 'Crop Protection Drone',
    description: 'Specialized drone for crop protection with precision spraying and monitoring capabilities',
    tokenPrice: 680,
    category: 'Protection',
    rating: 4.8,
    reviews: 94,
    features: ['Precision Spraying', 'Crop Monitoring', 'GPS Mapping', 'Long Flight Time', 'Easy Control'],
    available: true,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop'
  }
];

export const api = {
  async scanQR(qrData: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      let productData;
      
      try {
        const parsed = JSON.parse(qrData);
        productData = parsed;
      } catch {
        productData = { productId: qrData };
      }
      
      const product = mockProducts.find(p => 
        p.id === productData.productId
      );
      
      if (product) {
        // Mark FSSAI as verified when scanned
        product.fssaiVerification.verified = true;
        product.fssaiVerification.date = new Date().toISOString().split('T')[0];
        
        // Add to consumer's scanned products if not already there
        if (!mockConsumer.scannedProducts.find(p => p.id === product.id)) {
          mockConsumer.scannedProducts.push({
            ...product,
            lastUpdated: new Date().toISOString()
          });
        }
        
        return {
          success: true,
          product: {
            ...product,
            lastUpdated: new Date().toISOString()
          }
        };
      } else {
        return {
          success: false,
          error: 'Product not found'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Invalid QR data format'
      };
    }
  },

  async getConsumer(): Promise<Consumer> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockConsumer;
  },

  async getFarmer(): Promise<Farmer> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // For demo, return the first farmer as the "logged in" farmer
    return mockFarmers[0];
  },

  async updateFarmerDetails(details: { name: string; location: string; profileImage: string }): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    // Update the first farmer (demo user)
    mockFarmers[0].name = details.name;
    mockFarmers[0].location = details.location;
    mockFarmers[0].profileImage = details.profileImage;
    return {
      success: true,
      message: 'Farmer details updated successfully',
      farmer: mockFarmers[0]
    };
  },

  async getAllFarmers(): Promise<Farmer[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFarmers;
  },

  async deleteFarmer(farmerId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockFarmers = mockFarmers.filter(f => f.id !== farmerId);
    // Remove products for this farmer
    for (let i = mockProducts.length - 1; i >= 0; i--) {
      if (mockProducts[i].farmerId === farmerId) {
        mockProducts.splice(i, 1);
      }
    }
    return { success: true };
  },

  async getTools(): Promise<FarmingTool[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTools;
  },

  async generateQR(productData: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate unique product ID and tracking number
    const productId = `product-${Date.now()}`;
    const trackingNumber = `TRK-${Date.now()}`;
    const now = new Date();
    
    // Create a comprehensive journey for the new product
    const journey = [
      {
        id: '1',
        title: 'Seeds Planted',
        description: `Premium seeds planted in nutrient-rich soil with proper spacing at ${productData.location}`,
        location: productData.location,
        timestamp: productData.plantationDate || now.toISOString(),
        status: 'completed' as 'completed',
        icon: 'Sprout'
      },
      {
        id: '2',
        title: 'Growth Monitoring',
        description: 'Daily monitoring with organic fertilizers and natural pest control methods',
        location: productData.location,
        timestamp: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week later
        status: 'completed' as 'completed',
        icon: 'Eye'
      },
      {
        id: '3',
        title: 'Harvest Complete',
        description: 'Fresh produce harvested at peak ripeness using sustainable methods',
        location: productData.location,
        timestamp: productData.harvestDate || new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks later
        status: 'completed' as 'completed',
        icon: 'Package'
      },
      {
        id: '4',
        title: 'Quality Testing',
        description: 'Comprehensive FSSAI quality testing including pesticide residue analysis',
        location: 'Certified Testing Lab, Chandigarh',
        timestamp: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days later
        status: 'completed' as 'completed',
        icon: 'CheckCircle'
      },
      {
        id: '5',
        title: 'Processing & Packaging',
        description: 'Cleaned, sorted and packaged in eco-friendly materials with traceability codes',
        location: 'Processing Unit, Delhi',
        timestamp: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days later
        status: 'completed' as 'completed',
        icon: 'Package2'
      },
      {
        id: '6',
        title: 'Cold Storage',
        description: 'Stored in temperature-controlled environment to maintain freshness',
        location: 'Cold Storage Facility, Delhi',
        timestamp: new Date(now.getTime() + 17 * 24 * 60 * 60 * 1000).toISOString(), // 17 days later
        status: 'completed' as 'completed',
        icon: 'Warehouse'
      },
      {
        id: '7',
        title: 'In Transit',
        description: 'Transported in refrigerated trucks maintaining optimal temperature',
        location: 'Highway EN-1, Delhi to Mumbai',
        timestamp: new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 days later
        status: 'in-progress' as 'in-progress',
        icon: 'Truck'
      },
      {
        id: '8',
        title: 'Distribution Center',
        description: 'Arrived at regional distribution center for final quality check',
        location: 'Distribution Center, Mumbai',
        timestamp: new Date(now.getTime() + 19 * 24 * 60 * 60 * 1000).toISOString(), // 19 days later
        status: 'in-progress' as 'in-progress',
        icon: 'Warehouse'
      },
      {
        id: '9',
        title: 'Final Delivery',
        description: 'Ready for final delivery to retailers and consumers',
        location: 'Local Retailers, Mumbai',
        timestamp: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days later
        status: 'pending' as 'pending',
        icon: 'Store'
      }
    ];
    
    // Create the new product object
    const newProduct = {
      id: productId,
      name: productData.name,
      farmerId: productData.farmerId,
      plantedDate: productData.plantationDate,
      harvestedDate: productData.harvestDate,
      currentLocation: 'Distribution Center, Mumbai',
      estimatedDelivery: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days later
      trackingNumber,
      journey,
      fssaiVerification: {
        certificateNumber: `FSSAI-${productId}`,
        date: now.toISOString().split('T')[0],
        verified: true
      },
      lastUpdated: now.toISOString()
    };
    
    // Add to mockProducts and farmer's products
    mockProducts.push(newProduct);
    mockFarmers[0].products.push(newProduct);
    
    // Automatically add to consumer's scanned products for tracking
    if (!mockConsumer.scannedProducts.find(p => p.id === newProduct.id)) {
      mockConsumer.scannedProducts.push({
        ...newProduct,
        lastUpdated: now.toISOString()
      });
    }
    
    const qrData = JSON.stringify({
      productId: productId,
      name: productData.name,
      farmerId: productData.farmerId,
      plantationDate: productData.plantationDate,
      harvestDate: productData.harvestDate,
      location: productData.location,
      timestamp: now.toISOString()
    });
    
    return {
      success: true,
      qrData
    };
  },

  async rateFarmer(rating: number): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const tokensEarned = rating * 10;
    
    // Find the farmer and update their tokens
    const farmer = mockFarmers.find(f => f.id === 'farmer-1');
    if (farmer) {
      farmer.tokens += tokensEarned;
      
      // Add transaction record
      const transaction = {
        id: Date.now().toString(),
        type: 'RECEIVED' as 'RECEIVED',
        amount: tokensEarned,
        description: `Rating reward - ${rating} stars`,
        timestamp: new Date().toISOString(),
        from: 'consumer-1'
      };
      farmer.transactions.push(transaction);
    }
    
    return {
      success: true,
      tokensEarned,
      message: `Farmer rated ${rating} stars and earned ${tokensEarned} tokens`
    };
  },

  async purchaseTool(toolId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tool = mockTools.find(t => t.id === toolId);
    if (!tool) {
      return { success: false, error: 'Tool not found' };
    }
    
    if (mockFarmers[0].tokens < tool.tokenPrice) {
      return { success: false, error: 'Insufficient tokens' };
    }
    
    mockFarmers[0].tokens -= tool.tokenPrice;
    
    // Add transaction record
    const transaction = {
      id: Date.now().toString(),
      type: 'SPENT' as 'SPENT',
      amount: tool.tokenPrice,
      description: `Purchased ${tool.name}`,
      timestamp: new Date().toISOString(),
      to: 'store'
    };
    mockFarmers[0].transactions.push(transaction);
    
    return {
      success: true,
      message: `Successfully purchased ${tool.name}`,
      newBalance: mockFarmers[0].tokens
    };
  },

  async redeemTokens(amount: number): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (mockFarmers[0].tokens < amount) {
      return { success: false, error: 'Insufficient token balance' };
    }
    
    mockFarmers[0].tokens -= amount;
    
    return {
      success: true,
      newBalance: mockFarmers[0].tokens
    };
  },

  async getAllProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts;
  },

  async addFarmer(farmerData: { name: string; location: string; profileImage: string; farmerId: string; customProducts?: any[] }): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate a new farmer ID
    const newFarmerId = `farmer-${Date.now()}`;
    
    // Use custom products if provided, otherwise use default products
    let farmerProducts: Product[] = [];
    
    if (farmerData.customProducts && farmerData.customProducts.length > 0) {
      // Convert custom products to the proper Product format with tracking data
      farmerProducts = farmerData.customProducts.map((customProduct, index) => {
        const productId = `product-${newFarmerId}-${index + 1}`;
        const plantedDate = new Date(Date.now() - (30 - index * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const harvestedDate = new Date(Date.now() - (5 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const estimatedDelivery = new Date(Date.now() + (2 + index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        return {
          id: productId,
          name: customProduct.name,
          farmerId: newFarmerId,
          plantedDate: plantedDate,
          harvestedDate: harvestedDate,
          currentLocation: index % 2 === 0 ? 'Local Market' : 'Distribution Center',
          estimatedDelivery: estimatedDelivery,
          trackingNumber: `TRK-${newFarmerId}-${String(index + 1).padStart(3, '0')}`,
          journey: [
            {
              id: '1',
              title: 'Seeds Planted',
              description: `${customProduct.name} seeds planted in nutrient-rich soil`,
              location: farmerData.location,
              timestamp: new Date(Date.now() - (30 - index * 5) * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Sprout'
            },
            {
              id: '2',
              title: 'Harvest Complete',
              description: `Fresh ${customProduct.name.toLowerCase()} harvested at peak freshness`,
              location: farmerData.location,
              timestamp: new Date(Date.now() - (5 - index) * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Package'
            },
            {
              id: '3',
              title: index % 2 === 0 ? 'Final Delivery' : 'In Transit',
              description: index % 2 === 0 
                ? 'Ready for delivery to local market'
                : 'Transported to distribution center',
              location: index % 2 === 0 ? 'Local Market' : 'Distribution Center',
              timestamp: new Date(Date.now() + (2 + index) * 24 * 60 * 60 * 1000).toISOString(),
              status: 'in-progress',
              icon: index % 2 === 0 ? 'Store' : 'Truck'
            }
          ],
          fssaiVerification: {
            certificateNumber: `FSSAI-${newFarmerId}-${customProduct.name.substring(0, 3).toUpperCase()}-${String(index + 1).padStart(3, '0')}`,
            date: new Date(Date.now() - (3 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            verified: true
          }
        };
      });
    } else {
      // Default products for new farmers (existing logic)
      farmerProducts = [
        {
          id: `product-${newFarmerId}-1`,
          name: 'Fresh Tomatoes',
          farmerId: newFarmerId,
          plantedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          harvestedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currentLocation: 'Local Market',
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          trackingNumber: `TRK-${newFarmerId}-001`,
          journey: [
            {
              id: '1',
              title: 'Seeds Planted',
              description: 'Tomato seeds planted in nutrient-rich soil',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Sprout'
            },
            {
              id: '2',
              title: 'Harvest Complete',
              description: 'Fresh tomatoes harvested at peak ripeness',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Package'
            },
            {
              id: '3',
              title: 'Final Delivery',
              description: 'Ready for delivery to local market',
              location: 'Local Market',
              timestamp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'in-progress',
              icon: 'Store'
            }
          ],
          fssaiVerification: {
            certificateNumber: `FSSAI-${newFarmerId}-TOM-001`,
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            verified: true
          }
        },
        {
          id: `product-${newFarmerId}-2`,
          name: 'Organic Spinach',
          farmerId: newFarmerId,
          plantedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          harvestedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currentLocation: 'Distribution Center',
          estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          trackingNumber: `TRK-${newFarmerId}-002`,
          journey: [
            {
              id: '1',
              title: 'Seeds Planted',
              description: 'Organic spinach seeds planted',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Sprout'
            },
            {
              id: '2',
              title: 'Harvest Complete',
              description: 'Fresh spinach harvested',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Package'
            },
            {
              id: '3',
              title: 'In Transit',
              description: 'Transported to distribution center',
              location: 'Distribution Center',
              timestamp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'in-progress',
              icon: 'Truck'
            }
          ],
          fssaiVerification: {
            certificateNumber: `FSSAI-${newFarmerId}-SPI-002`,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            verified: true
          }
        },
        {
          id: `product-${newFarmerId}-3`,
          name: 'Fresh Carrots',
          farmerId: newFarmerId,
          plantedDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          harvestedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currentLocation: 'Cold Storage',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          trackingNumber: `TRK-${newFarmerId}-003`,
          journey: [
            {
              id: '1',
              title: 'Seeds Planted',
              description: 'Carrot seeds planted in well-drained soil',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Sprout'
            },
            {
              id: '2',
              title: 'Harvest Complete',
              description: 'Fresh carrots harvested and cleaned',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Package'
            },
            {
              id: '3',
              title: 'Cold Storage',
              description: 'Stored in temperature-controlled environment',
              location: 'Cold Storage',
              timestamp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'in-progress',
              icon: 'Warehouse'
            }
          ],
          fssaiVerification: {
            certificateNumber: `FSSAI-${newFarmerId}-CAR-003`,
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            verified: true
          }
        },
        {
          id: `product-${newFarmerId}-4`,
          name: 'Green Peas',
          farmerId: newFarmerId,
          plantedDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          harvestedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currentLocation: 'Processing Unit',
          estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          trackingNumber: `TRK-${newFarmerId}-004`,
          journey: [
            {
              id: '1',
              title: 'Seeds Planted',
              description: 'Pea seeds planted in fertile soil',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Sprout'
            },
            {
              id: '2',
              title: 'Harvest Complete',
              description: 'Fresh green peas harvested',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Package'
            },
            {
              id: '3',
              title: 'Processing',
              description: 'Being processed and packaged',
              location: 'Processing Unit',
              timestamp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'in-progress',
              icon: 'Package2'
            }
          ],
          fssaiVerification: {
            certificateNumber: `FSSAI-${newFarmerId}-PEA-004`,
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            verified: true
          }
        },
        {
          id: `product-${newFarmerId}-5`,
          name: 'Fresh Onions',
          farmerId: newFarmerId,
          plantedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          harvestedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currentLocation: 'Local Market',
          estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          trackingNumber: `TRK-${newFarmerId}-005`,
          journey: [
            {
              id: '1',
              title: 'Seeds Planted',
              description: 'Onion seeds planted in well-drained soil',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Sprout'
            },
            {
              id: '2',
              title: 'Harvest Complete',
              description: 'Fresh onions harvested and dried',
              location: farmerData.location,
              timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'completed',
              icon: 'Package'
            },
            {
              id: '3',
              title: 'Final Delivery',
              description: 'Ready for sale at local market',
              location: 'Local Market',
              timestamp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'in-progress',
              icon: 'Store'
            }
          ],
          fssaiVerification: {
            certificateNumber: `FSSAI-${newFarmerId}-ONI-005`,
            date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            verified: true
          }
        }
      ];
    }
    
    // Create new farmer object with products
    const newFarmer: Farmer = {
      id: newFarmerId,
      name: farmerData.name,
      location: farmerData.location,
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      profileImage: farmerData.profileImage,
      rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
      tokens: Math.floor(Math.random() * 500) + 100, // Random tokens between 100-600
      products: farmerProducts,
      transactions: []
    };
    
    // Add products to mockProducts array
    mockProducts.push(...farmerProducts);
    
    // Add to mockFarmers array
    mockFarmers.push(newFarmer);
    
    return {
      success: true,
      message: farmerData.customProducts && farmerData.customProducts.length > 0 
        ? `Farmer added successfully with ${farmerData.customProducts.length} custom products`
        : 'Farmer added successfully with 5 default products',
      farmer: newFarmer
    };
  }
};