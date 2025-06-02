
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
  change: number;
}

const Products: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock products data
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Wheat',
      category: 'Grains',
      quantity: 1250,
      unit: 'tons',
      price: 245.50,
      status: 'in-stock',
      lastUpdated: '2024-01-15',
      change: 5.2
    },
    {
      id: '2',
      name: 'Copper Wire',
      category: 'Metals',
      quantity: 45,
      unit: 'tons',
      price: 8950.00,
      status: 'low-stock',
      lastUpdated: '2024-01-14',
      change: -2.1
    },
    {
      id: '3',
      name: 'Crude Oil Brent',
      category: 'Energy',
      quantity: 2500,
      unit: 'barrels',
      price: 82.45,
      status: 'in-stock',
      lastUpdated: '2024-01-15',
      change: 8.7
    },
    {
      id: '4',
      name: 'Yellow Corn',
      category: 'Grains',
      quantity: 890,
      unit: 'tons',
      price: 198.75,
      status: 'in-stock',
      lastUpdated: '2024-01-13',
      change: 3.4
    },
    {
      id: '5',
      name: 'Gold Bars',
      category: 'Metals',
      quantity: 12,
      unit: 'kg',
      price: 64850.00,
      status: 'low-stock',
      lastUpdated: '2024-01-12',
      change: -1.8
    },
    {
      id: '6',
      name: 'Natural Gas',
      category: 'Energy',
      quantity: 0,
      unit: 'MMBtu',
      price: 3.25,
      status: 'out-of-stock',
      lastUpdated: '2024-01-10',
      change: -15.2
    }
  ]);

  const categories = ['all', 'Grains', 'Metals', 'Energy', 'Livestock'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return t('products.inStock');
      case 'low-stock':
        return t('products.lowStock');
      case 'out-of-stock':
        return t('products.outOfStock');
      default:
        return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category.toLowerCase()) {
      case 'grains':
        return t('products.grains');
      case 'metals':
        return t('products.metals');
      case 'energy':
        return t('products.energy');
      case 'livestock':
        return t('products.livestock');
      default:
        return category;
    }
  };

  const canModifyProducts = user?.role === 'manager' || user?.role === 'storekeeper';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('products.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('products.subtitle')}
          </p>
        </div>
        
        {canModifyProducts && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('products.addProduct')}
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('products.searchProducts')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? t('products.all') : getCategoryText(category)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{product.name}</CardTitle>
                    <CardDescription>{getCategoryText(product.category)}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(product.status)}>
                  {getStatusText(product.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Quantity and Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('products.quantity')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.quantity.toLocaleString()} {product.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('products.price')}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Price Change */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('products.priceChange')}</span>
                  <span className={`flex items-center text-sm ${
                    product.change > 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {product.change > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(product.change)}%
                  </span>
                </div>

                {/* Last Updated */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('products.lastUpdated')} {new Date(product.lastUpdated).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                {canModifyProducts && (
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      {t('common.edit')}
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('products.noProductsFound')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('products.noProductsMessage')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Products;
